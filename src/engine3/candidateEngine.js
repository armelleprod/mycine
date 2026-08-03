
import {titleKey} from "./types";

export function mergeCandidateGroups(...groups) {
  const seen = new Set();
  const merged = [];

  groups.flat().filter(Boolean).forEach(title => {
    const key = titleKey(title);
    if (!title?.id || seen.has(key)) return;
    seen.add(key);
    merged.push(title);
  });

  return merged;
}

export function buildCandidatePool({
  currentYear = [],
  previousYear = [],
  alternatives = [],
  canon = []
}) {
  return mergeCandidateGroups(
    currentYear,
    previousYear,
    canon,
    alternatives
  );
}
