
export function titleKey(title) {
  const mediaType = title.media_type || (title.isTV ? "tv" : "movie");
  return `${mediaType}-${title.id}`;
}

export function titleYear(title) {
  return Number(title.year || 0);
}

export function titleDecade(title) {
  const year = titleYear(title);
  return year ? Math.floor(year / 10) * 10 : 0;
}

export function titleCountry(title) {
  return String(title.countryCode || title.country || "").toUpperCase();
}

export function titleLanguage(title) {
  return String(
    title.languageCode ||
    title.original_language ||
    title.language ||
    ""
  ).toLowerCase();
}

export function isTV(title) {
  return Boolean(title.isTV || title.media_type === "tv");
}
