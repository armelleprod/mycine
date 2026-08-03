
import {
  applyCanonMetadata,
  isCanonApprovedFor,
  isEditoriallyExcluded
} from "../data/canon";

export function applyCanonLayer(titles) {
  return titles.map(applyCanonMetadata);
}

export function filterByCanonIdentity(titles, selectionLabels) {
  const labels = selectionLabels || [];

  return titles.filter(title => {
    for (const label of labels) {
      if (isEditoriallyExcluded(title.title, title.year, label)) {
        return false;
      }
    }

    if (labels.length === 1) {
      const label = labels[0];
      if (isCanonApprovedFor(title.title, title.year, label)) {
        return true;
      }
    }

    return true;
  });
}

export function canonApproves(title, genre) {
  return isCanonApprovedFor(title.title, title.year, genre);
}

export function canonRejects(title, genre) {
  return isEditoriallyExcluded(title.title, title.year, genre);
}
