
import {ENGINE_ROLES} from "./constants";
import {viewerProfile, tasteScore} from "./tasteEngine";

function roleCandidateScore(title, role, labels) {
  let score = tasteScore(title, labels);

  if (role === "classic-choice" && Number(title.year || 0) < 1990) score += 35;
  if (role === "passport-pick" && title.original_language && title.original_language !== "en") score += 30;
  if (role === "hidden-gem" && Number(title.vote_count || 0) < 3500) score += 25;
  if (role === "critics-choice" && viewerProfile(title) === "cinephile") score += 25;
  if (role === "modern-favorite" && Number(title.year || 0) >= new Date().getFullYear() - 10) score += 20;
  if (role === "curators-surprise" && title.canon?.roles?.includes("curators-surprise")) score += 40;

  return score;
}

export function castRole({
  role,
  candidates,
  labels,
  selected,
  canAdd
}) {
  const ranked = [...candidates]
    .filter(title => !selected.includes(title))
    .sort(
      (a, b) =>
        roleCandidateScore(b, role, labels) -
        roleCandidateScore(a, role, labels)
    );

  return ranked.find(canAdd) || null;
}

export function castAlternatives({
  hero,
  candidates,
  labels,
  canAdd
}) {
  const selected = [];
  const roles = ENGINE_ROLES.filter(role => role !== "tonights-pick");

  roles.forEach(role => {
    const pick = castRole({
      role,
      candidates,
      labels,
      selected,
      canAdd: title => canAdd(title, selected)
    });

    if (pick) {
      pick.engineRole = role;
      selected.push(pick);
    }
  });

  return selected;
}
