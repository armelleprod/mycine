
import {titleKey} from "./types";

export function auditPublishedBatch({
  titles,
  rules,
  selectedLabels = []
}) {
  const issues = [];
  const keys = titles.map(titleKey);

  if (titles.length !== rules.exactBatchSize) {
    issues.push(`Expected ${rules.exactBatchSize} titles, received ${titles.length}.`);
  }

  if (new Set(keys).size !== keys.length) {
    issues.push("Duplicate titles detected.");
  }

  titles.forEach(title => {
    const rating = Number(title.rating || 0);
    if (rating < rules.minimumTmdbRating) {
      issues.push(`${title.title} is below the TMDB quality floor.`);
    }
  });

  if (selectedLabels.includes("romcom")) {
    titles.forEach(title => {
      if (title.canon?.excludedGenres?.includes("romcom")) {
        issues.push(`${title.title} is editorially excluded from Romcom.`);
      }
    });
  }

  return {
    passed: issues.length === 0,
    issues
  };
}
