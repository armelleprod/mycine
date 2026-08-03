
import {titleKey} from "./types";

export function readHistory(storageKey) {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function historyIds({
  storageKey,
  selectionKey,
  days,
  heroOnly = false
}) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  return new Set(
    readHistory(storageKey)
      .filter(entry =>
        entry &&
        entry.selectionKey === selectionKey &&
        Number(entry.shownAt || 0) >= cutoff &&
        (!heroOnly || entry.hero)
      )
      .map(entry => `${entry.mediaType || "movie"}-${entry.id}`)
  );
}

export function removeRecentTitles(titles, recentIds, sessionIds = new Set()) {
  return titles.filter(title => {
    const key = titleKey(title);
    return !recentIds.has(key) && !sessionIds.has(String(title.id));
  });
}

export function writeHistory({
  storageKey,
  selectionKey,
  titles,
  retentionDays = 180
}) {
  const now = Date.now();
  const existing = readHistory(storageKey);
  const additions = titles.map((title, index) => ({
    id: title.id,
    mediaType: title.media_type || (title.isTV ? "tv" : "movie"),
    selectionKey,
    shownAt: now,
    hero: index === 0,
    role: title.engineRole || null
  }));

  const cutoff = now - retentionDays * 24 * 60 * 60 * 1000;
  const merged = [...existing, ...additions]
    .filter(entry => Number(entry.shownAt || 0) >= cutoff)
    .slice(-2000);

  localStorage.setItem(storageKey, JSON.stringify(merged));
}
