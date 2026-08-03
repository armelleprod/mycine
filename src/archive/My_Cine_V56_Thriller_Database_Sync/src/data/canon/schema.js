export const CANON_STATUS = Object.freeze({
  DRAFT: "draft",
  REVIEW: "review",
  APPROVED: "approved",
  RETIRED: "retired"
});

export const CANON_TIERS = Object.freeze({
  MASTERPIECE: "masterpiece",
  ESSENTIAL: "essential",
  OUTSTANDING: "outstanding",
  DISCOVERY: "discovery"
});

export const RECOMMENDATION_ROLES = Object.freeze({
  TONIGHTS_PICK: "tonights-pick",
  MODERN_FAVORITE: "modern-favorite",
  CLASSIC_CHOICE: "classic-choice",
  PASSPORT_PICK: "passport-pick",
  HIDDEN_GEM: "hidden-gem",
  CRITICS_CHOICE: "critics-choice",
  CURATORS_SURPRISE: "curators-surprise",
  COMFORT_PICK: "comfort-pick"
});

export function normalizeCanonKey(title, year = "") {
  return `${String(title || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()}|${String(year || "").trim()}`;
}

export function createCanonEntry(entry) {
  return {
    key: normalizeCanonKey(entry.title, entry.year),
    title: entry.title,
    year: Number(entry.year),
    type: entry.type || "movie",
    status: entry.status || CANON_STATUS.APPROVED,
    tier: entry.tier || CANON_TIERS.OUTSTANDING,
    primaryGenre: entry.primaryGenre,
    secondaryGenres: entry.secondaryGenres || [],
    excludedGenres: entry.excludedGenres || [],
    moods: entry.moods || {},
    viewerFit: entry.viewerFit || {casual:5, specialist:5, cinephile:5},
    roles: entry.roles || [],
    country: entry.country || "",
    language: entry.language || "",
    curatorNote: entry.curatorNote || "",
    whyTonight: entry.whyTonight || "",
    scores: {
      editorialFit: entry.scores?.editorialFit ?? 8,
      humor: entry.scores?.humor ?? 0,
      romance: entry.scores?.romance ?? 0,
      rewatchability: entry.scores?.rewatchability ?? 7,
      discovery: entry.scores?.discovery ?? 5,
      cinephile: entry.scores?.cinephile ?? 5
    }
  };
}
