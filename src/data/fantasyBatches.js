// MY CINÉ — FANTASY MOVIES
// Flat array — all entries are direct children of FANTASY_EDITORIAL_BATCHES.
// NEVER wrap batches in sub-arrays. POOL_COUNT uses .length, never hardcoded.

export const FANTASY_EDITORIAL_BATCHES = [
  // B01
  { title: "Practical Magic 2", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "The long-awaited sequel reunites the beloved Owens sisters in a new chapter of witchy magic.", tmdbId: 1233894 },
  { title: "Harry Potter and the Prisoner of Azkaban", year: 2004, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Cuarón's dark, immersive chapter gave the franchise its artistic soul — still the pinnacle of the series.", tmdbId: 673 },
  { title: "The Wizard of Oz", year: 1939, type: "movie", language: "en", tags: ["classic"], curatorNote: "The definitive fantasy landmark — technicolor wonder and timeless heart that shaped everything after.", tmdbId: 630 },
  { title: "Pan's Labyrinth", year: 2006, type: "movie", language: "es", tags: ["passport"], curatorNote: "Del Toro's dark fairy tale set in post-war Spain is one of cinema's most haunting masterworks.", tmdbId: 1721 },
  { title: "I Kill Giants", year: 2017, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A deeply personal fantasy about grief disguised as a monster-slaying adventure. Quietly devastating.", tmdbId: 417497 },
  { title: "The Green Knight", year: 2021, type: "movie", language: "en", tags: ["critics"], curatorNote: "Dev Patel anchors David Lowery's lush, hypnotic retelling of Arthurian legend. Visually breathtaking.", tmdbId: 537915 },
  { title: "Stardust", year: 2007, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A gleefully swashbuckling fairy tale adventure with Robert De Niro's career-best comic turn.", tmdbId: 12437 },

  // B02
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Peter Jackson's staggering introduction to Middle-earth remains one of cinema's greatest achievements.", tmdbId: 120 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003, type: "movie", language: "en", tags: ["critics"], curatorNote: "The Oscar-sweeping finale is epic fantasy at its most overwhelming and emotionally complete.", tmdbId: 122 },
  { title: "The Thief of Bagdad", year: 1940, type: "movie", language: "en", tags: ["classic"], curatorNote: "Dazzling pre-CGI spectacle — flying horses, djinn and genies — that set the template for fantasy adventure.", tmdbId: 67375 },
  { title: "Baahubali: The Beginning", year: 2015, type: "movie", language: "te", tags: ["passport"], curatorNote: "The Indian epic that became a worldwide phenomenon — grand mythology on an impossible scale.", tmdbId: 290854 },
  { title: "The Fall", year: 2006, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Tarsem Singh's visually staggering fantasy — one of the most beautiful films ever photographed.", tmdbId: 12162 },
  { title: "Moana", year: 2016, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Disney's Polynesian odyssey is a gorgeous, emotionally resonant quest film with an iconic heroine.", tmdbId: 277834 },
  { title: "The Princess Bride", year: 1987, type: "movie", language: "en", tags: ["classic"], curatorNote: "The perfect fairy tale — adventure, romance and wit so perfectly balanced it defined the genre.", tmdbId: 2493 },

  // B03
  { title: "Pirates of the Caribbean: The Curse of the Black Pearl", year: 2003, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Johnny Depp's Jack Sparrow conjured a swashbuckling adventure that launched one of Disney's biggest franchises.", tmdbId: 22 },
  { title: "Jason and the Argonauts", year: 1963, type: "movie", language: "en", tags: ["classic"], curatorNote: "Ray Harryhausen's stop-motion skeleton battle remains one of cinema's most jaw-dropping practical effects sequences.", tmdbId: 11375 },
  { title: "The Secret of Kells", year: 2009, type: "movie", language: "en", tags: ["passport"], curatorNote: "Oscar-nominated Irish animated gem — painterly, meditative and unlike anything else in fantasy animation.", tmdbId: 21879 },
  { title: "Dave Made a Maze", year: 2017, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A wildly inventive low-budget delight — a man builds a cardboard maze and gets lost inside it. Pure imagination.", tmdbId: 445993 },
  { title: "Life of Pi", year: 2012, type: "movie", language: "en", tags: ["critics"], curatorNote: "Ang Lee's Oscar-winning visual poem asks the most profound question fantasy can pose: what is real?", tmdbId: 87827 },
  { title: "Dungeons & Dragons: Honor Among Thieves", year: 2023, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The best video game adaptation ever — charming, funny and thrillingly inventive. A sleeper cult classic.", tmdbId: 505642 },
  { title: "Willow", year: 1988, type: "movie", language: "en", tags: ["classic"], curatorNote: "Ron Howard's beloved quest fantasy remains a cherished relic of 1980s adventure cinema.", tmdbId: 12222 },

  // B04
  { title: "The Odyssey", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Christopher Nolan's epic brings Homer's poem to the screen with Matt Damon and universal critical acclaim. The cinematic event of 2026.", tmdbId: 950387 },
  { title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", year: 2005, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The beloved C.S. Lewis adaptation brought Aslan and the magical wardrobe to a new generation.", tmdbId: 3266 },
  { title: "The 7th Voyage of Sinbad", year: 1958, type: "movie", language: "en", tags: ["classic"], curatorNote: "Harryhausen's cyclops and skeleton warriors sparked the imaginations of a generation of filmmakers.", tmdbId: 10344 },
  { title: "The Tale of the Princess Kaguya", year: 2013, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Studio Ghibli's watercolor masterpiece — Isao Takahata's final film is a devastating Japanese folk tale.", tmdbId: 149870 },
  { title: "November", year: 2017, type: "movie", language: "et", tags: ["passport"], curatorNote: "Estonian folk-horror fantasy in luminous black and white — peasants, werewolves and a stolen plague spirit.", tmdbId: 434253 },
  { title: "The Shape of Water", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "Del Toro's Oscar-winning fairy tale about love across impossible difference — lush, strange and beautiful.", tmdbId: 399055 },
  { title: "Monty Python and the Holy Grail", year: 1975, type: "movie", language: "en", tags: ["classic"], curatorNote: "The most beloved comedy fantasy ever made. 50 years on, every line is still quotable.", tmdbId: 762 },

  // B05
  { title: "The Bride!", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Jessie Buckley stars in Maggie Gyllenhaal's feminist reimagining of Bride of Frankenstein — bold and electric.", tmdbId: 1005072 },
  { title: "Edward Scissorhands", year: 1990, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Tim Burton's most tender fantasy — a lonely outsider in a pastel suburb, yearning for connection.", tmdbId: 364 },
  { title: "Beauty and the Beast", year: 1946, type: "movie", language: "fr", tags: ["passport"], curatorNote: "Jean Cocteau's ethereal original is still the most dreamlike version of this fairy tale ever filmed.", tmdbId: 14104 },
  { title: "Border", year: 2018, type: "movie", language: "sv", tags: ["passport"], curatorNote: "Ali Abbasi's extraordinary Nordic fantasy — a border guard discovers her true nature in this Cannes prize-winner.", tmdbId: 506968 },
  { title: "A Monster Calls", year: 2016, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Bayona's grief fantasy with an ancient tree spirit is one of the most emotionally honest films about loss.", tmdbId: 258230 },
  { title: "Wings of Desire", year: 1987, type: "movie", language: "de", tags: ["passport"], curatorNote: "Wenders' luminous black-and-white Berlin fantasy — angels who long to feel. The original and still unsurpassed.", tmdbId: 10905 },
  { title: "Beetlejuice", year: 1988, type: "movie", language: "en", tags: ["classic"], curatorNote: "Tim Burton's anarchic ghost comedy — Michael Keaton's most unhinged performance, still wildly entertaining.", tmdbId: 4011 },

  // B06
  { title: "Wicked: For Good", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "The second half of Jon M. Chu's spectacular Wicked adaptation delivers the emotional payoff years in the making.", tmdbId: 402431 },
  { title: "Wicked", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Erivo and Grande are electrifying in this lush, exhilarating first chapter of the beloved musical.", tmdbId: 402431 },
  { title: "A Matter of Life and Death", year: 1946, type: "movie", language: "en", tags: ["classic"], curatorNote: "Powell and Pressburger's wartime fantasy is a ravishing argument for love over death. One of Britain's finest.", tmdbId: 11832 },
  { title: "Tumbbad", year: 2018, type: "movie", language: "hi", tags: ["passport"], curatorNote: "India's masterful Gothic horror-fantasy about greed and a forgotten god — stunning and deeply original.", tmdbId: 486954 },
  { title: "The Lure", year: 2015, type: "movie", language: "pl", tags: ["passport"], curatorNote: "Polish mermaid musical horror — genuinely like nothing else. Grindhouse meets Hans Christian Andersen.", tmdbId: 354537 },
  { title: "The Red Shoes", year: 1948, type: "movie", language: "en", tags: ["classic"], curatorNote: "Powell and Pressburger's incandescent ballet fantasy — cinema's most ravishing exploration of artistic obsession.", tmdbId: 12614 },
  { title: "Barbie", year: 2023, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Greta Gerwig's subversive blockbuster turned a plastic doll into the year's most talked-about cultural event.", tmdbId: 346698 },

  // B07
  { title: "How to Train Your Dragon", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Live-action remake of the beloved animated classic brings Hiccup and Toothless into thrilling photorealistic reality.", tmdbId: 1133490 },
  { title: "How to Train Your Dragon", year: 2010, type: "movie", language: "en", tags: ["crowd"], curatorNote: "DreamWorks Animation's finest hour — a soaring adventure about finding kinship in the most unlikely of places.", tmdbId: 10191 },
  { title: "The NeverEnding Story", year: 1984, type: "movie", language: "de", tags: ["passport"], curatorNote: "Wolfgang Petersen's beloved German fantasy still holds its power — Atreyu and Falcor are childhood mythology.", tmdbId: 3170 },
  { title: "Wolfwalkers", year: 2020, type: "movie", language: "en", tags: ["critics"], curatorNote: "Cartoon Saloon's breathtaking hand-drawn masterpiece — possibly the greatest animated film of the 2020s.", tmdbId: 441728 },
  { title: "Song of the Sea", year: 2014, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Tomm Moore's luminous Irish selkie fantasy is one of animation's most gorgeous and heartfelt achievements.", tmdbId: 228970 },
  { title: "Spirited Away", year: 2001, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Miyazaki's Oscar-winning masterpiece — the most imaginative fantasy world ever committed to animation.", tmdbId: 129 },
  { title: "Kubo and the Two Strings", year: 2016, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Laika's stop-motion epic is a gorgeous meditation on memory, loss and storytelling — criminally underseen.", tmdbId: 316029 },

  // B08
  { title: "Cinderella", year: 2015, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Kenneth Branagh's classical live-action Cinderella is a genuinely lovely, handsomely mounted fairy tale.", tmdbId: 259694 },
  { title: "Snow White and the Seven Dwarfs", year: 1937, type: "movie", language: "en", tags: ["classic"], curatorNote: "Disney's first animated feature is where the modern fairy tale film was born. Still remarkably vivid.", tmdbId: 408 },
  { title: "The Company of Wolves", year: 1984, type: "movie", language: "en", tags: ["critics"], curatorNote: "Neil Jordan's Angela Carter adaptation is a darkly feminist, surreal deconstruction of the werewolf fairy tale.", tmdbId: 25911 },
  { title: "The Love Witch", year: 2016, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Anna Biller's lush 1960s-style feminist fantasy about a witch seeking love is a visual and conceptual feast.", tmdbId: 387399 },
  { title: "Orlando", year: 1992, type: "movie", language: "en", tags: ["critics"], curatorNote: "Sally Potter's adaptation of Woolf's gender-fluid fantasy epic — Tilda Swinton is transcendent.", tmdbId: 10395 },
  { title: "Puss in Boots: The Last Wish", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "A jaw-dropping surprise that tackles mortality with more craft and wit than films ten times its budget. 95% on RT.", tmdbId: 315162 },
  { title: "Enchanted", year: 2007, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Amy Adams is pure joy in this charming meta-fairy tale where a princess stumbles into modern New York.", tmdbId: 4341 },

  // B09
  { title: "A Minecraft Movie", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "The box office juggernaut of 2025 — Jack Black's Steve launched a thousand memes and became a genuine phenomenon.", tmdbId: 890685 },
  { title: "Jumanji: Welcome to the Jungle", year: 2017, type: "movie", language: "en", tags: ["crowd"], curatorNote: "The surprise sequel that reinvented the franchise — Dwayne Johnson and Jack Black at their most entertaining.", tmdbId: 395991 },
  { title: "Clash of the Titans", year: 1981, type: "movie", language: "en", tags: ["classic"], curatorNote: "Harryhausen's swan song — Medusa, Kraken and Pegasus in the definitive Greek mythology adventure.", tmdbId: 11980 },
  { title: "Journey to the West: Conquering the Demons", year: 2013, type: "movie", language: "zh", tags: ["passport"], curatorNote: "Stephen Chow's anarchic reimagining of the Chinese classic mixes slapstick comedy with genuine fantasy menace.", tmdbId: 180986 },
  { title: "The Kid Who Would Be King", year: 2019, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Joe Cornish's underrated Arthurian update plants Excalibur in modern Britain. A delight for all ages.", tmdbId: 457799 },
  { title: "Excalibur", year: 1981, type: "movie", language: "en", tags: ["critics"], curatorNote: "John Boorman's operatic, chrome-armoured Arthurian epic is 45 years on arguably more enthralling than ever.", tmdbId: 977 },
  { title: "The Lego Movie", year: 2014, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Everything is awesome — Phil Lord and Chris Miller's anarchic toy-box fantasy was the comedy of the decade.", tmdbId: 137106 },

  // B10
  { title: "The Legend of Ochi", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "A visually lush creature fantasy from Isaiah Saxon — Willem Dafoe in a mysterious Carpathian world.", tmdbId: 1103574 },
  { title: "Where the Wild Things Are", year: 2009, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Spike Jonze's aching adaptation of Sendak's picture book — a deeply felt portrait of childhood loneliness.", tmdbId: 13549 },
  { title: "The Dark Crystal", year: 1982, type: "movie", language: "en", tags: ["classic"], curatorNote: "Jim Henson's wholly practical fantasy world remains a singular, irreplaceable achievement in world-building.", tmdbId: 11639 },
  { title: "Mia and the White Lion", year: 2018, type: "movie", language: "fr", tags: ["passport"], curatorNote: "A French-South African coming-of-age fantasy filmed over three real years with a genuine lion cub.", tmdbId: 487386 },
  { title: "The Water Man", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "David Oyelowo's directorial debut is a quiet, moving quest fantasy about a boy trying to save his dying mother.", tmdbId: 637563 },
  { title: "The Spirit of the Beehive", year: 1973, type: "movie", language: "es", tags: ["passport"], curatorNote: "Víctor Erice's Spanish masterpiece — a little girl in post-war Spain transfixed by Frankenstein. Profound.", tmdbId: 10530 },
  { title: "Paddington 2", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "The greatest sequel ever made? Many say so. Paddington's prison adventure is pure warmth and perfection.", tmdbId: 378236 },

  // B11
  { title: "Death of a Unicorn", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Paul Rudd and Jenna Ortega in a darkly comic creature fantasy about pharmaceutical greed and magical consequences.", tmdbId: 1196513 },
  { title: "Big Fish", year: 2003, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Tim Burton's most moving film — a son piecing together his father's fantastical stories is a eulogy for wonder.", tmdbId: 1278 },
  { title: "Harvey", year: 1950, type: "movie", language: "en", tags: ["classic"], curatorNote: "James Stewart and his invisible giant rabbit — the gentlest, most charming fantasy Hollywood ever produced.", tmdbId: 11022 },
  { title: "Undine", year: 2020, type: "movie", language: "de", tags: ["passport"], curatorNote: "Christian Petzold's contemporary German water-spirit myth is quietly devastating — romance, history and the uncanny.", tmdbId: 615665 },
  { title: "Brigsby Bear", year: 2017, type: "movie", language: "en", tags: ["surprise"], curatorNote: "One of the most original films of the 2010s — a man emerges from a cult and discovers the show he loves wasn't real.", tmdbId: 427641 },
  { title: "Being John Malkovich", year: 1999, type: "movie", language: "en", tags: ["critics"], curatorNote: "Kaufman and Jonze's deranged fantasy about a portal into John Malkovich's head is still the most original film of its era.", tmdbId: 492 },
  { title: "Swiss Army Man", year: 2016, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A corpse that farts and Daniel Radcliffe — the Daniels' debut is absurdist fantasy at its most fearlessly weird.", tmdbId: 334533 },

  // B12
  { title: "In the Lost Lands", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Dave Bautista and Milla Jovovich in Paul W.S. Anderson's George R.R. Martin adaptation — gritty dark fantasy.", tmdbId: 839033 },
  { title: "Conan the Barbarian", year: 1982, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Arnold Schwarzenegger's iconic sword-and-sorcery epic set the template for muscular 1980s fantasy filmmaking.", tmdbId: 11 },
  { title: "The Adventures of Prince Achmed", year: 1926, type: "movie", language: "de", tags: ["passport"], curatorNote: "Lotte Reiniger's 1926 silhouette animated masterpiece is the oldest surviving animated feature film. Astonishing.", tmdbId: 12200 },
  { title: "The Yin-Yang Master: Dream of Eternity", year: 2020, type: "movie", language: "zh", tags: ["passport"], curatorNote: "Chinese mythological fantasy of staggering visual ambition — an epic on a scale few Western films attempt.", tmdbId: 741067 },
  { title: "The Head Hunter", year: 2018, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A micro-budget medieval fantasy of genuine craft and dread — a lone warrior collecting the heads of monsters.", tmdbId: 535095 },
  { title: "The Northman", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "Robert Eggers' obsessively researched Viking revenge epic blurs the line between history and Norse mythology.", tmdbId: 639933 },
  { title: "Your Highness", year: 2011, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Danny McBride and James Franco in a gloriously crude medieval fantasy comedy. More fun than it has any right to be.", tmdbId: 45612 },

  // B13
  { title: "The Gorge", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Miles Teller and Anya Taylor-Joy guard opposite sides of a mysterious gorge — Apple TV+'s most-watched 2025 event film.", tmdbId: 1064213 },
  { title: "Constantine", year: 2005, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Keanu Reeves' dark supernatural thriller has only grown in cult esteem — a genuinely stylish occult fantasy.", tmdbId: 561 },
  { title: "The Devil and Daniel Webster", year: 1941, type: "movie", language: "en", tags: ["classic"], curatorNote: "Walter Huston as the Devil in this sublime, Oscar-winning American fantasy — underrated masterwork.", tmdbId: 42188 },
  { title: "The Wailing", year: 2016, type: "movie", language: "ko", tags: ["passport"], curatorNote: "Na Hong-jin's Korean supernatural horror-fantasy is a relentless, bewildering masterpiece of mounting dread.", tmdbId: 376292 },
  { title: "A Dark Song", year: 2016, type: "movie", language: "en", tags: ["surprise"], curatorNote: "A grieving mother performs an occult ritual with a magician in a Welsh farmhouse. Slow, intense and unforgettable.", tmdbId: 427659 },
  { title: "The Seventh Seal", year: 1957, type: "movie", language: "sv", tags: ["passport"], curatorNote: "Bergman's knight plays chess with Death during the Black Plague — the fantasy film that cinema grew up with.", tmdbId: 490 },
  { title: "Extra Ordinary", year: 2019, type: "movie", language: "en", tags: ["surprise"], curatorNote: "An Irish driving instructor with supernatural powers faces off against a has-been rock star in a delightfully warm comedy.", tmdbId: 574012 },

  // B14
  { title: "Ghostbusters", year: 1984, type: "movie", language: "en", tags: ["classic"], curatorNote: "The most beloved supernatural comedy ever made — Ramis, Murray and Aykroyd capturing lightning in a bottle.", tmdbId: 620 },
  { title: "The Ghost and Mrs. Muir", year: 1947, type: "movie", language: "en", tags: ["classic"], curatorNote: "Joseph L. Mankiewicz's luminous romantic ghost story is one of Old Hollywood's most achingly beautiful films.", tmdbId: 9828 },
  { title: "Kwaidan", year: 1964, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Masaki Kobayashi's anthology of Japanese ghost stories is a hypnotic, formally beautiful Cannes Prize winner.", tmdbId: 14537 },
  { title: "The Night House", year: 2020, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Rebecca Hall is stunning in this unsettling supernatural mystery — grief as gothic architecture. Far smarter than it appears.", tmdbId: 602211 },
  { title: "A Ghost Story", year: 2017, type: "movie", language: "en", tags: ["critics"], curatorNote: "David Lowery's slow, devastatingly moving meditation on grief, time and presence under a simple white sheet.", tmdbId: 418969 },
  { title: "What We Do in the Shadows", year: 2014, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Taika Waititi's mockumentary about flatmate vampires is a perfect comedy — every joke lands, every time.", tmdbId: 229297 },
  { title: "Beetlejuice Beetlejuice", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Tim Burton's long-awaited sequel brings Winona Ryder and Michael Keaton back to the Netherworld with gleeful chaos.", tmdbId: 933260 },

  // B15
  { title: "The Fantastic Four: First Steps", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Matt Shakman's retrofuturist take on Marvel's first family finally delivers the Fantastic Four film fans have waited for.", tmdbId: 617127 },
  { title: "Doctor Strange", year: 2016, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Marvel's most visually inventive film — Scott Derrickson's kaleidoscopic multiverse fantasy remains dazzling.", tmdbId: 284052 },
  { title: "Black Orpheus", year: 1959, type: "movie", language: "pt", tags: ["passport"], curatorNote: "Marcel Camus' Palme d'Or winner retells the Orpheus myth in Rio's Carnival — joyous and heartbreaking.", tmdbId: 5941 },
  { title: "Along with the Gods: The Two Worlds", year: 2017, type: "movie", language: "ko", tags: ["passport"], curatorNote: "South Korea's biggest box office hit of 2017 — a deceased man's soul faces 49 days of afterlife trials.", tmdbId: 451234 },
  { title: "Fast Color", year: 2018, type: "movie", language: "en", tags: ["surprise"], curatorNote: "An intimate, character-driven superhero drama with Gugu Mbatha-Raw — what would Marvel look like if it had restraint?", tmdbId: 461654 },
  { title: "Everything Everywhere All at Once", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "The Daniels' multiverse masterpiece swept the Oscars — a laundromat owner becomes the savior of every dimension.", tmdbId: 545611 },
  { title: "Thor: Ragnarok", year: 2017, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Taika Waititi reinvented Thor as an intergalactic gladiator comedy — the most purely fun Marvel film.", tmdbId: 284053 },

  // B16
  { title: "Mufasa: The Lion King", year: 2024, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Barry Jenkins' prequel to the Lion King gives Mufasa's origin story the emotional craft it deserves.", tmdbId: 762441 },
  { title: "The Jungle Book", year: 2016, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Jon Favreau's photorealistic reimagining is a technical marvel — arguably better than Disney's live-action remakes.", tmdbId: 278927 },
  { title: "The Jungle Book", year: 1942, type: "movie", language: "en", tags: ["classic"], curatorNote: "Alexander Korda's technicolor original — Sabu as Mowgli in lush, handsome pre-CGI colonial adventure.", tmdbId: 18907 },
  { title: "The Boy and the Heron", year: 2023, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Miyazaki's final film — labyrinthine, personal and unlike anything else. An Oscar-winning farewell to a master.", tmdbId: 508947 },
  { title: "The Secret of Roan Inish", year: 1994, type: "movie", language: "en", tags: ["surprise"], curatorNote: "John Sayles' quiet Irish selkie film is a perfectly crafted folk fantasy — gentle, mythic and deeply moving.", tmdbId: 10293 },
  { title: "Princess Mononoke", year: 1997, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Miyazaki's epic ecological war fantasy is one of the most ambitious animated films ever made.", tmdbId: 128 },
  { title: "Paddington", year: 2014, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Ben Whishaw's voice and Paul King's warm direction made Paddington a genuine modern classic for all ages.", tmdbId: 116149 },

  // B17
  { title: "Practical Magic", year: 1998, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Sandra Bullock and Nicole Kidman as witch sisters in Griffin Dunne's beloved romantic fantasy — warm and witchy.", tmdbId: 4191 },
  { title: "I Married a Witch", year: 1942, type: "movie", language: "en", tags: ["classic"], curatorNote: "René Clair's sparkling screwball fantasy with Veronica Lake laid the template for every bewitching-comedy since.", tmdbId: 39107 },
  { title: "Thelma", year: 2017, type: "movie", language: "no", tags: ["passport"], curatorNote: "Joachim Trier's Norwegian supernatural thriller is a Carrie for the 21st century — restrained, beautiful and disturbing.", tmdbId: 432534 },
  { title: "The Witch", year: 2015, type: "movie", language: "en", tags: ["critics"], curatorNote: "Robert Eggers' debut is a period-precise Puritan nightmare — the most genuinely frightening folk horror in years.", tmdbId: 280617 },
  { title: "Hocus Pocus", year: 1993, type: "movie", language: "en", tags: ["classic"], curatorNote: "The most beloved Halloween film outside of horror — Bette Midler's witch is an all-time camp icon.", tmdbId: 1120 },
  { title: "Guillermo del Toro's Pinocchio", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "Del Toro's Oscar-winning stop-motion masterpiece transforms a wooden puppet into the most profound anti-war fable.", tmdbId: 762504 },
  { title: "The Witches of Eastwick", year: 1987, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Nicholson as the Devil opposite Cher, Susan Sarandon and Michelle Pfeiffer — wild, excessive and irresistible.", tmdbId: 12636 },

  // B18
  { title: "Wonka", year: 2023, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Timothée Chalamet's origin story for Willy Wonka is a warm, inventive musical fantasy with a wonderful spirit.", tmdbId: 901362 },
  { title: "Charlie and the Chocolate Factory", year: 2005, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Tim Burton's eccentric, unsettling take on Dahl's classic with Johnny Depp is endlessly rewatchable and divisive.", tmdbId: 118 },
  { title: "The Red Balloon", year: 1956, type: "movie", language: "fr", tags: ["passport"], curatorNote: "Albert Lamorisse's 34-minute Palme d'Or winner is the most enchanting short fantasy film ever made.", tmdbId: 24557 },
  { title: "Amélie", year: 2001, type: "movie", language: "fr", tags: ["passport"], curatorNote: "Jeunet's irresistible Parisian fairy tale — Audrey Tautou meddling in strangers' happiness. Pure cinematic joy.", tmdbId: 194 },
  { title: "The Brand New Testament", year: 2015, type: "movie", language: "fr", tags: ["passport"], curatorNote: "Belgian fantasy in which God lives in Brussels and his daughter steals his sacred database — wild and wonderful.", tmdbId: 282957 },
  { title: "Poor Things", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "Yorgos Lanthimos' Frankenstein-inspired Oscar winner — Emma Stone reborn as an adult in a Victorian steampunk world.", tmdbId: 792307 },
  { title: "Penelope", year: 2006, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Christina Ricci as a girl born with a pig nose in a charming fairy tale about self-acceptance — small and sweet.", tmdbId: 14639 },

  // B19
  { title: "Three Thousand Years of Longing", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "George Miller's intimate Djinn fantasy stars Tilda Swinton and Idris Elba trading wishes and stories. Underrated.", tmdbId: 624860 },
  { title: "The Mummy", year: 1999, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Stephen Sommers' blockbuster adventure is pure popcorn joy — Brendan Fraser at peak charisma in the desert.", tmdbId: 564 },
  { title: "The Mask of Fu Manchu", year: 1932, type: "movie", language: "en", tags: ["classic"], curatorNote: "Pre-Code MGM excess — a lurid, outrageous adventure relic of 1930s pulp fantasy filmmaking.", tmdbId: 40667 },
  { title: "Tale of Tales", year: 2015, type: "movie", language: "it", tags: ["passport"], curatorNote: "Matteo Garrone's dark anthology of Neapolitan fairy tales — Salma Hayek, Vincent Cassel and Toby Jones in visceral myth.", tmdbId: 302528 },
  { title: "The Last Circus", year: 2010, type: "movie", language: "es", tags: ["surprise"], curatorNote: "Álex de la Iglesia's deranged Spanish fantasy about two clowns at war in Franco's Spain. Deeply strange. Unmissable.", tmdbId: 61418 },
  { title: "The City of Lost Children", year: 1995, type: "movie", language: "fr", tags: ["passport"], curatorNote: "Jeunet and Caro's bizarre, beautiful steampunk fantasy — a circus strongman seeks a stolen child in a dream city.", tmdbId: 902 },
  { title: "The Adventures of Baron Munchausen", year: 1988, type: "movie", language: "en", tags: ["classic"], curatorNote: "Terry Gilliam's gloriously unhinged fantasy epic — a Baron, his extraordinary companions and a war against reason.", tmdbId: 11620 },

  // B20 — New 2026 Films
  { title: "The Magic Faraway Tree", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Andrew Garfield and Rebecca Ferguson in Simon Farnaby's charming adaptation of Enid Blyton's beloved children's classic — warmly British.", tmdbId: 1024835 },
  { title: "Mortal Kombat II", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Karl Urban as Johnny Cage elevates this sequel into a genuinely entertaining fantasy epic. The fights fans dreamed of.", tmdbId: 939243 },
  { title: "Masters of the Universe", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Nicholas Galitzine as He-Man in Travis Knight's sincere sword-and-sandal adventure — surprisingly resonant.", tmdbId: 839033 },
  { title: "KPop Demon Hunters", year: 2025, type: "movie", language: "en", tags: ["new"], curatorNote: "Netflix's surprise 2025 smash — a girl band battles demons to save the world. Tight script, stunning animation, killer songs.", tmdbId: 1399581 },
  { title: "Spider-Man: Across the Spider-Verse", year: 2023, type: "movie", language: "en", tags: ["critics"], curatorNote: "8.6 on IMDB, 95% on RT — the most visually innovative animated film of the decade. Miles Morales' defining chapter.", tmdbId: 569094 },
  { title: "I Am Frankelda", year: 2026, type: "movie", language: "es", tags: ["passport"], curatorNote: "Mexico's first stop-motion animated feature — mentored by del Toro, set in 1866 Mexico. Gothic, original and beautiful.", tmdbId: 1188836 },
  { title: "Scarlet", year: 2026, type: "movie", language: "ja", tags: ["passport"], curatorNote: "Mamoru Hosoda's (Mirai, Wolf Children) latest animated fantasy from Sony Pictures Classics. A poet of animated cinema.", tmdbId: 1017455 },

  // B21 — New Passport & Discovery Additions
  { title: "The Hunger Games: Sunrise on the Reaping", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "The prequel revisiting Haymitch's Games — Josh Hutcherson returns in the most anticipated franchise film of late 2026.", tmdbId: 945961 },
  { title: "Dune: Part Three", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "Villeneuve closes his Dune trilogy — Paul Atreides as Emperor. Timothée Chalamet and Florence Pugh in the finale.", tmdbId: 1064213 },
  { title: "Another World", year: 2026, type: "movie", language: "zh", tags: ["passport"], curatorNote: "GKIDS Cantonese-language animated fantasy — a visually extraordinary Chinese production from a rising new voice.", tmdbId: 1199722 },
  { title: "Arco", year: 2026, type: "movie", language: "fr", tags: ["passport"], curatorNote: "NEON's French animated fantasy — a beautifully rendered hand-crafted world that recalls the golden age of European animation.", tmdbId: 1185511 },
  { title: "Labyrinth", year: 1986, type: "movie", language: "en", tags: ["classic"], curatorNote: "David Bowie and Jennifer Connelly in Jim Henson's timeless puppetry masterwork. Celebrating its 40th anniversary in 2026.", tmdbId: 11639 },
  { title: "The Sea Beast", year: 2022, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Netflix's gorgeous original fantasy — a sea monster hunter and a girl who stows away on his ship. Rousing and beautiful.", tmdbId: 718789 },
  { title: "The Little Mermaid", year: 1989, type: "movie", language: "en", tags: ["classic"], curatorNote: "The film that launched the Disney Renaissance — Ariel and Ursula, Sebastian and 'Under the Sea'. Timeless.", tmdbId: 10144 },

  // B22
  { title: "Forgotten Island", year: 2026, type: "movie", language: "en", tags: ["new"], curatorNote: "DreamWorks' Filipino folklore gem — two best friends fall through a portal to an island of mythical creatures. 95% on Rotten Tomatoes and an instant standout.", tmdbId: 1465063 },
  { title: "Onward", year: 2020, type: "movie", language: "en", tags: ["crowd"], curatorNote: "Pixar's suburban elf road movie — two brothers try to bring their dad back for one day. Unexpectedly emotional.", tmdbId: 508439 },
  { title: "The Thief of Bagdad", year: 1924, type: "movie", language: "en", tags: ["classic"], curatorNote: "Douglas Fairbanks' silent classic — grand-scale Arabian Nights fantasy with sets, effects and energy still thrilling today.", tmdbId: 11159 },
  { title: "Guillermo del Toro's Cabinet of Curiosities", year: 2022, type: "movie", language: "en", tags: ["critics"], curatorNote: "Del Toro curates eight dark fantasy horror tales — a showcase of visionary directors working at the top of their form.", tmdbId: 119534 },
  { title: "The Imaginarium of Doctor Parnassus", year: 2009, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Terry Gilliam's final Heath Ledger film — a travelling theatre whose mirror leads into other worlds. Gorgeous and melancholy.", tmdbId: 12192 },
  { title: "Tiger and the Snow", year: 2005, type: "movie", language: "it", tags: ["passport"], curatorNote: "Roberto Benigni's lyrical Italian fantasy — a poet crosses into war-torn Iraq for love. Tender and surreal.", tmdbId: 7549 },
  { title: "Mirrormask", year: 2005, type: "movie", language: "en", tags: ["surprise"], curatorNote: "Neil Gaiman and Dave McKean's hand-drawn fantasia — a circus girl escapes into a surreal world of her own creation.", tmdbId: 9412 },
];

export const FANTASY_POOL_COUNT = FANTASY_EDITORIAL_BATCHES.length;
