// src/data/dramaSeriesBatches.js
// Flat pool — individual entries, no pre-grouping.
// assembleBatchFromPool() in assemblePool.js assembles 7 entries dynamically at request time.
//
// Entry fields:
//   title       — string
//   year        — number (first-air year)
//   type        — "tv"
//   language    — ISO 639-1 code
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

export const DRAMA_SERIES_EDITORIAL_BATCHES = [

  // ── 2026 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Pitt",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Season 2 of HBO Max's real-time ER drama — Noah Wyle back in the Pittsburgh trauma center for another brutal 15-hour shift. The most viscerally authentic medical drama on television returns and raises the stakes further."
  },
  {
    title: "A Knight of the Seven Kingdoms",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "George R.R. Martin's Tales of Dunk and Egg — a hedge knight and his squire in Westeros a century before the Targaryens fall. HBO goes smaller and more intimate than Game of Thrones, and the result is something more purely enjoyable."
  },
  {
    title: "Industry",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Season 4 of HBO's London banking drama — the most unsparing portrait of ambition, class and institutional brutality on television keeps getting sharper. Marisa Abela and Harry Lawtey in the roles that defined the decade."
  },
  {
    title: "Slow Horses",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Season 6 — Gary Oldman's magnificently difficult Jackson Lamb and his disgraced intelligence failures take on another crisis that the real MI5 would prefer buried. Apple TV+'s best drama continues its perfect run."
  },
  {
    title: "House of the Dragon",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Season 3 of HBO's Targaryen civil war — the Dance of the Dragons enters its most devastating phase. The prequel that justified its existence and then some, finally delivering the dragon warfare Game of Thrones always promised."
  },
  {
    title: "Paradise",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Season 2 of Sterling K. Brown's bunker thriller — with the conspiracy of the first season exposed, what remains is even more dangerous. A show that keeps reinventing its own premise and getting away with it."
  },
  {
    title: "Lord of the Flies",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Netflix's adaptation of William Golding's novel — schoolboys stranded without adults, a civilization constructed and then destroyed. The definitive screen version of the 20th century's most essential fable about human nature."
  },
  {
    title: "Star City",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Apple TV+'s alternate-history drama set inside the Soviet space program — cosmonauts, engineers and political officers competing for a race that never ended. Meticulous, strange and unexpectedly moving about what people sacrifice for collective glory."
  },
  {
    title: "Drops of God",
    year: 2026,
    type: "tv",
    language: "fr",
    tags: ["passport"],
    curatorNote: "Season 2 of the Apple TV+ French-Japanese wine drama — a Japanese woman inheriting her legendary wine critic father's estate while a rival contests the legacy. Genuinely sensory television about obsession, legacy and taste."
  },
  {
    title: "A Thousand Blows",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Season 2 of Hulu's Victorian London boxing drama — two Jamaican migrants rising through the brutal underground bare-knuckle fighting world. Sweaty, gorgeous period television with genuine stakes and real heart."
  },
  {
    title: "The Night Manager",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "The long-awaited second season of the BBC/Prime le Carré adaptation — new hotel, new mission, the same ruthless elegance. Tom Hiddleston back in the role that made him a leading man."
  },
  {
    title: "Your Friends and Neighbors",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Jon Hamm as a hedge fund manager who loses his job and discovers his wealthy suburb is not what it appeared — Apple TV+'s dark comedy about the performance of affluence and what happens when the performance stops."
  },
  {
    title: "DTF St. Louis",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "HBO's Emmy-nominated limited series — an unflinching portrait of a Missouri family navigating economic collapse, addiction and the specific textures of American working-class life. Television that trusts its subject completely."
  },
  {
    title: "Pluribus",
    year: 2026,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Season 2 of Apple TV+'s acclaimed drama — the political series that arrived from nowhere and became one of the most talked-about shows on television for its intelligence about how American institutions actually function under pressure."
  },

  // ── 2025 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Adolescence",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Four episodes, each a single unbroken take — a 13-year-old boy is arrested for stabbing a girl, and the camera never cuts away. Netflix's most acclaimed drama of the year: a formal experiment that uses its own relentlessness to convey the devastation of a family's life before and after."
  },
  {
    title: "Wolf Hall: The Mirror and the Light",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "The concluding chapter of Hilary Mantel's Cromwell trilogy — 100% on Rotten Tomatoes. Mark Rylance returns as Thomas Cromwell in the years that will end him. BBC drama at its most austere and most precise: a performance and a series that feel genuinely historical."
  },
  {
    title: "The Narrow Road to the Deep North",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Richard Flanagan's Booker-winning novel — an Australian surgeon who survives the Burma Death Railway, and the life he carries afterward. 100% on Rotten Tomatoes. Ciarán Hinds in the performance of the year, in a series that understands what survival costs."
  },
  {
    title: "The Pitt",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Noah Wyle returns to the ER — literally. Filmed in real time across one brutal 15-hour shift in a Pittsburgh trauma center. The most viscerally authentic medical drama since the show that made him famous."
  },
  {
    title: "Andor",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Season 2 completes Tony Gilroy's Star Wars prequel — the most politically serious, cinematically ambitious thing in the franchise. A show about how ordinary people become revolutionaries, told through surveillance, exploitation and small acts of resistance."
  },
  {
    title: "Dying for Sex",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Michelle Williams and Jenny Slate in the true story of a woman who, after her cancer diagnosis, decides to use the time she has left to explore every sexual experience she missed. 98% on Rotten Tomatoes. Funny, brave and genuinely moving."
  },
  {
    title: "Pluribus",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Apple TV+'s arrival — 99% on Rotten Tomatoes. A political drama about a Senate race that became one of the most talked-about debuts of 2025: intelligent, specific and unafraid to be complicated about what democratic institutions are for."
  },
  {
    title: "Slow Horses",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Season 5 — 96% on Rotten Tomatoes. Gary Oldman's Jackson Lamb, still magnificent, still difficult, still running the people nobody else will run. Apple TV+'s most reliably excellent drama."
  },
  {
    title: "The Gilded Age",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Season 3 of Julian Fellowes's Downton-adjacent New York drama — 96% on Rotten Tomatoes. The robber barons, their wives, their rivals, and the social season of 1884, rendered with the most lavish production design on American television."
  },
  {
    title: "Toxic Town",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Netflix's true-story limited series about the families of Corby, Scotland who sued the local council after their children were born with limb differences — 100% on Rotten Tomatoes. Working-class people demanding accountability from institutions designed to ignore them."
  },
  {
    title: "Get Millie Black",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "100% on Rotten Tomatoes. A Jamaican detective returns home from London to investigate a missing person case — a Caribbean noir that is also a precise portrait of Kingston's social geography, class divides and the weight of diaspora return."
  },
  {
    title: "Asura",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "100% on Rotten Tomatoes. One of the year's most acclaimed limited series — a drama that builds its world and moral stakes with exceptional patience before delivering on everything it has promised."
  },
  {
    title: "The Last of Us",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Season 2 — the story continues past the game, with Bella Ramsey's Ellie now driving the narrative. 92% on Rotten Tomatoes. The series that proved a video game adaptation could be genuine prestige television expands its scope and deepens its grief."
  },
  {
    title: "Carême",
    year: 2025,
    type: "tv",
    language: "fr",
    tags: ["passport"],
    curatorNote: "French series about Marie-Antoine Carême, the 19th-century chef who invented modern French cuisine and cooked for Napoleon, Tsar Alexander and the Rothschilds. 95% on Rotten Tomatoes. Lavish, strange and unexpectedly thrilling about ambition and art."
  },
  {
    title: "Chief of War",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Apple TV+'s Hawaiian history epic — Jason Momoa as a warrior chief resisting the unification of the islands in the 18th century. 92% on Rotten Tomatoes. Indigenous storytelling at a scale and budget Hawaiian history has never received."
  },
  {
    title: "Miss Austen",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Keeley Hawes as Cassandra Austen, protecting her sister Jane's letters in her old age — a BBC drama that imagines the woman who decided what the world would know about the greatest novelist of her era. 92% on Rotten Tomatoes."
  },
  {
    title: "Code of Silence",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "100% on Rotten Tomatoes. A limited series about institutional silence — what people in positions of authority do when they know what happened and choose not to say. One of 2025's most formally precise British dramas."
  },
  {
    title: "The Testaments",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Margaret Atwood's Booker Prize-winning sequel to The Handmaid's Tale — Gilead seen from inside three women's accounts. More propulsive than its predecessor, and more ruthless about what it takes to dismantle a regime."
  },
  {
    title: "Paradise",
    year: 2025,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Sterling K. Brown as a Secret Service agent protecting a former president in an underground bunker — until a murder makes everyone a suspect. A locked-room thriller with real emotional weight underneath the twists."
  },
  {
    title: "When Life Gives You Tangerines",
    year: 2025,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "IU and Park Bo-gum in a multigenerational love story set on Jeju Island — following two families across decades from the 1950s to the present. Quiet, unhurried and devastating in the way only Korean melodrama at its best can be."
  },

  {
    title: "Dark Winds",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Navajo Tribal Police in 1970s New Mexico — a crime series that is also an intimate portrait of a community on contested land. Zahn McClarnon in a role that belongs in the great pantheon of TV detectives."
  },
  {
    title: "Rivals",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Jilly Cooper's beloved 1988 novel finally gets the adaptation it deserves — all desire, cruelty and gleaming English countryside. Addictive in the best possible way and funnier than it has any right to be."
  },
  // ── 2024 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Decameron",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Boccaccio's medieval tales reimagined as a dark ensemble comedy — ten strangers locked in a Florentine villa during the Black Death, each pursuing pleasure, power and survival. Visually lush, mordantly funny and unlike anything else on television."
  },
  {
    title: "Baby Reindeer",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Richard Gadd's autobiographical seven-episode Netflix series — a struggling comedian is stalked by a woman he showed a kindness to, while his own history of abuse slowly surfaces. The most talked-about limited series of 2024, and one of the bravest things ever made for television."
  },
  {
    title: "Disclaimer",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Alfonso Cuarón's Apple TV+ limited series — Cate Blanchett as a documentary filmmaker whose life is upended when a widower sends her a novel that reveals her darkest secret. Formally dazzling, with Cuarón directing every frame."
  },
  {
    title: "Feud: Capote vs. the Swans",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Ryan Murphy's second Feud season — Tom Hollander as Truman Capote in his final years, having betrayed the society women who were his closest friends by writing about them. Demi Moore, Naomi Watts, Calista Flockhart. A tragedy about the cost of art."
  },
  {
    title: "Mr. & Mrs. Smith",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Donald Glover and Maya Erskine as two strangers recruited by a spy agency to pose as a married couple — and slowly become one. Amazon's reinvention of the premise is funnier, stranger and more emotionally truthful than anyone expected."
  },
  {
    title: "Shōgun",
    year: 2024,
    type: "tv",
    language: "ja",
    tags: ["passport"],
    curatorNote: "An English pilot washes ashore in feudal Japan and enters a world of lethal political chess. A landmark — the first show to win both Outstanding Drama and acting awards at the Emmys in the same year without a single anglophone lead."
  },
  {
    title: "Say Nothing",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Patrick Radden Keefe's definitive account of the IRA — Marian Price, Jean McConville, Brendan Hughes — rendered as gripping drama. The best historical series in years, and a moral reckoning that doesn't flinch."
  },
  {
    title: "Ripley",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Andrew Scott as Patricia Highsmith's most famous creation, in eight episodes of black-and-white Italian sun, art, forgery and perfectly composed dread. Shot like a Caravaggio painting and just as morally complex."
  },
  {
    title: "The Sympathizer",
    year: 2024,
    type: "tv",
    language: "vi",
    tags: ["passport"],
    curatorNote: "Hoa Xuande as a communist spy embedded with South Vietnamese refugees after Saigon falls — Park Chan-wook's first English-language series, and one of the most formally audacious things on television."
  },
  {
    title: "Presumed Innocent",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Jake Gyllenhaal as a prosecutor accused of murdering his colleague — and former lover. A sleek Apple TV+ update of Scott Turow's courtroom classic that earns its twists and takes its time doing so."
  },
  {
    title: "The New Look",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Christian Dior and Coco Chanel during the German occupation of Paris — two designers, two entirely different choices about who to collaborate with. Ben Mendelsohn and Juliette Binoche in a series that makes fashion feel like survival."
  },
  {
    title: "One Day",
    year: 2024,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "David Nicholls adapts his own novel for Netflix — two friends, the same date each year, across two decades. Leo Woodall and Ambika Mod make the leap from the page land with devastating grace."
  },

  // ── 2023 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Sullivan's Crossing",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "A Boston neurosurgeon retreats to a small Canadian wilderness community after a career crisis and rediscovers herself. A warmly observed drama about slowing down, belonging and second chances — gentle but sincere."
  },
  {
    title: "Succession",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Jesse Armstrong's fourth and final season — the Roy siblings in full civil war as their father's empire passes to someone. Television's defining drama of the 2020s ends in a finale that is as perfect and bleak as anything in the medium's history."
  },
  {
    title: "Poker Face",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Rian Johnson's case-of-the-week series — Natasha Lyonne as a woman with an infallible lie detector, drifting across America solving murders. A love letter to Columbo that earns its reverence by being genuinely brilliant in its own right."
  },
  {
    title: "Silo",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Rebecca Ferguson in Hugh Howey's adaptation — thousands of people living underground in a silo, the outside world deadly, the rules enforced by deadly silence. Apple TV+'s sci-fi thriller that takes ideas seriously and delivers on its mystery."
  },
  {
    title: "The Last of Us",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Pedro Pascal and Bella Ramsey cross a fungal apocalypse — but Craig Mazin and Neil Druckmann's masterstroke is making grief and love the real subject. Episode 3 alone (Nick Offerman) is among the greatest hours of television."
  },
  {
    title: "Beef",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A road-rage incident between two strangers spirals into full-scale war — Steven Yeun and Ali Wong in a show about rage, shame and the immigrant American dream that is also very, very funny."
  },
  {
    title: "The Diplomat",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Keri Russell as a blunt American diplomat suddenly made UK ambassador during a crisis — Debora Cahn's series has the pace of The West Wing, the warmth of a great marriage comedy and enough plot twists to fill two seasons."
  },
  {
    title: "Fellow Travelers",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Matt Bomer and Jonathan Bailey as two men whose secret love affair runs from McCarthy's Washington through Vietnam and AIDS. The most emotionally precise historical drama about being gay in America ever made for television."
  },
  {
    title: "Lessons in Chemistry",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Brie Larson as a 1960s scientist whose career is derailed — until she becomes a cooking show host and accidentally starts a feminist revolution. Charming, clever and much sharper than it looks."
  },

  // ── 2022 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Severance",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Adam Scott leads a team at Lumon Industries whose work and personal memories are surgically separated — so they have no idea what they do all day. Ben Stiller directs. The most formally controlled sci-fi series in years and the most unsettling workplace drama ever made."
  },
  {
    title: "Andor",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Tony Gilroy's Star Wars prequel — Diego Luna as Cassian Andor in the years before Rogue One, a story about how ordinary people become revolutionaries. The most politically serious, cinematically ambitious thing in the franchise. Season 1."
  },
  {
    title: "House of the Dragon",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "The Targaryen civil war a century before Game of Thrones — Paddy Considine, Emma D'Arcy, Matt Smith. A succession drama as brutal and beautiful as the original series at its peak, and smarter about its female characters."
  },
  {
    title: "The Rehearsal",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Nathan Fielder's HBO series in which he elaborately rehearses real-life conversations for ordinary people — and gradually loses the thread of what is real. The most formally strange and philosophically vertiginous television of the decade."
  },
  {
    title: "Industry",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Young graduates enter a London investment bank and discover that talent is beside the point. HBO's most underrated series — savage, funny and savagely specific about ambition, class and what people do to get ahead. Three seasons of watching intelligent people destroy themselves for money."
  },
  {
    title: "Slow Horses",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Gary Oldman as the magnificently difficult Jackson Lamb, running the intelligence failures and disgraced officers nobody else wants. Apple TV+'s best drama — tight, dark, witty and always one step ahead of you. The spy thriller that treats its audience as adults."
  },
  {
    title: "Bad Sisters",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd", "surprise"],
    curatorNote: "Sharon Horgan's Irish series — four sisters plotting to kill their abusive brother-in-law while we watch two timelines converge. The funniest show about domestic abuse ever made, which is exactly as strange and perfect as it sounds."
  },
  {
    title: "The Bear",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Jeremy Allen White inherits a chaotic Chicago sandwich shop and tries to turn it into something real. The most formally inventive drama on television — episode 7 of season 2 ('Forks') is a single-take masterwork."
  },
  {
    title: "Pachinko",
    year: 2022,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "Min Jin Lee's multigenerational novel — a Korean family across four generations, from Japanese-occupied Korea to 1980s Osaka and modern New York. Sumptuous, heartbreaking and bilingual in every sense."
  },
  {
    title: "The English",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Emily Blunt and Chaske Spencer cross the 1890s American West on a shared mission of revenge — a BBC western that is actually about the violence at the origin of nations, shot like a Sergio Leone painting."
  },
  {
    title: "The Empress",
    year: 2022,
    type: "tv",
    language: "de",
    tags: ["passport"],
    curatorNote: "A German-language reimagining of Sisi — the young Austrian empress as a woman who refuses every expectation placed on her. Gorgeous and genuinely feminist where the Hollywood versions were merely romantic."
  },
  {
    title: "The Glory",
    year: 2022,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "Song Hye-kyo as a woman who spent twenty years planning revenge on the classmates who destroyed her life. The most-watched Korean drama of its year globally — and a vindication that patience is its own kind of power."
  },
  {
    title: "Fleishman Is in Trouble",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A Manhattan doctor's wife disappears. What looks like a divorce comedy gradually reveals itself as something far more unsettling — Claire Danes in the year's most quietly devastating performance."
  },

  // ── 2021 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Firefly Lane",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Katherine Heigl and Sarah Chalke as lifelong best friends navigating four decades of love, loss and loyalty — told across timelines from the 1970s to the 2000s. A female friendship drama with genuine emotional heft."
  },
  {
    title: "Acapulco",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Bilingual Apple TV+ comedy following a young Mexican man who lands a dream job at the hottest resort in Acapulco in 1984. Warm, funny and genuinely underrated — one of the most joyful shows of its era."
  },
  {
    title: "Squid Game",
    year: 2021,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "456 people in debt play deadly children's games for a 45-billion-won prize. Hwang Dong-hyuk's Korean series became the most-watched Netflix show ever — a Kafkaesque allegory about capitalism that is also genuinely, ruthlessly gripping."
  },
  {
    title: "Succession",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Season 3 — the Roys scatter across continents while Kendall tries to topple his father. Jesse Armstrong's HBO series reaches its full power: a family tragedy that is also the decade's best corporate satire, and Logan Roy becomes genuinely frightening."
  },
  {
    title: "Dopesick",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Michael Keaton as a small-town doctor prescribing OxyContin, Michael Stuhlbarg as Richard Sackler refusing to acknowledge it. Beth Macy's investigation of the opioid crisis becomes Hulu's most important limited series — meticulous, enraging and deeply human."
  },
  {
    title: "Pose",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Ryan Murphy's final season of the ballroom drama set in New York's HIV crisis — the most trans cast in television history, and the most joyful, political, heartbreaking show about survival and found family of its era. MJ Rodriguez makes history."
  },
  {
    title: "The White Lotus",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Mike White's anthology of the very rich on holiday — each season a new resort, a new set of guests, a new murder mystery unwinding in slow satire. The most rewatchable prestige drama of the decade."
  },
  {
    title: "Maid",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Margaret Qualley as a young mother who flees an abusive partner and navigates the brutal bureaucracy of American poverty. Based on Stephanie Land's memoir; one of the most precise depictions of economic precarity ever put on screen."
  },
  {
    title: "Station Eleven",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Emily St. John Mandel's post-pandemic novel — a traveling Shakespeare company in a world twenty years after collapse. The most beautiful and humanist pandemic story, made during the pandemic that makes it feel prophetic."
  },
  {
    title: "It's a Sin",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Russell T Davies's five-part elegy — a group of young gay men in 1980s London as AIDS arrives. Joyful, furious and devastating in equal measure. Olly Alexander has never been better."
  },
  {
    title: "Mare of Easttown",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Kate Winslet as a small-town Pennsylvania detective investigating a murder while her own life unravels around her. Seven perfect episodes of a show that proves you can do character and plot and not sacrifice either."
  },
  {
    title: "Time",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Sean Bean as a convicted murderer, Stephen Graham as the prison officer trying to survive a corrupt system. Jimmy McGovern's two-hander is among the finest things British television has made about incarceration and conscience."
  },
  {
    title: "Reservation Dogs",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Four Indigenous teenagers in rural Oklahoma trying to escape to California — Sterlin Harjo and Taika Waititi's series is unlike anything on television: funny, sad, spiritual and entirely its own thing."
  },
  {
    title: "The Underground Railroad",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Barry Jenkins adapts Colson Whitehead's Pulitzer winner as a ten-hour dream — Thuso Mbedu as Cora, running North on a literal underground railroad through alternate histories of American brutality. Visually unlike anything else."
  },
  {
    title: "I May Destroy You",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Michaela Coel wrote, directed and starred in this twelve-episode portrait of a writer processing sexual assault — the most formally inventive and emotionally honest British drama in a generation."
  },
  {
    title: "The North Water",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Colin Farrell as a monstrous harpooner on a 19th century Arctic whaling expedition — Jack O'Connell trying to survive him. Andrew Haigh's five-part BBC adaptation of Ian McGuire's novel is as extreme and beautiful as the ice it depicts."
  },
  {
    title: "Pursuit of Love",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["surprise"],
    curatorNote: "Emily Mortimer's adaptation of Nancy Mitford — Lily James as Linda, who believes in love absolutely and pursues it across two wars and three husbands. Funny, anachronistic and more moving than it has any right to be."
  },

  // ── 2020 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Small Axe",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Steve McQueen's five-film anthology for the BBC — stories of the West Indian community in London from the 1960s to the 1980s. Mangrove, Lovers Rock, Alex Wheatle, Education, Red, White and Blue: five different styles, one sustained act of witness."
  },
  {
    title: "Unorthodox",
    year: 2020,
    type: "tv",
    language: "yi",
    tags: ["passport"],
    curatorNote: "Shira Haas as a young Hasidic woman who flees her arranged marriage in Brooklyn for Berlin. The first major series shot primarily in Yiddish — four episodes of quietly extraordinary precision about tradition, freedom and what we owe our past."
  },
  {
    title: "Normal People",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Daisy Edgar-Jones and Paul Mescal in Sally Rooney's adaptation of her novel — a love story between two Irish teenagers that becomes the most talked-about intimate drama in years. Twelve episodes of physical and emotional honesty."
  },
  {
    title: "The Queen's Gambit",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Anya Taylor-Joy as Beth Harmon, an orphaned chess prodigy ascending through the 1960s international circuit. Netflix's most-watched limited series ever — and proof that you can make the most intellectual game look like a thriller."
  },
  {
    title: "Unbelievable",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Based on a ProPublica investigation — a teenager reports rape and is forced to recant by disbelieving detectives, while two women investigators in Colorado link the same perpetrator to a series of attacks. Furious and necessary."
  },
  {
    title: "Hospital Playlist",
    year: 2020,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "Five doctor friends who've known each other since medical school — a Korean drama that is basically a warm hug across 24 episodes. The most comforting prestige TV of recent years, and funnier than anything this gentle has a right to be."
  },
  {
    title: "Veneno",
    year: 2020,
    type: "tv",
    language: "es",
    tags: ["passport"],
    curatorNote: "The real life of Cristina Ortiz, 'La Veneno' — a trans Spanish sex worker who became a 1990s television phenomenon. The Javis' series is the most joyful, heartbreaking and radical portrait of a trans life in European television."
  },
  {
    title: "Feel Good",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Mae Martin's semi-autobiographical comedy-drama — a Canadian comedian in London, a new relationship, addiction recovery and the question of who you are when you stop performing. Two perfect series."
  },
  {
    title: "Little Fires Everywhere",
    year: 2020,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Reese Witherspoon and Kerry Washington in Celeste Ng's adaptation — two women in 1990s Shaker Heights whose families collide over class, race and a custody dispute. Eight episodes of controlled combustion."
  },
  {
    title: "The World of the Married",
    year: 2020,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "A doctor discovers her husband is having an affair — and the Korean drama that became a record-breaking ratings phenomenon as the most-watched cable series in Korean TV history. Propulsive, stylish and absolutely merciless."
  },
  {
    title: "Love & Anarchy",
    year: 2020,
    type: "tv",
    language: "sv",
    tags: ["passport"],
    curatorNote: "A Swedish series about a married consultant who begins a game of escalating dares with the young IT technician at a publishing house. Funny, erotic and genuinely subversive about gender, power and the things we dare each other into."
  },

  // ── 2019 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Chernobyl",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Craig Mazin's five-part HBO miniature about the 1986 disaster — how it happened, who covered it up and what it cost the people who didn't. Jared Harris, Stellan Skarsgård and Emily Watson. The most acclaimed limited series of the decade."
  },
  {
    title: "When They See Us",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Ava DuVernay's account of the Central Park Five — the five Black and Latino teenagers wrongfully convicted of a 1989 rape. Four episodes of shattering clarity about a justice system that destroyed five childhoods."
  },
  {
    title: "The Virtues",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Shane Meadows's four-part series — Stephen Graham as a man who returns to Ireland to confront something in his past. The most emotionally raw piece of drama British television produced in the 2010s."
  },
  {
    title: "Why Women Kill",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Marc Cherry's anthology — three women in the same Pasadena house across three eras (the '60s, '80s, today), each dealing with an unfaithful husband in a very different way. Sharp, black-hearted and addictive."
  },
  {
    title: "Kingdom",
    year: 2019,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "A Joseon-era Korean prince investigates a plague that is turning people into zombies — and discovers the political conspiracy underneath. Netflix's first Korean original and proof that genre and prestige drama aren't opposites."
  },

  // ── 2018 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Succession",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "The Roy family fight over who inherits their media empire — Jesse Armstrong's four seasons of Shakespearean succession drama disguised as a comedy of the ultra-rich. The defining American drama of its era."
  },
  {
    title: "My Mister",
    year: 2018,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "An unlikely friendship between a middle-aged civil engineer whose life is quietly falling apart and a young woman with a brutal secret. Korean television's most precise and compassionate portrait of people simply trying to survive."
  },
  {
    title: "Pose",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Ryan Murphy's ballroom drama set in late-1980s New York — the largest cast of trans actors in TV history, and a show that is actually about chosen family, HIV, survival and what it costs to make a life no one will acknowledge."
  },
  {
    title: "The Terror",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "The doomed Franklin Expedition to the Arctic Northwest Passage — Jared Harris and Tobias Menzies on ships that become tombs, with something hunting them on the ice. AMC's most underrated achievement."
  },
  {
    title: "Mr. Sunshine",
    year: 2018,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "A Korean man who fled slavery as a child returns from America as a US Marine officer during the Japanese occupation — and falls in love with an aristocrat who is secretly in the resistance. Epic romance and genuine historical urgency."
  },
  {
    title: "The Split",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Nicola Walker as a London divorce lawyer whose own marriage starts to unravel as she handles the splits of others. BBC drama that manages to be wise about relationships, genuinely romantic and structurally clever."
  },
  {
    title: "A Very English Scandal",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Hugh Grant as Jeremy Thorpe, the Liberal Party leader who tried to have his former lover murdered — Ben Whishaw as the lover. Stephen Frears's three-part BBC series is the funniest political scandal ever dramatized."
  },
  {
    title: "Derry Girls",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Five teenagers in 1990s Northern Ireland — Lisa McGee's Channel 4 sitcom is technically a comedy but earns its place in drama through the extraordinary grace of its final episode, which makes the Troubles feel human and immediate."
  },
  {
    title: "Escape at Dannemora",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Ben Stiller directs Patricia Arquette, Paul Dano and Benicio del Toro in the true story of two convicts who break out of a maximum-security New York prison with help from a civilian employee. Taut, strange and Stiller's masterwork."
  },

  // ── 2017 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Handmaid's Tale",
    year: 2017,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Elisabeth Moss in Atwood's theocratic dystopia — the first streaming series to win Best Drama at the Emmys. The first season is as close to perfect as television gets; everything after it is worth watching for what it adds to the mythology."
  },
  {
    title: "Big Little Lies",
    year: 2017,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Reese Witherspoon, Nicole Kidman and Shailene Woodley in Liane Moriarty's Monterey mystery — Jean-Marc Vallée's direction and a David E. Kelley script that earns its twists. Eight Emmys. The peak of the limited series boom."
  },
  // ── 2016 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Easy",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Joe Swanberg's Chicago anthology — interconnected stories about modern love and sex, each episode following different characters navigating desire and commitment. Loose, intimate and surprisingly honest about the messiness of adult life."
  },
  {
    title: "Divorce",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Sarah Jessica Parker and Thomas Haden Church in Sharon Horgan's HBO comedy-drama about the long, unglamorous process of ending a marriage. Dark, specific and deeply uncomfortable in the best way."
  },
  {
    title: "Fleabag",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Phoebe Waller-Bridge's two-season confessional — a sharp, chaotic London woman breaks the fourth wall to tell you what she won't tell anyone else, including herself. The Priest arc in season two is as good as television gets."
  },
  {
    title: "The Night Of",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Riz Ahmed as a Pakistani-American college student who wakes up after a wild night to find his date dead beside him — John Turturro as the lawyer nobody else wanted to take the case. Eight hours of moral and procedural complexity."
  },
  {
    title: "The Crown",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Peter Morgan's account of Queen Elizabeth II's reign — six seasons, three Elizabeths, fifty years of British history seen from the inside of a family that cannot show it. Claire Foy's first season is unimpeachable."
  },
  {
    title: "Atlanta",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Donald Glover's surrealist portrait of the Atlanta rap scene — the most formally adventurous American drama since Twin Peaks. Every season tries to be a different show; most of the episodes work better than anything on television."
  },
  {
    title: "Insecure",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Issa Rae's five seasons about a Black woman navigating her late twenties in Los Angeles — sharp, warm and specific in ways that made it genuinely beloved. The series that finally made friendship look as interesting as romance."
  },
  {
    title: "The Leftovers",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Damon Lindelof's adaptation of Tom Perrotta — two percent of the world's population vanishes without explanation, and the show is about the grief of the people left behind. The third season is the best single season of television of its decade."
  },
  {
    title: "Search Party",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A group of New York millennials investigate a missing person and the show morphs from satire to thriller to courtroom drama to something stranger. Five seasons of stylish, black-hearted and deeply funny television."
  },
  {
    title: "The Night Manager",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Tom Hiddleston as a hotel manager recruited to infiltrate Hugh Laurie's arms dealer — John le Carré adapted for the BBC with maximum production value. The most elegant espionage drama since Tinker Tailor."
  },

  // ── 2015 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Better Call Saul",
    year: 2015,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Bob Odenkirk's six seasons as Jimmy McGill — what happens before he becomes Saul Goodman. In its final seasons, many critics called it better than Breaking Bad. The most patient and rewarding character study in TV history."
  },
  {
    title: "Wolf Hall",
    year: 2015,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Hilary Mantel's Booker winners — Thomas Cromwell's rise through Henry VIII's court, directed by Peter Kosminsky with Mark Rylance in the role of a lifetime. BBC drama at its most intelligent and most cinematic."
  },
  {
    title: "Reply 1988",
    year: 2015,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "Five families in a Seoul alley in the late 1980s — the most beloved Korean drama ever made by a large margin. Twenty episodes about neighbors, nostalgia and the neighborhood that shaped you, and you will cry at episode 20."
  },
  {
    title: "Rectify",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A man released after 19 years on death row returns to his small Georgia town — Aden Young in the quietest and most profound performance in contemporary American drama. The SundanceTV series that deserved a much larger audience."
  },

  // ── 2014 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Outlander",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Diana Gabaldon's historical epic — a WWII combat nurse time-travels to 18th-century Scotland and is caught between two worlds, two men and two centuries. Seven seasons of sweeping romance and brutal historical drama."
  },
  {
    title: "The Knick",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Steven Soderbergh directs every episode of this 1900s New York hospital drama — Clive Owen as a cocaine-addicted surgeon inventing modern medicine. The most underappreciated great drama in the Peak TV era."
  },
  {
    title: "Olive Kitteridge",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Frances McDormand as the abrasive, brilliant, impossible Olive across thirty years of small-town Maine — Lisa Cholodenko's four-part HBO adaptation of Elizabeth Strout's Pulitzer winner. Eight Emmy wins."
  },
  {
    title: "Halt and Catch Fire",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "The early personal computer revolution through four characters in Dallas and Silicon Valley — a show that started unremarkable and became genuinely great across four seasons. Its final season is a sustained elegy to ambition and time."
  },
  {
    title: "The Affair",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "A summer affair between a married novelist and a married waitress, told from alternating perspectives that don't quite match. The first season's structural idea is brilliant and the performances sustain everything else."
  },
  {
    title: "The Honourable Woman",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Maggie Gyllenhaal as a British-Israeli businesswoman whose family's arms trade past comes back to destroy the peace project she has built. Hugo Blick's BBC series is the most intelligent political thriller television produced in that decade."
  },
  {
    title: "The Chair",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Sandra Oh as the first female chair of an English department in freefall — a Netflix series that understands academia, tenure culture and the way institutions eat the people who believe in them."
  },

  // ── 2013 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Americans",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Two KGB sleeper agents living as a suburban Washington DC travel agency couple in the 1980s — Matthew Rhys and Keri Russell in the most perfectly sustained long-form drama of the decade. Six seasons of moral erosion."
  },
  {
    title: "Broadchurch",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "The murder of a child in a small Dorset town — Olivia Colman and David Tennant as the detectives, Chris Chibnall's three-season series as the gold standard of British crime drama. The first season ending is one of television's finest."
  },
  {
    title: "House of Cards",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Kevin Spacey as Francis Underwood ascending toward the White House by eliminating everyone who stands in his way — Beau Willimon's American update of the BBC classic. The first Netflix original drama, and the one that proved the model."
  },
  {
    title: "Orange Is the New Black",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "A privileged New Yorker enters a women's federal prison — what started as a fish-out-of-water comedy became a genuinely political drama about the carceral system, with the largest ensemble of women of color in television history."
  },
  {
    title: "Getting On",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "The HBO adaptation of the British original — Laurie Metcalf, Alex Borstein and Niecy Nash on a geriatric ward where the comedy of institutional dysfunction barely covers the profound sadness underneath. Three short seasons of buried treasure."
  },
  {
    title: "Deadloch",
    year: 2023,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "An Australian murder mystery set in a feminist folk music festival — Kate Box and Madeleine Sami as mismatched detectives in the funniest crime series since Broadchurch decided to have a sense of humor about itself."
  },

  // ── 2012 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Newsroom",
    year: 2012,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Aaron Sorkin's cable news drama — Jeff Daniels as an anchor trying to do television journalism properly, one real news event at a time. Earnest, fast and polarizing; its faith in the possibility of good journalism has not dated."
  },

  // ── 2011 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Enlightened",
    year: 2011,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Laura Dern as a woman who has a breakdown and comes back from a wellness retreat determined to change the world — Mike White's HBO series was too gentle for its time and is now recognized as one of the most compassionate dramas ever made."
  },
  {
    title: "The Hour",
    year: 2011,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Abi Morgan's BBC series about the launch of a BBC current affairs show in 1956 — Romola Garai, Ben Whishaw and Dominic West in a Suez-crisis drama that is also a love triangle. Cancelled after two perfect seasons. A genuine injustice."
  },

  // ── 2010 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Love/Hate",
    year: 2010,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Ireland's most celebrated crime drama — Darren's rise through Dublin's drug underworld across five seasons of loyalty, betrayal and brutal consequence. The series that redefined Irish television and made Aidan Gillen's reputation."
  },
  {
    title: "Borgen",
    year: 2010,
    type: "tv",
    language: "da",
    tags: ["passport"],
    curatorNote: "Sidse Babett Knudsen as Denmark's first female prime minister — the Danish political drama that launched the Nordic crime wave and has never been matched for its intelligence about power, compromise and the cost of public life."
  },
  {
    title: "Downton Abbey",
    year: 2010,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Julian Fellowes's Edwardian country house drama — the Crawley family and their servants across twenty years and two world wars. Six seasons of impeccably produced British entertainment that became a global phenomenon."
  },

  // ── 2009 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Good Wife",
    year: 2009,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Julianna Margulies as the wife of a disgraced politician who goes back to law — seven seasons of the smartest network drama of its era, combining procedural structure with genuine character development and political intelligence."
  },
  {
    title: "Parenthood",
    year: 2010,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "The Braverman family of Berkeley, California across six seasons of work, love, illness, children and parents — Jason Katims's drama is the warmest and most emotionally honest family saga American television has produced."
  },

  // ── 2007 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Mad Men",
    year: 2007,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Don Draper selling America to itself in 1960s New York — Matthew Weiner's seven seasons are the most sustained meditation on American identity, masculinity and the gap between what we project and what we are."
  },

  // ── 2006 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Friday Night Lights",
    year: 2006,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "A high school football team in a small Texas town — Kyle Chandler and Connie Britton as Coach and Tami Taylor in the most authentic portrait of American community television has ever produced. Clear eyes, full hearts."
  },

  // ── 2005 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Thick of It",
    year: 2005,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Armando Iannucci's political satire — Peter Capaldi as the most terrifyingly creative swearer in British drama, running a government department nobody quite understands. The funniest and most accurate portrait of how power actually works."
  },
  {
    title: "The Comeback",
    year: 2005,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Lisa Kudrow as Valerie Cherish, a faded sitcom star trying to stage her comeback on reality TV — one of the most formally inventive and brutally uncomfortable comedies ever made. Two seasons, 22 episodes, no filler."
  },
  // ── 2004 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Desperate Housewives",
    year: 2004,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Marc Cherry's satirical soap about four women on Wisteria Lane — the most-watched show on American television for two seasons. The pilot is still brilliant; what follows is television as guilty pleasure at its most shameless."
  },
  {
    title: "The Journalist",
    year: 2022,
    type: "tv",
    language: "ja",
    tags: ["passport"],
    curatorNote: "A female journalist at a national newspaper exposes a cover-up in a Japanese ministry — adapted from the film of the same name, this Netflix Japan series is a precise and angry portrait of institutional corruption and the women who refuse to accept it."
  },

  // ── 2003 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Angels in America",
    year: 2003,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Mike Nichols's adaptation of Tony Kushner's Pulitzer-winning play — AIDS in Reagan-era New York, with Al Pacino, Meryl Streep, Emma Thompson and Jeffrey Wright. Six hours of the most ambitious drama American television has produced."
  },
  {
    title: "State of Play",
    year: 2003,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Paul Abbott's BBC political thriller — a journalist investigates the apparent suicide of a researcher connected to a powerful MP. Six episodes of dense, intelligent plotting that makes the newspaper business feel as urgent as a crime scene."
  },

  // ── 2002 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Wire",
    year: 2002,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "David Simon's five seasons charting Baltimore through drugs, the docks, city government, education and the press — the most comprehensive portrait of a city in American television. Its final word on the news industry has not dated."
  },

  // ── 2001 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Six Feet Under",
    year: 2001,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Alan Ball's five seasons about the Fisher family funeral home — a drama that used death every episode to talk about how to live. Its finale remains the most moving series ending in television history."
  },
  {
    title: "Looking",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Three gay men in San Francisco — Michael Lannan and Andrew Haigh's HBO series was cancelled before it finished but the follow-up film closed it perfectly. Quiet, specific and the most honestly drawn gay friendship on American television."
  },

  // ── 2000 SERIES ────────────────────────────────────────────────────────────

  {
    title: "The Sopranos",
    year: 1999,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Tony Soprano in therapy — David Chase's six seasons that invented modern prestige television. A New Jersey mob boss who loves ducks and cannot understand why he is depressed. The show that made everything that followed it possible."
  },

  // ── PRE-2000 CLASSICS ──────────────────────────────────────────────────────

  {
    title: "The West Wing",
    year: 1999,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Aaron Sorkin's seven seasons in a fictional Democratic White House — Martin Sheen as Jed Bartlet, the president we wanted. Idealistic in a way that is either naïve or necessary depending on the year you watch it."
  },
  {
    title: "Queer as Folk",
    year: 1999,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Russell T Davies's eight-episode Channel 4 original — three gay men in Manchester in 1999, with a frankness about sex and desire that British television had never attempted. The show that changed what television could say about gay lives."
  },
  {
    title: "Prime Suspect",
    year: 1991,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Helen Mirren as DCI Jane Tennison — seven films across fifteen years of a woman fighting for her place in a police force that doesn't want her there. The template for every serious female detective in British television that followed."
  },
  {
    title: "I, Claudius",
    year: 1976,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Robert Graves's Roman history as a BBC studio drama — Derek Jacobi as Claudius watching the Julio-Claudian dynasty destroy itself from the inside. The foundation stone of prestige television before anyone called it that."
  },
  {
    title: "Roots",
    year: 1977,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Alex Haley's account of his family from African capture to Emancipation — the eight-episode ABC miniseries that 130 million Americans watched and that remains the most significant piece of television about the history of slavery."
  },
  {
    title: "Upstairs, Downstairs",
    year: 1971,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "The Bellamy family and their servants in a Edwardian London townhouse — the ITV series that invented the genre Downton Abbey would inherit fifty years later, and in many ways still surpasses its descendants."
  },
  {
    title: "Scenes from a Marriage",
    year: 1973,
    type: "tv",
    language: "sv",
    tags: ["passport"],
    curatorNote: "Ingmar Bergman's six-hour Swedish television drama about a marriage falling apart — Liv Ullmann and Erland Josephson. The most intimate and devastating examination of a relationship in the history of the medium."
  },
  {
    title: "The Forsyte Saga",
    year: 1967,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "John Galsworthy's trilogy — the BBC Sunday-night serial that drew 18 million viewers and launched the era of British heritage drama. The Forsyte family across three generations of money, marriage and Edwardian England."
  },
  {
    title: "The Prisoner",
    year: 1967,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Patrick McGoohan's seventeen episodes about a spy who resigns and wakes up in a mysterious village where everyone is a number — television's most radical and unresolved meditation on identity, surveillance and the individual vs. the state."
  },
  {
    title: "The Twilight Zone",
    year: 1959,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Rod Serling's five seasons of moral fables in thirty minutes — the most influential dramatic anthology in television history. It invented the form and set a standard for ideas per episode that nothing has matched."
  },
  {
    title: "Brideshead Revisited",
    year: 1981,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Evelyn Waugh's novel across eleven hours — Jeremy Irons and Anthony Andrews as Charles and Sebastian, memory and Catholicism and the England before the war. The summit of the literary adaptation as television art form."
  },
  {
    title: "Hill Street Blues",
    year: 1981,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Steven Bochco's police procedural that invented the serialized ensemble drama — overlapping storylines, continuing character arcs, moral ambiguity. Every drama series made since owes it a debt it will never finish paying."
  },
  {
    title: "The Jewel in the Crown",
    year: 1984,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Paul Scott's Raj Quartet adapted by Granada — the end of British India through the Daphne Manners rape case and its consequences. Fourteen episodes of the most ambitious and morally complex British television drama of the 1980s."
  },
  {
    title: "Yes Minister",
    year: 1980,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "A minister tries to govern; his permanent secretary prevents him. Antony Jay and Jonathan Lynn's three series is the most accurate and most beloved satire of how the British state actually works — both Thatcher and Blair cited it."
  },
  {
    title: "L.A. Law",
    year: 1986,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Steven Bochco's lawyers in Los Angeles — eight seasons of the network drama that made law firms seem as sexy, funny and morally compromised as they probably are. The template for every glossy legal drama since."
  },
  {
    title: "Thirtysomething",
    year: 1987,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Baby boomers in Philadelphia confronting careers, marriages and the first signs of middle age — Ed Zwick and Marshall Herskovitz's series was the most nakedly personal American drama of its era. It invented the 'quality drama' audience."
  },
  {
    title: "Dallas",
    year: 1978,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "The Ewing family's oil empire — fourteen seasons of the most-watched soap opera in American television history. J.R. Ewing remains television's greatest villain, and 'Who shot J.R.?' was the first global television event."
  },
  {
    title: "Knots Landing",
    year: 1979,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "The Dallas spinoff that surpassed its parent — fourteen seasons of a California cul-de-sac where the marriages, murders and secrets multiplied across a more human scale than the Ewing ranch ever allowed."
  },
  {
    title: "Lou Grant",
    year: 1977,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "Ed Asner's drama spinoff from The Mary Tyler Moore Show — a city editor at a Los Angeles newspaper, five seasons of investigative journalism as a social conscience. The template for every newsroom drama that followed."
  },
  {
    title: "Misaeng: Incomplete Life",
    year: 2014,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "A failed Go player becomes an office worker and discovers that corporate life has its own rigid hierarchies — the Korean drama about modern work that became a genuine cultural phenomenon, beloved for its painful accuracy."
  },
  {
    title: "The Paper Chase",
    year: 1978,
    type: "tv",
    language: "en",
    tags: ["critics"],
    curatorNote: "James T. Hart's first year at Harvard Law School — John Houseman reprising his Oscar-winning role as the formidable Professor Kingsfield. Four seasons of the most intelligent drama ever set inside American education."
  },
  {
    title: "Move to Heaven",
    year: 2021,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "A young man with Asperger's and his uncle run a trauma cleaning service — and in each apartment find the story of the person who died there. The most quietly devastating Korean drama of its year, and a genuinely original premise."
  },
  {
    title: "Somebody Somewhere",
    year: 2022,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Bridget Everett as a woman returning to her small Kansas hometown after her sister's death — an HBO series of extraordinary gentleness about the misfits in every small town who find each other and make something that feels like family."
  },
  {
    title: "Lodge 49",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A former surfer drifts into a fraternal lodge in Long Beach, California — AMC's most underrated series, a shaggy, warm and genuinely mysterious drama about belonging, alchemy and what we're looking for when we stop looking."
  },
  {
    title: "Mozart in the Jungle",
    year: 2014,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "A young oboist and an eccentric new conductor shake up a New York classical orchestra — Amazon's first Golden Globe winner, a charming and specific dramedy about art, ambition and the impracticality of a life in music."
  },
  {
    title: "The Morning Show",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Jennifer Aniston and Reese Witherspoon backstage at a Today-style morning show after a #MeToo scandal breaks — Apple TV+'s launch drama has grown more confident each season and in its third year became genuinely great television."
  },
  {
    title: "The Newsreader",
    year: 2021,
    type: "tv",
    language: "en",
    tags: ["critics", "crowd"],
    curatorNote: "Anna Torv and Sam Reid at an Australian commercial news desk in 1986 — ABC's period drama is the most underappreciated series about journalism since State of Play. Sharp about the industry, warmer than it looks."
  },
  {
    title: "Billions",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Paul Giamatti as the US Attorney gunning for Damian Lewis's hedge fund billionaire — Showtime's most entertaining power drama. The show that made insider trading feel like a blood sport."
  },
  {
    title: "Press",
    year: 2018,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Mike Bartlett's BBC drama about two rival newspapers — a tabloid and a broadsheet — as the phone-hacking era arrives. A series so specific about British journalism that it feels like an insider's document."
  },
  {
    title: "Black Monday",
    year: 2019,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Don Cheadle, Andrew Rannells and Regina Hall on Wall Street in 1987 — a Showtime comedy-drama about the crash that plays like a fever dream of the decade's excess. Funnier and stranger than its premise suggests."
  },
  {
    title: "Patriot",
    year: 2015,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Michael Dorman as a spy forced to work for the CIA while moonlighting as a folk singer with very sad songs about his missions — Amazon's most singular drama. The darkest comedy about intelligence work ever made."
  },
  {
    title: "The OA",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "A woman who was blind returns home after seven years blind no longer and will not explain what happened — Brit Marling's two seasons are the most genuinely strange and emotionally committed piece of television mysticism of its era."
  },
  {
    title: "Wentworth",
    year: 2013,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "An Australian reimagining of the classic Prisoner — a women's prison drama that runs eleven seasons and builds to one of the most operatically satisfying final acts in the genre. Bea Smith then Joan Ferguson: two of the great TV villains."
  },
  {
    title: "Delhi Crime",
    year: 2019,
    type: "tv",
    language: "hi",
    tags: ["passport"],
    curatorNote: "The investigation into the 2012 Delhi gang rape — Netflix India's Emmy-winning series follows the police detective who led the case with unflinching honesty about the crime, the investigation and the city it happened in."
  },
  {
    title: "Extraordinary Attorney Woo",
    year: 2022,
    type: "tv",
    language: "ko",
    tags: ["passport"],
    curatorNote: "Park Eun-bin as Woo Young-woo, a brilliant attorney with autism starting her career at a top Seoul law firm — the Korean drama that became a global phenomenon for the warmth and specificity of its portrait of a neurodivergent woman navigating a world not built for her."
  },
  {
    title: "Better Things",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["critics", "surprise"],
    curatorNote: "Pamela Adlon as a single mother and working actress raising three daughters in Los Angeles — five seasons of the most unadorned and honest portrait of motherhood on American television. The final season is a quiet masterwork."
  },
  {
    title: "My Brilliant Friend",
    year: 2018,
    type: "tv",
    language: "it",
    tags: ["passport"],
    curatorNote: "Elena Ferrante's Neapolitan novels — Elena and Lila's friendship across four seasons and fifty years of Naples, from postwar poverty to the 1990s. Italian television's most ambitious production and the most faithful great literary adaptation."
  },
  {
    title: "Goliath",
    year: 2016,
    type: "tv",
    language: "en",
    tags: ["crowd", "surprise"],
    curatorNote: "Billy Bob Thornton as a disgraced lawyer who takes on the cases nobody else will — Amazon's four seasons of a legal thriller that understands that the law is mostly about power and that charisma is the only real weapon the powerless have."
  },

  // ── 1998 SERIES ────────────────────────────────────────────────────────────

  {
    title: "Dawson's Creek",
    year: 1998,
    type: "tv",
    language: "en",
    tags: ["crowd"],
    curatorNote: "Kevin Williamson's teen drama set on the Massachusetts coast — Dawson, Joey, Pacey and Jen navigating high school, heartbreak and identity in six seasons that defined a generation's emotional vocabulary. The show that launched a thousand coming-of-age dramas."
  },
];
