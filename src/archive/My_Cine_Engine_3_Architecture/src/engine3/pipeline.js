
import {
  DEFAULT_ENGINE_RULES,
  ENGINE_VERSION
} from "./constants";
import {buildCandidatePool} from "./candidateEngine";
import {applyCanonLayer, filterByCanonIdentity} from "./canonEngine";
import {applyQualityGate} from "./qualityEngine";
import {
  historyIds,
  removeRecentTitles,
  writeHistory
} from "./freshnessEngine";
import {
  canJoinBatch,
  formatTargets
} from "./diversityEngine";
import {tasteScore} from "./tasteEngine";
import {castAlternatives} from "./castingEngine";
import {auditPublishedBatch} from "./editorEngine";

export async function runEngine3Pipeline({
  currentYearTitles,
  previousYearTitles,
  alternativeTitles,
  canonTitles = [],
  selectedLabels,
  selectionKey,
  storageKey,
  sessionIds,
  contentMode,
  batchNumber,
  chooseHero,
  enrichTitles,
  rules = DEFAULT_ENGINE_RULES
}) {
  const trace = {
    version: ENGINE_VERSION,
    stages: {}
  };

  const candidates = buildCandidatePool({
    currentYear: currentYearTitles,
    previousYear: previousYearTitles,
    alternatives: alternativeTitles,
    canon: canonTitles
  });
  trace.stages.candidates = candidates.length;

  const canonLayer = filterByCanonIdentity(
    applyCanonLayer(candidates),
    selectedLabels
  );
  trace.stages.canon = canonLayer.length;

  const qualityLayer = applyQualityGate(canonLayer, rules);
  trace.stages.quality = qualityLayer.length;

  const recentIds = historyIds({
    storageKey,
    selectionKey,
    days: rules.historyDays
  });

  const freshLayer = removeRecentTitles(
    qualityLayer,
    recentIds,
    new Set(sessionIds || [])
  );
  trace.stages.freshness = freshLayer.length;

  const enriched = await enrichTitles(freshLayer);
  trace.stages.enriched = enriched.length;

  const hero = await chooseHero(enriched);
  if (!hero) {
    throw new Error("Engine 3.0 could not cast Tonight's Pick.");
  }

  hero.engineRole = "tonights-pick";

  const targets = formatTargets(contentMode, batchNumber);
  const altTargets = {
    movies: Math.max(0, targets.movies - (hero.isTV ? 0 : 1)),
    tv: Math.max(0, targets.tv - (hero.isTV ? 1 : 0))
  };

  const remaining = enriched
    .filter(title => title.id !== hero.id)
    .sort(
      (a, b) =>
        tasteScore(b, selectedLabels) -
        tasteScore(a, selectedLabels)
    );

  const alternatives = castAlternatives({
    hero,
    candidates: remaining,
    labels: selectedLabels,
    canAdd: (title, selected) => {
      for (let relax = 0; relax <= 3; relax += 1) {
        if (canJoinBatch(title, selected, rules, altTargets, relax)) {
          return true;
        }
      }
      return false;
    }
  });

  // Final fill for any role with no perfect candidate.
  const used = new Set([hero.id, ...alternatives.map(title => title.id)]);
  for (const title of remaining) {
    if (alternatives.length >= 6) break;
    if (used.has(title.id)) continue;
    alternatives.push(title);
    used.add(title.id);
  }

  const published = [hero, ...alternatives.slice(0, 6)];
  const audit = auditPublishedBatch({
    titles: published,
    rules,
    selectedLabels
  });

  trace.stages.published = published.length;
  trace.audit = audit;

  if (!audit.passed) {
    throw new Error(`Engine 3.0 audit failed: ${audit.issues.join(" ")}`);
  }

  writeHistory({
    storageKey,
    selectionKey,
    titles: published
  });

  return {
    hero,
    alternatives: published.slice(1),
    trace
  };
}
