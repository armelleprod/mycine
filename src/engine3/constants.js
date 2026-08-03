
export const ENGINE_VERSION = "3.0.0-alpha";

export const ENGINE_ROLES = Object.freeze([
  "tonights-pick",
  "modern-favorite",
  "classic-choice",
  "passport-pick",
  "hidden-gem",
  "critics-choice",
  "curators-surprise"
]);

export const DEFAULT_ENGINE_RULES = Object.freeze({
  minimumTmdbRating: 7.5,
  historyDays: 30,
  heroHistoryDays: 60,
  maximumSameCountry: 2,
  maximumSameDecade: 2,
  maximumSameLanguage: 2,
  maximumKoreanTV: 1,
  exactBatchSize: 7,
  roleCount: 7
});

export const VIEWER_PROFILES = Object.freeze([
  "casual",
  "specialist",
  "cinephile"
]);
