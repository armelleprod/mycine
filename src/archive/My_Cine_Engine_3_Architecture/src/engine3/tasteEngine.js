
export function viewerProfile(title) {
  if (title.viewerFit) {
    return Object.entries(title.viewerFit)
      .sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] || "specialist";
  }

  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);
  const year = Number(title.year || 0);
  const language = String(title.original_language || "").toLowerCase();

  if (year > 0 && year < 1990) return "cinephile";
  if (language && language !== "en") return "cinephile";
  if (votes >= 2500 || popularity >= 45) return "casual";

  return "specialist";
}

export function tasteScore(title, selectionLabels = [], preferredProfile = null) {
  const rating = Number(title.rating || 0);
  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);
  const profile = viewerProfile(title);

  const canonFit = Number(title.canon?.scores?.editorialFit || 0) * 8;
  const ratingPoints = Math.max(0, rating - 7.5) * 20;
  const confidencePoints = Math.min(25, Math.log10(Math.max(votes, 10)) * 7);
  const popularityPoints = Math.min(12, popularity * 0.1);
  const profilePoints = preferredProfile === profile ? 20 : 0;
  const canonBonus = title.canon ? 25 : 0;

  return (
    canonFit +
    ratingPoints +
    confidencePoints +
    popularityPoints +
    profilePoints +
    canonBonus
  );
}
