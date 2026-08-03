
export function passesQualityGate(title, rules) {
  const rating = Number(title.rating || title.vote_average || 0);

  return Boolean(
    title &&
    title.id &&
    title.poster_path &&
    title.overview &&
    rating >= rules.minimumTmdbRating
  );
}

export function applyQualityGate(titles, rules) {
  return titles.filter(title => passesQualityGate(title, rules));
}
