import {CANON_TIERS, RECOMMENDATION_ROLES, createCanonEntry} from "./schema";

export const ROMCOM_CANON = [
  createCanonEntry({
    title:"When Harry Met Sally...", year:1989, tier:CANON_TIERS.MASTERPIECE,
    primaryGenre:"romcom", secondaryGenres:["romance","comedy"],
    moods:{dateNight:10, makeMeLaugh:9, hopeful:9},
    viewerFit:{casual:10,specialist:10,cinephile:9},
    roles:[RECOMMENDATION_ROLES.CLASSIC_CHOICE,RECOMMENDATION_ROLES.CRITICS_CHOICE],
    country:"US", language:"en",
    curatorNote:"A defining romantic comedy whose wit, chemistry and emotional honesty still set the standard.",
    whyTonight:"Because few films make love, friendship and timing feel this funny and true.",
    scores:{editorialFit:10,humor:10,romance:10,rewatchability:10,discovery:2,cinephile:9}
  }),
  createCanonEntry({
    title:"Notting Hill", year:1999, tier:CANON_TIERS.MASTERPIECE,
    primaryGenre:"romcom", secondaryGenres:["romance","comedy"],
    moods:{dateNight:10, hopeful:9, comfort:9},
    viewerFit:{casual:10,specialist:9,cinephile:7},
    roles:[RECOMMENDATION_ROLES.COMFORT_PICK,RECOMMENDATION_ROLES.CLASSIC_CHOICE],
    country:"GB", language:"en",
    curatorNote:"Star power, vulnerability and Richard Curtis wit combine in one of the genre’s most enduring crowd-pleasers.",
    whyTonight:"Because charm, laughter and a grand romantic gesture rarely come together this gracefully.",
    scores:{editorialFit:10,humor:9,romance:10,rewatchability:10,discovery:2,cinephile:7}
  }),
  createCanonEntry({
    title:"The Holiday", year:2006, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["romance","comedy"],
    moods:{dateNight:10,comfort:10,hopeful:10,luxuryVibes:8},
    viewerFit:{casual:10,specialist:8,cinephile:6},
    roles:[RECOMMENDATION_ROLES.COMFORT_PICK,RECOMMENDATION_ROLES.MODERN_FAVORITE],
    country:"US", language:"en",
    curatorNote:"Nancy Meyers turns heartbreak, friendship and two beautiful homes into irresistible cinematic comfort.",
    whyTonight:"Because sometimes the right movie night needs warmth, wit and a little romantic reinvention.",
    scores:{editorialFit:10,humor:8,romance:10,rewatchability:10,discovery:2,cinephile:6}
  }),
  createCanonEntry({
    title:"Crazy Rich Asians", year:2018, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["romance","comedy"],
    moods:{dateNight:10,luxuryVibes:10,hopeful:9},
    viewerFit:{casual:10,specialist:8,cinephile:7},
    roles:[RECOMMENDATION_ROLES.MODERN_FAVORITE,RECOMMENDATION_ROLES.PASSPORT_PICK],
    country:"US", language:"en",
    curatorNote:"A glossy, joyful romantic comedy with cultural specificity, irresistible chemistry and genuine emotional stakes.",
    whyTonight:"Because romance, family and spectacular luxury make this an especially festive date-night choice.",
    scores:{editorialFit:10,humor:8,romance:10,rewatchability:9,discovery:3,cinephile:7}
  }),
  createCanonEntry({
    title:"Palm Springs", year:2020, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["comedy","sci-fi"],
    moods:{dateNight:9,mindBlown:7,makeMeLaugh:9},
    viewerFit:{casual:9,specialist:10,cinephile:8},
    roles:[RECOMMENDATION_ROLES.CURATORS_SURPRISE,RECOMMENDATION_ROLES.MODERN_FAVORITE],
    country:"US", language:"en",
    curatorNote:"A clever time-loop comedy that refreshes familiar romantic beats without losing warmth or accessibility.",
    whyTonight:"Because it delivers the comfort of a romcom with the playful surprise of smart science fiction.",
    scores:{editorialFit:10,humor:9,romance:8,rewatchability:9,discovery:6,cinephile:8}
  }),
  createCanonEntry({
    title:"The Big Sick", year:2017, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["comedy","drama"],
    moods:{dateNight:9,makeMeLaugh:8,hopeful:9},
    viewerFit:{casual:9,specialist:9,cinephile:9},
    roles:[RECOMMENDATION_ROLES.CRITICS_CHOICE,RECOMMENDATION_ROLES.MODERN_FAVORITE],
    country:"US", language:"en",
    curatorNote:"Personal, funny and emotionally intelligent, it expands the genre through culture, family and lived experience.",
    whyTonight:"Because its humor and honesty make romance feel both specific and universal.",
    scores:{editorialFit:10,humor:9,romance:9,rewatchability:8,discovery:5,cinephile:9}
  }),
  createCanonEntry({
    title:"My Big Fat Greek Wedding", year:2002, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,familyNight:9,makeMeLaugh:9},
    viewerFit:{casual:10,specialist:8,cinephile:6},
    roles:[RECOMMENDATION_ROLES.COMFORT_PICK,RECOMMENDATION_ROLES.MODERN_FAVORITE],
    country:"US", language:"en",
    curatorNote:"A warm, generous comedy where romance grows inside a wonderfully specific and unforgettable family.",
    whyTonight:"Because laughter, affection and family chaos make this an easy evening win.",
    scores:{editorialFit:10,humor:9,romance:8,rewatchability:9,discovery:3,cinephile:6}
  }),
  createCanonEntry({
    title:"10 Things I Hate About You", year:1999, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,makeMeLaugh:8,comfort:9},
    viewerFit:{casual:10,specialist:9,cinephile:7},
    roles:[RECOMMENDATION_ROLES.COMFORT_PICK,RECOMMENDATION_ROLES.CLASSIC_CHOICE],
    country:"US", language:"en",
    curatorNote:"A sharp Shakespeare adaptation with wit, chemistry and one of teen cinema’s most memorable declarations of love.",
    whyTonight:"Because its humor and chemistry still feel fresh, warm and completely irresistible.",
    scores:{editorialFit:10,humor:9,romance:9,rewatchability:10,discovery:2,cinephile:7}
  }),
  createCanonEntry({
    title:"It Happened One Night", year:1934, tier:CANON_TIERS.MASTERPIECE,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,makeMeLaugh:8},
    viewerFit:{casual:8,specialist:10,cinephile:10},
    roles:[RECOMMENDATION_ROLES.CLASSIC_CHOICE,RECOMMENDATION_ROLES.CRITICS_CHOICE],
    country:"US", language:"en",
    curatorNote:"A foundational screwball romance whose pace, chemistry and comic structure influenced generations of filmmakers.",
    whyTonight:"Because discovering where so many romantic-comedy traditions began can still be enormous fun.",
    scores:{editorialFit:10,humor:9,romance:9,rewatchability:8,discovery:5,cinephile:10}
  }),
  createCanonEntry({
    title:"The Shop Around the Corner", year:1940, tier:CANON_TIERS.MASTERPIECE,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,comfort:9,holidaySpirit:8},
    viewerFit:{casual:8,specialist:10,cinephile:10},
    roles:[RECOMMENDATION_ROLES.CLASSIC_CHOICE,RECOMMENDATION_ROLES.CRITICS_CHOICE],
    country:"US", language:"en",
    curatorNote:"Lubitsch’s exquisite comedy of mistaken identity remains elegant, humane and emotionally precise.",
    whyTonight:"Because wit, longing and old-Hollywood warmth make this a beautifully rewarding discovery.",
    scores:{editorialFit:10,humor:8,romance:10,rewatchability:9,discovery:6,cinephile:10}
  }),
  createCanonEntry({
    title:"Bridget Jones's Diary", year:2001, tier:CANON_TIERS.ESSENTIAL,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,makeMeLaugh:9,comfort:9},
    viewerFit:{casual:10,specialist:9,cinephile:7},
    roles:[RECOMMENDATION_ROLES.COMFORT_PICK,RECOMMENDATION_ROLES.MODERN_FAVORITE],
    country:"GB", language:"en",
    curatorNote:"Messy, funny and deeply human, Bridget became an enduring heroine because imperfection is the point.",
    whyTonight:"Because romantic optimism is even more satisfying when the heroine is gloriously imperfect.",
    scores:{editorialFit:10,humor:9,romance:9,rewatchability:10,discovery:2,cinephile:7}
  }),
  createCanonEntry({
    title:"Four Weddings and a Funeral", year:1994, tier:CANON_TIERS.MASTERPIECE,
    primaryGenre:"romcom", secondaryGenres:["comedy","romance"],
    moods:{dateNight:9,makeMeLaugh:9,hopeful:8},
    viewerFit:{casual:9,specialist:10,cinephile:8},
    roles:[RECOMMENDATION_ROLES.CLASSIC_CHOICE,RECOMMENDATION_ROLES.CRITICS_CHOICE],
    country:"GB", language:"en",
    curatorNote:"Richard Curtis balances wit, friendship, grief and romance with a lightness few screenplays have matched.",
    whyTonight:"Because it offers laughter, warmth and one of British cinema’s defining romantic ensembles.",
    scores:{editorialFit:10,humor:9,romance:9,rewatchability:9,discovery:3,cinephile:8}
  })
];

export const ROMCOM_EXCLUSIONS = [
  ["Poor Things",2023],
  ["Back to the Future",1985],
  ["Chungking Express",1994],
  ["PK",2014],
  ["The Three Garcías",1947],
  ["Dos tipos de cuidado",1953],
  ["Her",2013],
  ["Eternal Sunshine of the Spotless Mind",2004],
  ["Titanic",1997],
  ["Past Lives",2023],
  ["La La Land",2016],
  ["The Shape of Water",2017]
];
