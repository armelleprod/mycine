// MY CINÉ — FANTASY TV SERIES
// Flat array — all entries are direct children of FANTASY_SERIES_EDITORIAL_BATCHES.
// NEVER wrap batches in sub-arrays. POOL_COUNT uses .length, never hardcoded.

export const FANTASY_SERIES_EDITORIAL_BATCHES = [
  // B01
  { title: "House of the Dragon", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Game of Thrones' prequel dives into the Targaryen civil war with fire, blood and dynastic intrigue at every turn.", tmdbId: 94997 },
  { title: "Game of Thrones", year: 2011, type: "tv", language: "en", tags: ["crowd"], curatorNote: "The epic that redefined prestige television — political treachery, dragons and a world where anyone can die.", tmdbId: 1399 },
  { title: "The Adventures of Sir Lancelot", year: 1956, type: "tv", language: "en", tags: ["classic"], curatorNote: "One of British television's earliest fantasy adventures — the Round Table on the small screen for the first time.", tmdbId: 40075 },
  { title: "Alchemy of Souls", year: 2022, type: "tv", language: "ko", tags: ["passport"], curatorNote: "Korean fantasy at its most lavish — souls swapping bodies, forbidden magic and a love story spanning lifetimes.", tmdbId: 203737 },
  { title: "The Dark Crystal: Age of Resistance", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Jim Henson's world reborn with breathtaking puppetry — a prequel that surpasses the source film. Criminally cancelled.", tmdbId: 71668 },
  { title: "Jonathan Strange & Mr Norrell", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Susanna Clarke's beloved novel translated with rare fidelity — two rival magicians in Regency England. Unmissable.", tmdbId: 61550 },
  { title: "Galavant", year: 2015, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A medieval musical comedy that shouldn't work and is absolutely glorious. Knights, songs and absurdist wit.", tmdbId: 61814 },

  // B02
  { title: "The Wheel of Time", year: 2021, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Robert Jordan's vast saga brought to life — a chosen hero, dark prophecies and a world on the edge of destruction.", tmdbId: 120168 },
  { title: "The Witcher", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Henry Cavill's monster-hunter navigates a morally murky world of politics, magic and creatures from dark folklore.", tmdbId: 71912 },
  { title: "Hercules: The Legendary Journeys", year: 1995, type: "tv", language: "en", tags: ["classic"], curatorNote: "The show that launched a thousand spin-offs — Kevin Sorbo's Hercules defined 90s fantasy television worldwide.", tmdbId: 1488 },
  { title: "Arthdal Chronicles", year: 2019, type: "tv", language: "ko", tags: ["passport"], curatorNote: "Korea's most ambitious fantasy epic — a Bronze Age world of warring tribes, prophecy and political empire-building.", tmdbId: 88356 },
  { title: "The Letter for the King", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A Dutch classic reimagined — a squire's impossible quest across a richly realized medieval world. Genuinely underrated.", tmdbId: 89530 },
  { title: "His Dark Materials", year: 2019, type: "tv", language: "en", tags: ["critics"], curatorNote: "Philip Pullman's magnificent trilogy given the adaptation it deserved — theology, parallel worlds and a brave girl.", tmdbId: 84773 },
  { title: "The Librarians", year: 2014, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Delightfully pulpy adventures protecting magical artifacts — the fun family fantasy series nobody talks about enough.", tmdbId: 62823 },

  // B03
  { title: "The Sandman", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Neil Gaiman's landmark comic finally realized on screen — Dream of the Endless, beautifully strange and faithful.", tmdbId: 90802 },
  { title: "Good Omens", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Tennant and Sheen are divine as an angel and demon preventing the apocalypse. Gaiman and Pratchett's wit made flesh.", tmdbId: 80752 },
  { title: "Dark Shadows", year: 1966, type: "tv", language: "en", tags: ["classic"], curatorNote: "The original gothic soap opera that launched a thousand vampire obsessions — haunted mansion, undead secrets and all.", tmdbId: 1800 },
  { title: "Hotel Del Luna", year: 2019, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A gorgeous Korean fantasy — a century-old hotel for wandering spirits, run by a woman cursed to tend the dead.", tmdbId: 88195 },
  { title: "The Living and the Dead", year: 2016, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A BBC supernatural gem set in Victorian Somerset — a farmer tormented by ghosts on his newly inherited estate.", tmdbId: 67789 },
  { title: "Penny Dreadful", year: 2014, type: "tv", language: "en", tags: ["critics"], curatorNote: "Victorian horror at its most literary — Frankenstein, Dorian Gray and Van Helsing sharing one magnificent nightmare.", tmdbId: 54595 },
  { title: "Dead Boy Detectives", year: 2024, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Two ghost schoolboys solve supernatural mysteries — charming, funny and surprisingly moving. A Sandman spin-off gem.", tmdbId: 229434 },

  // B04
  { title: "Percy Jackson and the Olympians", year: 2023, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Rick Riordan's vision finally realized — Walker Scobell leads a faithful, spirited adaptation of the beloved books.", tmdbId: 208867 },
  { title: "Merlin", year: 2008, type: "tv", language: "en", tags: ["crowd"], curatorNote: "The BBC's beloved reimagining of Arthurian legend — young Merlin, Prince Arthur and a kingdom learning to be great.", tmdbId: 1867 },
  { title: "The Storyteller", year: 1988, type: "tv", language: "en", tags: ["classic"], curatorNote: "Jim Henson and John Hurt bring dark European folk tales to life with extraordinary puppetry. Television at its most imaginative.", tmdbId: 15270 },
  { title: "The Uncanny Counter", year: 2020, type: "tv", language: "ko", tags: ["passport"], curatorNote: "Korean supernatural action at its best — demon hunters working as noodle restaurant staff. Wildly entertaining.", tmdbId: 113149 },
  { title: "The 10th Kingdom", year: 2000, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A father and daughter fall through a magic mirror into a fairy tale world. Epic, funny and deeply strange — pure cult.", tmdbId: 2330 },
  { title: "The Magicians", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Narnia and Harry Potter for adults — magic school, darker consequences and a wit that makes it feel genuinely fresh.", tmdbId: 63351 },
  { title: "Miracle Workers", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Steve Buscemi as a checked-out God, Daniel Radcliffe as his lowly angel. Absurdist fantasy comedy that keeps surprising.", tmdbId: 79190 },

  // B05
  { title: "The Rings of Power", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Amazon's billion-dollar Middle-earth epic takes the Second Age to screen — visually staggering, with a divided fanbase.", tmdbId: 84773 },
  { title: "Once Upon a Time", year: 2011, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Fairy tale characters living in a modern Maine town — a clever, beloved soap-fantasy that ran for seven gleeful seasons.", tmdbId: 39276 },
  { title: "Bewitched", year: 1964, type: "tv", language: "en", tags: ["classic"], curatorNote: "The original magical sitcom — a witch marrying a mortal and hiding her powers launched a genre that never stopped.", tmdbId: 1677 },
  { title: "The King's Affection", year: 2021, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A princess disguised as a crown prince — a lush Korean historical fantasy with romance, identity and political tension.", tmdbId: 128916 },
  { title: "Britannia", year: 2018, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Roman Britain meets Celtic druids in a psychedelic, wildly original historical fantasy. Completely its own strange thing.", tmdbId: 74466 },
  { title: "Carnivàle", year: 2003, type: "tv", language: "en", tags: ["critics"], curatorNote: "Depression-era America, a traveling carnival and a cosmic battle between good and evil. HBO at its most ambitious and uncanny.", tmdbId: 1221 },
  { title: "The Completely Made-Up Adventures of Dick Turpin", year: 2024, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Noel Fielding and Tamsin Greig in a gloriously silly highwayman comedy. British absurdism at its most charming.", tmdbId: 240472 },

  // B06
  { title: "The Changeling", year: 2023, type: "tv", language: "en", tags: ["critics"], curatorNote: "LaKeith Stanfield in a dark fairy tale about fatherhood — Apple TV+'s most ambitious and unsettling fantasy drama.", tmdbId: 206559 },
  { title: "American Gods", year: 2017, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Neil Gaiman's clash of old and new gods in modern America — visually audacious and thematically rich.", tmdbId: 67335 },
  { title: "The Ghost & Mrs. Muir", year: 1968, type: "tv", language: "en", tags: ["classic"], curatorNote: "A charming TV adaptation of the classic film — a widow and a sea captain's ghost sharing a cottage. Gentle, lovely television.", tmdbId: 42502 },
  { title: "The Guest", year: 2018, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A Korean supernatural thriller about possession — three strangers linked by the same demon. Dark, terrifying and compelling.", tmdbId: 83235 },
  { title: "The Third Day", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Jude Law stranded on a strange island — a folk horror series that aired a 12-hour live event and burrowed under the skin.", tmdbId: 109027 },
  { title: "The Leftovers", year: 2014, type: "tv", language: "en", tags: ["critics"], curatorNote: "Two percent of the world's population vanishes. Damon Lindelof's spiritual masterpiece about grief, faith and what remains.", tmdbId: 54344 },
  { title: "Pushing Daisies", year: 2007, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A pie maker who can bring the dead back to life. Whimsical, gorgeous and heartbreaking — cancelled far too soon.", tmdbId: 1621 },

  // B07
  { title: "My Lady Jane", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A revisionist Tudor fantasy — Lady Jane Grey survives and shape-shifters roam England. Funny, feminist and enormously fun.", tmdbId: 236325 },
  { title: "Outlander", year: 2014, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A WWII nurse falls through standing stones into 18th century Scotland. Time travel romance at its most addictive.", tmdbId: 56570 },
  { title: "The Adventures of Robin Hood", year: 1955, type: "tv", language: "en", tags: ["classic"], curatorNote: "Richard Greene's definitive Robin Hood — the BBC series that made the legend a television institution for a generation.", tmdbId: 4566 },
  { title: "The Red Sleeve", year: 2021, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A court lady who refuses to become a royal concubine — one of the finest Korean historical dramas ever made.", tmdbId: 146236 },
  { title: "The Pursuit of Love", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Emily Mortimer's adaptation of Nancy Mitford — a whimsical, romantic interwar fantasy. Lily James is radiant.", tmdbId: 115654 },
  { title: "The English", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Emily Blunt and Chaske Spencer in a stunning western — a BBC series about grief, revenge and the mythology of the American frontier.", tmdbId: 184552 },
  { title: "The Great", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An occasionally true story of Catherine the Great — anarchic, brutal, hilarious and absolutely not for the history-minded.", tmdbId: 106064 },

  // B08
  { title: "Willow", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Ron Howard's beloved 1988 film reimagined as a Disney+ series — the young warlock returns for a new generation of adventurers.", tmdbId: 118642 },
  { title: "Shadow and Bone", year: 2021, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Leigh Bardugo's Grishaverse brought to life — a mapmaker discovers world-altering powers in a Tsarist fantasy Russia.", tmdbId: 100088 },
  { title: "Land of the Giants", year: 1968, type: "tv", language: "en", tags: ["classic"], curatorNote: "Irwin Allen's imaginative sci-fi adventure — a spaceship crew stranded on a planet of enormous beings. 60s spectacle.", tmdbId: 2048 },
  { title: "The Silent Sea", year: 2021, type: "tv", language: "ko", tags: ["passport"], curatorNote: "Korean sci-fi fantasy on the moon — a research team uncovers a deadly secret at an abandoned lunar station.", tmdbId: 109978 },
  { title: "The Outpost", year: 2018, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A lone survivor of a massacre discovers she has powers and joins the defenders of the last outpost of civilization.", tmdbId: 77165 },
  { title: "The OA", year: 2016, type: "tv", language: "en", tags: ["critics"], curatorNote: "Brit Marling returns from the dead with a story no one believes — a reality-bending mystery that demands complete trust.", tmdbId: 67605 },
  { title: "Future Man", year: 2017, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Josh Hutcherson recruited by time-traveling warriors from a video game — irreverent, raunchy and genuinely inventive.", tmdbId: 70523 },

  // B09
  { title: "A Discovery of Witches", year: 2018, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A witch and a vampire's forbidden romance — Deborah Harkness's Oxford-set trilogy adapted with gorgeous atmospheric detail.", tmdbId: 83867 },
  { title: "The Vampire Diaries", year: 2009, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Two vampire brothers, one small town and a century of secrets — the guilty pleasure that defined a generation of teen fantasy.", tmdbId: 1405 },
  { title: "The Munsters", year: 1964, type: "tv", language: "en", tags: ["classic"], curatorNote: "America's most lovable monster family — the original gentle-giant comedy about outsiders finding belonging in suburbia.", tmdbId: 2309 },
  { title: "The Scholar Who Walks the Night", year: 2015, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A bookseller disguised as a man and a vampire scholar searching for a secret manuscript — lush Korean Gothic romance.", tmdbId: 63214 },
  { title: "The Secret Circle", year: 2011, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A girl discovers she's a witch and joins a coven in a small town with dark secrets — underrated teen fantasy with real bite.", tmdbId: 43516 },
  { title: "Interview with the Vampire", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "AMC's queer reimagining of Anne Rice's gothic novel — Jacob Anderson as Louis in a confession that rewrites the mythology.", tmdbId: 146311 },
  { title: "What We Do in the Shadows", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "New York's most hapless vampire flatmates — the mockumentary spin-off that became more beloved than the original film.", tmdbId: 83631 },

  // B10
  { title: "The Nevers", year: 2021, type: "tv", language: "en", tags: ["critics"], curatorNote: "Joss Whedon's Victorian women with unexplained abilities — an ambitious, original fantasy cut short before its resolution.", tmdbId: 105544 },
  { title: "The Umbrella Academy", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Adopted superhero siblings reunite to prevent the apocalypse — chaotic, inventive and enormously entertaining.", tmdbId: 75006 },
  { title: "The Champions", year: 1968, type: "tv", language: "en", tags: ["classic"], curatorNote: "Three secret agents given superhuman abilities by a Tibetan community — 60s British adventure fantasy at its most elegant.", tmdbId: 18416 },
  { title: "Moving", year: 2023, type: "tv", language: "ko", tags: ["passport"], curatorNote: "Korean superhero drama done with extraordinary emotional depth — parents hiding powers, children discovering them. Masterful.", tmdbId: 209867 },
  { title: "Warrior Nun", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A dead woman resurrected with an angelic artifact — pulpy, fun and better than anyone gave it credit for. Cancelled unjustly.", tmdbId: 104589 },
  { title: "Watchmen", year: 2019, type: "tv", language: "en", tags: ["critics"], curatorNote: "Damon Lindelof's continuation is one of TV's great achievements — a superhero meditation on American trauma and race.", tmdbId: 68243 },
  { title: "Extraordinary", year: 2023, type: "tv", language: "en", tags: ["surprise"], curatorNote: "In a world where everyone has a superpower, one woman got nothing — Jen's search for her ability is brilliantly funny.", tmdbId: 202730 },

  // B11
  { title: "Locke & Key", year: 2020, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Children discover magical keys hidden in their ancestral home — Joe Hill's comic series brought to life with real wonder.", tmdbId: 75006 },
  { title: "Stranger Things", year: 2016, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Hawkins, Indiana, the Upside Down and Eleven — Netflix's 80s-inflected fantasy redefined popular television for a decade.", tmdbId: 66732 },
  { title: "The Twilight Zone", year: 1959, type: "tv", language: "en", tags: ["classic"], curatorNote: "Rod Serling's anthology masterpiece — each episode a parable for the human condition. Television's most influential fantasy series.", tmdbId: 3216 },
  { title: "Sweet Home", year: 2020, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A suicidal young man trapped in an apartment building as humans transform into monsters — Korean horror fantasy done brilliantly.", tmdbId: 114836 },
  { title: "The Midnight Club", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Mike Flanagan's YA anthology — terminal teenagers tell horror stories at night in a hospice. Quietly devastating.", tmdbId: 191788 },
  { title: "The Haunting of Hill House", year: 2018, type: "tv", language: "en", tags: ["critics"], curatorNote: "Mike Flanagan's masterwork — five siblings haunted by their childhood home in a non-linear horror fantasy of grief and love.", tmdbId: 77390 },
  { title: "Los Espookys", year: 2019, type: "tv", language: "es", tags: ["passport"], curatorNote: "Spanish-language HBO comedy about friends who manufacture supernatural events — surrealist, bilingual and utterly original.", tmdbId: 86720 },

  // B12
  { title: "The Bastard Son & The Devil Himself", year: 2022, type: "tv", language: "en", tags: ["critics"], curatorNote: "Half-witch, half-hunter trying to survive in a world of magical politics — the Netflix series that deserved far more attention.", tmdbId: 206286 },
  { title: "Chilling Adventures of Sabrina", year: 2018, type: "tv", language: "en", tags: ["crowd"], curatorNote: "The darkest version of Sabrina — a teenage witch torn between her witch and mortal worlds. Stylish, feminist and creepy.", tmdbId: 76479 },
  { title: "Night Gallery", year: 1969, type: "tv", language: "en", tags: ["classic"], curatorNote: "Rod Serling's darker anthology follow-up — paintings that come to life as horror and fantasy vignettes. Underrated treasure.", tmdbId: 3222 },
  { title: "The School Nurse Files", year: 2020, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A Korean school nurse who can see jellyfish-like spirits — a quirky, gentle and deeply original supernatural drama.", tmdbId: 115988 },
  { title: "I Am Not Okay with This", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A teenager discovers telekinetic powers while navigating grief and first love — warm, sharp and over far too soon.", tmdbId: 90283 },
  { title: "Buffy the Vampire Slayer", year: 1997, type: "tv", language: "en", tags: ["critics"], curatorNote: "Joss Whedon's high school as metaphor — the most influential fantasy series ever made, still unmatched for wit and heart.", tmdbId: 95 },
  { title: "Crazyhead", year: 2016, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Two women who can see demons — Howard Overman's gleefully chaotic British horror comedy. Six perfect episodes.", tmdbId: 67302 },

  // B13
  { title: "The Quest", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Reality contestants enter a fully realized fantasy kingdom — the most imaginative reality series ever made. Completely absorbing.", tmdbId: 121897 },
  { title: "Legend of the Seeker", year: 2008, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Terry Goodkind's Sword of Truth series as a syndicated epic — earnest, sweeping and beloved by fans of old-school fantasy TV.", tmdbId: 1408 },
  { title: "The Adventures of Brisco County, Jr.", year: 1993, type: "tv", language: "en", tags: ["classic"], curatorNote: "Bruce Campbell as a Harvard-educated bounty hunter in the Old West — steampunk fantasy before steampunk existed. Cult perfection.", tmdbId: 1422 },
  { title: "The Longest Day in Chang'an", year: 2019, type: "tv", language: "zh", tags: ["passport"], curatorNote: "A disgraced Tang Dynasty officer has one day to prevent a terrorist attack — Chinese historical fantasy at its most intense.", tmdbId: 89145 },
  { title: "Knightfall", year: 2017, type: "tv", language: "en", tags: ["surprise"], curatorNote: "The Knights Templar and the Holy Grail — History Channel's ambitious medieval fantasy deserved a far longer run.", tmdbId: 72710 },
  { title: "The Last Kingdom", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Bernard Cornwell's Saxon stories — Uhtred of Bebbanburg's lifelong quest for his homeland. Gripping historical fantasy.", tmdbId: 60969 },
  { title: "Norsemen", year: 2016, type: "tv", language: "no", tags: ["passport"], curatorNote: "Norwegian Vikings with modern sensibilities — a pitch-perfect parody filmed simultaneously in Norwegian and English.", tmdbId: 67568 },

  // B14
  { title: "Wednesday", year: 2022, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Jenna Ortega IS Wednesday Addams at Nevermore Academy — the most watched Netflix series of its year for very good reason.", tmdbId: 119051 },
  { title: "The Addams Family", year: 1964, type: "tv", language: "en", tags: ["classic"], curatorNote: "The original macabre family — Gomez, Morticia and company remain one of television's most beloved fantasies. Still funny.", tmdbId: 2640 },
  { title: "The Addams Family", year: 1973, type: "tv", language: "en", tags: ["classic"], curatorNote: "The animated adventures of the Addams clan — a Saturday morning treasure that introduced a new generation to the family.", tmdbId: 11247 },
  { title: "Bring It On, Ghost", year: 2016, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A college student who sees ghosts teams up with a teenage spirit — breezy, charming Korean supernatural romantic comedy.", tmdbId: 66853 },
  { title: "The Irregulars", year: 2021, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Baker Street's street kids investigating supernatural cases — a darker, stranger Sherlock Holmes universe. Inventive and brief.", tmdbId: 110491 },
  { title: "Twin Peaks", year: 1990, type: "tv", language: "en", tags: ["critics"], curatorNote: "David Lynch's mystery that changed television forever — who killed Laura Palmer? The question that opened the door to darkness.", tmdbId: 1920 },
  { title: "Wellington Paranormal", year: 2018, type: "tv", language: "en", tags: ["surprise"], curatorNote: "The What We Do in the Shadows spin-off — New Zealand police investigating the supernatural in the driest possible way.", tmdbId: 75006 },

  // B15
  { title: "Renegade Nell", year: 2024, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Sally Wainwright's Disney+ swashbuckler — an 18th century woman with a tiny sprite companion and a score to settle.", tmdbId: 229220 },
  { title: "Sherlock", year: 2010, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Benedict Cumberbatch and Martin Freeman made Holmes and Watson feel entirely new. Television at its most brilliant.", tmdbId: 19885 },
  { title: "The Saint", year: 1962, type: "tv", language: "en", tags: ["classic"], curatorNote: "Roger Moore as Simon Templar — the suave adventurer who paved the way for Bond. Sixty years on, still enormously watchable.", tmdbId: 4750 },
  { title: "Lupin", year: 2021, type: "tv", language: "fr", tags: ["passport"], curatorNote: "Omar Sy's Assane Diop channels Arsène Lupin in modern Paris — the French heist thriller that conquered global streaming.", tmdbId: 96677 },
  { title: "Miss Scarlet and the Duke", year: 2020, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Victorian England's first female detective — a charming, witty mystery series that found its devoted audience slowly.", tmdbId: 119762 },
  { title: "Taboo", year: 2017, type: "tv", language: "en", tags: ["critics"], curatorNote: "Tom Hardy in a top hat negotiating empire and occult power in 1810 London — dark, strange and utterly compelling.", tmdbId: 67214 },
  { title: "The Musketeers", year: 2014, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A BBC take on Dumas' heroes — swashbuckling adventure with genuine heart. Better than its reputation suggests.", tmdbId: 57843 },

  // B16
  { title: "The Order", year: 2019, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A student joins a secret magical order and discovers his grandfather's dark legacy — entertaining werewolf-meets-magic college fantasy.", tmdbId: 86783 },
  { title: "Teen Wolf", year: 2011, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A high school lacrosse player becomes a werewolf — the MTV series that balanced teen drama and genuine supernatural horror.", tmdbId: 37680 },
  { title: "The Invisible Man", year: 1975, type: "tv", language: "en", tags: ["classic"], curatorNote: "Universal's classic concept brought to 70s television — a scientist invisibly working for a secret government agency.", tmdbId: 2770 },
  { title: "The Tale of the Nine Tailed", year: 2020, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A nine-tailed fox guarding Seoul's mountains falls for a tenacious TV producer — gorgeous Korean mythology in modern dress.", tmdbId: 112130 },
  { title: "The Rook", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A woman with superpowers wakes with no memory — Daniel O'Malley's espionage fantasy adapted with style and paranoia.", tmdbId: 83067 },
  { title: "Legion", year: 2017, type: "tv", language: "en", tags: ["critics"], curatorNote: "Noah Hawley's psychedelic X-Men spin-off — David Haller's fractured reality becomes television's most formally inventive fantasy.", tmdbId: 67466 },
  { title: "Misfits", year: 2009, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Community service delinquents develop superpowers during a lightning storm — the British superhero show that dared to be ugly.", tmdbId: 37287 },

  // B17
  { title: "Cursed", year: 2020, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Katherine Langford as a young Nimue — Arthurian legend retold from the Lady of the Lake's perspective. Visually rich and brave.", tmdbId: 116254 },
  { title: "Reign", year: 2013, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Mary Queen of Scots at the French court — anachronistic, romantic, wildly unhistorical and enormously addictive viewing.", tmdbId: 56293 },
  { title: "The Tudors", year: 2007, type: "tv", language: "en", tags: ["classic"], curatorNote: "Jonathan Rhys Meyers as Henry VIII — Showtime's lavish historical fantasy that made court intrigue feel like Game of Thrones.", tmdbId: 2784 },
  { title: "The Princess Weiyoung", year: 2016, type: "tv", language: "zh", tags: ["passport"], curatorNote: "A princess who survives massacre by assuming another's identity — a sweeping Chinese historical fantasy of revenge and resilience.", tmdbId: 71642 },
  { title: "The White Queen", year: 2013, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Philippa Gregory's Wars of the Roses — three women navigating treacherous politics with magic and ruthlessness. Underrated.", tmdbId: 57749 },
  { title: "Wolf Hall", year: 2015, type: "tv", language: "en", tags: ["critics"], curatorNote: "Hilary Mantel's Thomas Cromwell — Mark Rylance's extraordinary performance makes Tudor politics feel utterly alive.", tmdbId: 62217 },
  { title: "The Spanish Princess", year: 2019, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Catherine of Aragon's story before Henry VIII — Charlotte Hope brings genuine steel to a political survival story.", tmdbId: 90340 },

  // B18
  { title: "The Winter King", year: 2023, type: "tv", language: "en", tags: ["critics"], curatorNote: "Bernard Cornwell's Arthur Pendragon — not a king yet, just a warlord trying to hold Britain together. Gritty and magnificent.", tmdbId: 215354 },
  { title: "The Shannara Chronicles", year: 2016, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Terry Brooks' post-apocalyptic elves and humans — MTV's attempt at epic fantasy that found an audience among genre fans.", tmdbId: 63639 },
  { title: "Zorro", year: 1957, type: "tv", language: "en", tags: ["classic"], curatorNote: "Guy Williams donned the mask for Disney's defining version of the masked avenger — still the gold standard of swashbuckling TV.", tmdbId: 16871 },
  { title: "The Legend of the Condor Heroes", year: 2017, type: "tv", language: "zh", tags: ["passport"], curatorNote: "Jin Yong's martial arts classic — the definitive adaptation of wuxia's most beloved story. Essential Chinese fantasy.", tmdbId: 73069 },
  { title: "Camelot", year: 2011, type: "tv", language: "en", tags: ["surprise"], curatorNote: "Starz's dark Arthurian series with Eva Green's magnificent Morgan — a bold, brief experiment that deserved more time.", tmdbId: 42276 },
  { title: "Deadwood", year: 2004, type: "tv", language: "en", tags: ["critics"], curatorNote: "The Black Hills gold rush as Shakespearean tragedy — David Milch's profane, magnificent examination of civilization being born.", tmdbId: 1406 },
  { title: "Robin of Sherwood", year: 1984, type: "tv", language: "en", tags: ["surprise"], curatorNote: "The mystical 1980s BBC Robin Hood that invented the modern template — Clannad's score and genuine pagan atmosphere.", tmdbId: 4591 },

  // B19
  { title: "Fate: The Winx Saga", year: 2021, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A dark live-action reimagining of the Winx fairy universe — teen drama with real magic school menace.", tmdbId: 110491 },
  { title: "The Worst Witch", year: 2017, type: "tv", language: "en", tags: ["crowd"], curatorNote: "Mildred Hubble at Miss Cackle's Academy — the beloved CBBC series that made magic school accessible to the youngest viewers.", tmdbId: 68614 },
  { title: "Sabrina the Teenage Witch", year: 1996, type: "tv", language: "en", tags: ["classic"], curatorNote: "Melissa Joan Hart's breezy original — before the darkness came, there was just a girl, her aunts and a very opinionated cat.", tmdbId: 2045 },
  { title: "Mystic Pop-up Bar", year: 2020, type: "tv", language: "ko", tags: ["passport"], curatorNote: "A 500-year-old grudge resolved through dream therapy at a pop-up bar — Korean fantasy at its most inventive and kind.", tmdbId: 112283 },
  { title: "The Bureau of Magical Things", year: 2018, type: "tv", language: "en", tags: ["surprise"], curatorNote: "An Australian teen discovers she's half-fairy — a gentle, charming family fantasy that quietly built a devoted following.", tmdbId: 83543 },
  { title: "The Secret of Crickley Hall", year: 2012, type: "tv", language: "en", tags: ["critics"], curatorNote: "Tom Ellis in a BBC ghost story about a family haunted by wartime tragedy — beautifully made, genuinely moving and frightening.", tmdbId: 56789 },
  { title: "The Good Place", year: 2016, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A woman accidentally sent to heaven — Mike Schur's comedy is secretly philosophy class. Genuinely one of the best series ever.", tmdbId: 66573 },

  // B20
  { title: "Harry Potter and the Philosopher's Stone", year: 2026, type: "tv", language: "en", tags: ["new"], curatorNote: "The HBO reimagining of Rowling's first novel — a full faithful series adaptation arriving Christmas 2026. A new generation's Hogwarts.", tmdbId: 250063 },
  { title: "One Hundred Years of Solitude", year: 2026, type: "tv", language: "es", tags: ["passport"], curatorNote: "Gabriel García Márquez's Nobel masterpiece finally adapted — Netflix's magical realist saga follows the Buendía family across generations.", tmdbId: 230547 },
  { title: "Dirk Gently's Holistic Detective Agency", year: 2016, type: "tv", language: "en", tags: ["crowd"], curatorNote: "A holistic detective who finds everything is connected — Max Landis and Samuel Barnett make chaos feel like destiny. Cult gem.", tmdbId: 67915 },
  { title: "The Prisoner", year: 1967, type: "tv", language: "en", tags: ["classic"], curatorNote: "Patrick McGoohan's surrealist nightmare — a secret agent trapped in a mysterious village. One of television's most mind-bending series.", tmdbId: 583 },
  { title: "The Gift", year: 2019, type: "tv", language: "tr", tags: ["passport"], curatorNote: "A Turkish woman uncovers a 5,000-year-old secret — a supernatural thriller weaving myth and modernity in extraordinary landscapes.", tmdbId: 93348 },
  { title: "The Resort", year: 2022, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A couple investigate a resort's dark past and discover a time loop mystery — funny, strange and more emotional than expected.", tmdbId: 194117 },
  { title: "Mrs. Davis", year: 2023, type: "tv", language: "en", tags: ["surprise"], curatorNote: "A nun battles an all-knowing AI algorithm in a quest for the Holy Grail — Damon Lindelof at his most deliriously inventive.", tmdbId: 200631 },
];

export const FANTASY_SERIES_POOL_COUNT = FANTASY_SERIES_EDITORIAL_BATCHES.length;
