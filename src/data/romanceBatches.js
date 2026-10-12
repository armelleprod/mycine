// src/data/romanceBatches.js
// Flat pool — assembled by assemblePool.js (quad-rotation guarantee).
// One entry per film. No badge/slot fields. assemblePool assigns badges at runtime.
//
// Language tags: ISO 639-1.  "en" = English (never PASSPORT).
// Tags: "critics" | "crowd" | "surprise"  (language field controls PASSPORT slot)
// CLASSIC slot: year < 1980 (assemblePool.js strict threshold)
// PASSPORT slot: language !== "en"
//
// Language fixes applied vs. original file:
//   Sense and Sensibility (1995)  → en  (UK/US production, English-language)
//   Atonement (2007)              → en  (UK/US production, English-language)
//   Bright Star (2009)            → en  (UK/Australian production, English-language)
//   Never Let Me Go (2010)        → en  (UK production, English-language)
//   Supernova (2020)              → en  (UK production, English-language)
//   A Nice Indian Boy (2024)      → en  (US production, English-language)
//   We Live in Time (2024)        → en  (UK/US production, English-language)
//   Persuasion (1995)             → en  (UK production, English-language)
//   Ali & Ava (2021)              → en  (UK production, English-language)
//   The Piano (1993)              → en  (NZ/AU/FR co-prod, English-language)
//   Disobedience (2017)           → en  (UK/Irish production, English-language)
//
// Plan A: tmdbId populated where found (TMDB poster source)
// Plan B: imdbId added as fallback field for poster lookup

export const ROMANCE_EDITORIAL_BATCHES = [

  // ── 2026 titles ──────────────────────────────────────────────────────────────
  { title: "Wuthering Heights", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sweeping new adaptation of the Brontë classic — dark, passionate and visually stunning.", tmdbId: null, imdbId: "tt32897959" },
  { title: "The Bride!", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A bold reimagining of the Bride of Frankenstein myth as a feminist monster romance.", tmdbId: null, imdbId: "tt30851137" },
  { title: "People We Meet on Vacation", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A beloved enemies-to-lovers road trip finally brought to the screen.", tmdbId: 1034716, imdbId: null },
  { title: "Office Romance", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sharp workplace love story with real comic timing.", tmdbId: null, imdbId: null },
  { title: "Voicemails for Isabelle", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A delicate long-distance romance told through voice messages across time zones.", tmdbId: null, imdbId: null },
  { title: "The Drama", year: 2026, type: "movie", language: "en", tags: ["critics"], curatorNote: "A darkly funny drama-school romance from an exciting new voice.", tmdbId: null, imdbId: null },
  { title: "The Love Hypothesis", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A fake-dating academic romance with genuine chemistry and heart.", tmdbId: null, imdbId: null },
  { title: "Love Language", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A warm cross-cultural love story built around language, translation and misunderstanding.", tmdbId: null, imdbId: null },
  { title: "You Deserve Each Other", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "An engaged couple who secretly hate each other try to make the other call it off first.", tmdbId: null, imdbId: null },
  { title: "18th Rose", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A lush period romance with a slow-burn courtship at its center.", tmdbId: null, imdbId: null },
  { title: "It Happened One Summer", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A socialite exiled to a small fishing town falls for a stubborn local — with serious Capra energy.", tmdbId: null, imdbId: null },
  { title: "You, Me & Tuscany", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sun-soaked Italian setting frames this charming second-chance love story.", tmdbId: null, imdbId: null },
  { title: "Love, Theoretically", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A witty academic enemies-to-lovers story with sharp comic timing.", tmdbId: null, imdbId: null },
  { title: "The Kiss Curse", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A warm magical-realism romance from the Sweetest Thing universe.", tmdbId: null, imdbId: null },
  { title: "When We Were Young and Reckless", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A sweeping coming-of-age love story told across decades.", tmdbId: null, imdbId: null },
  { title: "One True Loves", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A heartfelt love triangle built on loyalty, memory and second chances.", tmdbId: null, imdbId: null },
  { title: "The Mating Game", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A breezy rivals-to-lovers story set in the competitive world of academic biology.", tmdbId: null, imdbId: null },
  { title: "The Sun Never Sets", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sweeping new romance set against an unending summer — beauty and longing in equal measure.", tmdbId: null, imdbId: null },
  { title: "Romería", year: 2026, type: "movie", language: "es", tags: ["critics"], curatorNote: "A luminous Spanish drama following a young woman back to the village of her birth — and an unexpected encounter.", tmdbId: null, imdbId: "tt32538648" },
  { title: "The Invite", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A comedy-drama romance built around an awkward invitation and the feelings it stirs up.", tmdbId: null, imdbId: "tt14173636" },
  { title: "Leviticus", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A daring genre-bending horror romance that refuses to play it safe.", tmdbId: null, imdbId: null },
  { title: "Heartstopper Forever", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The beloved LGBTQ+ coming-of-age love story gets its definitive big-screen chapter.", tmdbId: null, imdbId: "tt36619926" },
  { title: "Girls Like Girls", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A tender queer romance drawn from the song and short film that captivated a generation.", tmdbId: null, imdbId: null },
  { title: "Tuner", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A moody crime-tinged romance set in the world of music and obsession.", tmdbId: null, imdbId: null },
  { title: "Carolina Caroline", year: 2026, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A mystery-laced romance that slowly reveals the story of two people and a shared secret.", tmdbId: null, imdbId: null },
  { title: "Erupcja", year: 2026, type: "movie", language: "pl", tags: ["surprise"], curatorNote: "A striking Polish drama about passion, rupture and the aftermath of love.", tmdbId: null, imdbId: "tt33712666" },
  { title: "The Serpent's Skin", year: 2026, type: "movie", language: "en", tags: ["critics"], curatorNote: "A dark, layered romance with gothic undertones and a genuinely unsettling love story at its core.", tmdbId: null, imdbId: null },
  { title: "Scarlet", year: 2026, type: "movie", language: "ja", tags: ["crowd"], curatorNote: "A breathtaking anime romance — lush visuals and a love story with real emotional weight.", tmdbId: null, imdbId: "tt35114460" },
  { title: "Love of Your Life", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Now playing — a warm and winning romance about finding the person who finally fits.", tmdbId: null, imdbId: null },
  { title: "Sense and Sensibility", year: 2026, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A fresh new adaptation of Austen's most emotionally volatile novel — in theaters Oct 16.", tmdbId: null, imdbId: null },
  { title: "Pillion", year: 2026, type: "movie", language: "en", tags: ["critics"], curatorNote: "A singular queer love story — raw, tender and unlike anything else.", tmdbId: null, imdbId: null },

  // ── 2025 titles ──────────────────────────────────────────────────────────────
  { title: "Hamnet", year: 2025, type: "movie", language: "en", tags: ["critics"], curatorNote: "Maggie O'Farrell's devastating novel about Shakespeare's family and the love that survived grief.", tmdbId: 858024, imdbId: "tt14231506" },
  { title: "Plainclothes", year: 2025, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A low-key queer romance wrapped in a crime thriller — quietly devastating.", tmdbId: null, imdbId: "tt27550504" },
  { title: "All of You", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A warm second-chance romance with real emotional honesty.", tmdbId: null, imdbId: null },
  { title: "Heart Eyes", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A holiday horror-comedy romance — exactly as unhinged and fun as it sounds.", tmdbId: null, imdbId: null },
  { title: "Materialists", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sharp, witty look at love and ambition in New York — with an irresistible triangle.", tmdbId: null, imdbId: "tt30253473" },
  { title: "The Ballad of Wallis Island", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "An eccentric British rom-com about a lottery winner, a stranded singer and an island of feelings.", tmdbId: null, imdbId: null },
  { title: "The Wedding Banquet", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A loving update of Ang Lee's classic — a queer couple's fake marriage gets beautifully complicated.", tmdbId: null, imdbId: "tt32214413" },
  { title: "Bridget Jones: Mad About the Boy", year: 2025, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Bridget is back — widowed, chaotic, and somehow more lovable than ever.", tmdbId: null, imdbId: "tt32063050" },
  { title: "Picture This", year: 2025, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A quiet, inventive romance about art, grief and the images we make of each other.", tmdbId: null, imdbId: null },
  { title: "Viet and Nam", year: 2025, type: "movie", language: "vi", tags: ["critics"], curatorNote: "A haunting Vietnamese love story set in the shadow of the mines — lyrical and unforgettable.", tmdbId: null, imdbId: null },

  // ── 2024 titles ──────────────────────────────────────────────────────────────
  { title: "Challengers", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Three players, one sport, one impossible triangle — Guadagnino at his most kinetic.", tmdbId: 937287, imdbId: null },
  { title: "The Idea of You", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A 40-year-old mom falls for a pop star half her age — and it's surprisingly moving.", tmdbId: 843527, imdbId: null },
  { title: "Love Lies Bleeding", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "A neon-soaked queer noir romance — dangerous, obsessive, and absolutely gripping.", tmdbId: 948549, imdbId: null },
  { title: "Young Hearts", year: 2024, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A tender coming-of-age first love story with a soft, luminous quality.", tmdbId: null, imdbId: "tt15245268" },
  { title: "Touch", year: 2024, type: "movie", language: "en", tags: ["surprise"], curatorNote: "An elderly man retraces a wartime love across Iceland and Japan — deeply felt.", tmdbId: null, imdbId: null },
  { title: "A Nice Indian Boy", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A joyful queer Indian-American romance that earns every laugh and every tear.", tmdbId: null, imdbId: null },
  { title: "We Live in Time", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A love story told out of order — the structure mirrors how we remember the people we love most.", tmdbId: 1100099, imdbId: null },
  { title: "Girls Will Be Girls", year: 2024, type: "movie", language: "hi", tags: ["surprise"], curatorNote: "A bold debut from India about desire, control and a daughter finding herself.", tmdbId: null, imdbId: null },
  { title: "The Beast", year: 2024, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Bertrand Bonello's strange, beautiful obsession film — love across centuries and genres.", tmdbId: null, imdbId: "tt14407336" },
  { title: "Jane Austen Wrecked My Life", year: 2024, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "A Paris-set comedy about a woman who has read too much Austen and not enough reality.", tmdbId: null, imdbId: null },
  { title: "Música", year: 2024, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A Brazilian-American romance with music at its soul and real cultural warmth.", tmdbId: null, imdbId: null },
  { title: "Babygirl", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Nicole Kidman in a scorching power-dynamics thriller about desire and control.", tmdbId: null, imdbId: null },
  { title: "Queer", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Luca Guadagnino adapts Burroughs — a hallucinatory portrait of longing and loneliness.", tmdbId: null, imdbId: null },
  { title: "Anora", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Sean Baker's Palme d'Or winner — a whirlwind romance that becomes something far more complicated.", tmdbId: 1064213, imdbId: null },
  { title: "Between the Temples", year: 2024, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A Jewish grief-comedy about a cantor and an unexpected late-life romance.", tmdbId: 1125073, imdbId: null },
  { title: "Banel & Adama", year: 2024, type: "movie", language: "fr", tags: ["critics"], curatorNote: "A Senegalese love story of fierce will and tragic consequence — a stunning debut.", tmdbId: 995806, imdbId: null },
  { title: "Skywalkers: A Love Story", year: 2024, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Two extreme skywalkers fall in love at dizzying heights — a documentary romance with real vertigo.", tmdbId: 1214488, imdbId: null },
  { title: "The Dead Don't Hurt", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Viggo Mortensen's Western love story — austere, beautiful and genuinely moving.", tmdbId: 1032425, imdbId: null },
  { title: "Coup de Chance", year: 2024, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Woody Allen's French-language return — a Paris romantic thriller with the old wit intact.", tmdbId: null, imdbId: null },
  { title: "Poor Things", year: 2024, type: "movie", language: "en", tags: ["critics"], curatorNote: "Lanthimos's wild, grotesque and strangely tender coming-of-age love story.", tmdbId: 792307, imdbId: null },

  // ── 2023 titles ──────────────────────────────────────────────────────────────
  { title: "Past Lives", year: 2023, type: "movie", language: "ko", tags: ["critics"], curatorNote: "A masterpiece of restrained feeling — two childhood sweethearts across 24 years.", tmdbId: 666277, imdbId: null },
  { title: "Rye Lane", year: 2023, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A dazzlingly funny London love story — one of the best rom-coms in years.", tmdbId: 1049638, imdbId: null },
  { title: "Fallen Leaves", year: 2023, type: "movie", language: "fi", tags: ["critics"], curatorNote: "Aki Kaurismäki's driest, sweetest love story — two lonely people in Helsinki.", tmdbId: 1196893, imdbId: null },
  { title: "The Taste of Things", year: 2023, type: "movie", language: "fr", tags: ["critics"], curatorNote: "A love story told through cooking — Juliette Binoche and Benoît Magimel, luminous.", tmdbId: 964960, imdbId: null },
  { title: "All of Us Strangers", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "Andrew Haigh's devastating queer ghost story about love, grief and the parents we never said goodbye to.", tmdbId: 994108, imdbId: null },
  { title: "May December", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "Todd Haynes's unsettling, brilliant film about a woman whose teenage love scandal became tabloid history.", tmdbId: 839369, imdbId: null },
  { title: "Flora and Son", year: 2023, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A single mum, a guitar and an online music teacher — John Carney doing what he does best.", tmdbId: null, imdbId: "tt25471950" },
  { title: "Maestro", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "Bradley Cooper's portrait of Leonard Bernstein and Felicia Montealegre — love, ambition, and sacrifice.", tmdbId: 802538, imdbId: null },
  { title: "Priscilla", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "Sofia Coppola reclaims the Elvis story from Priscilla's point of view — intimate, unsettling and beautiful.", tmdbId: 1020006, imdbId: null },

  // ── 2022 titles ──────────────────────────────────────────────────────────────
  { title: "Decision to Leave", year: 2022, type: "movie", language: "ko", tags: ["critics"], curatorNote: "Park Chan-wook's intoxicating detective noir — a love story that dissolves into obsession.", tmdbId: 882598, imdbId: null },
  { title: "Bones and All", year: 2022, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A cannibal road romance — genuinely tender, genuinely strange, genuinely moving.", tmdbId: 791177, imdbId: null },
  { title: "Lady Chatterley's Lover", year: 2022, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A sumptuous, sensual adaptation — the most romantic version of Lawrence's novel yet.", tmdbId: null, imdbId: null },

  // ── 2021 titles ──────────────────────────────────────────────────────────────
  { title: "Wheel of Fortune and Fantasy", year: 2021, type: "movie", language: "ja", tags: ["surprise"], curatorNote: "Three short films about coincidence, desire and the wrong moment — Ryūsuke Hamaguchi at his most intimate.", tmdbId: 834975, imdbId: null },
  { title: "Ali & Ava", year: 2021, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A Bradford love story between a British-Pakistani DJ and an Irish schoolteacher — tender and real.", tmdbId: null, imdbId: null },
  { title: "The Power of the Dog", year: 2021, type: "movie", language: "en", tags: ["critics"], curatorNote: "Jane Campion's Western masterpiece — a slow-burn story of power, repression and unexpected love.", tmdbId: 588228, imdbId: null },

  // ── 2020 titles ──────────────────────────────────────────────────────────────
  { title: "The Photograph", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A present-day love story intertwined with a mystery about a mother's hidden past.", tmdbId: null, imdbId: null },
  { title: "Sylvie's Love", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A lush, old-fashioned romance set in 1950s Harlem — deeply felt and beautifully shot.", tmdbId: null, imdbId: null },
  { title: "The World to Come", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A queer frontier love story told through journal entries — austere and achingly tender.", tmdbId: null, imdbId: null },
  { title: "Supernova", year: 2020, type: "movie", language: "en", tags: ["critics"], curatorNote: "Colin Firth and Stanley Tucci on a final road trip together — quietly devastating.", tmdbId: null, imdbId: null },
  { title: "Palm Springs", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A time-loop rom-com that uses its premise to say something genuinely true about love.", tmdbId: 618344, imdbId: null },
  { title: "EMMA.", year: 2020, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Autumn de Wilde's sharp, witty and visually gorgeous take on Austen's most self-satisfied heroine.", tmdbId: 564469, imdbId: null },

  // ── 2019 titles ──────────────────────────────────────────────────────────────
  { title: "Portrait of a Lady on Fire", year: 2019, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Céline Sciamma's masterwork — a painter and her subject, and the most electric gaze in cinema.", tmdbId: 531428, imdbId: null },
  { title: "Atlantics", year: 2019, type: "movie", language: "fr", tags: ["critics"], curatorNote: "A Senegalese ghost love story — haunting, gorgeous and unlike anything else.", tmdbId: 617903, imdbId: null },

  // ── 2018 titles ──────────────────────────────────────────────────────────────
  { title: "A Star Is Born", year: 2018, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The most emotionally devastating of the four versions — Cooper and Gaga are extraordinary.", tmdbId: 332562, imdbId: null },
  { title: "Cold War", year: 2018, type: "movie", language: "pl", tags: ["critics"], curatorNote: "Pawlikowski's black-and-white epic about two people who can't live with or without each other.", tmdbId: 486583, imdbId: null },

  // ── 2017 titles ──────────────────────────────────────────────────────────────
  { title: "The Shape of Water", year: 2017, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Del Toro's fairy tale about a mute cleaner who falls in love with a creature — strangely, deeply romantic.", tmdbId: 399055, imdbId: null },
  { title: "Call Me by Your Name", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "A golden Italian summer, two young men, and a love story that never quite ends.", tmdbId: 398818, imdbId: null },
  { title: "Disobedience", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "A woman returns to her Orthodox Jewish community — and to the woman she once loved.", tmdbId: 445906, imdbId: null },
  { title: "Phantom Thread", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "PTA's portrait of a designer and his muse — one of cinema's most peculiar and perfect love stories.", tmdbId: 400617, imdbId: null },
  { title: "Your Name", year: 2017, type: "movie", language: "ja", tags: ["crowd"], curatorNote: "Makoto Shinkai's stunning anime about two teenagers who swap bodies — and fall in love across time.", tmdbId: 372058, imdbId: null },

  // ── 2016 titles ──────────────────────────────────────────────────────────────
  { title: "The Handmaiden", year: 2016, type: "movie", language: "ko", tags: ["critics"], curatorNote: "Park Chan-wook's gorgeous, twisty tale of deception and desire in colonial Korea.", tmdbId: 268490, imdbId: null },
  { title: "Moonlight", year: 2016, type: "movie", language: "en", tags: ["critics"], curatorNote: "Barry Jenkins's triptych of a life — tenderness, hardness and the love that shapes us.", tmdbId: 376867, imdbId: null },
  { title: "La La Land", year: 2016, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Damien Chazelle's LA musical — a love letter to dreamers and the bittersweet cost of ambition.", tmdbId: 313369, imdbId: null },

  // ── 2015 titles ──────────────────────────────────────────────────────────────
  { title: "Carol", year: 2015, type: "movie", language: "en", tags: ["critics"], curatorNote: "Todd Haynes's immaculate 1950s queer love story — Blanchett and Mara, unforgettable.", tmdbId: 258480, imdbId: null },
  { title: "45 Years", year: 2015, type: "movie", language: "en", tags: ["critics"], curatorNote: "A revelation arrives a week before a 45th anniversary — and quietly dismantles a marriage.", tmdbId: 296602, imdbId: null },
  { title: "Brooklyn", year: 2015, type: "movie", language: "en", tags: ["crowd"], curatorNote: "An Irish girl in 1950s New York and the question of where — and who — you belong to.", tmdbId: 264644, imdbId: null },
  { title: "The Lobster", year: 2015, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Yorgos Lanthimos's dystopian satire where single people must find a partner or become an animal.", tmdbId: 254691, imdbId: null },

  // ── 2014 titles ──────────────────────────────────────────────────────────────
  { title: "Gloria", year: 2014, type: "movie", language: "es", tags: ["crowd"], curatorNote: "A Chilean 58-year-old finds love and herself — Paulina García is a revelation.", tmdbId: 214756, imdbId: null },

  // ── 2013 titles ──────────────────────────────────────────────────────────────
  { title: "Her", year: 2013, type: "movie", language: "en", tags: ["critics"], curatorNote: "Spike Jonze's near-future romance about a man who falls in love with his OS — genuinely devastating.", tmdbId: 152601, imdbId: null },
  { title: "The Lunchbox", year: 2013, type: "movie", language: "hi", tags: ["crowd"], curatorNote: "A Mumbai widow and a retiring office worker exchange letters through a misdirected tiffin box.", tmdbId: 196769, imdbId: null },
  { title: "Blue Is the Warmest Color", year: 2013, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Palme d'Or winner — an overwhelming, immersive portrait of first love and heartbreak.", tmdbId: 130993, imdbId: null },
  { title: "Before Midnight", year: 2013, type: "movie", language: "en", tags: ["critics"], curatorNote: "The trilogy's devastating conclusion — Jesse and Céline nine years on, fighting for what they built.", tmdbId: 142186, imdbId: null },

  // ── 2012 titles ──────────────────────────────────────────────────────────────
  { title: "Amour", year: 2012, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Michael Haneke's unbearable and beautiful portrait of an aging couple facing the end together.", tmdbId: 75439, imdbId: null },
  { title: "Rust and Bone", year: 2012, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Marion Cotillard and Matthias Schoenaerts — a fierce, physical love story from Jacques Audiard.", tmdbId: 83823, imdbId: null },
  { title: "The Perks of Being a Wallflower", year: 2012, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A shy teenager finds love and belonging — one of the great YA romance films.", tmdbId: 84892, imdbId: null },

  // ── 2011 titles ──────────────────────────────────────────────────────────────
  { title: "A Separation", year: 2011, type: "movie", language: "fa", tags: ["critics"], curatorNote: "Farhadi's Palme d'Or winner — a marriage dissolving under legal and moral pressure.", tmdbId: 60243, imdbId: null },
  { title: "Weekend", year: 2011, type: "movie", language: "en", tags: ["critics"], curatorNote: "Two men meet at a club on Friday — Andrew Haigh's intimate queer love story over 48 hours.", tmdbId: 88794, imdbId: null },
  { title: "The Artist", year: 2011, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "A silent-film star and a rising actress — a charming, old-fashioned Hollywood love story.", tmdbId: 64685, imdbId: null },

  // ── 2010 titles ──────────────────────────────────────────────────────────────
  { title: "Never Let Me Go", year: 2010, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Carey Mulligan, Andrew Garfield and Keira Knightley in a devastating sci-fi love triangle.", tmdbId: 44773, imdbId: null },
  { title: "Certified Copy", year: 2010, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Kiarostami's puzzle — are they strangers or a married couple? Either way, it breaks your heart.", tmdbId: 48791, imdbId: null },
  { title: "Blue Valentine", year: 2010, type: "movie", language: "en", tags: ["critics"], curatorNote: "A marriage at its beginning and its end, intercut — Ryan Gosling and Michelle Williams are extraordinary.", tmdbId: 45272, imdbId: null },

  // ── 2009 titles ──────────────────────────────────────────────────────────────
  { title: "Bright Star", year: 2009, type: "movie", language: "en", tags: ["critics"], curatorNote: "Jane Campion's portrait of Keats and Fanny Brawne — heartbreakingly beautiful.", tmdbId: 23279, imdbId: null },
  { title: "The Secret in Their Eyes", year: 2009, type: "movie", language: "es", tags: ["critics"], curatorNote: "An Argentine crime thriller with a decades-spanning love story buried inside it.", tmdbId: 20620, imdbId: null },

  // ── 2007 titles ──────────────────────────────────────────────────────────────
  { title: "Atonement", year: 2007, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Joe Wright's wartime romance — a lie, a lifetime of guilt, and a love that never recovered.", tmdbId: 4550, imdbId: null },
  { title: "Jab We Met", year: 2007, type: "movie", language: "hi", tags: ["surprise"], curatorNote: "Bollywood's most sparkling rom-com — Kareena Kapoor is pure joy in every frame.", tmdbId: 19325, imdbId: null },
  { title: "Once", year: 2007, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A Dublin busker and a Czech immigrant make music and almost make love — achingly real.", tmdbId: 12230, imdbId: null },

  // ── 2005 titles ──────────────────────────────────────────────────────────────
  { title: "Pride & Prejudice", year: 2005, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Joe Wright's rain-soaked adaptation — the hand flex scene alone is worth it.", tmdbId: 4348, imdbId: null },
  { title: "Brokeback Mountain", year: 2005, type: "movie", language: "en", tags: ["critics"], curatorNote: "Ang Lee's devastating epic — two cowboys, a mountain, and a love that outlasts everything.", tmdbId: 142, imdbId: null },

  // ── 2004 titles ──────────────────────────────────────────────────────────────
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, type: "movie", language: "en", tags: ["critics"], curatorNote: "What would you erase? Kaufman and Gondry's heartbreaking sci-fi romance.", tmdbId: 38365, imdbId: null },
  { title: "The Notebook", year: 2004, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Ryan Gosling in the rain. You know.", tmdbId: 11036, imdbId: null },
  { title: "2046", year: 2004, type: "movie", language: "zh", tags: ["critics"], curatorNote: "Wong Kar-wai's melancholy companion to In the Mood for Love — memory, longing and departure.", tmdbId: 10531, imdbId: null },
  { title: "Before Sunset", year: 2004, type: "movie", language: "en", tags: ["critics"], curatorNote: "Nine years later, Jesse and Céline meet again in Paris — 80 minutes of pure romantic tension.", tmdbId: 14372, imdbId: null },

  // ── 2002 titles ──────────────────────────────────────────────────────────────
  { title: "About a Boy", year: 2002, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Hugh Grant's finest hour — a selfish bachelor humanized by an unlikely friendship.", tmdbId: 5767, imdbId: null },
  { title: "Talk to Her", year: 2002, type: "movie", language: "es", tags: ["surprise"], curatorNote: "Almodóvar at his most empathetic — two men watch over two women in comas, and love in the strangest ways.", tmdbId: 763, imdbId: null },
  { title: "Secretary", year: 2002, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A quirkily tender BDSM love story — Maggie Gyllenhaal and James Spader, perfectly matched.", tmdbId: 12200, imdbId: null },

  // ── 2001 titles ──────────────────────────────────────────────────────────────
  { title: "Moulin Rouge!", year: 2001, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Baz Luhrmann's dazzling, heartbreaking musical — love in the most beautiful and doomed place.", tmdbId: 1606, imdbId: null },
  { title: "Amélie", year: 2001, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Audrey Tautou's iconic dreamer arranges love for everyone else — then risks it herself.", tmdbId: 194, imdbId: null },
  { title: "Monsoon Wedding", year: 2001, type: "movie", language: "hi", tags: ["critics"], curatorNote: "Mira Nair's joyful, layered portrait of a Delhi wedding — tradition, desire and honesty colliding.", tmdbId: 9918, imdbId: null },
  { title: "Y Tu Mamá También", year: 2001, type: "movie", language: "es", tags: ["critics"], curatorNote: "Cuarón's road movie — two boys, one woman, and the summer that changes everything.", tmdbId: 9619, imdbId: null },

  // ── 2000 titles ──────────────────────────────────────────────────────────────
  { title: "In the Mood for Love", year: 2000, type: "movie", language: "zh", tags: ["critics"], curatorNote: "Wong Kar-wai's defining work — two neighbors suspect their spouses are having an affair and fall in love themselves.", tmdbId: 843, imdbId: null },
  { title: "Crouching Tiger, Hidden Dragon", year: 2000, type: "movie", language: "zh", tags: ["crowd"], curatorNote: "Ang Lee's martial arts epic — desire, duty and a love that transcends both.", tmdbId: 1586, imdbId: null },
  { title: "Malèna", year: 2000, type: "movie", language: "it", tags: ["surprise"], curatorNote: "Tornatore's wartime coming-of-age — obsession, beauty and the cruelty of a small town.", tmdbId: 11900, imdbId: null },

  // ── 1999 titles ──────────────────────────────────────────────────────────────
  { title: "Notting Hill", year: 1999, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A bookshop owner and the most famous actress in the world — still the gold standard of wish-fulfillment romance.", tmdbId: 1833, imdbId: null },

  // ── 1998 titles ──────────────────────────────────────────────────────────────
  { title: "Out of Sight", year: 1998, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Soderbergh's coolest film — George Clooney and Jennifer Lopez in the most effortlessly sexy rom-crime ever made.", tmdbId: 1610, imdbId: null },
  { title: "The Red Violin", year: 1998, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "A violin passes through centuries of love, obsession and loss — Samuel L. Jackson ties it all together.", tmdbId: 10003, imdbId: null },
  { title: "The Remains of the Day", year: 1993, type: "movie", language: "en", tags: ["critics"], curatorNote: "Anthony Hopkins and Emma Thompson and the love that a man too repressed to admit — one of cinema's great regrets.", tmdbId: 8831, imdbId: null },

  // ── 1997 titles ──────────────────────────────────────────────────────────────
  { title: "Titanic", year: 1997, type: "movie", language: "en", tags: ["crowd"], curatorNote: "James Cameron's epic — three hours of spectacle built around a love story that still works.", tmdbId: 597, imdbId: null },
  { title: "Happy Together", year: 1997, type: "movie", language: "zh", tags: ["critics"], curatorNote: "Wong Kar-wai's most painful film — two Hong Kongers in Buenos Aires, trapped in a love they can't escape.", tmdbId: 11062, imdbId: null },

  // ── 1996 titles ──────────────────────────────────────────────────────────────
  { title: "Breaking the Waves", year: 1996, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Von Trier's devastating tale of devotion — Emily Watson in her most remarkable performance.", tmdbId: 3060, imdbId: null },

  // ── 1995 titles ──────────────────────────────────────────────────────────────
  { title: "Before Sunrise", year: 1995, type: "movie", language: "en", tags: ["critics"], curatorNote: "Jesse and Céline walk Vienna for one night — Linklater's perfect first chapter.", tmdbId: 11977, imdbId: null },
  { title: "The Bridges of Madison County", year: 1995, type: "movie", language: "en", tags: ["critics"], curatorNote: "Clint Eastwood and Meryl Streep — four days, a lifetime of feeling, and the hardest choice.", tmdbId: 9533, imdbId: null },
  { title: "Sense and Sensibility", year: 1995, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Emma Thompson's Elinor, Kate Winslet's Marianne — the definitive Austen adaptation.", tmdbId: 4584, imdbId: null },
  { title: "Persuasion", year: 1995, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Anne Elliot and Captain Wentworth's second chance — the most romantic letter in all of literature.", tmdbId: 11356, imdbId: null },

  // ── 1994 titles ──────────────────────────────────────────────────────────────
  { title: "Chungking Express", year: 1994, type: "movie", language: "zh", tags: ["critics"], curatorNote: "Two lonely Hong Kong cops, two love stories — Wong Kar-wai's breezy, melancholy masterpiece.", tmdbId: 11102, imdbId: null },
  { title: "Four Weddings and a Funeral", year: 1994, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Hugh Grant perfects his persona — the definitive British rom-com.", tmdbId: 5172, imdbId: null },
  { title: "Forrest Gump", year: 1994, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A love story told across thirty years of American history — Zemeckis at his most emotionally relentless.", tmdbId: 13, imdbId: null },
  { title: "True Romance", year: 1993, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Tarantino's most purely romantic script — a comic-book obsessive and a call girl on a bloody road trip.", tmdbId: 3164, imdbId: null },

  // ── 1993 titles ──────────────────────────────────────────────────────────────
  { title: "Three Colors: Blue", year: 1993, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Kieślowski's portrait of grief and love — Juliette Binoche trying to feel nothing, failing.", tmdbId: 11098, imdbId: null },
  { title: "Farewell My Concubine", year: 1993, type: "movie", language: "zh", tags: ["critics"], curatorNote: "Chen Kaige's epic of two Peking Opera singers across fifty years of Chinese history.", tmdbId: 11839, imdbId: null },
  { title: "The Piano", year: 1993, type: "movie", language: "en", tags: ["critics"], curatorNote: "Jane Campion's Palme d'Or winner — a mute woman and her piano, desire and the cost of passion.", tmdbId: 10018, imdbId: null },

  // ── 1992 titles ──────────────────────────────────────────────────────────────
  { title: "The Bodyguard", year: 1992, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Kevin Costner and Whitney Houston — the soundtrack alone earns its place in the canon.", tmdbId: 14308, imdbId: null },
  { title: "Howards End", year: 1992, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Merchant Ivory's masterpiece — class, love and the question of who inherits what.", tmdbId: 10760, imdbId: null },

  // ── 1991 titles ──────────────────────────────────────────────────────────────
  { title: "Mississippi Masala", year: 1991, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Mira Nair's romance between a Ugandan-Indian woman and an African-American man in the American South.", tmdbId: 14754, imdbId: null },
  { title: "The Lovers on the Bridge", year: 1991, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Leos Carax's beautiful disaster — two drifters on the Pont Neuf, a love story as wild as its production.", tmdbId: 11517, imdbId: null },
  { title: "The Double Life of Véronique", year: 1991, type: "movie", language: "fr", tags: ["surprise"], curatorNote: "Kieślowski's mysterious diptych — two women who share a soul across two countries.", tmdbId: 11216, imdbId: null },

  // ── 1990 titles ──────────────────────────────────────────────────────────────
  { title: "Ghost", year: 1990, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The pottery scene. That song. Demi Moore and Patrick Swayze in the defining supernatural romance.", tmdbId: 3062, imdbId: null },
  { title: "Pretty Woman", year: 1990, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A fairy tale in modern dress — still irresistible after all these years.", tmdbId: 114, imdbId: null },
  { title: "Edward Scissorhands", year: 1990, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Tim Burton's most tender film — a boy with scissors for hands who can't hold the girl he loves.", tmdbId: 826, imdbId: null },
  { title: "Truly Madly Deeply", year: 1990, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Anthony Minghella's ghost love story — a woman who can't let go and the husband who comes back.", tmdbId: 41714, imdbId: null },

  // ── 1989 titles ──────────────────────────────────────────────────────────────
  { title: "When Harry Met Sally...", year: 1989, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Nora Ephron's definitive can-men-and-women-be-friends film — the answer is, eventually, yes.", tmdbId: 11834, imdbId: null },
  { title: "Say Anything...", year: 1989, type: "movie", language: "en", tags: ["crowd"], curatorNote: "John Cusack with a boombox. Cameron Crowe's high-school romance that transcends the genre.", tmdbId: 9922, imdbId: null },

  // ── 1988 titles ──────────────────────────────────────────────────────────────
  { title: "The Unbearable Lightness of Being", year: 1988, type: "movie", language: "en", tags: ["critics"], curatorNote: "Philip Kaufman's adaptation of Kundera — Prague, desire, and the weight of freedom.", tmdbId: 10644, imdbId: null },

  // ── 1987 titles ──────────────────────────────────────────────────────────────
  { title: "Dirty Dancing", year: 1987, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Nobody puts Baby in a corner. The lift. The summer. Patrick Swayze.", tmdbId: 4823, imdbId: null },
  { title: "Wings of Desire", year: 1987, type: "movie", language: "de", tags: ["critics"], curatorNote: "Wim Wenders's angel watching over Berlin — and the woman who makes him want to become human.", tmdbId: 1811, imdbId: null },

  // ── 1986 titles ──────────────────────────────────────────────────────────────
  { title: "Sid and Nancy", year: 1986, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Alex Cox's portrait of the Sex Pistols bassist and his girlfriend — the punk love story, ugly and beautiful.", tmdbId: 14924, imdbId: null },

  // ── 1985 titles ──────────────────────────────────────────────────────────────
  { title: "A Room with a View", year: 1985, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Helena Bonham Carter in Florence — Merchant Ivory at their most sunlit and romantic.", tmdbId: 11534, imdbId: null },

  // ── 1982 titles ──────────────────────────────────────────────────────────────
  { title: "An Officer and a Gentleman", year: 1982, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Richard Gere in dress whites carrying Debra Winger out of the factory — an icon for a reason.", tmdbId: 9441, imdbId: null },

  // ── 1981 titles ──────────────────────────────────────────────────────────────
  { title: "Reds", year: 1981, type: "movie", language: "en", tags: ["critics"], curatorNote: "Warren Beatty's epic about radical journalist John Reed and Louise Bryant — politics and passion in revolution.", tmdbId: 10929, imdbId: null },

  // ── PRE-1980 (CLASSIC sub-pool) ───────────────────────────────────────────────
  { title: "Brief Encounter", year: 1945, type: "movie", language: "en", tags: ["critics"], curatorNote: "David Lean's masterpiece of repression — a married woman, a married doctor, and the love they can't pursue.", tmdbId: 11906, imdbId: null },
  { title: "Roman Holiday", year: 1953, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Audrey Hepburn's debut — a princess steals a day in Rome and falls in love with a journalist.", tmdbId: 3070, imdbId: null },
  { title: "The Umbrellas of Cherbourg", year: 1964, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Demy's sung-through melodrama — every line of dialogue is music, every frame soaked in color.", tmdbId: 10527, imdbId: null },
  { title: "Letter from an Unknown Woman", year: 1948, type: "movie", language: "en", tags: ["critics"], curatorNote: "Max Ophüls's heartbreaking portrait of a woman who loves a man who never truly sees her.", tmdbId: 27598, imdbId: null },
  { title: "The Apartment", year: 1960, type: "movie", language: "en", tags: ["critics"], curatorNote: "Wilder's dark comedy about loneliness and office politics — and a love story hiding inside it.", tmdbId: 850, imdbId: null },
  { title: "An Affair to Remember", year: 1957, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Cary Grant and Deborah Kerr — the transatlantic ship, the Empire State Building, the wait.", tmdbId: 10751, imdbId: null },
  { title: "Sunrise: A Song of Two Humans", year: 1927, type: "movie", language: "en", tags: ["critics"], curatorNote: "Murnau's silent masterwork — a husband tempted to kill his wife finds his way back to love.", tmdbId: 14429, imdbId: null },
  { title: "A Man and a Woman", year: 1966, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Lelouch's Palme d'Or winner — a widow and a widower meet at their children's school and fall in love.", tmdbId: 13590, imdbId: null },
  { title: "Hiroshima mon amour", year: 1959, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Resnais and Duras's revolutionary film — a French actress and a Japanese architect, memory and desire.", tmdbId: 5544, imdbId: null },
  { title: "City Lights", year: 1931, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Chaplin's most moving film — the Tramp loves a blind flower girl who mistakes him for a millionaire.", tmdbId: 4837, imdbId: null },
  { title: "Jules and Jim", year: 1962, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Truffaut's indelible triangle — two friends and the woman they both love, forever in motion.", tmdbId: 7983, imdbId: null },
  { title: "Doctor Zhivago", year: 1965, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Lean's sweeping Russian epic — Lara and Yuri across revolution and war, unforgettable.", tmdbId: 6957, imdbId: null },
  { title: "The Red Shoes", year: 1948, type: "movie", language: "en", tags: ["critics"], curatorNote: "Powell and Pressburger's blazing ballet film — art, love and the impossibility of having both.", tmdbId: 32235, imdbId: null },
  { title: "Gone with the Wind", year: 1939, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Frankly, my dear — the grandest of Hollywood's old epics, with a love story at its stormy heart.", tmdbId: 770, imdbId: null },
  { title: "All That Heaven Allows", year: 1955, type: "movie", language: "en", tags: ["critics"], curatorNote: "Sirk's Technicolor melodrama — a widow who falls for her gardener and the world that won't allow it.", tmdbId: 22020, imdbId: null },
  { title: "West Side Story", year: 1961, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Romeo and Juliet in 1950s New York — the dancing, the music, the impossible love.", tmdbId: 4972, imdbId: null },
  { title: "Singin' in the Rain", year: 1952, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The greatest Hollywood musical — Gene Kelly, a lamppost, a downpour and pure joy.", tmdbId: 872, imdbId: null },
  { title: "The Philadelphia Story", year: 1940, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Hepburn, Grant and Stewart — the wittiest romantic comedy in Hollywood history.", tmdbId: 32099, imdbId: null },
  { title: "Smiles of a Summer Night", year: 1955, type: "movie", language: "sv", tags: ["critics"], curatorNote: "Bergman's only true comedy — a country house, four couples and the midsummer night that sorts them out.", tmdbId: 9878, imdbId: null },
  { title: "The Way We Were", year: 1973, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Streisand and Redford — opposites who can't stay together and can't stay apart.", tmdbId: 15907, imdbId: null },
  { title: "Days of Heaven", year: 1978, type: "movie", language: "en", tags: ["critics"], curatorNote: "Malick's most ravishing film — a love triangle in the Texas wheat fields, shot like a painting.", tmdbId: 19917, imdbId: null },
  { title: "Ninotchka", year: 1939, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Garbo laughs — a Soviet envoy thawed by a charming Parisian count.", tmdbId: 34006, imdbId: null },
  { title: "Notorious", year: 1946, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Hitchcock's most romantic film — Cary Grant and Ingrid Bergman in a spy thriller soaked in desire.", tmdbId: 6546, imdbId: null },
  { title: "The Merry Widow", year: 1925, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Von Stroheim's silent operetta — a rich widow pursued by a prince sent to win back her fortune.", tmdbId: null, imdbId: null },
  { title: "Harold and Maude", year: 1971, type: "movie", language: "en", tags: ["crowd"], curatorNote: "A death-obsessed young man and a 79-year-old woman fall in love — still one of cinema's great originals.", tmdbId: 7984, imdbId: null },
  { title: "Casablanca", year: 1942, type: "movie", language: "en", tags: ["critics"], curatorNote: "Of all the gin joints — the most quotable love story in cinema history.", tmdbId: 289, imdbId: null },
  { title: "Trouble in Paradise", year: 1932, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Lubitsch's jewel thief romance — sophisticated, witty and achingly light.", tmdbId: 43014, imdbId: null },
  { title: "Children of Paradise", year: 1945, type: "movie", language: "fr", tags: ["critics"], curatorNote: "Made under Nazi occupation — a mime, an actor, a thief and the woman they all love.", tmdbId: 12539, imdbId: null },
  { title: "Vertigo", year: 1958, type: "movie", language: "en", tags: ["critics"], curatorNote: "Hitchcock's most unsettling film — a detective's obsession with a woman who may not exist.", tmdbId: 4154, imdbId: null },
  { title: "Annie Hall", year: 1977, type: "movie", language: "en", tags: ["critics"], curatorNote: "Woody Allen's masterpiece — the anatomy of a relationship told backwards, sideways and honestly.", tmdbId: 703, imdbId: null },
  { title: "The Sound of Music", year: 1965, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Julie Andrews and Christopher Plummer — the governess, the children, the Alps and the love story hiding in the musical.", tmdbId: 15121, imdbId: null },
  { title: "Bonnie and Clyde", year: 1967, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Beatty and Dunaway — the New Hollywood's foundational outlaw romance, still electrifying.", tmdbId: 1576, imdbId: null },
  { title: "To Catch a Thief", year: 1955, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Hitchcock and the Riviera — Cary Grant and Grace Kelly in the most glamorous romance he ever made.", tmdbId: 8337, imdbId: null },
  { title: "A Star Is Born", year: 1954, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Judy Garland's definitive performance — a star rising as the man who made her falls.", tmdbId: 22025, imdbId: null },
];
