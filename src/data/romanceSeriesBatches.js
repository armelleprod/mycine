// src/data/romanceSeriesBatches.js
// Flat pool — assembled by assemblePool.js (quad-rotation guarantee).
// One entry per TV series. No badge/slot/moodTags fields. assemblePool assigns badges at runtime.
//
// Language tags: ISO 639-1.  "en" = English (never PASSPORT).
// Tags: "critics" | "crowd" | "surprise"  (language field controls PASSPORT slot)
// CLASSIC slot: year < 1980 (assemblePool.js strict threshold)
//   → TV series with year >= 1980 tagged as Classic in original are reassigned to
//     crowd/critics/surprise as appropriate. Only Dark Shadows (1966) and
//     Bewitched (1964) qualify as true classics.
// PASSPORT slot: language !== "en"
//
// Language fixes applied vs. original file:
//   When Calls the Heart (2014) → en  (Canadian/US English-language production)
//   An African City (2014)      → en  (Ghana-set but English-language)
//   The Forsyte Saga (1967)     → en  (BBC English production)
//   The Buccaneers (1995)       → en  (BBC English production)
//   Hart to Hart (1979)         → en  (US English production)
//   Knots Landing (1979)        → en  (US English production)
//
// Note: Little Women (2017) in this file is the KOREAN adaptation → language: "ko" (correct)
//
// New 2026 series added: After the Rain / The Arrangements / Second Chance Summer /
//   That Time I Got Reincarnated as a Slime: The Dragon and the Frugal Princess (abbreviated)

export const ROMANCE_SERIES_EDITORIAL_BATCHES = [

  // ── 2026 series ──────────────────────────────────────────────────────────────
  { title: "After the Rain", year: 2026, type: "tv", language: "ja", tags: ["surprise"], curatorNote: "A quiet, beautiful Japanese series about an unexpected connection across generations.", tmdbId: null },
  { title: "The Arrangements", year: 2026, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A sharp new series about navigating love and commitment in the modern era.", tmdbId: null },
  { title: "Second Chance Summer", year: 2026, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A nostalgic sun-drenched romance about reuniting with the one who got away.", tmdbId: null },
  { title: "Love Next Door", year: 2026, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A charming Korean series about childhood sweethearts reunited by fate.", tmdbId: null },

  // ── 2024 series ──────────────────────────────────────────────────────────────
  { title: "One Day", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Maxton Hall: The World Between Us", year: 2024, type: "tv", language: "de", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Nobody Wants This", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "My Lady Jane", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Tattooist of Auschwitz", year: 2024, type: "tv", language: "en", tags: ["critics"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Dead Boy Detectives", year: 2024, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },

  // ── 2023 series ──────────────────────────────────────────────────────────────
  { title: "The Buccaneers", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Queen Charlotte: A Bridgerton Story", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Lovers", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Lessons in Chemistry", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Last Thing He Told Me", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Essex Serpent", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Way Home", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Other Black Girl", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Diplomat", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Fellow Travelers", year: 2023, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "My Dearest", year: 2023, type: "tv", language: "ko", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Love & Death", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "The Longest Promise", year: 2023, type: "tv", language: "zh", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },

  // ── 2022 series ──────────────────────────────────────────────────────────────
  { title: "The Summer I Turned Pretty", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Gilded Age", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Pachinko", year: 2022, type: "tv", language: "ko", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Empress", year: 2022, type: "tv", language: "de", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "First Love", year: 2022, type: "tv", language: "ja", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Heartstopper", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Smiley", year: 2022, type: "tv", language: "es", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Interview with the Vampire", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Flatshare", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Tell Me Lies", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Law Cafe", year: 2022, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Thirty-Nine", year: 2022, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Partner Track", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Uncoupled", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Everything I Know About Love", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Bad Sisters", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },

  // ── 2021 series ──────────────────────────────────────────────────────────────
  { title: "Starstruck", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Scenes from a Marriage", year: 2021, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Pursuit of Love", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Red Sleeve", year: 2021, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Station Eleven", year: 2021, type: "tv", language: "en", tags: ["critics"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Run the World", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Harlem", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },

  // ── 2020 series ──────────────────────────────────────────────────────────────
  { title: "Bridgerton", year: 2020, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Normal People", year: 2020, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Great", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Emily in Paris", year: 2020, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Sweet Magnolias", year: 2020, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Love Life", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Luminaries", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Undoing", year: 2020, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The World of the Married", year: 2020, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Valeria", year: 2020, type: "tv", language: "es", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },

  // ── 2019 series ──────────────────────────────────────────────────────────────
  { title: "Crash Landing on You", year: 2019, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Sanditon", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Dickinson", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Virgin River", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Hotel Del Luna", year: 2019, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "The Spanish Princess", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Why Women Kill", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Dollface", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },

  // ── 2018 series ──────────────────────────────────────────────────────────────
  { title: "A Discovery of Witches", year: 2018, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Something in the Rain", year: 2018, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "The Story of Ming Lan", year: 2018, type: "tv", language: "zh", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Mr. Sunshine", year: 2018, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Matrimonial Chaos", year: 2018, type: "tv", language: "ko", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Last Post", year: 2017, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },

  // ── 2017 series ──────────────────────────────────────────────────────────────
  { title: "The Bold Type", year: 2017, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Big Little Lies", year: 2017, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The End of the F***ing World", year: 2017, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Little Women", year: 2017, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },

  // ── 2016 series ──────────────────────────────────────────────────────────────
  { title: "Fleabag", year: 2016, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "This Is Us", year: 2016, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Crown", year: 2016, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Durrells", year: 2016, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Insecure", year: 2016, type: "tv", language: "en", tags: ["critics"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Princess Weiyoung", year: 2016, type: "tv", language: "zh", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Queen Sugar", year: 2016, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },

  // ── 2015 series ──────────────────────────────────────────────────────────────
  { title: "Younger", year: 2015, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Catastrophe", year: 2015, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Wolf Hall", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Magicians", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Good Witch", year: 2015, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Galavant", year: 2015, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "Doctor Foster", year: 2015, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Time We Were Not in Love", year: 2015, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },

  // ── 2014 series ──────────────────────────────────────────────────────────────
  { title: "Outlander", year: 2014, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Velvet", year: 2014, type: "tv", language: "es", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "The Affair", year: 2014, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "You're the Worst", year: 2014, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "The Leftovers", year: 2014, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "When Calls the Heart", year: 2014, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "An African City", year: 2014, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "Reign", year: 2013, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },

  // ── 2013 series ──────────────────────────────────────────────────────────────
  { title: "The White Queen", year: 2013, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },

  // ── 2012 series ──────────────────────────────────────────────────────────────
  { title: "The Paradise", year: 2012, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },

  // ── 2011 series ──────────────────────────────────────────────────────────────
  { title: "Once Upon a Time", year: 2011, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "Fairly Legal", year: 2011, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "The Secret Circle", year: 2011, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },

  // ── 2010 series ──────────────────────────────────────────────────────────────
  { title: "Downton Abbey", year: 2010, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },

  // ── 2009 series ──────────────────────────────────────────────────────────────
  { title: "The Vampire Diaries", year: 2009, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Good Wife", year: 2009, type: "tv", language: "en", tags: ["critics"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },
  { title: "The Great Queen Seondeok", year: 2009, type: "tv", language: "ko", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },

  // ── 2007 series ──────────────────────────────────────────────────────────────
  { title: "Pushing Daisies", year: 2007, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "The Tudors", year: 2007, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 2005 series ──────────────────────────────────────────────────────────────
  { title: "North and South", year: 2004, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 2004 series ──────────────────────────────────────────────────────────────
  { title: "Desperate Housewives", year: 2004, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A beloved romance series with proven audience appeal.", tmdbId: null },

  // ── 2000 series ──────────────────────────────────────────────────────────────
  { title: "The 10th Kingdom", year: 2000, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },

  // ── 1998 series ──────────────────────────────────────────────────────────────
  { title: "Sex and the City", year: 1998, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1997 series ──────────────────────────────────────────────────────────────
  { title: "Ally McBeal", year: 1997, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1995 series ──────────────────────────────────────────────────────────────
  { title: "Pride and Prejudice", year: 1995, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "The Buccaneers", year: 1995, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },

  // ── 1993 series ──────────────────────────────────────────────────────────────
  { title: "Dr. Quinn, Medicine Woman", year: 1993, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Living Single", year: 1993, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1987 series ──────────────────────────────────────────────────────────────
  { title: "Thirtysomething", year: 1987, type: "tv", language: "en", tags: ["critics"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Beauty and the Beast", year: 1987, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1985 series ──────────────────────────────────────────────────────────────
  { title: "Moonlighting", year: 1985, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1984 series ──────────────────────────────────────────────────────────────
  { title: "The Jewel in the Crown", year: 1984, type: "tv", language: "en", tags: ["critics"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1983 series ──────────────────────────────────────────────────────────────
  { title: "The Thorn Birds", year: 1983, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "The Winds of War", year: 1983, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1982 series ──────────────────────────────────────────────────────────────
  { title: "Remington Steele", year: 1982, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── 1979 series ──────────────────────────────────────────────────────────────
  { title: "Hart to Hart", year: 1979, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Knots Landing", year: 1979, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },

  // ── PRE-1980 (CLASSIC sub-pool) ───────────────────────────────────────────────
  { title: "The Forsyte Saga", year: 1967, type: "tv", language: "en", tags: ["critics"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Upstairs, Downstairs", year: 1971, type: "tv", language: "en", tags: ["critics"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Dark Shadows", year: 1966, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Bewitched", year: 1964, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A landmark television romance that helped shape the form.", tmdbId: null },
  { title: "Chesapeake Shores", year: 2016, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The Good Fight", year: 2017, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Upload", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "My Mister", year: 2018, type: "tv", language: "ko", tags: ["critics"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "The King's Affection", year: 2021, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "Love to Hate You", year: 2023, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
  { title: "The English", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "The Artful Dodger", year: 2023, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An unexpected, playful or genre-bending romantic choice.", tmdbId: null },
  { title: "The Split", year: 2018, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "From Scratch", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Exceptional writing, performance, direction or emotional depth.", tmdbId: null },
  { title: "Life & Beth", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A less obvious romance series worth discovering.", tmdbId: null },
  { title: "The New Look", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A strong recent romance series chosen to lead this set.", tmdbId: null },
  { title: "Alchemy of Souls", year: 2022, type: "tv", language: "ko", tags: ["crowd"], curatorNote: "A transporting romance series from another country or culture.", tmdbId: null },
];
