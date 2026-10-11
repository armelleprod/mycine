// src/data/dramaBatches.js
// Flat pool — individual entries, no pre-grouping.
// assembleBatchFromPool() in assemblePool.js assembles 7 entries dynamically at request time.
//
// Entry fields:
//   title       — string
//   year        — number
//   type        — "movie"
//   language    — ISO 639-1 code ("en", "fr", "ja", "ko", "pt", "de", "it", "zh", "ar", "fa", "ro", "no", "ru", "es")
//   tags        — array: any of "critics", "crowd", "surprise"
//   curatorNote — string (shown to user)
//
// Slot eligibility at assembly time:
//   🎞️ Classic        → year < 2000
//   🌍 Passport       → language !== "en"
//   🏆 Critics        → tags includes "critics"
//   ❤️ Crowd Favorite → tags includes "crowd"
//   ✨ Surprise       → tags includes "surprise"
//   🍿 Tonight's Pick → year >= current year (2 slots)

export const DRAMA_EDITORIAL_BATCHES = [

  // ── 2026 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Odyssey",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Christopher Nolan's long-awaited Homer adaptation — a three-hour voyage across ancient seas and modern spectacle that restored epic cinema to its mythic scale."
  },
  {
    title: "The Dog Stars",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Peter Heller's post-apocalyptic novel comes to life as a quiet, devastating portrait of a man clinging to beauty — flying, a dog, the memory of music — after a plague empties the world."
  },
  {
    title: "Paper Tiger",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A taut political drama set inside the corridors of a failing newspaper, where the last investigative reporter must decide what truth is worth sacrificing everything for."
  },
  {
    title: "Low Expectations",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "A sharply observed family drama about a grown daughter returning home and slowly dismantling the comfortable myths her parents built their lives around."
  },
  {
    title: "The Uprising",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Based on the 1921 Battle of Blair Mountain, the largest armed labor uprising in American history — a sweeping drama about dignity, solidarity and the cost of standing up."
  },
  {
    title: "In the Hand of Dante",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Nick Tosches' fever-dream novel becomes a mesmerizing film that braids Dante's own voice in medieval Florence with a modern criminal plot to steal his original manuscript."
  },
  {
    title: "Elsinore",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A radical reimagining of Hamlet set in contemporary Copenhagen, stripping Shakespeare's language to expose the raw machinery of grief, power and complicity underneath."
  },
  {
    title: "Possible Love",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Two strangers meet repeatedly across different cities and different years — a fragmented love story that asks whether connection across distance and time can ever truly be sustained."
  },
  {
    title: "My Brilliant Career",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "A bold new adaptation of Miles Franklin's Australian feminist classic, following a young woman in the 1890s who chooses her own ambition over every conventional expectation placed on her."
  },
  {
    title: "The Shards",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Bret Easton Ellis's semi-autobiographical thriller becomes a hypnotic film — a teenager in 1981 Los Angeles senses something very wrong, and nobody around him wants to believe it."
  },

  {
    title: "The Drama",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Kristoffer Borgli's provocateur follow-up to Dream Scenario — Zendaya and Pattinson in career-highlight performances as a couple whose wedding week unravels after one unexpected turn. Stylish, unsettling and hard to shake."
  },
  {
    title: "The Invite",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Olivia Wilde's dinner-party comedy-drama — Seth Rogen, Penélope Cruz and Edward Norton as neighbours whose evening together slowly dismantles more than one marriage. Sharp, warm and unexpectedly moving."
  },

  // ── Cannes 2026 & festival laureates ──────────────────────────────────────

  {
    title: "Fjord",
    year: 2026,
    type: "movie",
    language: "ro",
    tags: ["critics"],
    curatorNote: "Cristian Mungiu's Palme d'Or winner — Sebastian Stan and Renate Reinsve as an evangelical Romanian couple in Norway whose faith is tested when they're accused of abusing their child. Harrowing, compassionate and impossible to leave behind."
  },
  {
    title: "Minotaur",
    year: 2026,
    type: "movie",
    language: "ru",
    tags: ["critics", "surprise"],
    curatorNote: "Andrey Zvyagintsev's Grand Prix winner at Cannes — a remake of Chabrol's La Femme Infidèle reset in Russia during the Ukraine war, where adultery and murder unspool with devastating moral clarity against a country consuming itself."
  },
  {
    title: "Ben'Imana",
    year: 2026,
    type: "movie",
    language: "rw",
    tags: ["critics", "surprise"],
    curatorNote: "Marie-Clémentine Dusabejambo's Caméra d'Or winner — set in Rwanda twenty years after the genocide, a woman and the man who killed her family are brought together by a reconciliation programme. The year's most quietly devastating debut."
  },
  {
    title: "Blue Heron",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Sophy Romvari's film — a Hungarian family on Vancouver Island in the 1990s, seen through the youngest child's VHS camcorder as her eldest brother's dangerous behavior escalates. Memory, family silence and the cost of not knowing what you saw."
  },
  {
    title: "Pillion",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Harry Lighton's British debut — Harry Melling as a young man who becomes the pillion passenger of Alexander Skarsgård's leather-clad biker, and the queer love story that follows. Tender, erotic and quietly revolutionary."
  },
  {
    title: "Josephine",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["crowd", "critics"],
    curatorNote: "Beth de Araújo's Sundance Grand Jury and Audience Prize winner — Channing Tatum in his most surprising performance as a man rebuilding his life alongside a woman (played by de Araújo) who refuses to be anyone's salvation."
  },

  // ── New 2026 additions ────────────────────────────────────────────────────

  {
    title: "The Samurai and the Prisoner",
    year: 2026,
    type: "movie",
    language: "ja",
    tags: ["critics", "surprise"],
    curatorNote: "Kiyoshi Kurosawa's samurai film — a feudal lord who rebels against a tyrannical warlord finds himself besieged in his own castle, the film folding medieval honor into the director's signature dread. Kurosawa at his most unexpected."
  },
  {
    title: "Is God Is",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Aleshea Harris's play becomes a visceral film — twin sisters are summoned by the mother they thought was dead and sent on a revenge quest that dismantles everything they thought they knew about family and survival."
  },
  {
    title: "Miroirs No. 3",
    year: 2026,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Christian Petzold's film — a reclusive woman, a house by a lake, and a stranger who arrives with unclear intentions. Elliptical, sensory and quietly devastating, as all Petzold's films are."
  },
  {
    title: "Silent Friend",
    year: 2026,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Ildikó Enyedi's German-Hungarian co-production — an aging man forms an unlikely bond with a much younger woman that confounds everyone around them. The Hungarian director of On Body and Soul at her most intimate."
  },
  {
    title: "The Wizard of the Kremlin",
    year: 2026,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Based on Giuliano da Empoli's novel — a former Kremlin spin doctor tells the story of how he helped build the machinery of a modern authoritarian state. A political thriller about the manufacture of power and the men who service it."
  },
  {
    title: "All of a Sudden",
    year: 2026,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Ryûsuke Hamaguchi's French-language film — a care-facility director attempts to center the humanity of residents against institutional indifference. Quiet, precise and profoundly moving, as everything Hamaguchi makes is."
  },
  {
    title: "Fatherland",
    year: 2026,
    type: "movie",
    language: "pl",
    tags: ["critics"],
    curatorNote: "Pawel Pawlikowski's return — Sandra Hüller as a celebrated actress confronting the Nobel Prize-winning father she barely knows. A film about art, inheritance and the damage that passes between generations in silence."
  },
  {
    title: "Dead Man's Wire",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A spare, devastating drama about a wrongfully convicted man's final days on death row — and the journalist who arrives too late to save him, but not too late to bear witness."
  },
  {
    title: "I Swear",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "A prosecutor and a defense attorney fall apart and back together across three trials spanning fifteen years — a love story told entirely through courtrooms and the silences between verdicts."
  },
  {
    title: "Don't Say Good Luck",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "A mother and her adult son spend one last week together before his deployment — a luminous chamber drama about everything two people manage to say, and everything they cannot."
  },
  {
    title: "Rental Family",
    year: 2026,
    type: "movie",
    language: "ja",
    tags: ["critics", "surprise"],
    curatorNote: "Based on Japan's real 'family rental' industry — actors hired to play missing relatives — a quietly devastating drama about loneliness, performance and the hunger to be known."
  },
  {
    title: "Remarkably Bright Creatures",
    year: 2026,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Shelby Van Pelt's beloved novel becomes a warm, unexpectedly moving film — narrated in part by a giant Pacific octopus — about grief, connection and the unlikely ways we find each other."
  },

  // ── 2025 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "No Other Choice",
    year: 2025,
    type: "movie",
    language: "ko",
    tags: ["critics"],
    curatorNote: "Park Chan-wook's Venice competition film — a Korean woman in an untenable situation is forced to make a choice that has no good answer. Precise, morally exacting, and visually immaculate as all his work."
  },
  {
    title: "Eddington",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Ari Aster's most American film yet — Joaquin Phoenix as a small-town New Mexico sheriff during the pandemic, as political paranoia and community collapse converge into something you couldn't have predicted. Unsettling and brilliant."
  },
  {
    title: "It Was Just an Accident",
    year: 2025,
    type: "movie",
    language: "fa",
    tags: ["critics"],
    curatorNote: "Jafar Panahi's latest — made while the Iranian director was under a travel ban, about an ordinary accident that spirals into a confrontation with guilt and complicity. Made with his customary courage and moral intelligence."
  },
  {
    title: "Sirât",
    year: 2025,
    type: "movie",
    language: "es",
    tags: ["critics", "surprise"],
    curatorNote: "Oliver Laxe's visionary Spanish drama — pilgrims in a brutal landscape, a film that pushes against narrative to find something closer to pure sensory experience of faith and endurance. #4 on Sight & Sound's 2025 list."
  },
  {
    title: "Souleymane's Story",
    year: 2025,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Boris Lojkine's film — a Guinean delivery cyclist in Paris prepares for his asylum interview while racing through the city on his bike. Told in near-real time, in a performance of extraordinary physical and emotional precision."
  },
  {
    title: "The Shrouds",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "David Cronenberg's most personal film — a widower builds cameras inside his wife's grave so he can watch her decompose. Vincent Cassel in a portrait of grief so strange and so true it becomes unbearable. Body horror as love story."
  },
  {
    title: "Black Bag",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Steven Soderbergh's sleek espionage drama — Cate Blanchett and Michael Fassbender as married intelligence agents, one of whom may be a traitor. A thriller about trust that plays like a marriage at gunpoint."
  },
  {
    title: "Nouvelle Vague",
    year: 2025,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Richard Linklater's film about Godard making Breathless in 1959 Paris — a love letter to the French New Wave that is also a film about what it costs to break with everything that came before. Shot in luminous black and white."
  },
  {
    title: "The Love That Remains",
    year: 2025,
    type: "movie",
    language: "is",
    tags: ["critics"],
    curatorNote: "Hlynur Pálmason's Icelandic film — a family across generations, grief accumulating across time like sediment. Austere and devastating, with the landscape doing what words cannot."
  },
  {
    title: "April",
    year: 2025,
    type: "movie",
    language: "ka",
    tags: ["critics"],
    curatorNote: "Dea Kulumbegashvili's Georgian drama — a doctor who performs illegal abortions in a rural community where women have no other choice. Unflinching, formally radical, and morally necessary."
  },
  {
    title: "Misericordia",
    year: 2025,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Alain Guiraudie's French drama — a man returns to his hometown after his father's death and is drawn into an entanglement of desire, guilt and a local priest. Strange, funny and genuinely unsettling."
  },
  {
    title: "Kontinental '25",
    year: 2025,
    type: "movie",
    language: "ro",
    tags: ["critics", "surprise"],
    curatorNote: "Radu Jude's latest provocation — a darkly comic collage about Romanian society, media and political hypocrisy, assembled from found footage, reenactments and satirical interviews. Brilliant and infuriating in equal measure."
  },
  {
    title: "Sound of Falling",
    year: 2025,
    type: "movie",
    language: "de",
    tags: ["critics"],
    curatorNote: "Mascha Schilinski's German drama — four girls on the same farm across different decades, time folding between them. A film about inherited grief, land and the way the past never fully releases the living."
  },
  {
    title: "My Father's Shadow",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Akinola Davies Jr.'s debut — a British-Nigerian boy and his father in 1990s Lagos, a single day unfolding as the country holds a pivotal election. Memory, masculinity and the making of a man."
  },
  {
    title: "Father Mother Sister Brother",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Jim Jarmusch's ensemble drama — four grown siblings in an Irish house after their parents' death, circling the wreckage of family. Understated, funny and quietly heartbreaking in the way only Jarmusch manages."
  },
  {
    title: "If I Had Legs I'd Kick You",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Mary Bronstein's debut — Rose Byrne as a mother in free fall, her sick child refusing treatment, her marriage disintegrating, the medical system offering nothing. Deeply uncomfortable and deeply necessary."
  },
  {
    title: "On Falling",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Laura Carreira's debut — a Portuguese gig worker in Edinburgh, invisible inside a warehouse and invisible outside it. A film about the loneliness of the precarious economy that feels completely lived-in."
  },
  {
    title: "What Does That Nature Say to You",
    year: 2025,
    type: "movie",
    language: "ko",
    tags: ["critics", "surprise"],
    curatorNote: "Hong Sang-soo's latest miniature — two women, an afternoon, conversation and coffee. The Korean master working at his most distilled, finding the infinite in the apparently ordinary."
  },
  {
    title: "Resurrection",
    year: 2025,
    type: "movie",
    language: "zh",
    tags: ["critics", "surprise"],
    curatorNote: "Bi Gan's visionary Chinese film — a man searching for someone across a dreamlike landscape, the boundary between past and present dissolved. Cinema as pure poetic experience from the director of Long Day's Journey Into Night."
  },
  {
    title: "The Ice Tower",
    year: 2025,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Lucile Hadzihalilović's hypnotic film — a woman and a child in an isolated tower, a mystery that unfolds in images rather than explanations. Dreamlike, feminine and wholly unlike anything else."
  },
  {
    title: "Afternoons of Solitude",
    year: 2025,
    type: "movie",
    language: "es",
    tags: ["critics", "surprise"],
    curatorNote: "Albert Serra's film about the matador Andrés Roca Rey — an immersive portrait of the bullfight, violence, ritual and the man at the center of the arena. Formally extraordinary and deeply polarizing."
  },
  {
    title: "Dry Leaf",
    year: 2025,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Alexandre Koberidze's quietly radical film — a Georgian refugee in Germany, days passing in stillness, small acts of kindness accumulating into something luminous. A film about surviving displacement with grace intact."
  },
  {
    title: "Hamnet",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Chloé Zhao adapts Maggie O'Farrell's novel about the brief life of Shakespeare's son — a deeply emotional period drama about love, grief and the family behind the plays."
  },
  {
    title: "Train Dreams",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Denis Johnson's luminous novella — the whole arc of an American laborer's life in the Idaho wilderness — becomes a lyrical film about solitude, memory and the world passing a man by."
  },
  {
    title: "Sinners",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["crowd", "critics"],
    curatorNote: "Ryan Coogler's genre-bending drama set in 1932 Mississippi — twin brothers trying to start over encounter something ancient and hungry. A film about music, history and the blues as survival."
  },
  {
    title: "Marty Supreme",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Jonah Hill plays the real-life table tennis prodigy who became a living legend of obsession — a portrait of a man for whom winning is the only language that ever made sense."
  },
  {
    title: "One Battle After Another",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Thomas Pynchon's Vineland finally reaches the screen — a shaggy, brilliant adaptation about memory, California and the long shadow of the 1960s falling over a family twenty years later."
  },
  {
    title: "Sorry, Baby",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Eva Victor's debut feature — a professor navigating the aftermath of assault with wit, stillness and refusal to be defined by it. One of the year's most precise and necessary films."
  },
  {
    title: "Frankenstein",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Guillermo del Toro finally makes his Frankenstein — not horror but elegy. Oscar Isaac as the creature in a film about what it means to be made without consent and loved without condition."
  },
  {
    title: "The Voice of Hind Rajab",
    year: 2025,
    type: "movie",
    language: "ar",
    tags: ["critics"],
    curatorNote: "A documentary-drama about the six-year-old Palestinian girl whose voice on a distress call became a symbol heard around the world — a film of grief, witness and moral reckoning."
  },
  {
    title: "The Mastermind",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Kelly Reichardt's art heist film set in 1970s New York — a quiet, precise drama about a museum restorer who steals Old Masters not for money but for a reason that slowly comes into focus."
  },
  {
    title: "The Secret Agent",
    year: 2025,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "A French-language adaptation of Joseph Conrad's novel — a double agent in Edwardian London discovers the bomb he was meant to place has killed someone he loved. Moral dread rendered as tragedy."
  },
  {
    title: "On Becoming a Guinea Fowl",
    year: 2025,
    type: "movie",
    language: "bem",
    tags: ["critics"],
    curatorNote: "A Zambian woman's grief at her uncle's death collides with family silence about who he really was — an extraordinary debut that uses mourning ritual to expose what a family agrees not to see."
  },
  {
    title: "Sentimental Value",
    year: 2025,
    type: "movie",
    language: "no",
    tags: ["critics"],
    curatorNote: "Joachim Trier's intimate Norwegian drama about an estranged father and his two daughters reuniting around a family film — memory, artistic legacy and the damage we do without meaning to."
  },
  {
    title: "Die My Love",
    year: 2025,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Lynne Ramsay's adaptation of Ariana Harwicz's novella — Jennifer Lawrence plays a new mother unraveling in the rural isolation of a new country. A film of terrifying beauty about postpartum despair."
  },

  // ── 2024 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Brutalist",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Brady Corbet's three-and-a-half-hour epic — a Hungarian Jewish architect rebuilds his life in postwar America, only to discover the dream has its own violence. One of the decade's essential films."
  },
  {
    title: "All We Imagine as Light",
    year: 2024,
    type: "movie",
    language: "ml",
    tags: ["critics"],
    curatorNote: "Payal Kapadia's Cannes Grand Prix winner — two nurses in Mumbai, adrift in the city's immensity, find their way toward something resembling freedom. A film of rare grace and political tenderness."
  },
  {
    title: "Nickel Boys",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "RaMell Ross's radical adaptation of Colson Whitehead's Pulitzer winner — shot entirely in first-person POV, placing you inside the skin of two Black boys surviving a brutal reform school in Jim Crow Florida."
  },
  {
    title: "The Seed of the Sacred Fig",
    year: 2024,
    type: "movie",
    language: "fa",
    tags: ["critics"],
    curatorNote: "Mohammad Rasoulof risked his freedom to make this — an Iranian judge loses his gun during the 2022 Women, Life, Freedom protests. A thriller about paranoia that is also a document of tremendous courage."
  },
  {
    title: "Hard Truths",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Mike Leigh and Marianne Jean-Baptiste reunite 28 years after Secrets & Lies for a portrait of a woman drowning in anger she cannot name. One of the director's most unsparing and compassionate works."
  },
  {
    title: "His Three Daughters",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Three estranged sisters gather in a New York apartment as their father dies. Carrie Coon, Natasha Lyonne and Elizabeth Olsen in a film that earns every tear through the specificity of its honesty."
  },
  {
    title: "The Outrun",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Saoirse Ronan as a recovering alcoholic who returns to the Orkney Islands — a film about landscape as medicine, addiction as weather, and the slow, unglamorous work of staying alive."
  },
  {
    title: "Bird",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Andrea Arnold's most personal film — a teenage girl in a Kent squat, caught between a volatile father and an absent mother, finds something almost mythical in an unlikely encounter. Raw and beautiful."
  },
  {
    title: "The Fire Inside",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["crowd", "critics"],
    curatorNote: "The true story of Claressa Shields, the first American boxer to win back-to-back Olympic gold — a film about a young Black woman from Flint, Michigan who refused every limit placed on her."
  },
  {
    title: "Vermiglio",
    year: 2024,
    type: "movie",
    language: "it",
    tags: ["critics"],
    curatorNote: "Maura Delpero's Golden Lion winner — the last winter of World War II arrives in an isolated Alpine village through a deserter who changes everything. Stunning, still, and impossible to forget."
  },
  {
    title: "Memoir of a Snail",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Adam Elliot's stop-motion animation — a woman collects snails and regrets across a sad, funny, extraordinarily compassionate life. Not a children's film; one of the year's most emotionally generous works."
  },
  {
    title: "The Apprentice",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Ali Abbasi's portrait of the young Donald Trump, shaped by Roy Cohn in 1970s New York. Sebastian Stan and Jeremy Strong in a film that makes corruption feel intimate and almost unbearably plausible."
  },
  {
    title: "I'm Still Here",
    year: 2024,
    type: "movie",
    language: "pt",
    tags: ["critics", "crowd"],
    curatorNote: "Walter Salles's return to Brazil — the true story of Eunice Paiva, whose husband disappeared under the military dictatorship, and the forty years she spent demanding the truth. Fernanda Torres won Best Actress at Cannes."
  },
  {
    title: "The Room Next Door",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Pedro Almodóvar's first English-language film — Tilda Swinton and Julianne Moore as old friends reunited by a terminal diagnosis. A meditation on death that insists on light, beauty and the right to choose."
  },

  {
    title: "Anora",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Sean Baker's Palme d'Or winner — a Brooklyn sex worker marries the son of a Russian oligarch in a whirlwind romance that reality doesn't intend to honour. Funny, heartbreaking and as alive as any American film this decade."
  },
  {
    title: "La Chimera",
    year: 2024,
    type: "movie",
    language: "it",
    tags: ["critics", "surprise"],
    curatorNote: "Alice Rohrwacher's reverie — Josh O'Connor as a melancholy Englishman who tomb-raids Etruscan graves with a band of Italian scavengers. A film about loss, beauty and the things we dig up that we cannot put back."
  },
  {
    title: "Challengers",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Luca Guadagnino's tennis love triangle — Zendaya as Tashi, the woman around whom two men orbit across fifteen years. A film about competition, desire and the violence underneath both, scored to pulse the blood."
  },
  {
    title: "Conclave",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Edward Berger follows All Quiet with something entirely different — cardinals locked inside the Vatican to elect a new pope, and the secrets that surface in the process. Ralph Fiennes at his most controlled, in a film of perfect tension."
  },
  {
    title: "A Real Pain",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Jesse Eisenberg and Kieran Culkin as cousins on a Holocaust tour of Poland — a film about grief, guilt and Jewish American identity that moves between comedy and devastation with extraordinary ease. Culkin won the Oscar."
  },
  {
    title: "The Substance",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Coralie Fargeat's Cannes Best Screenplay winner — Demi Moore as an aging celebrity who injects a substance that creates a younger version of herself. A body-horror satire about the entertainment industry that goes further than you think it will."
  },
  {
    title: "Kinds of Kindness",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Yorgos Lanthimos's triptych — the same cast in three disconnected fables about control, obedience and the way relationships hollow people out. Stranger and funnier than Poor Things; more unsettling than either."
  },
  {
    title: "Evil Does Not Exist",
    year: 2024,
    type: "movie",
    language: "ja",
    tags: ["critics"],
    curatorNote: "Ryusuke Hamaguchi's spare, devastating film — a community in a Japanese village resists a glamping development. A film that begins as ecological drama and ends somewhere else entirely, with one of the year's most abrupt and haunting conclusions."
  },
  {
    title: "Grand Tour",
    year: 2024,
    type: "movie",
    language: "pt",
    tags: ["critics", "surprise"],
    curatorNote: "Miguel Gomes's Cannes Best Director winner — a British colonial official flees his fiancée across 1917 Asia, and she follows. A film in two movements, between past and present, that makes you feel the whole colonial century in its bones."
  },
  {
    title: "A Different Man",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Aaron Schimberg's unsettling comedy — Sebastian Stan as a man with a facial condition who undergoes experimental surgery and discovers that getting what you want solves nothing. A film about identity that gets stranger and funnier the more it dares."
  },
  {
    title: "Close Your Eyes",
    year: 2024,
    type: "movie",
    language: "es",
    tags: ["critics"],
    curatorNote: "Víctor Erice returns after 30 years away from features — a filmmaker searches for his missing lead actor, and the past opens up. A film about cinema, memory and the unbearable weight of the unfinished, from one of Spain's greatest directors."
  },
  {
    title: "Green Border",
    year: 2024,
    type: "movie",
    language: "pl",
    tags: ["critics"],
    curatorNote: "Agnieszka Holland's furious black-and-white film — refugees trapped in the forest between Poland and Belarus, weaponised by both governments. One of Europe's most politically urgent films of the decade."
  },
  {
    title: "Caught by the Tides",
    year: 2024,
    type: "movie",
    language: "zh",
    tags: ["critics", "surprise"],
    curatorNote: "Jia Zhangke assembled twenty years of footage — a woman searches for a man across a China that keeps physically and economically transforming around her. A film made from time itself, haunting and completely unlike anything else."
  },
  {
    title: "Black Dog",
    year: 2024,
    type: "movie",
    language: "zh",
    tags: ["critics"],
    curatorNote: "Guan Hu's BFI top-50 film — a man returns to a desolate northwestern Chinese town to find a stray dog he once knew. A film of extraordinary visual patience about solitude, economic ruin and the things that wait for you to come back."
  },
  {
    title: "Do Not Expect Too Much from the End of the World",
    year: 2024,
    type: "movie",
    language: "ro",
    tags: ["critics", "surprise"],
    curatorNote: "Radu Jude's maximalist Romanian satire — a woman drives around Bucharest for a work assignment while the city's exhaustion and grotesquerie accumulate. A film that contains everything and asks what on earth we're supposed to do about it."
  },
  {
    title: "Crossing",
    year: 2024,
    type: "movie",
    language: "sv",
    tags: ["critics", "surprise"],
    curatorNote: "Levan Akin's quiet, compassionate film — a retired Georgian teacher travels to Istanbul to find her trans niece. A road movie about the distance between who people were and who they are now, shot with enormous gentleness."
  },
  {
    title: "Janet Planet",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Annie Baker's debut — a summer in 1991 western Massachusetts, seen from the perspective of an eleven-year-old girl as her mother's relationships come and go. A film of extraordinary stillness about children watching adults fail."
  },
  {
    title: "I Saw the TV Glow",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Jane Schoenbrun's suburban horror — two teenagers bond over a cancelled TV show in the 1990s, and the show starts to feel more real than their lives. A film about gender dysphoria so formally inventive it becomes genuinely frightening."
  },
  {
    title: "The Beast",
    year: 2024,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Bertrand Bonello's science fiction drama — Léa Seydoux across three timelines, always meeting the same man, always ending in catastrophe. An adaptation of a Henry James story that becomes something stranger and more unsettling than any ghost story."
  },
  {
    title: "The Count of Monte Cristo",
    year: 2024,
    type: "movie",
    language: "fr",
    tags: ["crowd"],
    curatorNote: "The definitive screen adaptation of Dumas — Pierre Niney as Edmond Dantès, betrayed, imprisoned and reborn as an avenger. Three hours of the most purely entertaining French cinema in decades, and the highest-grossing European film of 2024."
  },
  {
    title: "The Taste of Things",
    year: 2024,
    type: "movie",
    language: "fr",
    tags: ["critics", "crowd"],
    curatorNote: "Anh Hung Tran's Cannes Best Director winner — Juliette Binoche and Benoît Magimel in a 19th-century love story told through the preparation of extraordinary food. The most sensuous and melancholy film about cooking ever made."
  },
  {
    title: "Juror #2",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Clint Eastwood at 94, still making exactly the films he wants to make — a juror in a murder trial realizes he may have caused the death himself. A moral thriller with the certainty of classic Hollywood and the doubt of a man at the end of things."
  },
  {
    title: "Babygirl",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Nicole Kidman's Golden Globe-winning performance — a CEO who has everything enters a dangerous affair with an intern who understands something about her that her husband never will. Halina Reijn's film is precise and adult and fully on Kidman's side."
  },
  {
    title: "Dìdi",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Sean Wang's debut — a Taiwanese-American teenager in 2008 California, between his mother and his online life, trying to figure out who he is before high school changes everything. 96% on RT; a film of pure, accurate adolescent feeling."
  },
  {
    title: "Girls Will Be Girls",
    year: 2024,
    type: "movie",
    language: "hi",
    tags: ["critics"],
    curatorNote: "Shuchi Talati's 100% RT Indian debut — a teenage girl at a boarding school falls for a new boy, while her mother returns and their desires start to mirror each other. A film about female desire in a society designed to extinguish it."
  },
  {
    title: "Ghostlight",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Kelly O'Sullivan and Alex Thompson's 99% RT film — a construction worker joins a local theatre production of Romeo and Juliet while his family is in crisis. A film about the unexpected ways art saves people, genuinely surprising in its warmth."
  },
  {
    title: "Exhibiting Forgiveness",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Titus Kaphar's autobiographical debut — a Black artist confronts his estranged, recovering addict father. 95% on RT. A film about the impossible geometry of forgiveness that earns its emotional catharsis completely."
  },
  {
    title: "Kneecap",
    year: 2024,
    type: "movie",
    language: "ga",
    tags: ["critics", "crowd", "surprise"],
    curatorNote: "The real Irish-language rap trio play themselves — a foul-mouthed, furiously funny biopic about three musicians from Belfast who made the Irish language dangerous again. Language as resistance; resistance as joy."
  },
  {
    title: "Love Lies Bleeding",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Rose Glass's neo-noir — Kristen Stewart as a gym manager who falls for a bodybuilder passing through town, and her criminal family closes in. A sun-bleached, steroid-pumped thriller that goes somewhere genuinely operatic."
  },
  {
    title: "Civil War",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Alex Garland's war journalist film set in a near-future American civil war — Kirsten Dunst and Wagner Moura racing toward Washington as the government falls. Not a political argument but a visceral report from the front line of what we might become."
  },
  {
    title: "The Bikeriders",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Jeff Nichols's portrait of a Midwestern motorcycle club from the 1960s to the 1980s — Jodie Comer, Tom Hardy and Austin Butler. A film about the way outlaw identity hardens and hollows out the people who choose it."
  },
  {
    title: "Femme",
    year: 2024,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Sam H. Freeman and Ng Choon Ping's British debut — a drag artist begins a tense, psychologically dangerous relationship with the man who assaulted him. A film about power, desire and the terrible intimacy of knowing someone can hurt you."
  },
  {
    title: "About Dry Grasses",
    year: 2024,
    type: "movie",
    language: "tr",
    tags: ["critics"],
    curatorNote: "Nuri Bilge Ceylan's 197-minute Turkish drama — a teacher in an Anatolian village, bored and self-regarding, is accused by a student. A film about the gap between how we see ourselves and how we actually are, patient and merciless."
  },
  {
    title: "Dahomey",
    year: 2024,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Mati Diop's documentary essay — 26 royal treasures looted by France from the Kingdom of Dahomey are returned to Benin after 130 years. A film about colonial legacies, belonging and what it means for a culture to reclaim its own past."
  },
  {
    title: "No Other Land",
    year: 2024,
    type: "movie",
    language: "ar",
    tags: ["critics"],
    curatorNote: "Basel Adra and Yuval Abraham's Palestinian-Israeli documentary — the demolition of Masafer Yatta villages filmed by the people who live there, over five years. Oscar winner for Best Documentary; an essential and devastating record."
  },

  // ── 2023 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Past Lives",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Celine Song's debut — two childhood sweethearts from Seoul, separated when one emigrates, meet again twenty years later in New York. A film about the paths not taken, made with such precision and restraint that its final scene undoes you completely."
  },
  {
    title: "Killers of the Flower Moon",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Scorsese's three-and-a-half-hour reckoning with the Osage murders — Leo DiCaprio as the weak man at the centre of a systematic extermination, Robert De Niro as his uncle who orchestrated it. A film about what America did and kept doing."
  },
  {
    title: "The Holdovers",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Paul Giamatti as the most unlikeable teacher at a New England prep school, stuck over Christmas with one sullen student and the cook who has just lost her son. Alexander Payne's warmest and most perfectly constructed film."
  },
  {
    title: "May December",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Todd Haynes's most unsettling film — Natalie Portman as an actress researching Julianne Moore's character, a woman who had a relationship with a 13-year-old and married him. A film about the way performance consumes everyone involved in it."
  },
  {
    title: "Fallen Leaves",
    year: 2023,
    type: "movie",
    language: "fi",
    tags: ["critics", "crowd"],
    curatorNote: "Aki Kaurismäki's Cannes Jury Prize winner — two lonely Helsinki workers keep almost meeting. A film of devastating economy: every line earns its place, every silence has weight, and the ending is as close to joy as cinema ever honestly manages."
  },
  {
    title: "Showing Up",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Kelly Reichardt's quietest film — Michelle Williams as a sculptor preparing for a show while life keeps interrupting. A film about the difficulty of making art while being a person, made with the patience and attention it describes."
  },
  {
    title: "Monster",
    year: 2023,
    type: "movie",
    language: "ja",
    tags: ["critics", "surprise"],
    curatorNote: "Hirokazu Kore-eda's Cannes Queer Palm winner — a school incident seen from three perspectives, each one revealing what the previous one concealed. A film about the violence of assumptions, told with the precision of a watch being disassembled."
  },
  {
    title: "Afire",
    year: 2023,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Christian Petzold's Grand Prix winner at Berlin — a writer at a lakeside house in Germany as wildfires approach, unable to see the catastrophe happening around him. A film about creative ego and climate grief that sneaks up on you completely."
  },
  {
    title: "Poor Things",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Yorgos Lanthimos's Alasdair Gray adaptation — Emma Stone as Bella Baxter, a woman with a baby's brain growing up at terrifying speed, discovering the world and herself. Venice Golden Lion. Strange, funny and a genuine provocation about autonomy."
  },
  {
    title: "Priscilla",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Sofia Coppola's counterpoint to Baz Luhrmann's Elvis — Cailee Spaeny as the teenager who became Mrs. Presley, inside the Graceland that was also a cage. A film about girlhood, isolation and the glamour that traps you."
  },
  {
    title: "Origin",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Ava DuVernay's adaptation of Isabel Wilkerson's Caste — Aunjanue Ellis-Taylor as Wilkerson writing the book while grieving, discovering the connections between caste systems in India, Nazi Germany and the American South. Formally bold and unforgettable."
  },
  {
    title: "Ferrari",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Michael Mann's portrait of Enzo Ferrari in the summer of 1957 — Adam Driver as a man holding together a marriage, a company and a legacy while the Mille Miglia approaches. Mann at his most operatic, with the crash sequence among his greatest scenes."
  },
  {
    title: "A Thousand and One",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "A.V. Rockwell's Sundance Grand Jury winner — Teyana Taylor as a woman who takes her son from foster care and builds a life in 1990s Harlem as gentrification dismantles everything around her. A film about what mothers do to hold a city inside themselves."
  },
  {
    title: "Eileen",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "William Oldroyd's adaptation of Ottessa Moshfegh — Thomasin McKenzie as a mousy prison secretary in 1960s Massachusetts, undone by Anne Hathaway's arrival. A psychological portrait that turns into something wilder than you expected."
  },
  {
    title: "The Teachers' Lounge",
    year: 2023,
    type: "movie",
    language: "de",
    tags: ["critics"],
    curatorNote: "İlker Çatak's German thriller — a young idealistic teacher investigates a theft at her school and the institution closes around her. Nerve-shredding and precise about the way good intentions are used against you by systems designed for something else."
  },
  {
    title: "Oppenheimer",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Nolan's IMAX biopic of the father of the atomic bomb — Cillian Murphy in the role of his career, the government hearing as a chamber drama that matches the Trinity test for tension. A film that takes the bomb seriously enough to be frightened of it."
  },
  {
    title: "All of Us Strangers",
    year: 2023,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Andrew Haigh's ghost story about longing — Andrew Scott visits his childhood home and finds his dead parents still living there. Paul Mescal as his neighbour. The most emotionally devastating film about queerness, grief and what we needed from our parents."
  },
  {
    title: "Passages",
    year: 2023,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Ira Sachs's Paris love triangle — Franz Rogowski as a filmmaker who leaves his husband for a woman and destroys everyone in his orbit without ever understanding he's doing it. A film about desire as pure selfishness, shot in the most beautiful light."
  },
  {
    title: "The Zone of Interest",
    year: 2023,
    type: "movie",
    language: "de",
    tags: ["critics"],
    curatorNote: "Jonathan Glazer's Palme d'Or winner — the commandant of Auschwitz and his family tend their garden next door to the camp. A film about the banality of complicity that refuses to show what it knows you already know."
  },
  {
    title: "Anatomy of a Fall",
    year: 2023,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Palme d'Or winner. A woman on trial for her husband's death — but the real subject is marriage, language and what we can never truly know about the person we live with. A masterwork of ambiguity."
  },

  // ── 2022 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Tár",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Cate Blanchett as Lydia Tár, conductor of the Berlin Philharmonic, watching her world unravel. Todd Field's first film in sixteen years is a masterclass in moral ambiguity — a portrait of power so precise it became a cultural flashpoint."
  },
  {
    title: "Decision to Leave",
    year: 2022,
    type: "movie",
    language: "ko",
    tags: ["critics", "surprise"],
    curatorNote: "Park Chan-wook's Cannes Best Director winner — a detective investigates a woman whose husband fell from a mountain, and falls obsessively in love with his suspect. A noir as elegant as anything Hitchcock made."
  },
  {
    title: "Saint Omer",
    year: 2022,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Alice Diop's Venice Grand Jury Prize winner — a novelist attends the trial of a Senegalese woman who left her infant daughter on a beach to drown. A film about motherhood, race and justice that refuses every easy answer."
  },
  {
    title: "The Quiet Girl",
    year: 2022,
    type: "movie",
    language: "ga",
    tags: ["critics", "crowd"],
    curatorNote: "Ireland's first Irish-language Oscar nomination — a quiet, withdrawn girl is sent to stay with relatives for the summer and discovers what it means to be cared for. One of the most tender films of the decade."
  },
  {
    title: "Women Talking",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Sarah Polley's Oscar-winning adapted screenplay — women in a Mennonite colony gather in a barn to decide whether to stay, fight or leave after years of abuse by the men. A radical act of collective imagination."
  },
  {
    title: "The Fabelmans",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Steven Spielberg's autobiographical film — a boy discovers his love of movies and the truth about his family. Gabriel LaBelle as young Sammy, Michelle Williams as his mother. The most personal film of Spielberg's career."
  },
  {
    title: "All Quiet on the Western Front",
    year: 2022,
    type: "movie",
    language: "de",
    tags: ["critics", "crowd"],
    curatorNote: "The German remake of Remarque's novel won four Oscars including Best International Film — an 18-year-old enlists for the glory of the Kaiser and finds only mud, wire and the meaningless deaths of boys like himself."
  },
  {
    title: "Triangle of Sadness",
    year: 2022,
    type: "movie",
    language: "sv",
    tags: ["critics", "surprise"],
    curatorNote: "Ruben Östlund's Palme d'Or winner — a luxury yacht cruise ends in shipwreck, and the power dynamics of class invert on a deserted island. A comedy of vomit and capitalism that goes places you cannot predict."
  },
  {
    title: "Close",
    year: 2022,
    type: "movie",
    language: "nl",
    tags: ["critics"],
    curatorNote: "Lukas Dhont's Cannes Grand Prix winner — two thirteen-year-old boys, best friends since childhood, are separated by the cruelty of adolescent expectation. A film about grief so understated it devastates you quietly."
  },
  {
    title: "The Beasts",
    year: 2022,
    type: "movie",
    language: "es",
    tags: ["critics"],
    curatorNote: "Rodrigo Sorogoyen's thriller — a French couple farming in rural Galicia face escalating hostility from their neighbours. A film about belonging, stubbornness and the violence that can live in a community."
  },
  {
    title: "The Eight Mountains",
    year: 2022,
    type: "movie",
    language: "it",
    tags: ["critics", "crowd"],
    curatorNote: "Felix van Groeningen and Charlotte Vandermeersch's Cannes Jury Prize winner — a lifelong friendship between two men from different worlds, tracked across decades in the Italian Alps. An epic about chosen family and the lives we almost lived."
  },
  {
    title: "Bardo",
    year: 2022,
    type: "movie",
    language: "es",
    tags: ["critics", "surprise"],
    curatorNote: "Alejandro G. Iñárritu's most personal film — a Mexican documentary filmmaker living in Los Angeles confronts his identity, his homeland, and his place in the world. Breathtaking cinematography by Darius Khondji. Streaming on Netflix."
  },
  {
    title: "Argentina, 1985",
    year: 2022,
    type: "movie",
    language: "es",
    tags: ["critics", "crowd"],
    curatorNote: "Santiago Mitre's Oscar-nominated drama — the true story of the lawyers who prosecuted Argentina's military junta for crimes against humanity. A courtroom film that understands what justice actually costs."
  },
  {
    title: "Tori and Lokita",
    year: 2022,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "The Dardenne brothers' Cannes Jury Prize special winner — two African teenagers in Belgium, a boy and a girl who call themselves brother and sister, navigating the dehumanising machinery of immigration. Urgent and unsparing."
  },
  {
    title: "Holy Spider",
    year: 2022,
    type: "movie",
    language: "fa",
    tags: ["critics", "surprise"],
    curatorNote: "Ali Abbasi's Cannes Best Actress winner — the true story of a serial killer targeting sex workers in Iran, and the female journalist who hunted him. A horror film and a political film simultaneously."
  },
  {
    title: "Broker",
    year: 2022,
    type: "movie",
    language: "ko",
    tags: ["critics", "crowd"],
    curatorNote: "Hirokazu Kore-eda's Korean-language film — two men who sell abandoned babies at a baby box are followed by a detective and joined by the baby's mother. Song Kang-ho won Best Actor at Cannes. A film about the family you choose."
  },
  {
    title: "Leila's Brothers",
    year: 2022,
    type: "movie",
    language: "fa",
    tags: ["critics"],
    curatorNote: "Saeed Roustaee's three-hour Iranian family epic — a sister and her four brothers fight for the future of their family against a father who is slowly losing his grip. Cannes competition favourite and one of the great recent Iranian films."
  },
  {
    title: "No Bears",
    year: 2022,
    type: "movie",
    language: "fa",
    tags: ["critics"],
    curatorNote: "Jafar Panahi's film made while under a travel ban from the Iranian government — he plays himself, a director in a village near the Turkish border, making a film remotely about lovers trying to escape. Meta, urgent, formally extraordinary."
  },
  {
    title: "The Blue Caftan",
    year: 2022,
    type: "movie",
    language: "ar",
    tags: ["critics", "surprise"],
    curatorNote: "Maryam Touzani's Cannes Critics Week winner — a master tailor in a Moroccan medina hires a young apprentice, and his wife slowly understands what her husband has kept hidden. A film about desire, loyalty and the tenderness of late life."
  },
  {
    title: "Bones and All",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Luca Guadagnino's cannibal road movie — Timothée Chalamet and Taylor Russell as two outsiders who eat people, crossing America together. A love story as strange and beautiful as Call Me By Your Name."
  },
  {
    title: "Corsage",
    year: 2022,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Marie Kreutzer's feminist reimagining of Empress Elisabeth of Austria — Vicky Krieps won Best Performance at Cannes in a film that deliberately, gleefully defies every biopic convention."
  },
  {
    title: "Joyland",
    year: 2022,
    type: "movie",
    language: "ur",
    tags: ["critics", "surprise"],
    curatorNote: "Saim Sadiq's Pakistan Oscar submission — a man in Lahore joins a dance troupe and falls in love with a transgender performer. A gentle, radical film about gender and desire in a society that punishes both."
  },
  {
    title: "The Eternal Daughter",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Joanna Hogg's ghost story — Tilda Swinton plays both a filmmaker and her elderly mother, spending a strange week in a Welsh country house hotel. A film about memory, guilt and what we owe the people who made us."
  },
  {
    title: "Armageddon Time",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "James Gray's autobiographical film — a Jewish boy in 1980s Queens befriends a Black classmate while his family drifts toward Reaganism. Anthony Hopkins and Jeremy Strong. A film about privilege and the stories we tell ourselves about it."
  },
  {
    title: "She Said",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Maria Schrader's film about the New York Times journalists who broke the Harvey Weinstein story — Carey Mulligan and Zoe Kazan. A procedural thriller in the tradition of All the President's Men, and just as essential."
  },
  {
    title: "The Banshees of Inisherin",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Martin McDonagh's dark fable — one man on an Irish island decides to end a friendship, and his former best friend cannot accept it. Colin Farrell and Brendan Gleeson. Nine Oscar nominations. A film about loneliness and the stories nations tell about themselves."
  },
  {
    title: "EO",
    year: 2022,
    type: "movie",
    language: "pl",
    tags: ["critics", "surprise"],
    curatorNote: "Jerzy Skolimowski's Silver Bear winner — a donkey's journey across Europe. An animal film that becomes a moral audit of humanity, shot in frames so beautiful you can barely stand it."
  },
  {
    title: "Aftersun",
    year: 2022,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Charlotte Wells's astonishing debut — a daughter reconstructing a holiday with her father from fragments of memory and a camcorder. A film about loving someone you couldn't fully see until it was too late."
  },

  // ── 2021 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Power of the Dog",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Jane Campion's Oscar-winning film — Benedict Cumberbatch as a brutal Montana rancher who psychologically torments his brother's new wife and her son. A slow-burn Western that reveals itself as something else entirely."
  },
  {
    title: "Petite Maman",
    year: 2021,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Céline Sciamma's 72-minute miracle — a girl clearing out her late grandmother's house meets a child her own age in the woods. A film about grief and mothers and daughters that conjures genuine magic from the simplest possible means."
  },
  {
    title: "Titane",
    year: 2021,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Julia Ducournau's Palme d'Or winner — a woman with a titanium plate in her head begins a strange relationship with a car, then goes on the run. The most visceral, genre-defying film of the year, and unexpectedly tender."
  },
  {
    title: "Memoria",
    year: 2021,
    type: "movie",
    language: "es",
    tags: ["critics"],
    curatorNote: "Apichatpong Weerasethakul's Cannes Jury Prize winner — Tilda Swinton as a Scottish woman in Colombia who hears a mysterious sound no one else can. A film that runs at the pace of consciousness itself."
  },
  {
    title: "Parallel Mothers",
    year: 2021,
    type: "movie",
    language: "es",
    tags: ["critics", "crowd"],
    curatorNote: "Pedro Almodóvar's return to form — Penélope Cruz as a photojournalist who gives birth on the same day as a teenage girl, and whose lives remain entwined. A film about motherhood, history and the graves Spain still refuses to open."
  },
  {
    title: "The Lost Daughter",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Maggie Gyllenhaal's directorial debut from Elena Ferrante's novel — Olivia Colman as a literature professor on holiday in Greece, unsettled by a young mother. A film about ambivalence and the parts of ourselves we cannot forgive."
  },
  {
    title: "Spencer",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Pablo Larraín's Diana — Kristen Stewart playing Princess Diana over one Christmas weekend at Sandringham as she decides to leave. Not a biopic but a psychological portrait, shot like a horror film."
  },
  {
    title: "Licorice Pizza",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Paul Thomas Anderson's California idyll — a teenage actor and a woman in her mid-twenties circle each other across a sun-drenched 1973 San Fernando Valley. Funny, romantic, and utterly sui generis."
  },
  {
    title: "Nomadland",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Chloé Zhao's Oscar-winning film — Frances McDormand as a woman who lost everything in the 2008 recession and lives in a van, moving between seasonal jobs. Filmed with real nomads. A meditation on grief and American freedom."
  },
  {
    title: "Minari",
    year: 2021,
    type: "movie",
    language: "ko",
    tags: ["critics", "crowd"],
    curatorNote: "Lee Isaac Chung's autobiographical film — a Korean-American family moves to rural Arkansas to start a farm. Steven Yeun and Youn Yuh-jung (who won the Oscar). A film about the American dream as experienced by those it never quite includes."
  },
  {
    title: "Sound of Metal",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Darius Marder's film — Riz Ahmed as a heavy metal drummer who begins to lose his hearing. Won two Oscars for sound. A film that makes you experience deafness rather than observe it."
  },
  {
    title: "Judas and the Black Messiah",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Shaka King's film about Fred Hampton, chairman of the Illinois Black Panther Party, and the FBI informant who betrayed him. Daniel Kaluuya won the Oscar. A film about the violent suppression of Black political power in America."
  },
  {
    title: "Wheel of Fortune and Fantasy",
    year: 2021,
    type: "movie",
    language: "ja",
    tags: ["critics", "surprise"],
    curatorNote: "Ryûsuke Hamaguchi's Silver Bear winner — three separate stories about coincidence, desire and the conversations that change people. Made in the same year as Drive My Car. Proof that he is one of the great living filmmakers."
  },
  {
    title: "The Hand of God",
    year: 2021,
    type: "movie",
    language: "it",
    tags: ["critics", "crowd"],
    curatorNote: "Paolo Sorrentino's autobiographical film — a teenager in 1980s Naples the summer Maradona arrived, and the tragedy that saved his life. A film about youth, grief and the city Sorrentino has always been writing about."
  },
  {
    title: "Compartment No. 6",
    year: 2021,
    type: "movie",
    language: "fi",
    tags: ["critics", "surprise"],
    curatorNote: "Juho Kuosmanen's Cannes Grand Prix winner — a Finnish woman on a train to the Russian Arctic shares a compartment with a drunken Russian miner. An unlikely friendship film that manages to feel completely new."
  },
  {
    title: "Beginning",
    year: 2021,
    type: "movie",
    language: "ka",
    tags: ["critics"],
    tmdbId: 750187,
    curatorNote: "Déa Kulumbegashvili's San Sebastián winner — a Jehovah's Witness woman in a Georgian village in the aftermath of an attack on her congregation. Shot in long, motionless takes. A film of devastating formal control."
  },
  {
    title: "Playground",
    year: 2021,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Laura Wandel's Cannes debut — a seven-year-old girl watches her brother be bullied in a Belgian school and must decide what to do. Told entirely from child height. Unbearably tense."
  },
  {
    title: "Flee",
    year: 2021,
    type: "movie",
    language: "da",
    tags: ["critics", "crowd"],
    curatorNote: "Jonas Poher Rasmussen's animated documentary — an Afghan refugee recounts for the first time the story of how he fled Kabul as a child. The only film ever nominated for Oscar, BAFTA, and Grammy simultaneously."
  },
  {
    title: "A Hero",
    year: 2021,
    type: "movie",
    language: "fa",
    tags: ["critics"],
    curatorNote: "Asghar Farhadi's Cannes Grand Prix winner — a man in prison for debt briefly holds a bag of gold coins and must decide whether to return them. A moral thriller that implicates everyone, including the audience."
  },
  {
    title: "Bad Luck Banging or Loony Porn",
    year: 2021,
    type: "movie",
    language: "ro",
    tags: ["critics", "surprise"],
    curatorNote: "Radu Jude's Berlin Golden Bear winner — a schoolteacher's sex tape goes viral and she must face a parents' meeting to keep her job. Three wildly different sections. Furious, funny, and formally unlike anything else."
  },
  {
    title: "Hit the Road",
    year: 2021,
    type: "movie",
    language: "fa",
    tags: ["critics", "surprise"],
    curatorNote: "Panah Panahi's debut — an Iranian family on a road trip that may be driving their eldest son to the border. The reason for the journey is withheld, the comedy is constant, and the grief arrives when you least expect it."
  },
  {
    title: "The Souvenir Part II",
    year: 2021,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Joanna Hogg's sequel and Sight & Sound's #1 film of 2021 — a film student processes her dead lover by making a film about him. A film about art as survival, and the way grief reshapes memory into something else."
  },
  {
    title: "Drive My Car",
    year: 2021,
    type: "movie",
    language: "ja",
    tags: ["critics"],
    curatorNote: "Ryûsuke Hamaguchi's three-hour Chekhov-filtered grief odyssey — a theater director, his driver, and the long drive toward honesty. Winner of the Oscar for Best International Film. Unmissable."
  },
  {
    title: "The Worst Person in the World",
    year: 2021,
    type: "movie",
    language: "no",
    tags: ["critics", "surprise"],
    curatorNote: "Joachim Trier's Cannes prize-winner — twelve chapters in the life of a woman in Oslo figuring out who she wants to be. Funny, devastating and wholly on the side of female ambiguity."
  },

  // ── 2020 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Shithouse",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Cooper Raiff wrote, directed and stars as a lonely college freshman who spends an unexpected night with his RA — an achingly specific portrait of the particular sadness of being young and far from home. Raiff announced himself as a major talent."
  },
  {
    title: "Never Rarely Sometimes Always",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Eliza Hittman's Sundance and Berlin Silver Bear winner — a seventeen-year-old from rural Pennsylvania travels to New York with her cousin to get an abortion. A film of extraordinary restraint and bottomless empathy."
  },
  {
    title: "First Cow",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Kelly Reichardt's Oregon frontier fable — a cook and a Chinese immigrant become unlikely business partners by milking the territory's only cow at night. A film about capitalism, friendship and the American frontier told in the quietest possible key."
  },
  {
    title: "Mangrove",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Steve McQueen's Small Axe opener — the true story of the Mangrove Nine, Black activists prosecuted by the Metropolitan Police in 1970 London. A courtroom drama that becomes a declaration of resistance. Letitia Wright, Shaun Parkes."
  },
  {
    title: "Another Round",
    year: 2020,
    type: "movie",
    language: "da",
    tags: ["critics", "crowd"],
    curatorNote: "Thomas Vinterberg's Oscar winner for Best International Film — four Danish schoolteachers test the theory that a maintained blood-alcohol level improves life. Mads Mikkelsen in the role of his career, ending in one of cinema's great final sequences."
  },
  {
    title: "Bacurau",
    year: 2020,
    type: "movie",
    language: "pt",
    tags: ["critics", "surprise"],
    curatorNote: "Kleber Mendonça Filho and Juliano Dornelles's Cannes Jury Prize winner — a small village in the Brazilian sertão disappears from maps and strangers begin to arrive. A genre-blending political thriller that operates as myth."
  },
  {
    title: "Quo Vadis, Aida?",
    year: 2020,
    type: "movie",
    language: "bs",
    tags: ["critics"],
    curatorNote: "Jasmila Žbanić's Oscar-nominated film about Srebrenica — a UN translator trying to save her family as the Bosnian Serb army takes the enclave in 1995. One of the most important European films about the aftermath of the Yugoslav wars."
  },
  {
    title: "The Disciple",
    year: 2020,
    type: "movie",
    language: "mr",
    tags: ["critics"],
    curatorNote: "Chaitanya Tamhane's Venice Best Screenplay winner — a young classical Hindustani vocalist devotes his life to an art form that may not want him back. A film about obsession, tradition and the cruelty of the artistic ideal."
  },
  {
    title: "Collective",
    year: 2020,
    type: "movie",
    language: "ro",
    tags: ["critics"],
    curatorNote: "Alexander Nanau's Oscar-nominated documentary — Romanian investigative journalists expose a health ministry corruption scandal after a nightclub fire. Real-time journalism as political thriller."
  },
  {
    title: "Da 5 Bloods",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Spike Lee's Vietnam-set epic — four Black veterans return to the jungle to find the remains of their fallen squad leader and the gold they buried. Delroy Lindo in a performance of volcanic grief. A film about what America asks of Black men."
  },
  {
    title: "The Assistant",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Kitty Green's film about a day in the life of a junior assistant at a film production company — the micro-aggressions, the complicity, the HR meeting that says everything. A #MeToo film that never names its predator."
  },
  {
    title: "Martin Eden",
    year: 2020,
    type: "movie",
    language: "it",
    tags: ["critics", "surprise"],
    curatorNote: "Pietro Marcello's adaptation of Jack London's novel transposed to twentieth-century Naples — a sailor educates himself and becomes a writer, and success destroys him. Luca Marinelli's award-winning performance."
  },
  {
    title: "Undine",
    year: 2020,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Christian Petzold's Berlin Silver Bear winner — Paula Beer as a historian in Berlin who falls in love with an industrial diver. A myth about water and return reimagined as contemporary romance."
  },
  {
    title: "Ema",
    year: 2020,
    type: "movie",
    language: "es",
    tags: ["critics", "surprise"],
    curatorNote: "Pablo Larraín's incendiary Chilean film — a reggaeton dancer and her choreographer husband give back their adopted son and ignite the consequences. A film about desire as force of nature, shot like a music video and structured like a provocation."
  },
  {
    title: "Rocks",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Sarah Gavron's BAFTA-nominated film — a teenage girl in East London suddenly responsible for her younger brother after their mother abandons them. Shot with non-professional actors from the community. A film of exhilarating authenticity."
  },
  {
    title: "The Woman Who Ran",
    year: 2020,
    type: "movie",
    language: "ko",
    tags: ["critics", "surprise"],
    curatorNote: "Hong Sangsoo's Berlin Silver Bear winner — a woman visits three friends while her husband travels for the first time in five years. Deceptively simple conversations that reveal an entire life. Hong at his most essential."
  },
  {
    title: "Babyteeth",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Shannon Murphy's debut — a terminally ill teenager in Australia falls in love with a drug dealer, to her parents' despair. Eliza Scanlen and Toby Wallace. A film about illness that refuses to be sad in the way illness films usually are."
  },
  {
    title: "His House",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Remi Weekes's horror film — a South Sudanese couple who fled the war are housed in a crumbling English estate and discover something in the walls. A refugee experience reimagined as haunting, and a haunting about what survives the crossing."
  },
  {
    title: "Mogul Mowgli",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Bassam Tariq's film — Riz Ahmed as a British-Pakistani rapper struck down by an autoimmune disease on the eve of his first world tour. A film about diaspora identity, ambition and the body as battleground. Ahmed co-wrote the screenplay."
  },
  {
    title: "The Father",
    year: 2020,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Anthony Hopkins won the Oscar placing us inside the fractured mind of a man with dementia — the walls shift, faces change, and reality dissolves. One of the most formally daring films of recent years."
  },

  // ── 2019 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Parasite",
    year: 2019,
    type: "movie",
    language: "ko",
    tags: ["critics", "crowd"],
    curatorNote: "Bong Joon-ho's class warfare thriller won four Oscars including Best Picture — the first non-English film to do so. A film that makes you laugh, then scream, then think for days."
  },
  {
    title: "Portrait of a Lady on Fire",
    year: 2019,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Céline Sciamma's incandescent period film — a painter and her subject fall in love in eighteenth-century Brittany. A film about looking, being looked at, and the art made from what cannot last."
  },
  {
    title: "Pain and Glory",
    year: 2019,
    type: "movie",
    language: "es",
    tags: ["critics"],
    curatorNote: "Pedro Almodóvar at his most autobiographical — Antonio Banderas as a director in late-life crisis, revisiting the childhood memories and lost loves that made him. A film of extraordinary tenderness."
  },

  // ── 2018 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Roma",
    year: 2018,
    type: "movie",
    language: "es",
    tags: ["critics"],
    curatorNote: "Alfonso Cuarón's Oscar-winning memoir — a domestic worker in 1970s Mexico City navigating a family's unraveling and a country on the edge of violence. Shot in luminous black and white. A masterpiece."
  },
  {
    title: "Burning",
    year: 2018,
    type: "movie",
    language: "ko",
    tags: ["critics", "surprise"],
    curatorNote: "Lee Chang-dong's mystery of class and desire — a young man, a woman, and a wealthy stranger who burns greenhouses. Based on a Murakami story; stretched into something profound and deeply unsettling."
  },
  {
    title: "Shoplifters",
    year: 2018,
    type: "movie",
    language: "ja",
    tags: ["critics"],
    curatorNote: "Hirokazu Kore-eda's Palme d'Or winner — a family of misfits who steal to survive take in an abandoned child. A film that asks what family truly means, and answers with aching, unresolved love."
  },
  {
    title: "Cold War",
    year: 2018,
    type: "movie",
    language: "pl",
    tags: ["critics"],
    curatorNote: "Pawel Pawlikowski's black-and-white love story spans fifteen years, two Europes and a passion that keeps destroying itself. Fifty-nine minutes of compressed longing. Nothing wasted."
  },

  // ── 2017 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Phantom Thread",
    year: 2017,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Paul Thomas Anderson and Daniel Day-Lewis's final collaboration — a dressmaker and his muse in 1950s London, in a love story that turns into something stranger and funnier than you could predict."
  },
  {
    title: "Loveless",
    year: 2017,
    type: "movie",
    language: "ru",
    tags: ["critics"],
    curatorNote: "Andrei Zvyagintsev's Cannes Jury Prize winner — a divorcing Moscow couple searches for the son neither of them noticed had vanished. A film about a country that has forgotten how to feel."
  },
  {
    title: "First Reformed",
    year: 2017,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Ethan Hawke as a small-town pastor whose faith collides with environmental despair. Paul Schrader's most searing work — austere, radical and building to an ending that stays with you."
  },

  // ── 2016 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Moonlight",
    year: 2016,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Barry Jenkins's Oscar-winning triptych — a Black man in Miami across three chapters of his life, each defined by what love he could and could not find. One of the defining American films of its decade."
  },

  // ── 2015 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Lobster",
    year: 2015,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Yorgos Lanthimos's deadpan dystopia — in a world where single people must find a partner or be turned into an animal, a man escapes to the forest and finds the rules no better there. Absurd and devastating."
  },
  {
    title: "Son of Saul",
    year: 2015,
    type: "movie",
    language: "hu",
    tags: ["critics"],
    curatorNote: "László Nemes's suffocating, formally radical Holocaust film — a Sonderkommando in Auschwitz pursues a single impossible task while the camera holds close to his face and keeps everything else at the edge of sight."
  },
  {
    title: "Carol",
    year: 2015,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Todd Haynes adapts Patricia Highsmith — Cate Blanchett and Rooney Mara in a 1950s love story filtered through the sad glamour of department stores and motels. A film of immense, restrained feeling."
  },

  // ── 2014 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Boyhood",
    year: 2014,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Filmed over twelve years with the same cast — Richard Linklater's real-time portrait of an American childhood. Not a gimmick; a film that makes you feel time passing in your body."
  },
  {
    title: "Leviathan",
    year: 2014,
    type: "movie",
    language: "ru",
    tags: ["critics"],
    curatorNote: "Andrei Zvyagintsev's Cannes Best Screenplay winner — a man fights to keep his home on the Barents Sea against a corrupt mayor. A modern Job story set against Russia's most crushing landscapes."
  },

  // ── 2013 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "12 Years a Slave",
    year: 2013,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Steve McQueen's Best Picture winner — Solomon Northup's memoir of being kidnapped and enslaved. A film that refuses to look away and demands the same of its audience."
  },
  {
    title: "Ida",
    year: 2013,
    type: "movie",
    language: "pl",
    tags: ["critics", "surprise"],
    curatorNote: "Pawel Pawlikowski's Oscar winner — a young Polish nun discovers, on the eve of taking her vows, that she is Jewish. Shot in luminous black-and-white Academy ratio. A small film of immense gravity."
  },

  // ── 2012 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Amour",
    year: 2012,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Michael Haneke's Palme d'Or and Oscar winner — an elderly Parisian couple, a stroke, and the slow, merciless reality of love in the face of decline. The most honest film ever made about old age."
  },
  {
    title: "The Master",
    year: 2012,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Paul Thomas Anderson's study of a charismatic cult leader and the broken veteran he takes under his wing — Joaquin Phoenix and Philip Seymour Hoffman in a film about power, need and the American void."
  },

  // ── 2011 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Artist",
    year: 2011,
    type: "movie",
    language: "fr",
    tags: ["critics", "crowd"],
    curatorNote: "Michel Hazanavicius's silent black-and-white love letter to Hollywood's golden age — Jean Dujardin and Bérénice Bejo in a film about a silent movie star undone by the talkies and the woman who rises as he falls. Five Oscars including Best Picture."
  },
  {
    title: "Take This Waltz",
    year: 2011,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Sarah Polley's film about the gap between the life you have and the life you imagine — Michelle Williams as a married woman drawn toward her attractive neighbour. A film that refuses to make desire simple or its consequences comfortable."
  },
  {
    title: "A Separation",
    year: 2011,
    type: "movie",
    language: "fa",
    tags: ["critics", "crowd"],
    curatorNote: "Asghar Farhadi's Oscar winner — an Iranian couple's divorce spirals into a legal case with no innocent parties. A film so fair to every character it feels like life itself."
  },
  {
    title: "The Tree of Life",
    year: 2011,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Terrence Malick's Palme d'Or winner — a 1950s Texas childhood and the origin of the universe, woven together. A film about grace versus nature that requires you to surrender to it rather than watch it."
  },
  {
    title: "The Help",
    year: 2011,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Set in early 1960s Jackson, Mississippi — a young white writer gives voice to the Black maids who raised the city's children. A crowd-pleasing film whose performances are larger than its cautious politics."
  },

  // ── 2010 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Incendies",
    year: 2010,
    type: "movie",
    language: "fr",
    tags: ["critics", "crowd"],
    curatorNote: "Denis Villeneuve adapts Wajdi Mouawad's play — twins follow their dead mother's instructions into the Middle East and discover a past of impossible violence. A mystery that earns its devastating reveal."
  },

  // ── 2009 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "An Education",
    year: 2009,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Lynn Barber's memoir becomes Lone Scherfig's elegant film — a schoolgirl in 1960s London seduced by an older charmer who promises a shortcut to the life she wants. Carey Mulligan's finest performance."
  },
  {
    title: "The White Ribbon",
    year: 2009,
    type: "movie",
    language: "de",
    tags: ["critics"],
    curatorNote: "Michael Haneke's Palme d'Or winner — a German village in 1913, on the eve of war, where strange accidents begin to happen. A meditation on the origins of evil in righteousness and obedience."
  },
  {
    title: "A Prophet",
    year: 2009,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Jacques Audiard's Cannes Grand Prix winner — a young Arab man enters a French prison with nothing and exits six years later having built an empire. One of the greatest prison films ever made."
  },

  // ── 2007 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "There Will Be Blood",
    year: 2007,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Paul Thomas Anderson's American myth — Daniel Day-Lewis as an oil prospector consuming everything around him, including himself. A film about capitalism and religion as twin forms of madness."
  },
  {
    title: "4 Months, 3 Weeks and 2 Days",
    year: 2007,
    type: "movie",
    language: "ro",
    tags: ["critics"],
    curatorNote: "Cristian Mungiu's Palme d'Or winner — a woman helps her roommate obtain an illegal abortion in Ceaușescu's Romania. Filmed in long, unbroken takes. Tense, moral and utterly uncompromising."
  },

  // ── 2006 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Lives of Others",
    year: 2006,
    type: "movie",
    language: "de",
    tags: ["critics", "crowd"],
    curatorNote: "Florian Henckel von Donnersmarck's Oscar winner — a Stasi agent surveilling a playwright in East Berlin begins to be changed by what he hears. A thriller about art, surveillance and the capacity for conscience."
  },
  {
    title: "Pan's Labyrinth",
    year: 2006,
    type: "movie",
    language: "es",
    tags: ["critics", "crowd", "surprise"],
    curatorNote: "Guillermo del Toro's fairy tale set against Franco's Spain — a girl escapes into a labyrinth of dark magic while fascism closes in above ground. A film about the necessity and cost of imagination."
  },
  {
    title: "The Piano Teacher",
    year: 2001,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Michael Haneke adapts Elfriede Jelinek — Isabelle Huppert as a conservatory professor whose repressed inner life erupts into obsession and self-destruction. Extremity in the service of devastating precision."
  },

  // ── 2005 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Caché",
    year: 2005,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Michael Haneke's surveillance thriller — a bourgeois Parisian family receives anonymous tapes of their own home being watched. A film about guilt, colonial memory and the violence of looking away."
  },

  // ── 2004 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd", "surprise"],
    curatorNote: "Michel Gondry and Charlie Kaufman's love story told backwards through a memory-erasure procedure — what happens when you try to remove a person from your mind, and why some things cannot be undone."
  },

  // ── 2003 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "Dogville",
    year: 2003,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Lars von Trier's theater-on-film — a woman takes refuge in a small American town with devastating consequences, played out on a chalk-lined stage. A parable about charity and its betrayal."
  },

  // ── 2002 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "City of God",
    year: 2002,
    type: "movie",
    language: "pt",
    tags: ["critics", "crowd"],
    curatorNote: "Fernando Meirelles's furious chronicle of Rio's Cidade de Deus favela from the 1960s through the 1980s — one of the most kinetically alive films ever made, and one of the most enraging."
  },
  {
    title: "Talk to Her",
    year: 2002,
    type: "movie",
    language: "es",
    tags: ["critics", "surprise"],
    curatorNote: "Pedro Almodóvar's most mysterious film — two men watch over two women in comas. About male devotion, female silence and what happens in the space between. His most morally complex work."
  },

  // ── 2001 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Peter Jackson's adaptation of Tolkien's first volume — a genuine achievement in world-building and ensemble filmmaking that proved literary fantasy could carry the full emotional weight of epic cinema."
  },

  // ── 2000 RELEASES ──────────────────────────────────────────────────────────

  {
    title: "The Taste of Others",
    year: 2000,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Agnès Jaoui's ensemble comedy-drama about a boorish industrialist who becomes obsessed with an actress and discovers art for the first time — and the collision between his world and hers. César winner for Best Film. Sharp, warm and deeply human."
  },
  {
    title: "Yi Yi",
    year: 2000,
    type: "movie",
    language: "zh",
    tags: ["critics"],
    curatorNote: "Edward Yang's three-hour portrait of a Taipei family across one year — a dying grandfather, a mid-life crisis, a child discovering truth. The most comprehensive film about ordinary life ever made."
  },
  {
    title: "In the Mood for Love",
    year: 2000,
    type: "movie",
    language: "zh",
    tags: ["critics"],
    curatorNote: "Wong Kar-wai's most achingly beautiful film — two neighbors in 1962 Hong Kong discover their spouses are having an affair. Slow motion, dress fabric, the smell of a stairwell. Pure cinema."
  },
  {
    title: "Amores perros",
    year: 2000,
    type: "movie",
    language: "es",
    tags: ["critics", "crowd"],
    curatorNote: "Alejandro González Iñárritu's debut — three stories collide in a Mexico City car crash. Raw, furious and unmistakable: the film that announced a new voice in world cinema."
  },

  // ── PRE-2000 CLASSICS ──────────────────────────────────────────────────────

  {
    title: "All About My Mother",
    year: 1999,
    type: "movie",
    language: "es",
    tags: ["critics", "crowd"],
    curatorNote: "Almodóvar at his most generous — a woman goes to Barcelona after her son's death and finds a community of extraordinary women. His most beloved film, and his Oscar winner for Best International Film."
  },
  {
    title: "Boys Don't Cry",
    year: 1999,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Kimberly Peirce's debut — Hilary Swank's Oscar-winning portrayal of Brandon Teena, a trans man in Nebraska whose life ends in violence. A film of rage, tenderness and unforgettable courage."
  },
  {
    title: "Rosetta",
    year: 1999,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "The Dardenne brothers' Palme d'Or winner — a Belgian teenager fights for any job at all with a desperation that never tips into sentimentality. Cinema of the body, all forward motion and refusal."
  },
  {
    title: "Central Station",
    year: 1998,
    type: "movie",
    language: "pt",
    tags: ["critics", "crowd"],
    curatorNote: "Walter Salles's road movie across Brazil — a cynical letter-writer and an orphaned boy in search of a father he's never met. A film about unexpected grace that never cheats to earn its feeling."
  },
  {
    title: "Taste of Cherry",
    year: 1997,
    type: "movie",
    language: "fa",
    tags: ["critics", "surprise"],
    curatorNote: "Abbas Kiarostami's Palme d'Or winner — a man drives through the hills outside Tehran asking strangers to help him bury himself after he's gone. A film about the will to live that contains no easy answers."
  },
  {
    title: "The English Patient",
    year: 1996,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Anthony Minghella's Best Picture winner — a burned man in an Italian villa, his nurse, and the memory of a great love affair in North Africa unspooling across a war. Ravishing and elegiac."
  },
  {
    title: "Secrets & Lies",
    year: 1996,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Mike Leigh's Palme d'Or winner — a Black woman adopted at birth traces her birth mother, a white working-class woman in East London. One of the most truthful films about family and denial ever made."
  },
  {
    title: "La Haine",
    year: 1995,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Mathieu Kassovitz's 24-hour portrait of three young men in the banlieues after a police beating. Shot in black and white. Nothing has dated. The most important French film of its decade."
  },
  {
    title: "Sense and Sensibility",
    year: 1995,
    type: "movie",
    language: "en",
    tags: ["crowd", "critics"],
    curatorNote: "Emma Thompson's Oscar-winning adaptation of Austen — also starring Thompson, Kate Winslet and Hugh Grant. A costume film that is actually about money, disappointment and the women who survive both."
  },
  {
    title: "Breaking the Waves",
    year: 1996,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Lars von Trier's most human film — Emily Watson as a naive Scottish woman who believes God has told her to sacrifice herself for her paralyzed husband. Devastating and unforgettable."
  },
  {
    title: "The Double Life of Véronique",
    year: 1991,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Krzysztof Kieślowski's mystery — two women in Poland and France, one of them feeling the other's existence without explanation. A film of pure sensation and the most beautiful score Zbigniew Preisner ever wrote."
  },
  {
    title: "Raise the Red Lantern",
    year: 1991,
    type: "movie",
    language: "zh",
    tags: ["critics", "crowd"],
    curatorNote: "Zhang Yimou's color-drenched masterwork — a young woman becomes the fourth wife of a rich man and is slowly consumed by ritual and competition. One of the most formally perfect films in world cinema."
  },
  {
    title: "Goodfellas",
    year: 1990,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Scorsese's biography of Henry Hill — the funniest and most kinetically alive film about organized crime ever made. Also the one that makes the glamour most horrifying by making you want it most."
  },
  {
    title: "Truly Madly Deeply",
    year: 1990,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Anthony Minghella's British gem — Juliet Stevenson as a woman paralyzed by grief for her dead partner, until he returns as a ghost and she must learn to let go. One of the most honest films about loss and recovery, and a love story of extraordinary feeling."
  },
  {
    title: "Hannah and Her Sisters",
    year: 1986,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Woody Allen's ensemble masterpiece — three sisters, their loves and their parents over two Thanksgivings. Michael Caine, Mia Farrow, Dianne Wiest (Oscar), Barbara Hershey. One of American cinema's warmest and most humane portraits of a family in motion."
  },
  {
    title: "Local Hero",
    year: 1983,
    type: "movie",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Bill Forsyth's Scottish comedy — an American oil company executive arrives in a remote Highland village to buy it for a refinery and finds himself enchanted instead. Gentle, melancholy and quietly magical; the film that Mark Knopfler scored and nobody forgets."
  },
  {
    title: "Fanny and Alexander",
    year: 1982,
    type: "movie",
    language: "sv",
    tags: ["critics"],
    curatorNote: "Ingmar Bergman's valediction — a wealthy Swedish family's Christmas and the catastrophe that follows, seen through children's eyes. His most generous film and his most irreplaceable."
  },
  {
    title: "Raging Bull",
    year: 1980,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Scorsese and De Niro's portrait of Jake LaMotta — black-and-white boxing as a metaphor for a man who can only understand love as violence. Cinema's most unsparing self-portrait."
  },
  {
    title: "Apocalypse Now",
    year: 1979,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Coppola's Vietnam-era Heart of Darkness — a journey upriver that becomes a journey into madness. One of the most audacious productions in Hollywood history, and one of its greatest films."
  },
  {
    title: "Rocky",
    year: 1976,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Sylvester Stallone wrote and starred in this Best Picture winner about a small-time Philadelphia boxer given one shot at the title. Still the most emotionally generous sports film ever made."
  },
  {
    title: "A Woman Under the Influence",
    year: 1974,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "John Cassavetes's most accessible film — Gena Rowlands's shattering portrait of a working-class woman labeled 'crazy' for feeling too much. One of the great performances in American cinema."
  },
  {
    title: "The Godfather Part II",
    year: 1974,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Coppola's sequel that surpasses the original — Michael Corleone's moral collapse intercut with his father's immigrant rise. Al Pacino and Robert De Niro. The peak of American cinema."
  },
  {
    title: "Cries and Whispers",
    year: 1972,
    type: "movie",
    language: "sv",
    tags: ["critics"],
    curatorNote: "Bergman's most harrowing film — three sisters and a servant in a manor house as one of them dies slowly. Shot in deep reds and absolute silence. About death, love and the failure of compassion."
  },
  {
    title: "The Godfather",
    year: 1972,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Coppola's Best Picture winner — the Corleone family saga that redefined American cinema. Brando, Pacino, Keaton, Duvall. A film about power, family and succession that has never been equalled."
  },
  {
    title: "Aguirre, the Wrath of God",
    year: 1972,
    type: "movie",
    language: "de",
    tags: ["critics", "surprise"],
    curatorNote: "Werner Herzog and Klaus Kinski on the Amazon — a 16th century conquistador descends into madness pursuing El Dorado. A film made under conditions as extreme as the obsession it portrays."
  },
  {
    title: "The Magnificent Ambersons",
    year: 1942,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Orson Welles's follow-up to Citizen Kane — a wealthy Midwestern family's decline as the automobile age arrives. Butchered by the studio, yet still one of American cinema's defining tragedies."
  },
  {
    title: "Citizen Kane",
    year: 1941,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Orson Welles's debut — a newspaper magnate's life assembled in fragments after his death. The film that invented modern cinematography and still feels like it was made yesterday."
  },
  {
    title: "M",
    year: 1931,
    type: "movie",
    language: "de",
    tags: ["critics", "crowd"],
    curatorNote: "Fritz Lang's first sound film — Peter Lorre as a child murderer hunted by both the police and the Berlin underworld. A masterwork of suspense, sympathy and the terrifying logic of mob justice."
  },
  {
    title: "The Passion of Joan of Arc",
    year: 1928,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Carl Theodor Dreyer's silent masterpiece — Renée Jeanne Falconetti's face in extreme close-up as Joan is questioned, condemned and burned. The greatest performance in silent cinema."
  },

  // ── CLASSICS: pre-2000 (already in file, now with proper fields) ────────────

  {
    title: "The Shawshank Redemption",
    year: 1994,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Frank Darabont's adaptation of Stephen King's novella — a wrongly convicted man and his friend survive Shawshank State Penitentiary through hope, friendship and patience. The most loved film on earth for a reason."
  },
  {
    title: "Titanic",
    year: 1997,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "James Cameron's Best Picture winner — the doomed love story of Jack and Rose aboard the most famous ship in history. The highest-grossing film of its era and still one of cinema's great populist achievements."
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Quentin Tarantino's Palme d'Or winner — interconnected Los Angeles stories told in fractured chronology. The film that redefined independent cinema and made everything that followed it possible."
  },
  {
    title: "Forrest Gump",
    year: 1994,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Robert Zemeckis's Zelig-like odyssey through American history — Tom Hanks as a man of limited intellect and unlimited heart who keeps landing at the center of the 20th century's great moments."
  },
  {
    title: "Three Colors: Blue",
    year: 1993,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Kieślowski's most personal film — Juliette Binoche as a woman who loses her composer husband and child and attempts to live in perfect freedom from memory and feeling. A study in grief as abstraction."
  },
  {
    title: "The Piano",
    year: 1993,
    type: "movie",
    language: "en",
    tags: ["critics"],
    curatorNote: "Jane Campion's Palme d'Or and Oscar winner — Holly Hunter as a mute Scottish woman sold into marriage in 19th century New Zealand, who speaks through her piano. Desire, colonialism and female will."
  },
  {
    title: "Farewell My Concubine",
    year: 1993,
    type: "movie",
    language: "zh",
    tags: ["critics"],
    curatorNote: "Chen Kaige's co-winner of the Palme d'Or — two Peking opera performers across fifty years of Chinese history, from civil war through Cultural Revolution. Love, ambition and the cost of survival."
  },
  {
    title: "Dead Poets Society",
    year: 1989,
    type: "movie",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Peter Weir's prep school drama — Robin Williams as an English teacher who tells his boys to seize the day, with consequences no one foresaw. The film that made 'O Captain, my Captain' part of the language."
  },
  {
    title: "Rome, Open City",
    year: 1945,
    type: "movie",
    language: "it",
    tags: ["critics"],
    curatorNote: "Roberto Rossellini's neorealist landmark — shot in the streets of Rome weeks after liberation, with non-professional actors, about the Resistance under Nazi occupation. The birth of a new cinema."
  },
  {
    title: "Children of Paradise",
    year: 1945,
    type: "movie",
    language: "fr",
    tags: ["critics", "crowd"],
    curatorNote: "Marcel Carné's epic of the Paris theater world — made in secret during the German occupation, about four men who love the same woman. The most beloved French film ever made."
  },
  {
    title: "Brief Encounter",
    year: 1945,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "David Lean and Celia Johnson — a married woman and a doctor fall in love in railway station tea rooms. The most English of love stories: about what is not done, not said, and not destroyed."
  },
  {
    title: "Lawrence of Arabia",
    year: 1962,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "David Lean's Best Picture winner — Peter O'Toole as T.E. Lawrence, the British officer who became a desert legend. The greatest widescreen film ever made, and a portrait of charisma as self-destruction."
  },
  {
    title: "The Leopard",
    year: 1963,
    type: "movie",
    language: "it",
    tags: ["critics"],
    curatorNote: "Luchino Visconti adapts Lampedusa — Burt Lancaster as a Sicilian prince watching the world that made him dissolve in the unification of Italy. The most magnificent film about decline ever made."
  },
  {
    title: "La Dolce Vita",
    year: 1960,
    type: "movie",
    language: "it",
    tags: ["critics", "crowd"],
    curatorNote: "Fellini's portrait of Rome's jet set through the eyes of a gossip journalist — Marcello Mastroianni in the role that defined an era. Seven nights in the city, each one emptier than the last."
  },
  {
    title: "Hiroshima mon amour",
    year: 1959,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    curatorNote: "Alain Resnais's debut, scripted by Marguerite Duras — a French actress and a Japanese architect meet in Hiroshima fourteen years after the bomb. The film that invented the modern memory-structure of cinema."
  },
  {
    title: "The 400 Blows",
    year: 1959,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Truffaut's debut — Antoine Doinel, twelve years old, unwanted at home and incomprehended at school. The film that launched the French New Wave and is still its most human document."
  },
  {
    title: "Pather Panchali",
    year: 1955,
    type: "movie",
    language: "bn",
    tags: ["critics"],
    curatorNote: "Satyajit Ray's debut — a Bengali family's poverty, beauty and slow dissolution, filmed with a camera borrowed on weekends. One of the greatest directorial debuts in the history of cinema."
  },
  {
    title: "Sansho the Bailiff",
    year: 1954,
    type: "movie",
    language: "ja",
    tags: ["critics"],
    curatorNote: "Kenji Mizoguchi's most devastating film — a governor's children are sold into slavery in feudal Japan. A film about injustice, dignity and the possibility of mercy that ends in absolute desolation."
  },
  {
    title: "Tokyo Story",
    year: 1953,
    type: "movie",
    language: "ja",
    tags: ["critics"],
    curatorNote: "Yasujirō Ozu's masterpiece — elderly parents visit their grown children in Tokyo and discover they are inconvenient. The film critics most often name as the greatest ever made."
  },
  {
    title: "Ikiru",
    year: 1952,
    type: "movie",
    language: "ja",
    tags: ["critics", "crowd"],
    curatorNote: "Kurosawa's most humanist film — a Tokyo bureaucrat learns he is dying and decides, for the first time, to do something that matters. One of cinema's most moving meditations on the meaning of a life."
  },
  {
    title: "The Seventh Seal",
    year: 1957,
    type: "movie",
    language: "sv",
    tags: ["critics"],
    curatorNote: "Ingmar Bergman's medieval allegory — a knight returning from the Crusades plays chess with Death. Every image iconic, every question unanswered. The film that made world cinema possible in the modern sense."
  },
  {
    title: "Wild Strawberries",
    year: 1957,
    type: "movie",
    language: "sv",
    tags: ["critics"],
    curatorNote: "Bergman's most accessible film — an elderly professor drives to receive an honorary degree and revisits his past. A meditation on regret, memory and the things we understand too late."
  },
  {
    title: "12 Angry Men",
    year: 1957,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Sidney Lumet's debut — twelve jurors in a sweltering room, one of them refusing to convict without thinking. A film about reasonable doubt that is also about class, race and the machinery of democracy."
  },
  {
    title: "Bicycle Thieves",
    year: 1948,
    type: "movie",
    language: "it",
    tags: ["critics"],
    curatorNote: "Vittorio De Sica's neorealist landmark — a Roman worker's bicycle is stolen, and he and his young son spend a day trying to find it. The simplest and most heartbreaking story in cinema."
  },
  {
    title: "Jeanne Dielman, 23 quai du Commerce, 1080 Bruxelles",
    year: 1975,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Chantal Akerman's landmark — three days in the life of a Brussels widow who cooks, cleans and prostitutes herself in exact routine, until a small disruption shatters everything. Voted #1 in the 2022 Sight & Sound poll. Cinema will never be the same."
  },
  {
    title: "Beau Travail",
    year: 1998,
    type: "movie",
    language: "fr",
    tags: ["critics", "surprise"],
    tmdbId: 1422,
    curatorNote: "Claire Denis's adaptation of Melville's Billy Budd — French Foreign Legionnaires in Djibouti, male desire and violence rendered as pure choreography. The final scene is one of cinema's most euphoric moments. #7 in the 2022 Sight & Sound poll."
  },
  {
    title: "Au Hasard Balthazar",
    year: 1966,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Robert Bresson's masterpiece — the life of a donkey in rural France, passed between hands good and cruel. Godard called it the world in 90 minutes. There is no more spiritually serious film."
  },
  {
    title: "The Battle of Algiers",
    year: 1966,
    type: "movie",
    language: "fr",
    tags: ["critics"],
    curatorNote: "Gillo Pontecorvo's docudrama — the Algerian independence movement from the inside. Shot to look like newsreel footage it fooled actual newsreel footage. Still screened at the Pentagon."
  },
  {
    title: "Persona",
    year: 1966,
    type: "movie",
    language: "sv",
    tags: ["critics", "surprise"],
    curatorNote: "Bergman's most radical film — an actress who stops speaking and her nurse slowly exchange identities. A film that deconstructs itself on screen. The starting point of a thousand graduate theses."
  },
  {
    title: "The Graduate",
    year: 1967,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Mike Nichols's landmark — Dustin Hoffman as Benjamin Braddock, seduced by Anne Bancroft's Mrs. Robinson and falling for her daughter. A film about a generation's paralysis and yearning, scored by Simon & Garfunkel, that invented a new language for American cinema."
  },
  {
    title: "The General",
    year: 1926,
    type: "movie",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Buster Keaton's Civil War comedy and the greatest action film of the silent era — a Confederate train engineer races to recover his beloved locomotive and his girl. Every stunt real, every frame precisely composed. The film that proves Keaton was a genius."
  },
];
