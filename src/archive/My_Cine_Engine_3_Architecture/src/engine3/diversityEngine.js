
import {
  isTV,
  titleCountry,
  titleDecade,
  titleLanguage
} from "./types";

export function formatTargets(contentMode, batchNumber) {
  if (contentMode === "movie") return {movies:7, tv:0};
  if (contentMode === "tv") return {movies:0, tv:7};

  return batchNumber % 2 === 0
    ? {movies:3, tv:4}
    : {movies:4, tv:3};
}

export function canJoinBatch(title, selected, rules, targets, relax = 0) {
  const movieCount = selected.filter(item => !isTV(item)).length;
  const tvCount = selected.filter(item => isTV(item)).length;

  if (!isTV(title) && movieCount >= targets.movies) return false;
  if (isTV(title) && tvCount >= targets.tv) return false;

  const country = titleCountry(title);
  const decade = titleDecade(title);
  const language = titleLanguage(title);

  const countryLimit = relax >= 1 ? 3 : rules.maximumSameCountry;
  const decadeLimit = relax >= 2 ? 3 : rules.maximumSameDecade;
  const languageLimit = relax >= 2 ? 3 : rules.maximumSameLanguage;

  if (country) {
    const count = selected.filter(item => titleCountry(item) === country).length;
    if (count >= countryLimit) return false;
  }

  if (decade) {
    const count = selected.filter(item => titleDecade(item) === decade).length;
    if (count >= decadeLimit) return false;
  }

  if (language && language !== "en") {
    const count = selected.filter(item => titleLanguage(item) === language).length;
    if (count >= languageLimit) return false;
  }

  if (
    isTV(title) &&
    titleCountry(title) === "KR" &&
    relax < 3
  ) {
    const koreanTV = selected.filter(
      item => isTV(item) && titleCountry(item) === "KR"
    ).length;

    if (koreanTV >= rules.maximumKoreanTV) return false;
  }

  return true;
}
