// src/data/assemblePool.js
// Assembles a fresh 7-entry editorial batch from a flat pool each time a user requests.
// Rotates through the pool via localStorage so the same titles don't repeat every session.
//
// DESIGN: Triple-rotation guarantee —
//   Slot 1 (Tonight's Pick) always comes from a SEPARATE rotation over the current-year sub-pool
//   (year === CURRENT_YEAR). This guarantees a 2026 title every single batch,
//   regardless of where the main pool pointer happens to be.
//   Slot 2 (RECENT) always comes from a SECOND SEPARATE rotation over year >= 2025 entries
//   (excluding Tonight's Pick). This guarantees a 2025 or 2026 title is always available for RECENT,
//   regardless of where the main pool pointer happens to be.
//   The remaining 5 entries come from the main pool rotation (both guaranteed picks excluded).
//   Badges are assigned AFTER selection based on what each entry actually is.

const CURRENT_YEAR = new Date().getFullYear();
const BATCH_SIZE = 7;

const SLOT_BADGES = [
  "🍿 Tonight's Pick",  // slot 1
  "🆕 RECENT",          // slot 2
  "🎞️ Classic",         // slot 3
  "🌍 Passport",        // slot 4
  "🏆 Critics",         // slot 5
  "❤️ Crowd Favorite",  // slot 6
  "✨ Surprise",         // slot 7
];

// Fisher-Yates shuffle — returns a new array, never mutates the original
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns the next N entries from a named rotation stored under storageKey.
// The rotation is over the indices of `pool`.
// Advances the pointer and persists to localStorage.
function getNextFromRotation(pool, storageKey, count) {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    const validStored =
      stored &&
      Array.isArray(stored.order) &&
      stored.order.length === pool.length &&
      stored.order.every(i => i >= 0 && i < pool.length);

    let order = validStored ? stored.order : shuffle(pool.map((_, i) => i));
    let position = validStored ? (stored.position || 0) : 0;

    if (position >= order.length) {
      order = shuffle(pool.map((_, i) => i));
      position = 0;
    }

    const indices = [];
    for (let i = 0; i < count; i++) {
      const idx = (position + i) % order.length;
      indices.push(order[idx]);
    }

    const newPosition = position + count;
    const nextOrder = newPosition >= order.length
      ? shuffle(pool.map((_, i) => i))
      : order;
    const nextPosition = newPosition >= order.length ? 0 : newPosition;

    localStorage.setItem(storageKey, JSON.stringify({
      order: nextOrder,
      position: nextPosition,
    }));

    return indices.map(i => pool[i]);
  } catch {
    return shuffle(pool).slice(0, count);
  }
}

// Assembles 7 entries using triple rotation:
//   1. Pick 1 entry from the recent sub-pool (year === CURRENT_YEAR) — Tonight's Pick guarantee.
//   2. Pick 1 entry from the new sub-pool (year >= 2025, excluding Tonight's Pick) — RECENT badge guarantee.
//   3. Pick 5 entries from the main pool (excluding the two guaranteed picks).
// This guarantees both Slot 1 (Tonight's Pick = 2026) and Slot 2 (RECENT = 2025+) are always filled.
function getNextBatch(pool, storageKey) {
  const recentPool = pool.filter(e => Number(e.year) === CURRENT_YEAR);
  const recentKey = storageKey + ":recent";

  // Step 1: one guaranteed Tonight's Pick (year === CURRENT_YEAR)
  let recentPick = null;
  if (recentPool.length > 0) {
    const picks = getNextFromRotation(recentPool, recentKey, 1);
    recentPick = picks[0] || null;
  }

  // Step 2: one guaranteed RECENT pick (year >= 2025, not already picked)
  const newPool = pool.filter(
    e => Number(e.year) >= 2025 && e.title !== recentPick?.title
  );
  const newKey = storageKey + ":new";
  let newPick = null;
  if (newPool.length > 0) {
    const picks = getNextFromRotation(newPool, newKey, 1);
    newPick = picks[0] || null;
  }

  // Step 3: 5 more from the main pool, excluding both guaranteed picks
  const excludedTitles = new Set(
    [recentPick?.title, newPick?.title].filter(Boolean)
  );
  const mainPool = pool.filter(e => !excludedTitles.has(e.title));
  const mainPicks = getNextFromRotation(mainPool, storageKey, BATCH_SIZE - 2);

  const batch = [];
  if (recentPick) batch.push(recentPick);
  if (newPick) batch.push(newPick);
  batch.push(...mainPicks);

  // Trim to BATCH_SIZE in case edge cases (tiny pool) over-fill
  return batch.slice(0, BATCH_SIZE);
}

// Assign badges to the 7 selected entries based on what they actually are.
// The first entry is always a recent film (from the guaranteed sub-pool pick),
// so slot 1 (Tonight's Pick) will almost always be satisfied.
// Priority order within each badge category when multiple entries qualify:
//   Tonight's Pick: most recent year first
//   NEW: second most recent
//   Classic: oldest first
//   Passport: non-English
//   Critics/Crowd/Surprise: by tag
// Any entry that doesn't win a "special" badge gets a generic slot label.
function assignBadges(entries) {
  const result = new Array(entries.length).fill(null);
  const assigned = new Set();

  const findBest = (check, prefer) => {
    const candidates = entries
      .map((e, i) => ({ e, i }))
      .filter(({ e, i }) => !assigned.has(i) && check(e));
    if (candidates.length === 0) return -1;
    if (prefer) candidates.sort((a, b) => prefer(a.e, b.e));
    return candidates[0].i;
  };

  // Slot 1: Tonight's Pick — current year only (2026)
  const slot0 = findBest(
    e => Number(e.year) === CURRENT_YEAR,
    (a, b) => Number(b.year) - Number(a.year)
  );
  if (slot0 !== -1) { result[0] = slot0; assigned.add(slot0); }

  // Slot 2: RECENT — 2025 or 2026 only, prefer 2026 first, then 2025
  const slot0Year = slot0 !== -1 ? Number(entries[slot0].year) : null;
  const slot1 = findBest(
    e => Number(e.year) >= 2025,
    (a, b) => {
      const aScore = Number(a.year) === slot0Year ? 0 : 1;
      const bScore = Number(b.year) === slot0Year ? 0 : 1;
      return bScore - aScore || Number(b.year) - Number(a.year);
    }
  );
  if (slot1 !== -1) { result[1] = slot1; assigned.add(slot1); }

  // Slot 3: Classic — year < 1980, oldest first for variety
  const slot2 = findBest(e => Number(e.year) < 1980, null);
  if (slot2 !== -1) { result[2] = slot2; assigned.add(slot2); }

  // Slot 4: Passport — non-English
  const slot3 = findBest(e => e.language && e.language !== "en", null);
  if (slot3 !== -1) { result[3] = slot3; assigned.add(slot3); }

  // Slot 5: Critics
  const slot4 = findBest(e => Array.isArray(e.tags) && e.tags.includes("critics"), null);
  if (slot4 !== -1) { result[4] = slot4; assigned.add(slot4); }

  // Slot 6: Crowd Favorite
  const slot5 = findBest(e => Array.isArray(e.tags) && e.tags.includes("crowd"), null);
  if (slot5 !== -1) { result[5] = slot5; assigned.add(slot5); }

  // Slot 7: Surprise
  const slot6 = findBest(e => Array.isArray(e.tags) && e.tags.includes("surprise"), null);
  if (slot6 !== -1) { result[6] = slot6; assigned.add(slot6); }

  // Any entry not yet assigned a badge slot gets placed in the first empty slot
  for (let slotIndex = 0; slotIndex < BATCH_SIZE; slotIndex++) {
    if (result[slotIndex] !== null) continue;
    for (let i = 0; i < entries.length; i++) {
      if (!assigned.has(i)) {
        result[slotIndex] = i;
        assigned.add(i);
        break;
      }
    }
  }

  return result.map((entryIndex, slotIndex) => {
    const entry = entryIndex !== null ? entries[entryIndex] : entries[slotIndex] || entries[0];
    let badge = SLOT_BADGES[slotIndex];
    // Safety guard: never label an entry "RECENT" unless its year is 2025 or later.
    // If the RECENT slot had to fall back to an older title (pool exhaustion edge case),
    // downgrade the badge to "✨ Surprise" so the label stays honest.
    if (badge === "🆕 RECENT" && Number(entry.year) < 2025) {
      badge = "✨ Surprise";
    }
    return { ...entry, badge, slot: slotIndex + 1 };
  });
}

/**
 * assembleBatchFromPool(pool, storageKey)
 *
 * Takes a flat array of entry objects and returns exactly 7 entries,
 * each assigned a badge based on the entry's actual properties.
 *
 * GUARANTEE: Slot 1 (Tonight's Pick) always shows a 2026 title, drawn from
 * a separate rotation over the current-year sub-pool. Slot 2 (RECENT) always
 * shows 2025 or 2026, drawn from a second separate rotation over year >= 2025
 * entries (excluding Tonight's Pick). The remaining 5 slots rotate through
 * the full pool.
 *
 * Entry object shape:
 * {
 *   title: string,
 *   year: number,
 *   type: "movie" | "tv",
 *   language: string,    // ISO 639-1, e.g. "en", "fr", "ko"
 *   tags: string[],      // any of: "critics", "crowd", "surprise"
 *   curatorNote: string,
 *   moodTags: string[],  // optional
 *   tmdbId: number,      // optional — direct TMDB lookup
 *   posterUrl: string,   // optional — poster override
 * }
 */
export function assembleBatchFromPool(pool, storageKey) {
  if (!pool || pool.length === 0) return [];
  const batch = getNextBatch(pool, storageKey);
  return assignBadges(batch);
}
