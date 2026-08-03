import {normalizeCanonKey} from "./schema";
import {ROMCOM_CANON, ROMCOM_EXCLUSIONS} from "./romcom";

const ALL_CANON_ENTRIES = [...ROMCOM_CANON];
const CANON_BY_KEY = new Map(ALL_CANON_ENTRIES.map(entry => [entry.key, entry]));
const ROMCOM_EXCLUSION_KEYS = new Set(
  ROMCOM_EXCLUSIONS.map(([title, year]) => normalizeCanonKey(title, year))
);

export function getCanonEntry(title, year) {
  return CANON_BY_KEY.get(normalizeCanonKey(title, year)) || null;
}

export function isCanonApprovedFor(title, year, genre) {
  const entry = getCanonEntry(title, year);
  if (!entry || entry.status !== "approved") return false;
  return entry.primaryGenre === genre || entry.secondaryGenres.includes(genre);
}

export function isEditoriallyExcluded(title, year, genre) {
  const key = normalizeCanonKey(title, year);
  if (genre === "romcom") return ROMCOM_EXCLUSION_KEYS.has(key);
  return Boolean(CANON_BY_KEY.get(key)?.excludedGenres?.includes(genre));
}

export function applyCanonMetadata(title) {
  const entry = getCanonEntry(title.title, title.year);
  if (!entry) return title;
  return {
    ...title,
    canon: entry,
    curationRole: title.curationRole || entry.roles[0] || null,
    curatorNote: entry.curatorNote || title.curatorNote,
    whyTonight: entry.whyTonight || title.whyTonight,
    viewerFit: entry.viewerFit,
    canonTier: entry.tier
  };
}

export function canonViewerType(title) {
  const entry = getCanonEntry(title.title, title.year);
  if (!entry) return null;
  return Object.entries(entry.viewerFit || {})
    .sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] || null;
}

export const CANON_STATS = Object.freeze({
  entries: ALL_CANON_ENTRIES.length,
  romcomEntries: ROMCOM_CANON.length,
  romcomExclusions: ROMCOM_EXCLUSION_KEYS.size
});
