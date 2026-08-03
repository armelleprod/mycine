import { useEffect, useState } from "react";
import curatorPhoto from "./assets/armelle-cloche.jpg";
import { ROMCOM_EDITORIAL_BATCHES } from "./data/romcomBatches";
import {
  applyCanonMetadata,
  canonViewerType,
  getCanonEntriesForGenre,
  getNewArrivalsForGenre,
  isCanonApprovedFor,
  isEditoriallyExcluded
} from "./data/canon";

// ═══════════════════════════════════════════════════════════════════════════
// MY CINÉ — Clean Single Architecture
// 1. Live TMDB data only
// 2. Local ranking and whyWatch text
// 3. Display: 1 Hero (2026, then 2025 fallback) + exactly 6 Alternatives
// Poster: https://image.tmdb.org/t/p/w500${poster_path} in <img> tag (no CORS needed)
// ═══════════════════════════════════════════════════════════════════════════

const C = {
  red:"#E50914", redDark:"#B0001A",
  goldBright:"#FFB800", gold:"#E0A800",
  navy:"#0B1F4A", navyMid:"#162D60",
  white:"#FFFFFF", cream:"#FFF8E7",
};
const PROVIDER_LINKS  = {"Netflix":"https://www.netflix.com","Prime Video":"https://www.primevideo.com","Disney+":"https://www.disneyplus.com"};
const PROVIDER_COLORS = {
  "Netflix":"#E50914",
  "Prime Video":"#00A8E0",
  "HBO Max":"#6B4EFF",
  "Apple TV+":"#FFFFFF",
  "Disney+":"#1152CC",
  "Claro video":"#E2231A",
  "ViX":"#5B21B6"
};
const ERA_COLORS      = {classic:C.goldBright,modern:"#5B8DEF",current:C.red};
const ROLE_BADGE_COLORS = {
  "🍿 Tonight\'s Pick": C.goldBright,
  "❤️ Crowd Favorite": "#E91E8C",
  "🎞️ Classic": C.goldBright,
  "🌍 Passport": "#1A73E8",
  "💎 Discovery": "#7C3AED",
  "🏆 Critics": "#16A34A",
  "✨ Surprise": "#9333EA"
};
const CURRENT_YEAR    = new Date().getFullYear();

const LOADING_MSGS = [
  "🎬 Finding tonight\'s best picks…",
  "🍿 Tasting films so you don\'t have to…",
  "✨ Applying the My Ciné Standard…",
  "💫 Almost there — worth the wait!",
];

const GENRES = [
  {id:"romcom",label:"Romcom",emoji:"💕"},
  {id:"comedy",label:"Comedy",emoji:"😂"},
  {id:"romance",label:"Romance",emoji:"💞"},
  {id:"drama",label:"Drama",emoji:"🎭"},
  {id:"thriller",label:"Thriller",emoji:"🔍"},
  {id:"mystery",label:"Mystery",emoji:"🕵️"},
  {id:"action",label:"Action & Adventure",emoji:"💥"},
  {id:"horror",label:"Horror",emoji:"👻"},
  {id:"scifi",label:"Sci-Fi",emoji:"🚀"},
  {id:"fantasy",label:"Fantasy",emoji:"🧙"},
  {id:"animation",label:"Animation",emoji:"✨"},
  {id:"musical",label:"Musical",emoji:"🎵"},
  {id:"biopic",label:"True Stories / Biopic",emoji:"🏆"},
  {id:"documentary",label:"Documentary",emoji:"🎙️"},
  {id:"international",label:"International",emoji:"🌍"},
  {id:"hiddengems",label:"Hidden Gems",emoji:"💎"},
];

const MOODS = [
  {id:"mindblow",label:"Mind Blown",emoji:"🤯"},
  {id:"laugh",label:"Make Me Laugh",emoji:"😂"},
  {id:"date",label:"Date Night",emoji:"💘"},
  {id:"feelgood",label:"Feel Good",emoji:"😌"},
  {id:"cry",label:"Ugly Cry",emoji:"😭"},
  {id:"think",label:"Make Me Think",emoji:"🧠"},
  {id:"inspire",label:"Inspire Me",emoji:"🌟"},
  {id:"travel",label:"Travel Somewhere",emoji:"🌎"},
  {id:"escape",label:"Escape Reality",emoji:"🌙"},
  {id:"adrenaline",label:"Adrenaline Rush",emoji:"🔥"},
  {id:"chills",label:"Give Me Chills",emoji:"😱"},
  {id:"family",label:"Family Night",emoji:"👨‍👩‍👧"},
  {id:"nostalgia",label:"Nostalgia Trip",emoji:"🧡"},
  {id:"mystery",label:"Solve the Mystery",emoji:"🕵️"},
  {id:"heal",label:"Heal My Heart",emoji:"❤️‍🩹"},
  {id:"luxury",label:"Luxury Vibes",emoji:"🥂"},
];

const MEDIA_OPTIONS = [
  {id:"both", label:"🍿 Both"},
  {id:"movie", label:"🎬 Movies"},
  {id:"tv", label:"📺 TV Series"}
];


// ── SEED DATA ─────────────────────────────────────────────────────────────────
// Pre-fetched from TMDB. All poster_paths are real TMDB paths.
// h: [id, title, year, poster_path, provider, rating, overview, isTV]  — 2026 only
// a: [id, title, year, era, poster_path, provider, rating, overview]   — all years
const SEED = {"romcom":{"h":[[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1542352,"Youth","2026","/rNzk0jlGRPnvZ26On5xhTmLaQhO.jpg","Netflix",7.2,"Youth follows Praveen, a 15-year-old boy who enters adolescence determined to find true love before ",false],[1034716,"People We Meet on Vacation","2026","/peG6482ALJQ9Tbvv2P38BquVk0f.jpg","Netflix",7.0,"Poppy's a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[550205,"Wish Dragon","2021","current","/lnPf6hzANL6pVQTxUlsNYSuhT5l.jpg","Netflix",7.8,"Determined teen Din is longing to reconnect with his childhood best friend when "],[579792,"Cindy La Regia","2020","current","/1KGbMtuySUtRggWlYPXyTWFcxLx.jpg","Netflix",7.8,"When Cindy decides that she doesn't want to marry her boyfriend, she runs to Mex"],[369299,"Don't Blame the Kid","2016","modern","/zWp8QZ1KxNrirNK9MF1EAIHjqVw.jpg","Prime Video",7.7,"After a one-night stand results in pregnancy, a young woman decides to become pa"],[662237,"Sweet & Sour","2021","current","/3yGwAPl6LWpi8QwHjwCMaqsPgNB.jpg","Netflix",7.7,"Faced with real-world opportunities and challenges, a couple endures the highs a"],[1027014,"Entergalactic","2022","current","/oMU3JpuKuasjAWIbUQgCaT6pco1.jpg","Netflix",7.7,"Ambitious artist Jabari attempts to balance success and love when he moves into "],[656563,"Rich in Love","2020","current","/dVqRATKlpCoWy96lfxiHc9TY9An.jpg","Netflix",7.7,"Working incognito at his rich dad's company to test his own merits, Teto falls f"],[792307,"Poor Things","2023","current","/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg","Disney+",7.6,"Brought back to life by an unorthodox scientist, a young woman runs off with a l"],[583083,"The Kissing Booth 2","2020","current","/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","Netflix",7.6,"With college decisions looming, Elle juggles her long-distance romance with Noah"],[4951,"10 Things I Hate About You","1999","modern","/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg","Disney+",7.6,"On the first day at his new school, Cameron instantly falls for Bianca, the gorg"],[466282,"To All the Boys I've Loved Before","2018","modern","/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","Netflix",7.6,"Lara Jean's love life goes from imaginary to out of control when her secret lett"],[976573,"Elemental","2023","current","/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg","Disney+",7.6,"In a city where fire, water, land and air residents live together, a fiery young"]]},"comedy":{"h":[[1598785,"Milky☆Subway: The Galactic Limited Express - the Movie","2026","/brQf6Odu4S6WzfVLuXLbOcbsOP2.jpg","Netflix",9.0,"Six delinquents are tasked with cleaning a train as part of a community service program. But when th",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1591834,"Familia a la deriva","2026","/jofyMzEnLoBZFKezmcCli3bEFwz.jpg","Disney+",8.3,"To make up for lost time with his four children, a charismatic car salesman organizes a Caribbean ya",false],[1327819,"Hoppers","2026","/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg","Disney+",8.2,"Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing ",false],[1576369,"Bharathanatyam 2 Mohiniyattam","2026","/lsg0IxNQCUxKqs63YjturEuY0qQ.jpg","Netflix",8.1,"The family's journey to Sreekandapuram to settle the late Bharathan Nair's second wife and son takes",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[496243,"Parasite","2019","modern","/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg","Netflix",8.5,"All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glam"],[105,"Back to the Future","1985","classic","/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg","Prime Video",8.3,"Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadver"],[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[654299,"Out of the Clear Blue Sky","2019","modern","/o9cSEHrXzPOO4OIoT9yrdxc216w.jpg","Netflix",8.3,"Returning to Earth as an imitator, the legendary Mexican artist Pedro Infante mu"],[77338,"The Intouchables","2011","modern","/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg","Prime Video",8.3,"A true story of two men who should never have met – a quadriplegic aristocrat wh"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[490132,"Green Book","2018","modern","/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg","Prime Video",8.2,"Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour thr"],[508965,"Klaus","2019","modern","/q125RHUDgR4gjwh1QkfYuJLYkL.jpg","Netflix",8.2,"A selfish postman and a reclusive toymaker form an unlikely friendship, deliveri"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[120467,"The Grand Budapest Hotel","2014","modern","/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg","Netflix",8.0,"The Grand Budapest Hotel tells of a legendary concierge at a famous European hot"],[400608,"Bo Burnham: Make Happy","2016","modern","/qVThhskXZZHDfj4m8jOx2CxIVIW.jpg","Netflix",8.0,"Combining his trademark wit and self-deprecating humor with original music, Bo B"],[803796,"KPop Demon Hunters","2025","current","/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg","Netflix",8.0,"When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're u"],[9277,"The Sting","1973","classic","/ckmYng37zey8INYf6d10cVgIG93.jpg","Netflix",8.0,"A novice con man teams up with an acknowledged master to avenge the murder of a "],[610461,"Veinteañera, divorciada y fantástica","2020","current","/oSbCdDI0SAAOdywGe0YVO2iDdV9.jpg","Netflix",8.0,"Regina, our young protagonist, always dreamed of getting married. And she did it"],[678580,"El mesero","2021","current","/zvGC5jX5wQmU1GgPc0VGZz7Mtcs.jpg","Netflix",8.0,"A waiter pretends to be an important businessman in order to reach the upper cla"],[400928,"Gifted","2017","modern","/7YB2YrMwIm1g8FyZtlvmVDfRnAT.jpg","Disney+",8.0,"Frank, a single man raising his child prodigy niece Mary, is drawn into a custod"],[823754,"Bo Burnham: Inside","2021","current","/ku1UvTWYvhFQbSesOD6zteY7bXT.jpg","Netflix",8.0,"Stuck in COVID-19 lockdown, US comedian and musician Bo Burnham attempts to stay"]]},"romance":{"h":[[1630423,"My Dearest Assassin","2026","/ul4dQcA68mtSx8J56N5gEcaCCtP.jpg","Netflix",8.6,"Hunted for her rare blood type, a caged woman vows to fight alongside the assassin she loves to prot",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1595852,"Boulevard","2026","/hAKOp4AHaDiVdDMlobMNCNgJVD7.jpg","Prime Video",7.5,"New city, new life, and an unexpected encounter with Luke-a boy fueled by adrenaline and haunted by ",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[1466115,"Even If This Love Disappears Tonight","2025","current","/5eNN8KLDPUXDqIkTdCbmn1gx5P7.jpg","Netflix",8.4,"A high school girl wakes up each day with no memory of yesterday. When she agree"],[1291559,"Drawing Closer","2024","current","/173FD4a0rpSF30z4CoWx6qdx8Ry.jpg","Netflix",8.4,"With only a year left to live, 17-year-old Akito finds new meaning in life by br"],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[851644,"20th Century Girl","2022","current","/od22ftNnyag0TTxcnJhlsu3aLoU.jpg","Netflix",8.2,"In 1999, a teen girl keeps close tabs on a boy in school on behalf of her deeply"],[522924,"The Art of Racing in the Rain","2019","modern","/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg","Disney+",8.2,"A family dog – with a near-human soul and a philosopher's mind – evaluates his l"],[51822,"Love Hurts","2002","modern","/kbtgdKUEnX76MOJ7w30js5vSNLT.jpg","Netflix",8.1,"Family and friends try to sabotage the budding romance between a young upper cla"],[762975,"Purple Hearts","2022","current","/4JyNWkryifWbWXJyxcWh3pVya6N.jpg","Netflix",8.0,"An aspiring musician agrees to a marriage of convenience with a soon-to-deploy M"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[962232,"Beyond the Universe","2022","current","/AlAP6WRSBuf5cP8OgpHTF45BPUp.jpg","Netflix",7.9,"While waiting for a kidney transplant, a young pianist finds an unexpected conne"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[597,"Titanic","1997","modern","/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg","Disney+",7.9,"101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic,"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[776503,"CODA","2021","current","/BzVjmm8l23rPsijLiNLUzuQtyd.jpg","Prime Video",7.9,"As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf fa"],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[719410,"Your Name Engraved Herein","2020","current","/ynNO5FhArEz68wRKOn4NgqVntmS.jpg","Netflix",7.9,"In 1987, as martial law ends in Taiwan, Jia-han and Birdy fall in love amid fami"]]},"drama":{"h":[[1630423,"My Dearest Assassin","2026","/ul4dQcA68mtSx8J56N5gEcaCCtP.jpg","Netflix",8.6,"Hunted for her rare blood type, a caged woman vows to fight alongside the assassin she loves to prot",false],[1330021,"Remarkably Bright Creatures","2026","/9HcEqn3D4J6b2Z0jK54id9nA0fr.jpg","Netflix",8.5,"Through unlikely bonds formed during night shifts at a local aquarium, Tova, an elderly widow, learn",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1439930,"The Punisher: One Last Kill","2026","/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg","Disney+",8.3,"As Frank Castle searches for meaning beyond revenge, an unexpected force pulls him back into the fig",false],[1426451,"Risa and the Wind Phone","2026","/xDiOhLWppsz9hmGrrcjiIa4Dlzn.jpg","Netflix",8.2,"Risa, after her father's death, discovers she has the ability to communicate with him from beyond th",false]],"a":[[389,"12 Angry Men","1957","classic","/ppd84D2i9W8jXmsyInGyihiSyqz.jpg","Prime Video",8.6,"The defense and the prosecution have rested and the jury is filing into the jury"],[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[497,"The Green Mile","1999","modern","/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg","Prime Video",8.5,"A supernatural tale set on death row in a Southern prison, where gentle giant Jo"],[496243,"Parasite","2019","modern","/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg","Netflix",8.5,"All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glam"],[769,"GoodFellas","1990","modern","/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg","Prime Video",8.5,"The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is ad"],[1466115,"Even If This Love Disappears Tonight","2025","current","/5eNN8KLDPUXDqIkTdCbmn1gx5P7.jpg","Netflix",8.4,"A high school girl wakes up each day with no memory of yesterday. When she agree"],[664280,"David Attenborough: A Life on Our Planet","2020","current","/zSKwyUDKDHiFU5syTTvQRDcGBPS.jpg","Netflix",8.4,"The story of life on our planet by the man who has seen more of the natural worl"],[12477,"Grave of the Fireflies","1988","classic","/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg","Netflix",8.4,"In the final months of World War II, 14-year-old Seita and his sister Setsuko ar"],[550,"Fight Club","1999","modern","/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg","Netflix",8.4,"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male a"],[1291559,"Drawing Closer","2024","current","/173FD4a0rpSF30z4CoWx6qdx8Ry.jpg","Netflix",8.4,"With only a year left to live, 17-year-old Akito finds new meaning in life by br"],[311,"Once Upon a Time in America","1984","classic","/i0enkzsL5dPeneWnjl1fCWm6L7k.jpg","Disney+",8.4,"A former Prohibition-era Jewish gangster returns to the Lower East Side of Manha"],[770156,"Lucy Shimmers and the Prince of Peace","2020","current","/yfnJ5qIYx7q33fY4jqv9Pu95RSg.jpg","Prime Video",8.4,"Second chances start when a hardened criminal crosses paths with a precocious li"],[1058694,"Radical","2023","current","/lOAJYpX608aT0ApIv63ZTnol27Y.jpg","Prime Video",8.3,"In a Mexican border town plagued by neglect, corruption, and violence, a frustra"],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[207,"Dead Poets Society","1989","classic","/tNvKkSnnn4Z6RCBThyK1gfCSSvv.jpg","Disney+",8.3,"At an elite, old-fashioned boarding school in New England, a passionate English "],[654299,"Out of the Clear Blue Sky","2019","modern","/o9cSEHrXzPOO4OIoT9yrdxc216w.jpg","Netflix",8.3,"Returning to Earth as an imitator, the legendary Mexican artist Pedro Infante mu"],[77338,"The Intouchables","2011","modern","/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg","Prime Video",8.3,"A true story of two men who should never have met – a quadriplegic aristocrat wh"],[335,"Once Upon a Time in the West","1968","classic","/qbYgqOczabWNn2XKwgMtVrntD6P.jpg","Netflix",8.3,"As the railroad builders advance unstoppably through the Arizona desert on their"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "]]},"thriller":{"h":[[1576369,"Bharathanatyam 2 Mohiniyattam","2026","/lsg0IxNQCUxKqs63YjturEuY0qQ.jpg","Netflix",8.1,"The family's journey to Sreekandapuram to settle the late Bharathan Nair's second wife and son takes",false],[1290821,"Shelter","2026","/buPFnHZ3xQy6vZEHxbHgL1Pc6CR.jpg","Prime Video",7.8,"A man living in self-imposed exile on a remote island rescues a young girl from a violent storm, set",false],[1339876,"Mardaani 3","2026","/dHxLBtHw4InwsVumnthupZYz6NM.jpg","Netflix",7.6,"Officer Shivani Shivaji Roy returns to hunt down those behind the disappearance of young girls, risk",false],[1266127,"Ready or Not: Here I Come","2026","/jRf89HVEtBZiSnOXXWDhZOfuTwW.jpg","Disney+",7.6,"Moments after surviving an all-out attack from the Le Domas family, Grace discovers she’s reached th",false],[1613798,"Vengeance","2026","/ygWXPL0RS91JyJPNOfK34eV3bRE.jpg","Prime Video",7.5,"The brutal murder of the wife of “Toro,” a military hero in the special forces, turns him into a man",false]],"a":[[496243,"Parasite","2019","modern","/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg","Netflix",8.5,"All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glam"],[550,"Fight Club","1999","modern","/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg","Netflix",8.4,"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male a"],[1356039,"Counterattack","2025","current","/38I76hGcFY6xB47pjm7pZwkfuAF.jpg","Netflix",8.3,"When a hostage rescue mission creates a new enemy, Capt. Guerrero and his elite "],[16869,"Inglourious Basterds","2009","modern","/aupnPtagH9JVBuMrGEanf4iqXEQ.jpg","Prime Video",8.2,"In Nazi-occupied France during World War II, a group of Jewish-American soldiers"],[1422,"The Departed","2006","modern","/nT97ifVT2J1yMQmeq20Qblg61T.jpg","Netflix",8.2,"To take down South Boston's Irish Mafia, the police send in one of their own to "],[205596,"The Imitation Game","2014","modern","/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg","Prime Video",8.0,"Based on the real life story of legendary cryptanalyst Alan Turing, the film por"],[25376,"The Secret in Their Eyes","2009","modern","/r3FctmAMk2tbrwxuWdpeLrZLwIz.jpg","Netflix",8.0,"Hoping to put to rest years of unease concerning a past case, retired criminal i"],[679,"Aliens","1986","classic","/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg","Disney+",8.0,"Ripley, the sole survivor of the Nostromo's deadly encounter with the monstrous "],[745,"The Sixth Sense","1999","modern","/vOyfUXNFSnaTk7Vk5AjpsKTUWsu.jpg","Disney+",8.0,"Following an unexpected tragedy, child psychologist Malcolm Crowe meets a nine y"],[6977,"No Country for Old Men","2007","modern","/uB7RDZby43Wvu8SKGHHTwGyTDBX.jpg","Netflix",7.9,"Llewelyn Moss stumbles upon dead bodies, $2 million and a hoard of heroin in a T"],[78,"Blade Runner","1982","classic","/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg","Prime Video",7.9,"In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is c"],[210577,"Gone Girl","2014","modern","/ts996lKsxvjkO2yiYG0ht4qAicO.jpg","Disney+",7.9,"With his wife's disappearance having become the focus of an intense media circus"],[488623,"Forgotten","2017","modern","/cBgj41y1RvmW1zJCEX0uNWL0UjW.jpg","Netflix",7.9,"Jin-seok, 21-year-old, moves into a new house with his family. He suffers from a"],[581528,"The Gangster, the Cop, the Devil","2019","modern","/oHlM4abRm6BzrRcz9Nup1uidw9H.jpg","Prime Video",7.9,"After barely surviving a brutal attack by a sadistic serial killer, crime boss J"],[393,"Kill Bill: Vol. 2","2004","modern","/2yhg0mZQMhDyvUQ4rG1IZ4oIA8L.jpg","Netflix",7.9,"The Bride unwaveringly continues on her roaring rampage of revenge against the b"],[615457,"Nobody","2021","current","/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg","Prime Video",7.9,"Hutch Mansell, a suburban dad, overlooked husband, nothing neighbor — a \"nobody."],[3112,"The Night of the Hunter","1955","classic","/rBka0nFWiHxabHRLr0KfIA8Yiaq.jpg","Prime Video",7.9,"In Depression-era West Virginia, a serial-killing preacher hunts two young child"],[698948,"Thirteen Lives","2022","current","/yi5KcJqFxy0D6yP8nCfcF8gJGg5.jpg","Prime Video",7.8,"Based on the true nail-biting mission that captivated the world. Twelve boys and"],[562,"Die Hard","1988","classic","/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg","Disney+",7.8,"High above the city of L.A. a team of terrorists has seized a building, taken ho"],[2118,"L.A. Confidential","1997","modern","/lWCgf5sD5FpMljjpkRhcC8pXcch.jpg","Disney+",7.8,"Three detectives in the corrupt and brutal L.A. police force of the 1950s use di"]]},"mystery":{"h":[[1560681,"Colors of Evil: Black","2026","/reeKdj7BSznr7wSGzAtIMrPFgKo.jpg","Netflix",6.9,"Investigating the disappearance of children in a remote Polish town, prosecutor Leopold Bilski must ",false],[1659155,"The Truthers","2026","/ltuAheARdaUHbaS8lX1ZPrNOXe5.jpg","Netflix",6.1,"After her mother's sudden death, Ruth returns to her hometown and reunites with her father, whose od",false],[1389149,"Accused","2026","/3FAQTMv64JINU5Pk6mePXQbze4M.jpg","Netflix",5.5,"When a celebrated queer doctor in London is accused of sexual misconduct, her life unravels. Now und",false],[1357359,"Ejen Ali: The Movie 2","2025","/cjDAlNKylyqNUpv6nDoFR1YBEAD.jpg","Netflix",8.0,"Ejen Ali is appointed as the pilot of Project Satria, a new armoured suit with the help of an Artifi",false],[1368166,"The Housemaid","2025","/cWsBscZzwu5brg9YjNkGewRUvJX.jpg","Prime Video",7.3,"Trying to escape her past, Millie Calloway accepts a job as a live-in housemaid for the wealthy Nina",false]],"a":[[25376,"The Secret in Their Eyes","2009","modern","/r3FctmAMk2tbrwxuWdpeLrZLwIz.jpg","Netflix",8.0,"Hoping to put to rest years of unease concerning a past case, retired criminal i"],[745,"The Sixth Sense","1999","modern","/vOyfUXNFSnaTk7Vk5AjpsKTUWsu.jpg","Disney+",8.0,"Following an unexpected tragedy, child psychologist Malcolm Crowe meets a nine y"],[210577,"Gone Girl","2014","modern","/ts996lKsxvjkO2yiYG0ht4qAicO.jpg","Disney+",7.9,"With his wife's disappearance having become the focus of an intense media circus"],[488623,"Forgotten","2017","modern","/cBgj41y1RvmW1zJCEX0uNWL0UjW.jpg","Netflix",7.9,"Jin-seok, 21-year-old, moves into a new house with his family. He suffers from a"],[2118,"L.A. Confidential","1997","modern","/lWCgf5sD5FpMljjpkRhcC8pXcch.jpg","Disney+",7.8,"Three detectives in the corrupt and brutal L.A. police force of the 1950s use di"],[1118224,"Maharaja","2024","current","/s0m4TM1XRAftQStgKpw024RvkJo.jpg","Netflix",7.7,"A barber seeks vengeance after his home is burglarized, cryptically telling poli"],[1632,"Mississippi Burning","1988","classic","/wvEx2WbxZXYljQ9vSoq37NgeXcJ.jpg","Prime Video",7.7,"Two FBI agents investigating the murder of civil rights workers during the 60s s"],[419430,"Get Out","2017","modern","/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg","Prime Video",7.6,"Chris and his girlfriend Rose go upstate to visit her parents for the weekend. A"],[489999,"Searching","2018","modern","/yuAPCsCGJGSxA7YOW4elF5JNrzK.jpg","Netflix",7.6,"After David Kim's 16-year-old daughter goes missing, a local investigation is op"],[915935,"Anatomy of a Fall","2023","current","/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg","Prime Video",7.5,"A woman is suspected of her husband's murder, and their blind son faces a moral "],[345,"Eyes Wide Shut","1999","modern","/knEIz1eNGl5MQDbrEAVWA7iRqF9.jpg","Netflix",7.5,"After Dr. Bill Harford's wife, Alice, admits to having sexual fantasies about a "],[2501,"The Bourne Identity","2002","modern","/aP8swke3gmowbkfZ6lmNidu0y9p.jpg","Prime Video",7.5,"Wounded to the brink of death and suffering from amnesia, Jason Bourne is rescue"],[186,"Lucky Number Slevin","2006","modern","/x21s3p5wPww534nYj1cWakTcqz4.jpg","Prime Video",7.5,"Slevin is mistakenly put in the middle of a personal war between the city’s bigg"],[575604,"The Call","2020","current","/oz8hvZHg7tIdGwh0ErPRhobJKPR.jpg","Netflix",7.5,"Connected by phone in the same home but 20 years apart, a caller puts a woman’s "],[529216,"Mirage","2018","modern","/hmhYM1CNBhpWTYjUEZ4leQDmIYw.jpg","Netflix",7.5,"During a mysterious thunderstorm, Vera, a young mother, manages to save a life i"],[2503,"The Bourne Ultimatum","2007","modern","/15rMz5MRXFp7CP4VxhjYw4y0FUn.jpg","Prime Video",7.4,"Bourne is brought out of hiding once again by reporter Simon Ross who is trying "],[615173,"The Witch: Part 2. The Other One","2022","current","/9YTuscJXmr9Iua62amCgGSU8PDW.jpg","Prime Video",7.4,"A girl wakes up in a huge secret laboratory, then accidentally meets another gir"],[432836,"Memoir of a Murderer","2017","modern","/eTdvO9AwJrxq02iYf4Lu5qA0fNc.jpg","Prime Video",7.4,"A former serial killer with Alzheimer's fights to protect his daughter from her "],[768362,"Missing","2023","current","/wEOUYSU5Uf8J7152PT6jdb5233Y.jpg","Netflix",7.4,"When her mother disappears while on vacation in Colombia with her new boyfriend,"],[17111,"Shutter","2004","modern","/zUyaVtyugDaDHtOC6kCMJhbZsWu.jpg","Netflix",7.3,"When Jane and Tun run over a girl in a car accident, they speed away immediately"]]},"action":{"h":[[1598785,"Milky☆Subway: The Galactic Limited Express - the Movie","2026","/brQf6Odu4S6WzfVLuXLbOcbsOP2.jpg","Netflix",9.0,"Six delinquents are tasked with cleaning a train as part of a community service program. But when th",false],[1397201,"Golden Kamuy -The Abashiri Prison Raid-","2026","/a9W2203QLRqBT3a6EVDECc8g9Y2.jpg","Netflix",7.5,"As each group pursues their mission, a fierce battle unfolds over the tattooed prisoners. Who is fri",false],[1084577,"Balls Up","2026","/xwvJ3WzdJ1OCuDoY8LAxBUlQyig.jpg","Prime Video",5.8,"Two marketing executives go \"balls out\" and pitch a bold full‑coverage condom sponsorship with the W",false],[1147411,"Miraculous World: Tokyo, Stellar Force","2025","/vFaopnGXRXxRf4z2Z3IgA1QtOyV.jpg","Disney+",8.6,"Kagami drags Marinette to Tokyo to help the Stellars defeat a new supervillain, but Marinette soon r",false],[1356039,"Counterattack","2025","/38I76hGcFY6xB47pjm7pZwkfuAF.jpg","Netflix",8.3,"When a hostage rescue mission creates a new enemy, Capt. Guerrero and his elite soldiers must face a",false]],"a":[[120,"The Lord of the Rings: The Fellowship of the Ring","2001","modern","/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg","Netflix",8.4,"Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bi"],[324857,"Spider-Man: Into the Spider-Verse","2018","modern","/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg","Prime Video",8.4,"Struggling to find his place in the world while juggling school and family, Broo"],[1891,"The Empire Strikes Back","1980","classic","/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg","Disney+",8.4,"The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galact"],[27205,"Inception","2010","modern","/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg","Prime Video",8.4,"Cobb, a skilled thief who commits corporate espionage by infiltrating the subcon"],[569094,"Spider-Man: Across the Spider-Verse","2023","current","/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg","Netflix",8.3,"After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spi"],[299536,"Avengers: Infinity War","2018","modern","/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","Disney+",8.2,"As the Avengers and their allies have continued to protect the world from threat"],[299534,"Avengers: Endgame","2019","modern","/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg","Disney+",8.2,"After the devastating events of Avengers: Infinity War, the universe is in ruins"],[11,"Star Wars","1977","classic","/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg","Disney+",8.2,"Princess Leia is captured and held hostage by the evil Imperial forces in their "],[755812,"Miraculous World: New York, United HeroeZ","2020","current","/9YbyvcrHmY2SVbdfXpb8mC4Fy0g.jpg","Netflix",8.1,"Marinette's class is headed to New York, the city of superheroes, for French-Ame"],[812225,"Black Clover: Sword of the Wizard King","2023","current","/9YEGawvjaRgnyW6QVcUhFJPFDco.jpg","Netflix",8.1,"As a lionhearted boy who can't wield magic strives for the title of Wizard King,"],[795607,"Green Snake","2021","current","/g9SQCIGHDqol11QcymtDqMI7SCp.jpg","Netflix",8.1,"While trying to free her sister from Fahai's clutches, Xiao Qing winds up in a d"],[24428,"The Avengers","2012","modern","/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg","Disney+",8.1,"When an unexpected enemy emerges and threatens global safety and security, Nick "],[10515,"Castle in the Sky","1986","classic","/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg","Netflix",8.0,"A young boy and a girl with a magic crystal must race against pirates and foreig"],[447365,"Guardians of the Galaxy Vol. 3","2023","current","/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg","Disney+",7.9,"Peter Quill, still reeling from the loss of Gamora, must rally his team around h"],[726684,"Miraculous World: Shanghai - The Legend of Ladydragon","2021","current","/ouUf9zIq8PzGROyWunyEhubfFMS.jpg","Netflix",7.9,"On school break, Marinette heads to Shanghai to meet Adrien. But after arriving,"],[1892,"Return of the Jedi","1983","classic","/jQYlydvHm3kUix1f8prMucrplhm.jpg","Disney+",7.9,"Luke Skywalker leads a mission to rescue his friend Han Solo from the clutches o"],[118340,"Guardians of the Galaxy","2014","modern","/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg","Disney+",7.9,"Light years from Earth, 26 years after being abducted, Peter Quill finds himself"],[1084736,"The Count of Monte Cristo","2024","current","/sAT1P3FGhtJ68anUyJScnMu8t1l.jpg","Prime Video",7.9,"Edmond Dantès becomes the target of a sinister plot and is arrested on his weddi"],[961323,"Nimona","2023","current","/2NQljeavtfl22207D1kxLpa4LS3.jpg","Netflix",7.9,"A knight framed for a tragic crime teams with a scrappy, shape-shifting teen to "],[22,"Pirates of the Caribbean: The Curse of the Black Pearl","2003","modern","/poHwCZeWzJCShH7tOjg8RIoyjcw.jpg","Disney+",7.8,"When wily pirate Captain Barbossa seizes Jack Sparrow’s beloved ship, the Black "]]},"horror":{"h":[[1266127,"Ready or Not: Here I Come","2026","/jRf89HVEtBZiSnOXXWDhZOfuTwW.jpg","Disney+",7.6,"Moments after surviving an all-out attack from the Le Domas family, Grace discovers she’s reached th",false],[1489931,"Suzzanna: Witchcraft","2026","/4DeSEKQqraTR10zYAkbQuRazagF.jpg","Netflix",7.2,"Suzzanna is determined to exact revenge on Bisman, the cruel village ruler who killed her father wit",false],[1639398,"Mexican Psycho","2026","/7tIgfsTWuzXKR2kLRUPrLRTbcuo.jpg","Prime Video",7.1,"Follows an \"ultra-violent and intelligent\" psychopath who challenges the police by leaving a white p",false],[1198994,"Send Help","2026","/zbJWVHOtj3ljBzWgL1P8pxP03Up.jpg","Disney+",7.1,"Two colleagues become stranded on a deserted island, the only survivors of a plane crash. On the isl",false],[1084187,"Pretty Lethal","2026","/znTPnXCK3lEQJgqXCvP7e5FUz6f.jpg","Prime Video",6.8,"A troupe of ballerinas find themselves fighting for survival as they attempt to escape from a remote",false]],"a":[[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[348,"Alien","1979","classic","/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg","Disney+",8.2,"During its return to the earth, commercial spaceship Nostromo intercepts a distr"],[29826,"The Legend of the Nahuala","2007","modern","/dggo1MOieBZsJ18qqqaT4B4VdB4.jpg","Prime Video",8.0,"Leo San Juan, an insecure child of nine years old, lives eternally frightened by"],[116322,"The Legend of La Llorona","2011","modern","/vBiqoYfDIWKKzZTiQScqgCO09UD.jpg","Netflix",7.9,"Based on a famous Mexican legend, a group of kids must stop the ghost of a woman"],[396535,"Train to Busan","2016","modern","/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg","Netflix",7.8,"When a zombie virus pushes Korea into a state of emergency, those trapped on an "],[44214,"Black Swan","2010","modern","/viWheBd44bouiLCHgNMvahLThqx.jpg","Disney+",7.7,"A committed dancer struggles to maintain her sanity after winning the lead role "],[1062722,"Frankenstein","2025","current","/g4JtvGlQO7DByTI6frUobqvSL3R.jpg","Netflix",7.6,"Dr. Victor Frankenstein, a brilliant but egotistical scientist, brings a creatur"],[419430,"Get Out","2017","modern","/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg","Prime Video",7.6,"Chris and his girlfriend Rose go upstate to visit her parents for the weekend. A"],[940721,"Godzilla Minus One","2023","current","/2E2WTX0TJEflAged6kzErwqX1kt.jpg","Netflix",7.6,"In postwar Japan, Godzilla brings new devastation to an already scorched landsca"],[27327,"Phantom of the Paradise","1974","classic","/qDOtGWeSQNwB3dG7Amt1K0JW0az.jpg","Disney+",7.5,"Singer-songwriter Winslow Leach seeks revenge on the nefarious music producer Sw"],[11906,"Suspiria","1977","classic","/sEcvc9h1X3hYZdFgtiiKMm6RB3f.jpg","Prime Video",7.5,"An American newcomer to a prestigious German ballet academy comes to realize tha"],[6114,"Bram Stoker's Dracula","1992","modern","/4ZbUxjY5DZ7RCxGwvzSEr4rThd1.jpg","Netflix",7.5,"Count Dracula, a 15th-century prince, is condemned to live off the blood of the "],[36685,"The Rocky Horror Picture Show","1975","classic","/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg","Disney+",7.4,"After getting a flat tire in the middle of nowhere, newly engaged couple Brad an"],[9426,"The Fly","1986","classic","/8gZWMhJHRvaXdXsNhERtqNHYpH3.jpg","Disney+",7.4,"When brilliant, eccentric scientist Seth Brundle makes a huge technological brea"],[988402,"Humanist Vampire Seeking Consenting Suicidal Person","2023","current","/m5OItLBY5T38ew1YI4VSIXjl5G2.jpg","Netflix",7.4,"Sasha is a young vampire with a serious problem: she's too sensitive to kill. Wh"],[1134433,"Death Whisperer","2023","current","/48TDjSJpCdJ4SBOHZX3G5IjaV02.jpg","Netflix",7.4,"When a remote village is plagued by a deadly curse, one brother must fight to sa"],[476299,"Ghostland","2018","modern","/ma9gY6OikBev8MsMaeA6h2EIdGo.jpg","Prime Video",7.4,"A mother of two inherits a home from her aunt. On the first night in the new hom"],[381288,"Split","2017","modern","/lli31lYTFpvxVBeFHWoe5PMfW5s.jpg","Prime Video",7.3,"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fle"],[72640,"The Old Mill","1937","classic","/9AeBR5ZhhuNM3PsBuR0d6EL3ejL.jpg","Disney+",7.3,"Night in an old mill is dramatically depicted in this Oscar-winning short in whi"],[17111,"Shutter","2004","modern","/zUyaVtyugDaDHtOC6kCMJhbZsWu.jpg","Netflix",7.3,"When Jane and Tun run over a girl in a car accident, they speed away immediately"]]},"scifi":{"h":[[1598785,"Milky☆Subway: The Galactic Limited Express - the Movie","2026","/brQf6Odu4S6WzfVLuXLbOcbsOP2.jpg","Netflix",9.0,"Six delinquents are tasked with cleaning a train as part of a community service program. But when th",false],[687163,"Project Hail Mary","2026","/yihdXomYb5kTeSivtFndMy5iDmf.jpg","Prime Video",8.7,"Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of w",false],[1575337,"Cosmic Princess Kaguya!","2026","/9I9cM38gecZcwJ0C6r0cwfvtPJP.jpg","Netflix",8.3,"Iroha's life gets knocked off its orbit when Kaguya, a carefree runaway from the Moon, moves in and ",false],[1327819,"Hoppers","2026","/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg","Disney+",8.2,"Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing ",false],[1359005,"Per Aspera Ad Astra","2026","/cuNGOSr0oSuBm0uAa28516Iw3Bw.jpg","Netflix",8.0,"Set in the near future, the story revolves around the emergence of the virtual dream reality technol",false]],"a":[[324857,"Spider-Man: Into the Spider-Verse","2018","modern","/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg","Prime Video",8.4,"Struggling to find his place in the world while juggling school and family, Broo"],[1891,"The Empire Strikes Back","1980","classic","/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg","Disney+",8.4,"The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galact"],[27205,"Inception","2010","modern","/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg","Prime Video",8.4,"Cobb, a skilled thief who commits corporate espionage by infiltrating the subcon"],[569094,"Spider-Man: Across the Spider-Verse","2023","current","/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg","Netflix",8.3,"After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spi"],[105,"Back to the Future","1985","classic","/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg","Prime Video",8.3,"Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadver"],[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "],[299536,"Avengers: Infinity War","2018","modern","/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg","Disney+",8.2,"As the Avengers and their allies have continued to protect the world from threat"],[299534,"Avengers: Endgame","2019","modern","/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg","Disney+",8.2,"After the devastating events of Avengers: Infinity War, the universe is in ruins"],[283566,"Evangelion: 3.0+1.0 Thrice Upon a Time","2021","current","/md5wZRRj8biHrGtyitgBZo7674t.jpg","Prime Video",8.2,"In the aftermath of the Fourth Impact, stranded without their Evangelions, Shinj"],[11,"Star Wars","1977","classic","/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg","Disney+",8.2,"Princess Leia is captured and held hostage by the evil Imperial forces in their "],[348,"Alien","1979","classic","/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg","Disney+",8.2,"During its return to the earth, commercial spaceship Nostromo intercepts a distr"],[693134,"Dune: Part Two","2024","current","/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg","Netflix",8.1,"Follow the mythic journey of Paul Atreides as he unites with Chani and the Freme"],[10681,"WALL·E","2008","modern","/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg","Disney+",8.1,"After hundreds of years doing what he was built for, WALL•E— a robot designed to"],[24428,"The Avengers","2012","modern","/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg","Disney+",8.1,"When an unexpected enemy emerges and threatens global safety and security, Nick "],[829402,"Ultraman: Rising","2024","current","/j886YEkIUsiImY53px5VHKD4lRa.jpg","Netflix",8.0,"A star athlete reluctantly returns home to take over his father's duties as Ultr"],[329,"Jurassic Park","1993","modern","/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg","Netflix",8.0,"A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs "],[679,"Aliens","1986","classic","/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg","Disney+",8.0,"Ripley, the sole survivor of the Nostromo's deadly encounter with the monstrous "],[838240,"Robot Dreams","2023","current","/ds402Qq09ybgBcXKiQNTZfzsP5o.jpg","Prime Video",7.9,"A lonely dog's friendship with his robot companion takes a sad turn when an unex"],[149,"Akira","1988","classic","/neZ0ykEsPqxamsX6o5QNUFILQrz.jpg","Netflix",7.9,"A secret military project endangers Neo-Tokyo when it turns a biker gang member "],[78,"Blade Runner","1982","classic","/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg","Prime Video",7.9,"In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is c"]]},"fantasy":{"h":[[1007757,"Swapped","2026","/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg","Netflix",8.9,"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically tr",false],[1575337,"Cosmic Princess Kaguya!","2026","/9I9cM38gecZcwJ0C6r0cwfvtPJP.jpg","Netflix",8.3,"Iroha's life gets knocked off its orbit when Kaguya, a carefree runaway from the Moon, moves in and ",false],[1426451,"Risa and the Wind Phone","2026","/xDiOhLWppsz9hmGrrcjiIa4Dlzn.jpg","Netflix",8.2,"Risa, after her father's death, discovers she has the ability to communicate with him from beyond th",false],[1318621,"Descendants: Wicked Wonderland","2026","/xdhLAADGSse8KCrsDLBuM5b68Cg.jpg","Disney+",7.6,"Now that the Queen of Hearts is nice and Cinderella is safe, things seem perfect for Red and Chloe… ",false],[454639,"Masters of the Universe","2026","/oRuyGUHdoaQxWP3SDfafGkStxTC.jpg","Prime Video",7.3,"After being separated for 15 years, the Sword of Power leads Prince Adam back to Eternia, where he d",false]],"a":[[129,"Spirited Away","2001","modern","/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg","Netflix",8.5,"A young girl, Chihiro, becomes trapped in a strange new world of spirits. When h"],[497,"The Green Mile","1999","modern","/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg","Prime Video",8.5,"A supernatural tale set on death row in a Southern prison, where gentle giant Jo"],[120,"The Lord of the Rings: The Fellowship of the Ring","2001","modern","/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg","Netflix",8.4,"Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bi"],[4935,"Howl's Moving Castle","2004","modern","/13kOl2v0nD2OLbVSHnHk8GUFEhO.jpg","Netflix",8.4,"Sophie, a young milliner, is turned into an elderly woman by a witch who enters "],[128,"Princess Mononoke","1997","modern","/cMYCDADoLKLbB83g4WnJegaZimC.jpg","Netflix",8.3,"Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized b"],[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "],[476292,"Maquia: When the Promised Flower Blooms","2018","modern","/hL3NqRE2ccR4Y2sYSJTrmalRjrz.jpg","Prime Video",8.1,"Fleeing the war, the immortal Machia, graced with eternal youth, finds a baby ab"],[810693,"Jujutsu Kaisen 0","2021","current","/23oJaeBh0FDk2mQ2P240PU9Xxfh.jpg","Netflix",8.1,"Yuta Okkotsu is a nervous high school student who is suffering from a serious pr"],[149871,"The Tale of The Princess Kaguya","2013","modern","/cQidJuA546OSSXKWXoiCeINDxuj.jpg","Netflix",8.1,"Found inside a shining stalk of bamboo by an old bamboo cutter and his wife, a t"],[508442,"Soul","2020","current","/6jmppcaubzLF8wkXM36ganVISCo.jpg","Disney+",8.1,"Joe Gardner is a middle school teacher with a love for jazz music. After a succe"],[610892,"Violet Evergarden: Eternity and the Auto Memory Doll","2019","modern","/3BV1M10SuSi5jOJbSDQQtjX96ov.jpg","Netflix",8.1,"Violet Evergarden, a former soldier returned from war, comes to teach at a women"],[663558,"New Gods: Nezha Reborn","2021","current","/np4ScPY04HESKBbpexwstKsipKe.jpg","Netflix",8.1,"While living as an ordinary deliveryman and motor racing fan, Nezha encounters o"],[8392,"My Neighbor Totoro","1988","classic","/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg","Netflix",8.1,"Two sisters move to the country with their father in order to be closer to their"],[812225,"Black Clover: Sword of the Wizard King","2023","current","/9YEGawvjaRgnyW6QVcUhFJPFDco.jpg","Netflix",8.1,"As a lionhearted boy who can't wield magic strives for the title of Wizard King,"],[795607,"Green Snake","2021","current","/g9SQCIGHDqol11QcymtDqMI7SCp.jpg","Netflix",8.1,"While trying to free her sister from Fahai's clutches, Xiao Qing winds up in a d"],[640344,"Me Against You: Mr. S's Vendetta","2020","current","/sfeQTIRkJjWt8IPDSBcPqkrcaas.jpg","Netflix",8.0,"A young couple who makes popular YouTube videos for children sets out to win an "],[803796,"KPop Demon Hunters","2025","current","/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg","Netflix",8.0,"When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're u"]]},"animation":{"h":[[1598785,"Milky☆Subway: The Galactic Limited Express - the Movie","2026","/brQf6Odu4S6WzfVLuXLbOcbsOP2.jpg","Netflix",9.0,"Six delinquents are tasked with cleaning a train as part of a community service program. But when th",false],[1007757,"Swapped","2026","/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg","Netflix",8.9,"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically tr",false],[1337140,"Bem, un lémur en fuga","2026","/mZBsoIqGRmH0zdcjD8HUGDung7x.jpg","Prime Video",8.9,"A little girl who is allergic to almost everything is forced to live alone isolated from the outside",false],[1575337,"Cosmic Princess Kaguya!","2026","/9I9cM38gecZcwJ0C6r0cwfvtPJP.jpg","Netflix",8.3,"Iroha's life gets knocked off its orbit when Kaguya, a carefree runaway from the Moon, moves in and ",false],[1327819,"Hoppers","2026","/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg","Disney+",8.2,"Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing ",false]],"a":[[129,"Spirited Away","2001","modern","/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg","Netflix",8.5,"A young girl, Chihiro, becomes trapped in a strange new world of spirits. When h"],[12477,"Grave of the Fireflies","1988","classic","/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg","Netflix",8.4,"In the final months of World War II, 14-year-old Seita and his sister Setsuko ar"],[324857,"Spider-Man: Into the Spider-Verse","2018","modern","/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg","Prime Video",8.4,"Struggling to find his place in the world while juggling school and family, Broo"],[4935,"Howl's Moving Castle","2004","modern","/13kOl2v0nD2OLbVSHnHk8GUFEhO.jpg","Netflix",8.4,"Sophie, a young milliner, is turned into an elderly woman by a witch who enters "],[569094,"Spider-Man: Across the Spider-Verse","2023","current","/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg","Netflix",8.3,"After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spi"],[128,"Princess Mononoke","1997","modern","/cMYCDADoLKLbB83g4WnJegaZimC.jpg","Netflix",8.3,"Ashitaka, a prince of the disappearing Emishi people, is cursed by a demonized b"],[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "],[8587,"The Lion King","1994","modern","/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg","Disney+",8.3,"Young lion prince Simba, eager to one day become king of the Pride Lands, grows "],[508965,"Klaus","2019","modern","/q125RHUDgR4gjwh1QkfYuJLYkL.jpg","Netflix",8.2,"A selfish postman and a reclusive toymaker form an unlikely friendship, deliveri"],[283566,"Evangelion: 3.0+1.0 Thrice Upon a Time","2021","current","/md5wZRRj8biHrGtyitgBZo7674t.jpg","Prime Video",8.2,"In the aftermath of the Fourth Impact, stranded without their Evangelions, Shinj"],[354912,"Coco","2017","modern","/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg","Disney+",8.2,"Despite his family’s baffling generations-old ban on music, Miguel dreams of bec"],[1244492,"Look Back","2024","current","/4f2EcNkp1Mvp9wE5w7HKxcmACWg.jpg","Prime Video",8.2,"Popular, outgoing Fujino is celebrated by her classmates for her funny comics in"],[399106,"Piper","2016","modern","/5fu2d809jepLwEpES7wggiECLoQ.jpg","Disney+",8.1,"A mother bird tries to teach her little one how to find food by herself. In the "],[476292,"Maquia: When the Promised Flower Blooms","2018","modern","/hL3NqRE2ccR4Y2sYSJTrmalRjrz.jpg","Prime Video",8.1,"Fleeing the war, the immortal Machia, graced with eternal youth, finds a baby ab"],[10681,"WALL·E","2008","modern","/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg","Disney+",8.1,"After hundreds of years doing what he was built for, WALL•E— a robot designed to"],[810693,"Jujutsu Kaisen 0","2021","current","/23oJaeBh0FDk2mQ2P240PU9Xxfh.jpg","Netflix",8.1,"Yuta Okkotsu is a nervous high school student who is suffering from a serious pr"]]},"musical":{"h":[[1628123,"BTS THE COMEBACK LIVE | ARIRANG","2026","/tztql23n2UCoM76KyCSKoZxVUL1.jpg","Netflix",8.8,"BTS is back. The iconic group returns to the stage for a live reunion concert to perform legendary h",false],[1628116,"BTS: THE RETURN","2026","/9CNUWleZWN9EGMZjvaSTcxmAAGg.jpg","Netflix",8.5,"They're back! BTS gathers in LA to record their album \"Arirang\" in this documentary offering unprece",false],[1575337,"Cosmic Princess Kaguya!","2026","/9I9cM38gecZcwJ0C6r0cwfvtPJP.jpg","Netflix",8.3,"Iroha's life gets knocked off its orbit when Kaguya, a carefree runaway from the Moon, moves in and ",false],[1492341,"Noah Kahan: Out of Body","2026","/8VtZAonOgK8hae7FwOZCSg7XmCu.jpg","Netflix",8.3,"After rocketing to global fame, singer-songwriter Noah Kahan returns to his Vermont roots to get bac",false],[1644807,"Harry Styles. One Night in Manchester.","2026","/AigpusxLychNPHCdB8jRVTEQ1kS.jpg","Netflix",7.6,"In a special one off concert in Manchester, recorded on the evening of March 6, Harry Styles played ",false]],"a":[[654299,"Out of the Clear Blue Sky","2019","modern","/o9cSEHrXzPOO4OIoT9yrdxc216w.jpg","Netflix",8.3,"Returning to Earth as an imitator, the legendary Mexican artist Pedro Infante mu"],[354912,"Coco","2017","modern","/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg","Disney+",8.2,"Despite his family’s baffling generations-old ban on music, Miguel dreams of bec"],[740996,"BLACKPINK: Light Up the Sky","2020","current","/wwrvjmcgkDyB2RbCbIVLXZf82pl.jpg","Netflix",8.2,"Record-shattering Korean girl band BLACKPINK tell their story —  and detail the "],[1160164,"TAYLOR SWIFT | THE ERAS TOUR","2023","current","/jf3YO8hOqGHCupsREf5qymYq1n.jpg","Disney+",8.2,"A concert film documenting Taylor Swift's record-breaking Eras Tour (2023-2024)."],[508442,"Soul","2020","current","/6jmppcaubzLF8wkXM36ganVISCo.jpg","Disney+",8.1,"Joe Gardner is a middle school teacher with a love for jazz music. After a succe"],[593691,"HOMECOMING: A film by Beyoncé","2019","modern","/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg","Netflix",8.0,"This intimate, in-depth look at Beyoncé's celebrated 2018 Coachella performance "],[400608,"Bo Burnham: Make Happy","2016","modern","/qVThhskXZZHDfj4m8jOx2CxIVIW.jpg","Netflix",8.0,"Combining his trademark wit and self-deprecating humor with original music, Bo B"],[803796,"KPop Demon Hunters","2025","current","/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg","Netflix",8.0,"When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're u"],[424694,"Bohemian Rhapsody","2018","modern","/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg","Disney+",8.0,"Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guita"],[774372,"ariana grande: excuse me, i love you","2020","current","/nm10ajNVkKwwyf8VFPkZnr93GbC.jpg","Netflix",7.9,"Ariana Grande takes the stage in London for her Sweetener World Tour and shares "],[962232,"Beyond the Universe","2022","current","/AlAP6WRSBuf5cP8OgpHTF45BPUp.jpg","Netflix",7.9,"While waiting for a kidney transplant, a young pianist finds an unexpected conne"],[920394,"My Father's Violin","2022","current","/bwvoSRyXRRqtpvoHYhySQk2U4EM.jpg","Netflix",7.9,"Through their shared grief and connection to music, an orphaned girl bonds with "],[776503,"CODA","2021","current","/BzVjmm8l23rPsijLiNLUzuQtyd.jpg","Prime Video",7.9,"As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf fa"],[1226841,"The Greatest Night in Pop","2024","current","/jDz4wFujk94tQP9Sx6EMKDULvkn.jpg","Netflix",7.9,"On a January night in 1985, music's biggest stars gathered to record \"We Are the"],[438695,"Sing 2","2021","current","/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg","Prime Video",7.8,"Buster and his new cast now have their sights set on debuting a new show at the "],[653567,"Miss Americana","2020","current","/z1HiEB1UEfdA5fPkngekjQ2vlCC.jpg","Netflix",7.8,"A raw and emotionally revealing look at one of the most iconic artists of our ti"],[244001,"Bo Burnham: What.","2013","modern","/kGDpMWPOKStmvf4F1gkqfeFZmXA.jpg","Netflix",7.8,"Left brain and right brain duke it out and then belt out a tune in comedian Bo B"],[15121,"The Sound of Music","1965","classic","/c6CrUZypAsBCaRWX0M3RVRDbhNS.jpg","Disney+",7.7,"In the years before World War II, a tomboyish postulant at an Austrian abbey is "],[16052,"Selena","1997","modern","/j8xX3yBAFOayfSaImgLZPnAcdWz.jpg","Netflix",7.7,"In this biographical drama, Selena Quintanilla is born into a musical Mexican-Am"],[502033,"Sound of Metal","2020","current","/3178oOJKKPDeQ2legWQvMPpllv.jpg","Prime Video",7.7,"Metal drummer Ruben begins to lose his hearing. When a doctor tells him his cond"]]},"biopic":{"h":[[1530510,"Mexico 86","2026","/dj4MbmBrZXzNQpxsLBIxKohRp9b.jpg","Netflix",7.8,"When a last-minute chance to host the 1986 World Cup appears, a cunning Mexican bureaucrat, armed wi",false],[1397201,"Golden Kamuy -The Abashiri Prison Raid-","2026","/a9W2203QLRqBT3a6EVDECc8g9Y2.jpg","Netflix",7.5,"As each group pursues their mission, a fierce battle unfolds over the tattooed prisoners. Who is fri",false],[1261188,"The Swedish Connection","2026","/ytruJRp7Ba82IU6s8yAY0HPw5xr.jpg","Netflix",7.3,"Swedish Foreign Ministry bureaucrat Gösta Engzell, overlooked during WWII, rescued thousands while t",false],[1613335,"Miracle: The Boys of '80","2026","/zmMlJPZremA7iSqzg3SgZTXR28Z.jpg","Netflix",7.3,"This is the story of the “Miracle on Ice,” when the 1980 US Hockey Team beat the USSR in the Olympic",false],[1684244,"Untold UK: Liverpool's Miracle of Istanbul","2026","/sXsB1CVtX4LGn3TWrf2V1KILLpJ.jpg","Netflix",7.0,"At half-time in the 2005 champion league final Liverpool were 3-0 down. What happened next made foot",false]],"a":[[490132,"Green Book","2018","modern","/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg","Prime Video",8.2,"Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour thr"],[1480382,"The Voice of Hind Rajab","2025","current","/q7M8kQB46T11vmDMD6E239jsqTz.jpg","Netflix",8.0,"January 29, 2024. Red Crescent volunteers receive an emergency call. A five-year"],[381284,"Hidden Figures","2016","modern","/9lfz2W2uGjyow3am00rsPJ8iOyq.jpg","Disney+",8.0,"The untold story of Katherine G. Johnson, Dorothy Vaughan and Mary Jackson – bri"],[359724,"Ford v Ferrari","2019","modern","/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg","Disney+",8.0,"American car designer Carroll Shelby and the British-born driver Ken Miles work "],[821,"Judgment at Nuremberg","1961","classic","/b6vYatvui1EXeFYfpDX4rcbueuP.jpg","Prime Video",8.0,"In 1947, four German judges who served on the bench during the Nazi regime face "],[947,"Lawrence of Arabia","1962","classic","/AiAm0EtDvyGqNpVoieRw4u65vD1.jpg","Netflix",8.0,"During World War I, English officer Thomas Edward 'T.E.' Lawrence sets out to un"],[530915,"1917","2019","modern","/iZf0KyrE25z1sage4SYFLCCrMi9.jpg","Prime Video",8.0,"At the height of the First World War, two young British soldiers must cross enem"],[205596,"The Imitation Game","2014","modern","/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg","Prime Video",8.0,"Based on the real life story of legendary cryptanalyst Alan Turing, the film por"],[906126,"Society of the Snow","2023","current","/2e853FDVSIso600RqAMunPxiZjq.jpg","Netflix",8.0,"On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby t"],[197,"Braveheart","1995","modern","/or1gBugydmjToAEq7OZY0owwFk.jpg","Disney+",7.9,"Enraged at the slaughter of Murron, his new bride and childhood love, Scottish w"],[626332,"Flamin' Hot","2023","current","/a7KyFMPXj0iY4EoLq1PIGU1WJPw.jpg","Disney+",7.9,"The inspiring true story of Richard Montañez, the Frito Lay janitor who channele"],[76203,"12 Years a Slave","2013","modern","/xdANQijuNrJaw1HA61rDccME4Tm.jpg","Prime Video",7.9,"In the pre-Civil War United States, Solomon Northup, a free black man from upsta"],[433694,"Sgt. Stubby: An American Hero","2018","modern","/rmpykGuvJznJw4iY4hpVVn5ZDdh.jpg","Prime Video",7.9,"The true story of the most decorated dog in American military history - Sgt. Stu"],[491480,"The Boy Who Harnessed the Wind","2019","modern","/yOr7RxHw15MMXNxGMXSmngDqHyI.jpg","Netflix",7.9,"Against all the odds, a thirteen year old boy in Malawi invents an unconventiona"],[774531,"Young Woman and the Sea","2024","current","/bZlecCuBVvKuarNGvchBwaOsQ3c.jpg","Disney+",7.9,"This is the extraordinary true story of Trudy Ederle, the first woman to success"],[660637,"Dance of the Forty One","2020","current","/jcSqwsEtT7wKfQ8oKaaulMMGUdS.jpg","Netflix",7.8,"Mexico City, November 1901. The police raid a private home where a secret party "],[698948,"Thirteen Lives","2022","current","/yi5KcJqFxy0D6yP8nCfcF8gJGg5.jpg","Prime Video",7.8,"Based on the true nail-biting mission that captivated the world. Twelve boys and"],[714888,"Argentina 1985","2022","current","/nmh7vD2eDVRqFJoCpEzVcfGcPPf.jpg","Prime Video",7.8,"In the 1980s, a team of lawyers takes on the heads of Argentina's bloody militar"],[314365,"Spotlight","2015","modern","/8DPGG400FgaFWaqcv11n8mRd2NG.jpg","Netflix",7.8,"The true story of how the Boston Globe uncovered the massive scandal of child mo"],[650031,"The Shadow in My Eye","2021","current","/jCKvbH3a4V5IPoRAG85eDaniNqO.jpg","Netflix",7.8,"On March 21st, 1945, the British Royal Air Force set out on a mission to bomb Ge"]]},"documentary":{"h":[[1628123,"BTS THE COMEBACK LIVE | ARIRANG","2026","/tztql23n2UCoM76KyCSKoZxVUL1.jpg","Netflix",8.8,"BTS is back. The iconic group returns to the stage for a live reunion concert to perform legendary h",false],[1639000,"Famous Last Words: Eric Dane","2026","/m9HIHyfCjphkHkwIVIztm32g5uv.jpg","Netflix",8.8,"In this emotional interview, the late actor and ALS advocate Eric Dane shared his final message for ",false],[1628116,"BTS: THE RETURN","2026","/9CNUWleZWN9EGMZjvaSTcxmAAGg.jpg","Netflix",8.5,"They're back! BTS gathers in LA to record their album \"Arirang\" in this documentary offering unprece",false],[1492341,"Noah Kahan: Out of Body","2026","/8VtZAonOgK8hae7FwOZCSg7XmCu.jpg","Netflix",8.3,"After rocketing to global fame, singer-songwriter Noah Kahan returns to his Vermont roots to get bac",false],[1620034,"Marty, Life Is Short","2026","/5u8r3iMUVeVejv8G2PrRvlTbogC.jpg","Netflix",8.1,"Martin Short looks back on a life fueled by joy in this documentary with classic clips, fresh interv",false]],"a":[[753230,"The Three Deaths of Marisela Escobedo","2020","current","/4E7nNHIchHWzpETfwAERxFuviO6.jpg","Netflix",8.9,"After the death of her daughter at the hand of her boyfriend, Marisela Escobedo "],[664280,"David Attenborough: A Life on Our Planet","2020","current","/zSKwyUDKDHiFU5syTTvQRDcGBPS.jpg","Netflix",8.4,"The story of life on our planet by the man who has seen more of the natural worl"],[740996,"BLACKPINK: Light Up the Sky","2020","current","/wwrvjmcgkDyB2RbCbIVLXZf82pl.jpg","Netflix",8.2,"Record-shattering Korean girl band BLACKPINK tell their story —  and detail the "],[58496,"Senna","2010","modern","/nZbLCbRoP6iJq5sr8daHQzjnzFh.jpg","Prime Video",8.1,"The remarkable story of Brazilian racing driver Ayrton Senna, charting his physi"],[1058616,"20 Days in Mariupol","2023","current","/zIRp1IeuPh4GgqFCH3y0DQuY9xP.jpg","Netflix",8.1,"As the Russian invasion begins, a team of Ukrainian journalists trapped in the b"],[593691,"HOMECOMING: A film by Beyoncé","2019","modern","/nKdP4K3Bj3qnjtDCq9lTg7UOHVy.jpg","Netflix",8.0,"This intimate, in-depth look at Beyoncé's celebrated 2018 Coachella performance "],[680058,"The Rescue","2021","current","/kC7fVtCkJACwPBaRr2hlj2whfKX.jpg","Disney+",8.0,"The enthralling, against-all-odds story that transfixed the world in 2018: the d"],[774372,"ariana grande: excuse me, i love you","2020","current","/nm10ajNVkKwwyf8VFPkZnr93GbC.jpg","Netflix",7.9,"Ariana Grande takes the stage in London for her Sweetener World Tour and shares "],[263614,"Virunga","2014","modern","/7ULqkiqpxWfQxNHRq5PeZjJQ3f6.jpg","Netflix",7.9,"Virunga in the Democratic Republic of the Congo is Africa’s oldest national park"],[515042,"Free Solo","2018","modern","/v4QfYZMACODlWul9doN9RxE99ag.jpg","Disney+",7.9,"Follow Alex Honnold as he attempts to become the first person to ever free solo "],[682110,"My Octopus Teacher","2020","current","/hvTVZb7hBC8tZAGoEhH5eiMJu2B.jpg","Netflix",7.9,"After years of swimming every day in the freezing ocean at the tip of Africa, Cr"],[1226841,"The Greatest Night in Pop","2024","current","/jDz4wFujk94tQP9Sx6EMKDULvkn.jpg","Netflix",7.9,"On a January night in 1985, music's biggest stars gathered to record \"We Are the"],[355020,"Winter on Fire: Ukraine's Fight for Freedom","2015","modern","/xGKMWhYsK3OxQ6ceqMnvXBfFd7G.jpg","Netflix",7.9,"Over 93 days in Ukraine, what started as peaceful student demonstrations became "],[407806,"13th","2016","modern","/tcKNWD6IFPPsvkpvyZ548naz0is.jpg","Netflix",7.8,"An in-depth look at the prison system in the United States and how it reveals th"],[653567,"Miss Americana","2020","current","/z1HiEB1UEfdA5fPkngekjQ2vlCC.jpg","Netflix",7.8,"A raw and emotionally revealing look at one of the most iconic artists of our ti"],[801058,"Seaspiracy","2021","current","/iFNri0fwn1WfCoxf3H3v1z8dCm4.jpg","Netflix",7.8,"Passionate about ocean life, a filmmaker sets out to document the harm that huma"],[524288,"Period. End of Sentence.","2018","modern","/dsCeBj8oabzsHQOGGLPrmrqIvDs.jpg","Netflix",7.8,"In an effort to improve feminine hygiene, a machine that creates low-cost biodeg"],[653756,"The Mole Agent","2020","current","/eWKySzO45iIbT4yL2zVkVB2w6MR.jpg","Netflix",7.8,"When a daughter becomes concerned about her mother's well-being in a retirement "],[367735,"John Mulaney: The Comeback Kid","2015","modern","/pzM9t33T2YUA7vaCb2GxaDrlTW1.jpg","Netflix",7.7,"Armed with boyish charm and a sharp wit, the former \"SNL\" writer offers sly take"],[410718,"Before the Flood","2016","modern","/2fFTLaLbm8Ak7JBSYQ8Mb3jcFx9.jpg","Disney+",7.7,"A look at how climate change affects our environment and what society can do to "]]},"international":{"h":[[1630423,"My Dearest Assassin","2026","/ul4dQcA68mtSx8J56N5gEcaCCtP.jpg","Netflix",8.6,"Hunted for her rare blood type, a caged woman vows to fight alongside the assassin she loves to prot",false],[1330021,"Remarkably Bright Creatures","2026","/9HcEqn3D4J6b2Z0jK54id9nA0fr.jpg","Netflix",8.5,"Through unlikely bonds formed during night shifts at a local aquarium, Tova, an elderly widow, learn",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1439930,"The Punisher: One Last Kill","2026","/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg","Disney+",8.3,"As Frank Castle searches for meaning beyond revenge, an unexpected force pulls him back into the fig",false],[1426451,"Risa and the Wind Phone","2026","/xDiOhLWppsz9hmGrrcjiIa4Dlzn.jpg","Netflix",8.2,"Risa, after her father's death, discovers she has the ability to communicate with him from beyond th",false]],"a":[[389,"12 Angry Men","1957","classic","/ppd84D2i9W8jXmsyInGyihiSyqz.jpg","Prime Video",8.6,"The defense and the prosecution have rested and the jury is filing into the jury"],[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[497,"The Green Mile","1999","modern","/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg","Prime Video",8.5,"A supernatural tale set on death row in a Southern prison, where gentle giant Jo"],[496243,"Parasite","2019","modern","/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg","Netflix",8.5,"All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glam"],[769,"GoodFellas","1990","modern","/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg","Prime Video",8.5,"The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is ad"],[1466115,"Even If This Love Disappears Tonight","2025","current","/5eNN8KLDPUXDqIkTdCbmn1gx5P7.jpg","Netflix",8.4,"A high school girl wakes up each day with no memory of yesterday. When she agree"],[664280,"David Attenborough: A Life on Our Planet","2020","current","/zSKwyUDKDHiFU5syTTvQRDcGBPS.jpg","Netflix",8.4,"The story of life on our planet by the man who has seen more of the natural worl"],[12477,"Grave of the Fireflies","1988","classic","/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg","Netflix",8.4,"In the final months of World War II, 14-year-old Seita and his sister Setsuko ar"],[550,"Fight Club","1999","modern","/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg","Netflix",8.4,"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male a"],[1291559,"Drawing Closer","2024","current","/173FD4a0rpSF30z4CoWx6qdx8Ry.jpg","Netflix",8.4,"With only a year left to live, 17-year-old Akito finds new meaning in life by br"],[311,"Once Upon a Time in America","1984","classic","/i0enkzsL5dPeneWnjl1fCWm6L7k.jpg","Disney+",8.4,"A former Prohibition-era Jewish gangster returns to the Lower East Side of Manha"],[770156,"Lucy Shimmers and the Prince of Peace","2020","current","/yfnJ5qIYx7q33fY4jqv9Pu95RSg.jpg","Prime Video",8.4,"Second chances start when a hardened criminal crosses paths with a precocious li"],[1058694,"Radical","2023","current","/lOAJYpX608aT0ApIv63ZTnol27Y.jpg","Prime Video",8.3,"In a Mexican border town plagued by neglect, corruption, and violence, a frustra"],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[207,"Dead Poets Society","1989","classic","/tNvKkSnnn4Z6RCBThyK1gfCSSvv.jpg","Disney+",8.3,"At an elite, old-fashioned boarding school in New England, a passionate English "],[654299,"Out of the Clear Blue Sky","2019","modern","/o9cSEHrXzPOO4OIoT9yrdxc216w.jpg","Netflix",8.3,"Returning to Earth as an imitator, the legendary Mexican artist Pedro Infante mu"],[77338,"The Intouchables","2011","modern","/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg","Prime Video",8.3,"A true story of two men who should never have met – a quadriplegic aristocrat wh"],[335,"Once Upon a Time in the West","1968","classic","/qbYgqOczabWNn2XKwgMtVrntD6P.jpg","Netflix",8.3,"As the railroad builders advance unstoppably through the Arizona desert on their"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "]]},"hiddengems":{"h":[[1530510,"Mexico 86","2026","/dj4MbmBrZXzNQpxsLBIxKohRp9b.jpg","Netflix",7.8,"When a last-minute chance to host the 1986 World Cup appears, a cunning Mexican bureaucrat, armed wi",false],[1397201,"Golden Kamuy -The Abashiri Prison Raid-","2026","/a9W2203QLRqBT3a6EVDECc8g9Y2.jpg","Netflix",7.5,"As each group pursues their mission, a fierce battle unfolds over the tattooed prisoners. Who is fri",false],[1261188,"The Swedish Connection","2026","/ytruJRp7Ba82IU6s8yAY0HPw5xr.jpg","Netflix",7.3,"Swedish Foreign Ministry bureaucrat Gösta Engzell, overlooked during WWII, rescued thousands while t",false],[1247165,"Raja Shivaji","2026","/9e2Wc6sbeU1YdBWLJIDyMcEWrN2.jpg","Netflix",5.9,"Chronicles the rise of young Shivaji Bhonsale, who challenged the might of established empires to fo",false]],"a":[[490132,"Green Book","2018","modern","/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg","Prime Video",8.2,"Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour thr"],[1480382,"The Voice of Hind Rajab","2025","current","/q7M8kQB46T11vmDMD6E239jsqTz.jpg","Netflix",8.0,"January 29, 2024. Red Crescent volunteers receive an emergency call. A five-year"],[381284,"Hidden Figures","2016","modern","/9lfz2W2uGjyow3am00rsPJ8iOyq.jpg","Disney+",8.0,"The untold story of Katherine G. Johnson, Dorothy Vaughan and Mary Jackson – bri"],[359724,"Ford v Ferrari","2019","modern","/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg","Disney+",8.0,"American car designer Carroll Shelby and the British-born driver Ken Miles work "],[821,"Judgment at Nuremberg","1961","classic","/b6vYatvui1EXeFYfpDX4rcbueuP.jpg","Prime Video",8.0,"In 1947, four German judges who served on the bench during the Nazi regime face "],[530915,"1917","2019","modern","/iZf0KyrE25z1sage4SYFLCCrMi9.jpg","Prime Video",8.0,"At the height of the First World War, two young British soldiers must cross enem"],[205596,"The Imitation Game","2014","modern","/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg","Prime Video",8.0,"Based on the real life story of legendary cryptanalyst Alan Turing, the film por"],[906126,"Society of the Snow","2023","current","/2e853FDVSIso600RqAMunPxiZjq.jpg","Netflix",8.0,"On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby t"],[197,"Braveheart","1995","modern","/or1gBugydmjToAEq7OZY0owwFk.jpg","Disney+",7.9,"Enraged at the slaughter of Murron, his new bride and childhood love, Scottish w"],[626332,"Flamin' Hot","2023","current","/a7KyFMPXj0iY4EoLq1PIGU1WJPw.jpg","Disney+",7.9,"The inspiring true story of Richard Montañez, the Frito Lay janitor who channele"],[76203,"12 Years a Slave","2013","modern","/xdANQijuNrJaw1HA61rDccME4Tm.jpg","Prime Video",7.9,"In the pre-Civil War United States, Solomon Northup, a free black man from upsta"],[491480,"The Boy Who Harnessed the Wind","2019","modern","/yOr7RxHw15MMXNxGMXSmngDqHyI.jpg","Netflix",7.9,"Against all the odds, a thirteen year old boy in Malawi invents an unconventiona"],[774531,"Young Woman and the Sea","2024","current","/bZlecCuBVvKuarNGvchBwaOsQ3c.jpg","Disney+",7.9,"This is the extraordinary true story of Trudy Ederle, the first woman to success"],[660637,"Dance of the Forty One","2020","current","/jcSqwsEtT7wKfQ8oKaaulMMGUdS.jpg","Netflix",7.8,"Mexico City, November 1901. The police raid a private home where a secret party "],[698948,"Thirteen Lives","2022","current","/yi5KcJqFxy0D6yP8nCfcF8gJGg5.jpg","Prime Video",7.8,"Based on the true nail-biting mission that captivated the world. Twelve boys and"],[714888,"Argentina 1985","2022","current","/nmh7vD2eDVRqFJoCpEzVcfGcPPf.jpg","Prime Video",7.8,"In the 1980s, a team of lawyers takes on the heads of Argentina's bloody militar"],[314365,"Spotlight","2015","modern","/8DPGG400FgaFWaqcv11n8mRd2NG.jpg","Netflix",7.8,"The true story of how the Boston Globe uncovered the massive scandal of child mo"],[650031,"The Shadow in My Eye","2021","current","/jCKvbH3a4V5IPoRAG85eDaniNqO.jpg","Netflix",7.8,"On March 21st, 1945, the British Royal Air Force set out on a mission to bomb Ge"],[149870,"The Wind Rises","2013","modern","/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg","Netflix",7.8,"A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi, wh"],[760774,"One Life","2023","current","/yvnIWt2j8VnDgwKJE2VMiFMa2Qo.jpg","Prime Video",7.8,"British stockbroker Nicholas Winton visits Czechoslovakia in the 1930s and forms"]]},"mindblow":{"h":[[1357359,"Ejen Ali: The Movie 2","2025","/cjDAlNKylyqNUpv6nDoFR1YBEAD.jpg","Netflix",8.0,"Ejen Ali is appointed as the pilot of Project Satria, a new armoured suit with the help of an Artifi",false]],"a":[[575604,"The Call","2020","current","/oz8hvZHg7tIdGwh0ErPRhobJKPR.jpg","Netflix",7.5,"Connected by phone in the same home but 20 years apart, a caller puts a woman’s "],[11704,"The Secret of NIMH","1982","classic","/prNrnOKlkV9wl5Sl3zwHu1f3t2z.jpg","Prime Video",7.4,"A widowed field mouse must move her family -- including an ailing son -- to esca"],[615173,"The Witch: Part 2. The Other One","2022","current","/9YTuscJXmr9Iua62amCgGSU8PDW.jpg","Prime Video",7.4,"A girl wakes up in a huge secret laboratory, then accidentally meets another gir"],[13183,"Watchmen","2009","modern","/aVURelN3pM56lFM7Dgfs5TixcIf.jpg","Netflix",7.4,"In a gritty and alternate 1985, the glory days of costumed vigilantes have been "],[757860,"The Yin-Yang Master: Dream of Eternity","2020","current","/odgDN1po1j7cEVLeBhkVS0Oh4kC.jpg","Netflix",7.2,"Every few hundred years, the most powerful demon on earth—a snake demon—awakens,"],[51876,"Limitless","2011","modern","/kCokPP4WCQRrrAuZ7FcpIyHr8b2.jpg","Netflix",7.2,"The life of an unsuccessful writer is transformed by a top-secret 'smart drug' t"],[198663,"The Maze Runner","2014","modern","/ode14q7WtDugFDp78fo9lCsmay9.jpg","Disney+",7.2,"A teenager with no memory of his past finds himself among a group of boys living"],[406990,"What Happened to Monday","2017","modern","/atOgZMJpMrTdpqvPiHVPfBhR61l.jpg","Netflix",7.1,"In a world where families are limited to one child due to overpopulation, a set "],[846,"The X-Files","1998","modern","/yLIw6shz2WC3W3iI0jROsF4B2ha.jpg","Disney+",6.9,"Mulder and Scully, now taken off the FBI's X Files cases, must find a way to fig"],[9667,"The Jacket","2005","modern","/bt89UfRhjAvJDAO9CWJnRFXAN3p.jpg","Prime Video",6.9,"A military veteran goes on a journey into the future, where he can foresee his d"],[619730,"Don't Worry Darling","2022","current","/jOqxKIOC92BVyinYO1Fm73XY7Tc.jpg","Netflix",6.8,"Alice and Jack are lucky to be living in the idealized community of Victory, the"],[70981,"Prometheus","2012","modern","/qsYQflQhOuhDpQ0W2aOcwqgDAeI.jpg","Netflix",6.6,"A team of explorers discover a clue to the origins of mankind on Earth, leading "],[736769,"They Cloned Tyrone","2023","current","/hnzXoDaK346U4ByfvQenu2DZnTg.jpg","Netflix",6.5,"A series of eerie events thrusts an unlikely trio onto the trail of a nefarious "],[273271,"Time Lapse","2014","modern","/wzdtagMTNao7l4zuJ1i8usSfEwz.jpg","Prime Video",6.5,"Three friends discover a mysterious machine that takes pictures 24 hours into th"],[1052280,"It's What's Inside","2024","current","/6jzwaLoDurD6Jn2ILb42nFcn3xq.jpg","Netflix",6.5,"A pre-wedding reunion descends into a psychological nightmare for a group of col"],[340837,"A Cure for Wellness","2017","modern","/8QWJtne0pTsNoJ86KE993aQYTLW.jpg","Disney+",6.3,"An ambitious young executive is sent to retrieve his company's CEO from an idyll"],[158852,"Tomorrowland","2015","modern","/kziYpr5Nfw60P0My8aj1sgCEqed.jpg","Disney+",6.3,"Bound by a shared destiny, a bright, optimistic teen bursting with scientific cu"],[376134,"The Discovery","2017","modern","/nLIDouFvreSrs8xK62zuvpEPDw0.jpg","Netflix",6.3,"In the near future, due to a breakthrough scientific discovery by Dr. Thomas Har"],[536437,"Hypnotic","2023","current","/3IhGkkalwXguTlceGSl8XUJZOVI.jpg","Prime Video",6.2,"A detective becomes entangled in a mystery involving his missing daughter and a "],[1685,"Beneath the Planet of the Apes","1970","classic","/szHCeYwi4ubewuYnlnz0YGqWnQC.jpg","Disney+",6.1,"The sole survivor of an interplanetary rescue mission lands on the planet of the"]]},"laugh":{"h":[[1598785,"Milky☆Subway: The Galactic Limited Express - the Movie","2026","/brQf6Odu4S6WzfVLuXLbOcbsOP2.jpg","Netflix",9.0,"Six delinquents are tasked with cleaning a train as part of a community service program. But when th",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1591834,"Familia a la deriva","2026","/jofyMzEnLoBZFKezmcCli3bEFwz.jpg","Disney+",8.3,"To make up for lost time with his four children, a charismatic car salesman organizes a Caribbean ya",false],[1327819,"Hoppers","2026","/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg","Disney+",8.2,"Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing ",false],[1576369,"Bharathanatyam 2 Mohiniyattam","2026","/lsg0IxNQCUxKqs63YjturEuY0qQ.jpg","Netflix",8.1,"The family's journey to Sreekandapuram to settle the late Bharathan Nair's second wife and son takes",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[496243,"Parasite","2019","modern","/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg","Netflix",8.5,"All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glam"],[105,"Back to the Future","1985","classic","/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg","Prime Video",8.3,"Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadver"],[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[654299,"Out of the Clear Blue Sky","2019","modern","/o9cSEHrXzPOO4OIoT9yrdxc216w.jpg","Netflix",8.3,"Returning to Earth as an imitator, the legendary Mexican artist Pedro Infante mu"],[77338,"The Intouchables","2011","modern","/1QU7HKgsQbGpzsJbJK4pAVQV9F5.jpg","Prime Video",8.3,"A true story of two men who should never have met – a quadriplegic aristocrat wh"],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[490132,"Green Book","2018","modern","/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg","Prime Video",8.2,"Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour thr"],[508965,"Klaus","2019","modern","/q125RHUDgR4gjwh1QkfYuJLYkL.jpg","Netflix",8.2,"A selfish postman and a reclusive toymaker form an unlikely friendship, deliveri"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[120467,"The Grand Budapest Hotel","2014","modern","/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg","Netflix",8.0,"The Grand Budapest Hotel tells of a legendary concierge at a famous European hot"],[400608,"Bo Burnham: Make Happy","2016","modern","/qVThhskXZZHDfj4m8jOx2CxIVIW.jpg","Netflix",8.0,"Combining his trademark wit and self-deprecating humor with original music, Bo B"],[803796,"KPop Demon Hunters","2025","current","/zT7Lhw3BhJbMkRqm9Zlx2YGMsY0.jpg","Netflix",8.0,"When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're u"],[9277,"The Sting","1973","classic","/ckmYng37zey8INYf6d10cVgIG93.jpg","Netflix",8.0,"A novice con man teams up with an acknowledged master to avenge the murder of a "],[610461,"Veinteañera, divorciada y fantástica","2020","current","/oSbCdDI0SAAOdywGe0YVO2iDdV9.jpg","Netflix",8.0,"Regina, our young protagonist, always dreamed of getting married. And she did it"],[678580,"El mesero","2021","current","/zvGC5jX5wQmU1GgPc0VGZz7Mtcs.jpg","Netflix",8.0,"A waiter pretends to be an important businessman in order to reach the upper cla"],[400928,"Gifted","2017","modern","/7YB2YrMwIm1g8FyZtlvmVDfRnAT.jpg","Disney+",8.0,"Frank, a single man raising his child prodigy niece Mary, is drawn into a custod"],[823754,"Bo Burnham: Inside","2021","current","/ku1UvTWYvhFQbSesOD6zteY7bXT.jpg","Netflix",8.0,"Stuck in COVID-19 lockdown, US comedian and musician Bo Burnham attempts to stay"]]},"date":{"h":[[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1542352,"Youth","2026","/rNzk0jlGRPnvZ26On5xhTmLaQhO.jpg","Netflix",7.2,"Youth follows Praveen, a 15-year-old boy who enters adolescence determined to find true love before ",false],[1034716,"People We Meet on Vacation","2026","/peG6482ALJQ9Tbvv2P38BquVk0f.jpg","Netflix",7.0,"Poppy's a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[550205,"Wish Dragon","2021","current","/lnPf6hzANL6pVQTxUlsNYSuhT5l.jpg","Netflix",7.8,"Determined teen Din is longing to reconnect with his childhood best friend when "],[579792,"Cindy La Regia","2020","current","/1KGbMtuySUtRggWlYPXyTWFcxLx.jpg","Netflix",7.8,"When Cindy decides that she doesn't want to marry her boyfriend, she runs to Mex"],[369299,"Don't Blame the Kid","2016","modern","/zWp8QZ1KxNrirNK9MF1EAIHjqVw.jpg","Prime Video",7.7,"After a one-night stand results in pregnancy, a young woman decides to become pa"],[662237,"Sweet & Sour","2021","current","/3yGwAPl6LWpi8QwHjwCMaqsPgNB.jpg","Netflix",7.7,"Faced with real-world opportunities and challenges, a couple endures the highs a"],[1027014,"Entergalactic","2022","current","/oMU3JpuKuasjAWIbUQgCaT6pco1.jpg","Netflix",7.7,"Ambitious artist Jabari attempts to balance success and love when he moves into "],[656563,"Rich in Love","2020","current","/dVqRATKlpCoWy96lfxiHc9TY9An.jpg","Netflix",7.7,"Working incognito at his rich dad's company to test his own merits, Teto falls f"],[792307,"Poor Things","2023","current","/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg","Disney+",7.6,"Brought back to life by an unorthodox scientist, a young woman runs off with a l"],[583083,"The Kissing Booth 2","2020","current","/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","Netflix",7.6,"With college decisions looming, Elle juggles her long-distance romance with Noah"],[4951,"10 Things I Hate About You","1999","modern","/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg","Disney+",7.6,"On the first day at his new school, Cameron instantly falls for Bianca, the gorg"],[466282,"To All the Boys I've Loved Before","2018","modern","/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","Netflix",7.6,"Lara Jean's love life goes from imaginary to out of control when her secret lett"],[976573,"Elemental","2023","current","/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg","Disney+",7.6,"In a city where fire, water, land and air residents live together, a fiery young"]]},"feelgood":{"h":[[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1542352,"Youth","2026","/rNzk0jlGRPnvZ26On5xhTmLaQhO.jpg","Netflix",7.2,"Youth follows Praveen, a 15-year-old boy who enters adolescence determined to find true love before ",false],[1034716,"People We Meet on Vacation","2026","/peG6482ALJQ9Tbvv2P38BquVk0f.jpg","Netflix",7.0,"Poppy's a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[550205,"Wish Dragon","2021","current","/lnPf6hzANL6pVQTxUlsNYSuhT5l.jpg","Netflix",7.8,"Determined teen Din is longing to reconnect with his childhood best friend when "],[579792,"Cindy La Regia","2020","current","/1KGbMtuySUtRggWlYPXyTWFcxLx.jpg","Netflix",7.8,"When Cindy decides that she doesn't want to marry her boyfriend, she runs to Mex"],[369299,"Don't Blame the Kid","2016","modern","/zWp8QZ1KxNrirNK9MF1EAIHjqVw.jpg","Prime Video",7.7,"After a one-night stand results in pregnancy, a young woman decides to become pa"],[662237,"Sweet & Sour","2021","current","/3yGwAPl6LWpi8QwHjwCMaqsPgNB.jpg","Netflix",7.7,"Faced with real-world opportunities and challenges, a couple endures the highs a"],[1027014,"Entergalactic","2022","current","/oMU3JpuKuasjAWIbUQgCaT6pco1.jpg","Netflix",7.7,"Ambitious artist Jabari attempts to balance success and love when he moves into "],[656563,"Rich in Love","2020","current","/dVqRATKlpCoWy96lfxiHc9TY9An.jpg","Netflix",7.7,"Working incognito at his rich dad's company to test his own merits, Teto falls f"],[792307,"Poor Things","2023","current","/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg","Disney+",7.6,"Brought back to life by an unorthodox scientist, a young woman runs off with a l"],[583083,"The Kissing Booth 2","2020","current","/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","Netflix",7.6,"With college decisions looming, Elle juggles her long-distance romance with Noah"],[4951,"10 Things I Hate About You","1999","modern","/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg","Disney+",7.6,"On the first day at his new school, Cameron instantly falls for Bianca, the gorg"],[466282,"To All the Boys I've Loved Before","2018","modern","/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","Netflix",7.6,"Lara Jean's love life goes from imaginary to out of control when her secret lett"],[976573,"Elemental","2023","current","/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg","Disney+",7.6,"In a city where fire, water, land and air residents live together, a fiery young"]]},"cry":{"h":[[1630423,"My Dearest Assassin","2026","/ul4dQcA68mtSx8J56N5gEcaCCtP.jpg","Netflix",8.6,"Hunted for her rare blood type, a caged woman vows to fight alongside the assassin she loves to prot",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1595852,"Boulevard","2026","/hAKOp4AHaDiVdDMlobMNCNgJVD7.jpg","Prime Video",7.5,"New city, new life, and an unexpected encounter with Luke-a boy fueled by adrenaline and haunted by ",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[1466115,"Even If This Love Disappears Tonight","2025","current","/5eNN8KLDPUXDqIkTdCbmn1gx5P7.jpg","Netflix",8.4,"A high school girl wakes up each day with no memory of yesterday. When she agree"],[1291559,"Drawing Closer","2024","current","/173FD4a0rpSF30z4CoWx6qdx8Ry.jpg","Netflix",8.4,"With only a year left to live, 17-year-old Akito finds new meaning in life by br"],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[851644,"20th Century Girl","2022","current","/od22ftNnyag0TTxcnJhlsu3aLoU.jpg","Netflix",8.2,"In 1999, a teen girl keeps close tabs on a boy in school on behalf of her deeply"],[522924,"The Art of Racing in the Rain","2019","modern","/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg","Disney+",8.2,"A family dog – with a near-human soul and a philosopher's mind – evaluates his l"],[51822,"Love Hurts","2002","modern","/kbtgdKUEnX76MOJ7w30js5vSNLT.jpg","Netflix",8.1,"Family and friends try to sabotage the budding romance between a young upper cla"],[762975,"Purple Hearts","2022","current","/4JyNWkryifWbWXJyxcWh3pVya6N.jpg","Netflix",8.0,"An aspiring musician agrees to a marriage of convenience with a soon-to-deploy M"],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[962232,"Beyond the Universe","2022","current","/AlAP6WRSBuf5cP8OgpHTF45BPUp.jpg","Netflix",7.9,"While waiting for a kidney transplant, a young pianist finds an unexpected conne"],[597,"Titanic","1997","modern","/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg","Disney+",7.9,"101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic,"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[776503,"CODA","2021","current","/BzVjmm8l23rPsijLiNLUzuQtyd.jpg","Prime Video",7.9,"As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf fa"],[719410,"Your Name Engraved Herein","2020","current","/ynNO5FhArEz68wRKOn4NgqVntmS.jpg","Netflix",7.9,"In 1987, as martial law ends in Taiwan, Jia-han and Birdy fall in love amid fami"],[667520,"A Whisker Away","2020","current","/6inkRM1XGBG5vRhclCPWfMenp7N.jpg","Netflix",7.9,"A peculiar girl transforms into a cat to catch her crush's attention. But before"],[654,"On the Waterfront","1954","classic","/v1RtJ1qR4v9nrnfoBVBl6hjTW9.jpg","Netflix",7.9,"A prizefighter-turned-longshoreman with a conscience goes up against labor leade"],[445030,"No Game No Life: Zero","2017","modern","/cCBB6BGRj5nCTaEgogDtkHfjOLK.jpg","Netflix",7.8,"Six thousand years before Sora and Shiro were even a blink in the history of Dis"],[331482,"Little Women","2019","modern","/yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg","Netflix",7.8,"Four sisters come of age in America in the aftermath of the Civil War."]]},"think":{"h":[[277640,"Pompeii: Out of Time with Tom Hiddleston","2026","/qnOYQ6uqxj5HEuXtVf1vSZicok.jpg","Disney+",7.2,"A historical exploration about the eruption of Vesuvius in 79 A.D. and the preserved Roman city it l",true],[1426306,"Titan: The OceanGate Submersible Disaster","2025","/mSVJI9P5UmvOLZVTH8sAtlgxsgy.jpg","Netflix",7.1,"OceanGate's Titan tourist submersible imploded in 2023 on a deep-sea dive to the Titanic. This docum",false],[1585476,"Kevin Costner Presents: The First Christmas","2025","/yXPmDhPj26JqEekHIruDtENSrsj.jpg","Disney+",6.5,"Kevin Costner hosts this special exploring the extraordinary journey of Mary and Joseph as they navi",false],[1484253,"Trainwreck: Poop Cruise","2025","/nJZlsBpDxx3LrGwXvwXkQyVnp9A.jpg","Netflix",5.9,"An engine fire leaves 4,000 passengers stranded at sea without power and plumbing in this wild docum",false]],"a":[[664280,"David Attenborough: A Life on Our Planet","2020","current","/zSKwyUDKDHiFU5syTTvQRDcGBPS.jpg","Netflix",8.4,"The story of life on our planet by the man who has seen more of the natural worl"],[680058,"The Rescue","2021","current","/kC7fVtCkJACwPBaRr2hlj2whfKX.jpg","Disney+",8.0,"The enthralling, against-all-odds story that transfixed the world in 2018: the d"],[656690,"The Social Dilemma","2020","current","/jcaM6V2tCtu6iMHDsGLBUbaYgYp.jpg","Netflix",7.5,"This documentary-drama hybrid explores the dangerous human impact of social netw"],[469019,"Jim & Andy: The Great Beyond","2017","modern","/kKzopOFXz9YfsCTqg3XpF0GoypX.jpg","Netflix",7.5,"Offbeat documentarian Chris Smith provides a behind-the-scenes look at how Jim C"],[627070,"Tell Me Who I Am","2019","modern","/oMfiD7wjdwRxPSdZ7gz7iNO3Z0B.jpg","Netflix",7.3,"In this documentary, Alex trusts his twin, Marcus, to tell him about his past af"],[489931,"American Animals","2018","modern","/aLbdKxgxuOPvs6CTlmzoOQ4Yg3j.jpg","Disney+",6.7,"Lexington, Kentucky, 2004. Four young men attempt to execute one of the most aud"]]},"inspire":{"h":[[1530510,"Mexico 86","2026","/dj4MbmBrZXzNQpxsLBIxKohRp9b.jpg","Netflix",7.8,"When a last-minute chance to host the 1986 World Cup appears, a cunning Mexican bureaucrat, armed wi",false],[1397201,"Golden Kamuy -The Abashiri Prison Raid-","2026","/a9W2203QLRqBT3a6EVDECc8g9Y2.jpg","Netflix",7.5,"As each group pursues their mission, a fierce battle unfolds over the tattooed prisoners. Who is fri",false],[1261188,"The Swedish Connection","2026","/ytruJRp7Ba82IU6s8yAY0HPw5xr.jpg","Netflix",7.3,"Swedish Foreign Ministry bureaucrat Gösta Engzell, overlooked during WWII, rescued thousands while t",false],[1247165,"Raja Shivaji","2026","/9e2Wc6sbeU1YdBWLJIDyMcEWrN2.jpg","Netflix",5.9,"Chronicles the rise of young Shivaji Bhonsale, who challenged the might of established empires to fo",false]],"a":[[490132,"Green Book","2018","modern","/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg","Prime Video",8.2,"Tony Lip, a bouncer in 1962, is hired to drive pianist Don Shirley on a tour thr"],[1480382,"The Voice of Hind Rajab","2025","current","/q7M8kQB46T11vmDMD6E239jsqTz.jpg","Netflix",8.0,"January 29, 2024. Red Crescent volunteers receive an emergency call. A five-year"],[381284,"Hidden Figures","2016","modern","/9lfz2W2uGjyow3am00rsPJ8iOyq.jpg","Disney+",8.0,"The untold story of Katherine G. Johnson, Dorothy Vaughan and Mary Jackson – bri"],[359724,"Ford v Ferrari","2019","modern","/dR1Ju50iudrOh3YgfwkAU1g2HZe.jpg","Disney+",8.0,"American car designer Carroll Shelby and the British-born driver Ken Miles work "],[821,"Judgment at Nuremberg","1961","classic","/b6vYatvui1EXeFYfpDX4rcbueuP.jpg","Prime Video",8.0,"In 1947, four German judges who served on the bench during the Nazi regime face "],[530915,"1917","2019","modern","/iZf0KyrE25z1sage4SYFLCCrMi9.jpg","Prime Video",8.0,"At the height of the First World War, two young British soldiers must cross enem"],[205596,"The Imitation Game","2014","modern","/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg","Prime Video",8.0,"Based on the real life story of legendary cryptanalyst Alan Turing, the film por"],[906126,"Society of the Snow","2023","current","/2e853FDVSIso600RqAMunPxiZjq.jpg","Netflix",8.0,"On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby t"],[197,"Braveheart","1995","modern","/or1gBugydmjToAEq7OZY0owwFk.jpg","Disney+",7.9,"Enraged at the slaughter of Murron, his new bride and childhood love, Scottish w"],[626332,"Flamin' Hot","2023","current","/a7KyFMPXj0iY4EoLq1PIGU1WJPw.jpg","Disney+",7.9,"The inspiring true story of Richard Montañez, the Frito Lay janitor who channele"],[76203,"12 Years a Slave","2013","modern","/xdANQijuNrJaw1HA61rDccME4Tm.jpg","Prime Video",7.9,"In the pre-Civil War United States, Solomon Northup, a free black man from upsta"],[491480,"The Boy Who Harnessed the Wind","2019","modern","/yOr7RxHw15MMXNxGMXSmngDqHyI.jpg","Netflix",7.9,"Against all the odds, a thirteen year old boy in Malawi invents an unconventiona"],[774531,"Young Woman and the Sea","2024","current","/bZlecCuBVvKuarNGvchBwaOsQ3c.jpg","Disney+",7.9,"This is the extraordinary true story of Trudy Ederle, the first woman to success"],[660637,"Dance of the Forty One","2020","current","/jcSqwsEtT7wKfQ8oKaaulMMGUdS.jpg","Netflix",7.8,"Mexico City, November 1901. The police raid a private home where a secret party "],[698948,"Thirteen Lives","2022","current","/yi5KcJqFxy0D6yP8nCfcF8gJGg5.jpg","Prime Video",7.8,"Based on the true nail-biting mission that captivated the world. Twelve boys and"],[714888,"Argentina 1985","2022","current","/nmh7vD2eDVRqFJoCpEzVcfGcPPf.jpg","Prime Video",7.8,"In the 1980s, a team of lawyers takes on the heads of Argentina's bloody militar"],[314365,"Spotlight","2015","modern","/8DPGG400FgaFWaqcv11n8mRd2NG.jpg","Netflix",7.8,"The true story of how the Boston Globe uncovered the massive scandal of child mo"],[650031,"The Shadow in My Eye","2021","current","/jCKvbH3a4V5IPoRAG85eDaniNqO.jpg","Netflix",7.8,"On March 21st, 1945, the British Royal Air Force set out on a mission to bomb Ge"],[149870,"The Wind Rises","2013","modern","/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg","Netflix",7.8,"A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi, wh"],[760774,"One Life","2023","current","/yvnIWt2j8VnDgwKJE2VMiFMa2Qo.jpg","Prime Video",7.8,"British stockbroker Nicholas Winton visits Czechoslovakia in the 1930s and forms"]]},"travel":{"h":[[1359005,"Per Aspera Ad Astra","2026","/cuNGOSr0oSuBm0uAa28516Iw3Bw.jpg","Netflix",8.0,"Set in the near future, the story revolves around the emergence of the virtual dream reality technol",false],[1397201,"Golden Kamuy -The Abashiri Prison Raid-","2026","/a9W2203QLRqBT3a6EVDECc8g9Y2.jpg","Netflix",7.5,"As each group pursues their mission, a fierce battle unfolds over the tattooed prisoners. Who is fri",false],[1516445,"It Would Be Night in Caracas","2025","/s41i9MQeqKqIFtCTfXKTPM9X9MG.jpg","Netflix",6.8,"While struggling to withstand the chaos of modern Venezuela, Adelaida sees a chance to survive—and t",false],[1450599,"K.O.","2025","/qcM2sUiAeP4zXwx4ADSvgc9S58k.jpg","Netflix",6.5,"A former fighter must find the missing son of an opponent he accidentally killed years ago, taking o",false],[982843,"The Great Flood","2025","/1tUOZQDgZaGqZtrB21MieiXARL2.jpg","Netflix",6.0,"When a raging flood traps a researcher and her young son, a call to a crucial mission puts their esc",false]],"a":[[555604,"Guillermo del Toro's Pinocchio","2022","current","/vx1u0uwxdlhV2MUzj4VlcMB0N6m.jpg","Netflix",8.0,"During the rise of fascism in Mussolini's Italy, a wooden boy brought magically "],[150540,"Inside Out","2015","modern","/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg","Disney+",7.9,"When 11-year-old Riley moves to a new city, her Emotions team up to help her thr"],[1084736,"The Count of Monte Cristo","2024","current","/sAT1P3FGhtJ68anUyJScnMu8t1l.jpg","Prime Video",7.9,"Edmond Dantès becomes the target of a sinister plot and is arrested on his weddi"],[916224,"Suzume","2022","current","/yStW1TXF5s7Tbtu9KjIZEaWl6HL.jpg","Netflix",7.9,"Suzume, 17, lost her mother as a little girl. On her way to school, she meets a "],[458302,"Remi, Nobody's Boy","2018","modern","/mQYXlxlUTmOP4FWt52qkZZb8JNM.jpg","Prime Video",7.9,"At the age of 10 years, young Rémi is snatched from his adoptive mother and entr"],[445030,"No Game No Life: Zero","2017","modern","/cCBB6BGRj5nCTaEgogDtkHfjOLK.jpg","Netflix",7.8,"Six thousand years before Sora and Shiro were even a blink in the history of Dis"],[728754,"Stand by Me Doraemon 2","2020","current","/vBv8iOFPLnXmtELUjcFc7OKHsR4.jpg","Netflix",7.8,"Nobita travels to the future to show his beloved grandma his bride, but adult No"],[348892,"Bajrangi Bhaijaan","2015","modern","/vhlliI7HZZlWfo5d6CiyfBAGLrW.jpg","Netflix",7.8,"A young mute girl from Pakistan loses herself in India with no way to head back."],[937746,"Io Capitano","2023","current","/kGlZFwUQI5gAUdySNFfqGIkAF9n.jpg","Prime Video",7.8,"Longing for a brighter future, two Senegalese teenagers embark on a journey from"],[286217,"The Martian","2015","modern","/pjYWdykADVLTCh5g475RnI2hWIN.jpg","Disney+",7.7,"During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a "],[602063,"Rurouni Kenshin: The Final","2021","current","/7bbEASVf9XWtfxWiuWUMY3uyhTb.jpg","Netflix",7.7,"In 1879, Kenshin and his allies face their strongest enemy yet: his former broth"],[672322,"Rurouni Kenshin: The Beginning","2021","current","/rODS466qSdrwMlGdbUwPENhDN2c.jpg","Netflix",7.7,"Before he was a protector, Kenshin was a fearsome assassin known as Battosai. Bu"],[871,"Planet of the Apes","1968","classic","/2r9iKnlSYEk4daQadsXfcjHfIjQ.jpg","Disney+",7.7,"Astronaut Taylor crash lands on a distant planet ruled by apes who use a primiti"],[13830,"Shottas","2002","modern","/chh2xSTVtMCFyFePm1zRbBmtqaX.jpg","Prime Video",7.6,"A raw urban drama about two friends raised on the dangerous streets of Kingston,"],[221731,"Rurouni Kenshin Part II: Kyoto Inferno","2014","modern","/gI2xYpJPQOsmFblvowkW2IgEHkC.jpg","Netflix",7.6,"Kenshin has settled into his new life with Kaoru and his other friends when he i"],[864101,"Mira","2022","current","/mv2DFhsaLeNgFzNe2G5CJhzbrkt.jpg","Prime Video",7.6,"Near future. Lera Arabova is a 15-year-old girl who lives with her family in Vla"],[281957,"The Revenant","2015","modern","/ji3ecJphATlVgWNY0B0RVXZizdf.jpg","Netflix",7.5,"In the 1820s, a frontiersman, Hugh Glass, sets out on a path of vengeance agains"],[618588,"Arthur the King","2024","current","/zkKB3kOun5DKAkm61pHvLbrjxfa.jpg","Prime Video",7.5,"Over the course of ten days and 435 miles, an unbreakable bond is forged between"],[481848,"The Call of the Wild","2020","current","/33VdppGbeNxICrFUtW2WpGHvfYc.jpg","Disney+",7.5,"Buck is a big-hearted dog whose blissful domestic life is turned upside down whe"],[966,"The Magnificent Seven","1960","classic","/e5ToxOyJwuZD4VOfI0qEn5uIjeJ.jpg","Prime Video",7.5,"An oppressed Mexican peasant village hires seven gunfighters to help defend thei"]]},"escape":{"h":[[1575337,"Cosmic Princess Kaguya!","2026","/9I9cM38gecZcwJ0C6r0cwfvtPJP.jpg","Netflix",8.3,"Iroha's life gets knocked off its orbit when Kaguya, a carefree runaway from the Moon, moves in and ",false],[454639,"Masters of the Universe","2026","/oRuyGUHdoaQxWP3SDfafGkStxTC.jpg","Prime Video",7.3,"After being separated for 15 years, the Sword of Power leads Prince Adam back to Eternia, where he d",false],[83533,"Avatar: Fire and Ash","2025","/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg","Disney+",7.6,"In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and ",false]],"a":[[18491,"Neon Genesis Evangelion: The End of Evangelion","1997","modern","/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg","Netflix",8.3,"SEELE orders an all-out attack on NERV, aiming to destroy the Evas before Gendo "],[961323,"Nimona","2023","current","/2NQljeavtfl22207D1kxLpa4LS3.jpg","Netflix",7.9,"A knight framed for a tragic crime teams with a scrappy, shape-shifting teen to "],[728754,"Stand by Me Doraemon 2","2020","current","/vBv8iOFPLnXmtELUjcFc7OKHsR4.jpg","Netflix",7.8,"Nobita travels to the future to show his beloved grandma his bride, but adult No"],[9016,"Treasure Planet","2002","modern","/kNhZkR3UNbXfvESQo7mJpOi4tGd.jpg","Disney+",7.6,"When space galleon cabin boy Jim Hawkins discovers a map to an intergalactic \"lo"],[11704,"The Secret of NIMH","1982","classic","/prNrnOKlkV9wl5Sl3zwHu1f3t2z.jpg","Prime Video",7.4,"A widowed field mouse must move her family -- including an ailing son -- to esca"],[265712,"Stand by Me Doraemon","2014","modern","/wc7XQbfx6EIQqCuvmBMt3aisb2Y.jpg","Netflix",7.4,"Sewashi and Doraemon find themselves way back in time and meet Nobita. It is up "],[912598,"Bubble","2022","current","/wjgwIZyEgtgy9nIdz6C5uJNel2X.jpg","Netflix",7.3,"In an abandoned Tokyo overrun by bubbles and gravitational abnormalities, one gi"],[416494,"Status Update","2018","modern","/E4twRNScyq3g6tRpvK6X8LdD1z.jpg","Netflix",7.3,"After being uprooted by his parents' separation and unable to fit into his new h"],[757860,"The Yin-Yang Master: Dream of Eternity","2020","current","/odgDN1po1j7cEVLeBhkVS0Oh4kC.jpg","Netflix",7.2,"Every few hundred years, the most powerful demon on earth—a snake demon—awakens,"],[173,"20,000 Leagues Under the Sea","1954","classic","/heAEH85fdxEgV98LizHbQCL95iZ.jpg","Disney+",7.1,"A ship sent to investigate a wave of mysterious sinkings encounters the advanced"],[581389,"Space Sweepers","2021","current","/bmemsraCG1kIthY74NjDnnLRT2Q.jpg","Netflix",7.0,"When the crew of a space junk collector ship called The Victory discovers a huma"],[9667,"The Jacket","2005","modern","/bt89UfRhjAvJDAO9CWJnRFXAN3p.jpg","Prime Video",6.9,"A military veteran goes on a journey into the future, where he can foresee his d"],[2300,"Space Jam","1996","modern","/4RN5El3Pj2W4gpwgiAGLVfSJv2g.jpg","Prime Video",6.8,"With their freedom on the line, the Looney Tunes seek the help of NBA superstar "],[228161,"Home","2015","modern","/usFenYnk6mr8C62dB1MoAfSWMGR.jpg","Prime Video",6.8,"When Earth is taken over by the overly-confident Boov, an alien race in search o"],[246655,"X-Men: Apocalypse","2016","modern","/ikA8UhYdTGpqbatFa93nIf6noSr.jpg","Disney+",6.5,"After the re-emergence of the world's first mutant, world-destroyer Apocalypse, "],[119569,"Marvel One-Shot: Item 47","2012","modern","/hnSxG8clwLuAXEkp9emc8HCUcHD.jpg","Disney+",6.4,"Benny and Claire, a down-on-their-luck couple, find a discarded Chitauri weapon "],[14821,"Escape to Witch Mountain","1975","classic","/cXicoCiCfO6FDfv6ozwcfQCnhVW.jpg","Disney+",6.4,"Tia and Tony are two orphaned youngsters with extraordinary powers. Lucas Derani"],[8965,"Atlantis: Milo's Return","2003","modern","/hyAbWGld5WLdrmUB9OHyewcJQGL.jpg","Disney+",6.3,"Milo and Kida reunite with their friends to investigate strange occurances aroun"],[2612,"Mr. Destiny","1990","modern","/zlYxDFP9l1YcUnspNzuIa8KVo4N.jpg","Disney+",6.3,"Larry Burrows is unhappy and feels powerless over his life. He believes his enti"],[455476,"Knights of the Zodiac","2023","current","/qW4crfED8mpNDadSmMdi7ZDzhXF.jpg","Netflix",6.3,"When a headstrong street orphan, Seiya, in search of his abducted sister unwitti"]]},"adrenaline":{"h":[[1290821,"Shelter","2026","/buPFnHZ3xQy6vZEHxbHgL1Pc6CR.jpg","Prime Video",7.8,"A man living in self-imposed exile on a remote island rescues a young girl from a violent storm, set",false],[1339876,"Mardaani 3","2026","/dHxLBtHw4InwsVumnthupZYz6NM.jpg","Netflix",7.6,"Officer Shivani Shivaji Roy returns to hunt down those behind the disappearance of young girls, risk",false],[1613798,"Vengeance","2026","/ygWXPL0RS91JyJPNOfK34eV3bRE.jpg","Prime Video",7.5,"The brutal murder of the wife of “Toro,” a military hero in the special forces, turns him into a man",false],[1268127,"Humint","2026","/82bX2GK4PhaJQtfkTnfmd2P7erG.jpg","Netflix",7.5,"A South Korean agent hunts a drug ring in Russia and goes head-to-head with a North Korean operative",false],[1265609,"War Machine","2026","/rFhKkXhk7ClU03jQ5rHIApJDwev.jpg","Netflix",7.4,"On one last grueling mission during Army Ranger training, a combat engineer must lead his unit in a ",false]],"a":[[1356039,"Counterattack","2025","current","/38I76hGcFY6xB47pjm7pZwkfuAF.jpg","Netflix",8.3,"When a hostage rescue mission creates a new enemy, Capt. Guerrero and his elite "],[679,"Aliens","1986","classic","/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg","Disney+",8.0,"Ripley, the sole survivor of the Nostromo's deadly encounter with the monstrous "],[581528,"The Gangster, the Cop, the Devil","2019","modern","/oHlM4abRm6BzrRcz9Nup1uidw9H.jpg","Prime Video",7.9,"After barely surviving a brutal attack by a sadistic serial killer, crime boss J"],[393,"Kill Bill: Vol. 2","2004","modern","/2yhg0mZQMhDyvUQ4rG1IZ4oIA8L.jpg","Netflix",7.9,"The Bride unwaveringly continues on her roaring rampage of revenge against the b"],[615457,"Nobody","2021","current","/oBgWY00bEFeZ9N25wWVyuQddbAo.jpg","Prime Video",7.9,"Hutch Mansell, a suburban dad, overlooked husband, nothing neighbor — a \"nobody."],[562,"Die Hard","1988","classic","/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg","Disney+",7.8,"High above the city of L.A. a team of terrorists has seized a building, taken ho"],[1376434,"Predator: Killer of Killers","2025","current","/2XDQa6EmFHSA37j1t0w88vpWqj9.jpg","Disney+",7.8,"While three of the fiercest warriors in human history—a Viking raider, a ninja i"],[396535,"Train to Busan","2016","modern","/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg","Netflix",7.8,"When a zombie virus pushes Korea into a state of emergency, those trapped on an "],[882569,"Guy Ritchie's The Covenant","2023","current","/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg","Prime Video",7.7,"After an ambush, Afghan interpreter Ahmed goes to Herculean lengths to save US A"],[1118224,"Maharaja","2024","current","/s0m4TM1XRAftQStgKpw024RvkJo.jpg","Netflix",7.7,"A barber seeks vengeance after his home is burglarized, cryptically telling poli"],[766507,"Prey","2022","current","/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg","Disney+",7.7,"When danger threatens her camp, the fierce and highly skilled Comanche warrior N"],[938008,"The Killer","2022","current","/5IQqdtTq1wH5YJynx86Ysi4sDVt.jpg","Prime Video",7.6,"While his girlfriend is away on a trip, retired assassin Bang Ui-kang is tasked "],[106,"Predator","1987","classic","/aN3cdjIK70KGmD84et8MMblU87Q.jpg","Disney+",7.6,"A team of elite commandos on a secret mission in a Central American jungle come "],[109424,"Captain Phillips","2013","modern","/8Td0kkocW6sD3uRpzwfMfkqMWhx.jpg","Prime Video",7.5,"The true story of Captain Richard Phillips and the 2009 hijacking by Somali pira"],[429450,"Pandora","2016","modern","/elTrkTm5GjynK3H26cpOZsWDYjy.jpg","Netflix",7.5,"When an earthquake hits a Korean village housing a run-down nuclear power plant,"],[484468,"The Wolf's Call","2019","modern","/8bxIzp9w9l9ZzGVwNaIKOaem05A.jpg","Netflix",7.5,"Shown from the perspective of a young submariner with unusually sensitive hearin"],[204553,"Cold Eyes","2013","modern","/cNrAZSwzeCNDNHyQo2DIyPtKdAE.jpg","Prime Video",7.5,"Ha Yoon-ju becomes the newest member of a unit within the Korean Police Forces S"],[654739,"Hard Hit","2021","current","/y2Aimt8isimtigec3e4kB2G9FMR.jpg","Prime Video",7.5,"On his way to work, a bank manager receives an anonymous call claiming there's a"],[1051,"The French Connection","1971","classic","/pH4saPwMjhnVGwmSH6RkMaHrt3s.jpg","Disney+",7.5,"Tough narcotics detective 'Popeye' Doyle is in hot pursuit of a suave French dru"],[2501,"The Bourne Identity","2002","modern","/aP8swke3gmowbkfZ6lmNidu0y9p.jpg","Prime Video",7.5,"Wounded to the brink of death and suffering from amnesia, Jason Bourne is rescue"]]},"chills":{"h":[[1266127,"Ready or Not: Here I Come","2026","/jRf89HVEtBZiSnOXXWDhZOfuTwW.jpg","Disney+",7.6,"Moments after surviving an all-out attack from the Le Domas family, Grace discovers she’s reached th",false],[1489931,"Suzzanna: Witchcraft","2026","/4DeSEKQqraTR10zYAkbQuRazagF.jpg","Netflix",7.2,"Suzzanna is determined to exact revenge on Bisman, the cruel village ruler who killed her father wit",false],[1639398,"Mexican Psycho","2026","/7tIgfsTWuzXKR2kLRUPrLRTbcuo.jpg","Prime Video",7.1,"Follows an \"ultra-violent and intelligent\" psychopath who challenges the police by leaving a white p",false],[1198994,"Send Help","2026","/zbJWVHOtj3ljBzWgL1P8pxP03Up.jpg","Disney+",7.1,"Two colleagues become stranded on a deserted island, the only survivors of a plane crash. On the isl",false],[1084187,"Pretty Lethal","2026","/znTPnXCK3lEQJgqXCvP7e5FUz6f.jpg","Prime Video",6.8,"A troupe of ballerinas find themselves fighting for survival as they attempt to escape from a remote",false]],"a":[[396535,"Train to Busan","2016","modern","/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg","Netflix",7.8,"When a zombie virus pushes Korea into a state of emergency, those trapped on an "],[44214,"Black Swan","2010","modern","/viWheBd44bouiLCHgNMvahLThqx.jpg","Disney+",7.7,"A committed dancer struggles to maintain her sanity after winning the lead role "],[419430,"Get Out","2017","modern","/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg","Prime Video",7.6,"Chris and his girlfriend Rose go upstate to visit her parents for the weekend. A"],[1134433,"Death Whisperer","2023","current","/48TDjSJpCdJ4SBOHZX3G5IjaV02.jpg","Netflix",7.4,"When a remote village is plagued by a deadly curse, one brother must fight to sa"],[381288,"Split","2017","modern","/lli31lYTFpvxVBeFHWoe5PMfW5s.jpg","Prime Video",7.3,"Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fle"],[72640,"The Old Mill","1937","classic","/9AeBR5ZhhuNM3PsBuR0d6EL3ejL.jpg","Disney+",7.3,"Night in an old mill is dramatically depicted in this Oscar-winning short in whi"],[17111,"Shutter","2004","modern","/zUyaVtyugDaDHtOC6kCMJhbZsWu.jpg","Netflix",7.3,"When Jane and Tun run over a girl in a car accident, they speed away immediately"],[10299,"Hush... Hush, Sweet Charlotte","1964","classic","/hwVGNaVXFblluLwUjGcJ7RgW1rV.jpg","Disney+",7.3,"An aging, reclusive Southern belle plagued by a horrifying family secret descend"],[507089,"Five Nights at Freddy's","2023","current","/7BpNtNfxuocYEVREzVMO75hso1l.jpg","Netflix",7.3,"Recently fired and desperate for work, a troubled young man named Mike agrees to"],[493922,"Hereditary","2018","modern","/4GFPuL14eXi66V96xBWY73Y9PfR.jpg","Prime Video",7.3,"Following the death of the Leigh family matriarch, Annie and her children uncove"],[75624,"Naruto Shippuden the Movie: Blood Prison","2011","modern","/4WT7zYFpe0fsbg6TitppiHddWAh.jpg","Netflix",7.3,"After his capture for attempted assassination of the Raikage, leader of Kumogaku"],[6537,"The Orphanage","2007","modern","/vIpi1KtHLXUOfSVC2m6MqpjSPgL.jpg","Prime Video",7.2,"A woman brings her family back to her childhood home, which used to be an orphan"],[546121,"Run","2020","current","/ilHG4EayOVoYeKqslspY3pR4wzC.jpg","Netflix",7.2,"Chloe, a teenager who is confined to a wheelchair, is homeschooled by her mother"],[2668,"Sleepy Hollow","1999","modern","/1GuK965FLJxqUw9fd1pmvjbFAlv.jpg","Netflix",7.2,"Skeptical young detective Ichabod Crane gets transferred to the hamlet of Sleepy"],[571625,"The Closet","2020","current","/aK9R6Xnm0Xcx9E0XapAbvTr8UtD.jpg","Prime Video",7.2,"After moving into a new house, a young girl begins displaying strange and distur"],[744857,"When Evil Lurks","2023","current","/iQ7G9LhP7NRRIUM4Vlai3eOxBAc.jpg","Netflix",7.1,"When brothers Pedro and Jimi discover that a demonic infection has been festerin"],[570670,"The Invisible Man","2020","current","/5EufsDwXdY2CVttYOk2WtYhgKpa.jpg","Netflix",7.1,"When Cecilia's abusive ex takes his own life and leaves her his fortune, she sus"],[64720,"Take Shelter","2011","modern","/dldIX0q5jewe8rSyCh8d5I1RYx3.jpg","Netflix",7.1,"Plagued by a series of apocalyptic visions, a young husband and father questions"],[1084199,"Companion","2025","current","/oCoTgC3UyWGfyQ9thE10ulWR7bn.jpg","Netflix",7.0,"During a weekend getaway at a secluded lakeside estate, a group of friends finds"],[524251,"I See You","2019","modern","/2LwamrHAmxqEHsT9JViFJxT08Ek.jpg","Prime Video",7.0,"When a 12-year-old boy goes missing at a local park, a detective investigates th"]]},"family":{"h":[[1007757,"Swapped","2026","/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg","Netflix",8.9,"A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically tr",false],[1327819,"Hoppers","2026","/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg","Disney+",8.2,"Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing ",false],[1716513,"Extreme Makeover: Homer Edition","2026","/vim76mMXig00YRxN2iGYJASoGkP.jpg","Disney+",7.4,"Homer and Marge's fun couples' date night goes off the rails when Marge learns Homer left the kids u",false],[204137,"The Doomies","2026","/zTUuiutD2Kj8lwd552uX8dzxA24.jpg","Disney+",8.9,"When best friends Bobby and Romy mistakenly open up a gateway to another world, they turn their slee",true],[261647,"Sofia the First: Royal Magic","2026","/btMAULyx0ecn7slCxJYQ1aNX7yx.jpg","Disney+",8.8,"Follow Sofia as she attends The Charmswell School for Royal Magic, where she discovers she is the mo",true]],"a":[[129,"Spirited Away","2001","modern","/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg","Netflix",8.5,"A young girl, Chihiro, becomes trapped in a strange new world of spirits. When h"],[667276,"Las leyendas: El origen","2021","current","/fR49hZdFJ6ZtRS23JW79VYmZgI7.jpg","Prime Video",8.3,"When a human baby crosses the Eternal Mirror, the portal between the living and "],[1139087,"Once Upon a Studio","2023","current","/aiy3G1cYWV3LgKZHY6a3jL8bjYL.jpg","Disney+",8.3,"Created for Disney's 100th anniversary, the short features Mickey Mouse corralli"],[8587,"The Lion King","1994","modern","/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg","Disney+",8.3,"Young lion prince Simba, eager to one day become king of the Pride Lands, grows "],[508965,"Klaus","2019","modern","/q125RHUDgR4gjwh1QkfYuJLYkL.jpg","Netflix",8.2,"A selfish postman and a reclusive toymaker form an unlikely friendship, deliveri"],[354912,"Coco","2017","modern","/6Ryitt95xrO8KXuqRGm1fUuNwqF.jpg","Disney+",8.2,"Despite his family’s baffling generations-old ban on music, Miguel dreams of bec"],[399106,"Piper","2016","modern","/5fu2d809jepLwEpES7wggiECLoQ.jpg","Disney+",8.1,"A mother bird tries to teach her little one how to find food by herself. In the "],[10681,"WALL·E","2008","modern","/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg","Disney+",8.1,"After hundreds of years doing what he was built for, WALL•E— a robot designed to"],[508442,"Soul","2020","current","/6jmppcaubzLF8wkXM36ganVISCo.jpg","Disney+",8.1,"Joe Gardner is a middle school teacher with a love for jazz music. After a succe"],[755812,"Miraculous World: New York, United HeroeZ","2020","current","/9YbyvcrHmY2SVbdfXpb8mC4Fy0g.jpg","Netflix",8.1,"Marinette's class is headed to New York, the city of superheroes, for French-Ame"],[831827,"Far from the Tree","2021","current","/39oaQUS0KxyXL6KYJ2o2u03PpHz.jpg","Disney+",8.1,"On an idyllic beach in the Pacific Northwest, curiosity gets the better of a you"],[8392,"My Neighbor Totoro","1988","classic","/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg","Netflix",8.1,"Two sisters move to the country with their father in order to be closer to their"],[829402,"Ultraman: Rising","2024","current","/j886YEkIUsiImY53px5VHKD4lRa.jpg","Netflix",8.0,"A star athlete reluctantly returns home to take over his father's duties as Ultr"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[862,"Toy Story","1995","modern","/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg","Disney+",8.0,"Led by Woody, Andy's toys live happily in his room until Andy's birthday brings "],[10515,"Castle in the Sky","1986","classic","/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg","Netflix",8.0,"A young boy and a girl with a magic crystal must race against pirates and foreig"],[14160,"Up","2009","modern","/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg","Disney+",8.0,"Carl Fredricksen spent his entire life dreaming of exploring the globe and exper"],[29826,"The Legend of the Nahuala","2007","modern","/dggo1MOieBZsJ18qqqaT4B4VdB4.jpg","Prime Video",8.0,"Leo San Juan, an insecure child of nine years old, lives eternally frightened by"],[37797,"Whisper of the Heart","1995","modern","/5FROLD8zpWFs9ja7aYho1uOMJHg.jpg","Netflix",7.9,"Shizuku lives a simple life, dominated by her love for stories and writing. One "],[574074,"Kitbull","2019","modern","/apzBk34NVtDpSWcrVfTzD069B7w.jpg","Disney+",7.9,"An unlikely connection sparks between two creatures: a fiercely independent stra"]]},"nostalgia":{"h":[[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1542352,"Youth","2026","/rNzk0jlGRPnvZ26On5xhTmLaQhO.jpg","Netflix",7.2,"Youth follows Praveen, a 15-year-old boy who enters adolescence determined to find true love before ",false],[1034716,"People We Meet on Vacation","2026","/peG6482ALJQ9Tbvv2P38BquVk0f.jpg","Netflix",7.0,"Poppy's a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[550205,"Wish Dragon","2021","current","/lnPf6hzANL6pVQTxUlsNYSuhT5l.jpg","Netflix",7.8,"Determined teen Din is longing to reconnect with his childhood best friend when "],[579792,"Cindy La Regia","2020","current","/1KGbMtuySUtRggWlYPXyTWFcxLx.jpg","Netflix",7.8,"When Cindy decides that she doesn't want to marry her boyfriend, she runs to Mex"],[369299,"Don't Blame the Kid","2016","modern","/zWp8QZ1KxNrirNK9MF1EAIHjqVw.jpg","Prime Video",7.7,"After a one-night stand results in pregnancy, a young woman decides to become pa"],[662237,"Sweet & Sour","2021","current","/3yGwAPl6LWpi8QwHjwCMaqsPgNB.jpg","Netflix",7.7,"Faced with real-world opportunities and challenges, a couple endures the highs a"],[1027014,"Entergalactic","2022","current","/oMU3JpuKuasjAWIbUQgCaT6pco1.jpg","Netflix",7.7,"Ambitious artist Jabari attempts to balance success and love when he moves into "],[656563,"Rich in Love","2020","current","/dVqRATKlpCoWy96lfxiHc9TY9An.jpg","Netflix",7.7,"Working incognito at his rich dad's company to test his own merits, Teto falls f"],[792307,"Poor Things","2023","current","/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg","Disney+",7.6,"Brought back to life by an unorthodox scientist, a young woman runs off with a l"],[583083,"The Kissing Booth 2","2020","current","/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","Netflix",7.6,"With college decisions looming, Elle juggles her long-distance romance with Noah"],[4951,"10 Things I Hate About You","1999","modern","/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg","Disney+",7.6,"On the first day at his new school, Cameron instantly falls for Bianca, the gorg"],[466282,"To All the Boys I've Loved Before","2018","modern","/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","Netflix",7.6,"Lara Jean's love life goes from imaginary to out of control when her secret lett"],[976573,"Elemental","2023","current","/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg","Disney+",7.6,"In a city where fire, water, land and air residents live together, a fiery young"]]},"heal":{"h":[[1630423,"My Dearest Assassin","2026","/ul4dQcA68mtSx8J56N5gEcaCCtP.jpg","Netflix",8.6,"Hunted for her rare blood type, a caged woman vows to fight alongside the assassin she loves to prot",false],[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1595852,"Boulevard","2026","/hAKOp4AHaDiVdDMlobMNCNgJVD7.jpg","Prime Video",7.5,"New city, new life, and an unexpected encounter with Luke-a boy fueled by adrenaline and haunted by ",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[1466115,"Even If This Love Disappears Tonight","2025","current","/5eNN8KLDPUXDqIkTdCbmn1gx5P7.jpg","Netflix",8.4,"A high school girl wakes up each day with no memory of yesterday. When she agree"],[1291559,"Drawing Closer","2024","current","/173FD4a0rpSF30z4CoWx6qdx8Ry.jpg","Netflix",8.4,"With only a year left to live, 17-year-old Akito finds new meaning in life by br"],[533514,"Violet Evergarden: The Movie","2020","current","/bajajkoErDst0JxdFyBkABiF9rW.jpg","Netflix",8.3,"As the world moves on from the war and technological advances bring changes to h"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[851644,"20th Century Girl","2022","current","/od22ftNnyag0TTxcnJhlsu3aLoU.jpg","Netflix",8.2,"In 1999, a teen girl keeps close tabs on a boy in school on behalf of her deeply"],[522924,"The Art of Racing in the Rain","2019","modern","/mi5VN4ww0JZgRFJIaPxxTGKjUg7.jpg","Disney+",8.2,"A family dog – with a near-human soul and a philosopher's mind – evaluates his l"],[51822,"Love Hurts","2002","modern","/kbtgdKUEnX76MOJ7w30js5vSNLT.jpg","Netflix",8.1,"Family and friends try to sabotage the budding romance between a young upper cla"],[762975,"Purple Hearts","2022","current","/4JyNWkryifWbWXJyxcWh3pVya6N.jpg","Netflix",8.0,"An aspiring musician agrees to a marriage of convenience with a soon-to-deploy M"],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[962232,"Beyond the Universe","2022","current","/AlAP6WRSBuf5cP8OgpHTF45BPUp.jpg","Netflix",7.9,"While waiting for a kidney transplant, a young pianist finds an unexpected conne"],[597,"Titanic","1997","modern","/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg","Disney+",7.9,"101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic,"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[776503,"CODA","2021","current","/BzVjmm8l23rPsijLiNLUzuQtyd.jpg","Prime Video",7.9,"As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf fa"],[719410,"Your Name Engraved Herein","2020","current","/ynNO5FhArEz68wRKOn4NgqVntmS.jpg","Netflix",7.9,"In 1987, as martial law ends in Taiwan, Jia-han and Birdy fall in love amid fami"],[667520,"A Whisker Away","2020","current","/6inkRM1XGBG5vRhclCPWfMenp7N.jpg","Netflix",7.9,"A peculiar girl transforms into a cat to catch her crush's attention. But before"],[654,"On the Waterfront","1954","classic","/v1RtJ1qR4v9nrnfoBVBl6hjTW9.jpg","Netflix",7.9,"A prizefighter-turned-longshoreman with a conscience goes up against labor leade"],[445030,"No Game No Life: Zero","2017","modern","/cCBB6BGRj5nCTaEgogDtkHfjOLK.jpg","Netflix",7.8,"Six thousand years before Sora and Shiro were even a blink in the history of Dis"],[331482,"Little Women","2019","modern","/yn5ihODtZ7ofn8pDYfxCmxh8AXI.jpg","Netflix",7.8,"Four sisters come of age in America in the aftermath of the Civil War."]]},"luxury":{"h":[[614945,"Voicemails for Isabelle","2026","/canZTWSxACSnAluir3dCtMxKpA1.jpg","Netflix",8.4,"A young woman's hilariously confessional voicemails to her late sister are unknowingly redirected to",false],[1633263,"Wonderful Nightmare","2026","/5plgPtzwuIHUKMN044igzRkbd90.jpg","Netflix",7.8,"A high-flying, career-driven lawyer dies prematurely due to a clerical error in heaven.",false],[1631917,"18th Rose","2026","/6pUwaXT6tdA6sek8o6SdFYudJDj.jpg","Netflix",7.7,"A spirited teen dreaming of the perfect debut makes a deal with a lonely newcomer, but unexpected fe",false],[1542352,"Youth","2026","/rNzk0jlGRPnvZ26On5xhTmLaQhO.jpg","Netflix",7.2,"Youth follows Praveen, a 15-year-old boy who enters adolescence determined to find true love before ",false],[1034716,"People We Meet on Vacation","2026","/peG6482ALJQ9Tbvv2P38BquVk0f.jpg","Netflix",7.0,"Poppy's a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals",false]],"a":[[19404,"Dilwale Dulhania Le Jayenge","1995","modern","/tFbfCkS7q6g96wVoAu8kyr93iPm.jpg","Netflix",8.5,"Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the dau"],[820067,"The Quintessential Quintuplets Movie","2022","current","/sg7klpt1xwK1IJirBI9EHaqQwJ5.jpg","Netflix",8.3,"When five lovely young girls who hate studying hire part-time tutor Futaro, he g"],[1355666,"Love Untangled","2025","current","/e7jStO2xfBUAUK37LbINHd1qtgy.jpg","Netflix",8.2,"A lovestruck teen plans to win the school heartthrob by going from curly to stra"],[284,"The Apartment","1960","classic","/hhSRt1KKfRT0yEhEtRW3qp31JFU.jpg","Prime Video",8.2,"Bud Baxter is a minor clerk in a huge New York insurance company, until he disco"],[140420,"Paperman","2012","modern","/9tvF744hwTm2Bn9hkDjMfEsysKz.jpg","Disney+",8.0,"An urban office worker finds that paper airplanes are instrumental in meeting a "],[449176,"Love, Simon","2018","modern","/snIsqVPmlu4LPjvToHpDotxa7Eh.jpg","Disney+",8.0,"Everyone deserves a great love story, but for 17-year-old Simon Spier, it's a li"],[930094,"Red, White & Royal Blue","2023","current","/dD3vhyDRCCT90hf4rldHU6Wu3Va.jpg","Prime Video",7.9,"After an altercation between Alex, the president's son, and Britain's Prince Hen"],[313369,"La La Land","2016","modern","/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg","Prime Video",7.9,"Mia, an aspiring actress, serves lattes to movie stars in between auditions and "],[746957,"You've Got This","2020","current","/wpY2ZhxqsHYXjaaFUHzQ0nmIjYs.jpg","Netflix",7.9,"An ad creative and a successful exec have a great marriage — until he wants to b"],[550205,"Wish Dragon","2021","current","/lnPf6hzANL6pVQTxUlsNYSuhT5l.jpg","Netflix",7.8,"Determined teen Din is longing to reconnect with his childhood best friend when "],[579792,"Cindy La Regia","2020","current","/1KGbMtuySUtRggWlYPXyTWFcxLx.jpg","Netflix",7.8,"When Cindy decides that she doesn't want to marry her boyfriend, she runs to Mex"],[369299,"Don't Blame the Kid","2016","modern","/zWp8QZ1KxNrirNK9MF1EAIHjqVw.jpg","Prime Video",7.7,"After a one-night stand results in pregnancy, a young woman decides to become pa"],[662237,"Sweet & Sour","2021","current","/3yGwAPl6LWpi8QwHjwCMaqsPgNB.jpg","Netflix",7.7,"Faced with real-world opportunities and challenges, a couple endures the highs a"],[1027014,"Entergalactic","2022","current","/oMU3JpuKuasjAWIbUQgCaT6pco1.jpg","Netflix",7.7,"Ambitious artist Jabari attempts to balance success and love when he moves into "],[656563,"Rich in Love","2020","current","/dVqRATKlpCoWy96lfxiHc9TY9An.jpg","Netflix",7.7,"Working incognito at his rich dad's company to test his own merits, Teto falls f"],[792307,"Poor Things","2023","current","/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg","Disney+",7.6,"Brought back to life by an unorthodox scientist, a young woman runs off with a l"],[583083,"The Kissing Booth 2","2020","current","/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg","Netflix",7.6,"With college decisions looming, Elle juggles her long-distance romance with Noah"],[4951,"10 Things I Hate About You","1999","modern","/ujERk3aKABXU3NDXOAxEQYTHe9A.jpg","Disney+",7.6,"On the first day at his new school, Cameron instantly falls for Bianca, the gorg"],[466282,"To All the Boys I've Loved Before","2018","modern","/hKHZhUbIyUAjcSrqJThFGYIR6kI.jpg","Netflix",7.6,"Lara Jean's love life goes from imaginary to out of control when her secret lett"],[976573,"Elemental","2023","current","/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg","Disney+",7.6,"In a city where fire, water, land and air residents live together, a fiery young"]]}};

function getSeedKey(tab, selGenres, selMood) {
  return tab === "mood" ? (selMood || "feelgood") : (selGenres[0] || "drama");
}

// Expand hero seed entry to film object
function expandHero(h) {
  return { id:h[0], title:h[1], year:h[2], poster_path:h[3], provider:h[4],
           rating:h[5], overview:h[6] || "A remarkable cinematic story waiting to be discovered.", isTV:!!h[7], era:"current" };
}

// Expand alt seed entry to film object  
function expandAlt(a) {
  return { id:a[0], title:a[1], year:a[2], era:a[3], poster_path:a[4],
           provider:a[5]||"Netflix", rating:a[6], overview:a[7], isTV:false };
}

// ── MY CINÉ: Rank candidates, write whyWatch ──────────────────────────────
function classifyTitle(title) {
  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);
  const rating = Number(title.rating || 0);

  if (votes >= 3000 || popularity >= 55) return "mainstream";
  if (rating >= 7.3 && votes >= 120 && votes < 3000) return "auteur";
  return "discovery";
}

function titleScore(title) {
  const rating = Number(title.rating || 0);
  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);

  return (
    rating * 12 +
    Math.log10(Math.max(votes, 1)) * 7 +
    Math.min(popularity, 120) * 0.12
  );
}

function whyTonight(title) {
  const genres = (title.genres || []).map(item => item.toLowerCase());
  const type = classifyTitle(title);

  if (title.isTV && title.format === "Limited Series") {
    return "A complete, bingeable story with the richness of a series and the satisfying shape of a film.";
  }

  if (genres.includes("romance") && genres.includes("comedy")) {
    return "A witty, emotionally generous romance for a night that needs charm without the usual sugar coating.";
  }

  if (genres.includes("thriller") || genres.includes("mystery")) {
    return "A tightly wound choice for anyone craving suspense, atmosphere and one more irresistible twist.";
  }

  if (genres.includes("documentary")) {
    return "A vivid true story that rewards curiosity and leaves you with something worth discussing afterward.";
  }

  if (genres.includes("animation")) {
    return "Visually inventive storytelling with enough imagination and emotional intelligence for grown-up movie lovers.";
  }

  if (type === "mainstream") {
    return "A polished crowd-pleaser with enough cinematic personality to feel chosen, not merely popular.";
  }

  if (type === "auteur") {
    return "Distinctive filmmaking, strong ideas and a clear point of view make this a rewarding choice tonight.";
  }

  return "A less obvious discovery with the potential to become the title you recommend to everyone tomorrow.";
}

function rankLocally(heroes, alts, queryLabel, contentMode) {
  const normalizedSelection = normalizeFilterLabel(queryLabel);
  const selectedLabels = normalizedSelection
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);

  const isSciFiSelection = selectedLabels.includes("sci-fi");

  const sortedHeroes = [...heroes]
    .filter(title => title.poster_path)
    .sort((a, b) => titleScore(b) - titleScore(a));

  const hero = sortedHeroes[0] || heroes[0];

  const candidates = [...alts]
    .filter(title => title.poster_path && title.id !== hero?.id)
    .sort((a, b) => titleScore(b) - titleScore(a));

  const selected = [];
  const selectedIds = new Set();

  const isAnimation = title => (title.genre_ids || []).includes(16);
  const isClassic = title =>
    !title.isTV && Number(title.year) > 0 && Number(title.year) < 1990;

  const isAuteurLean = title => {
    const votes = Number(title.vote_count || 0);
    const popularity = Number(title.popularity || 0);
    const rating = Number(title.rating || 0);
    const language = String(title.original_language || "").toLowerCase();

    return (
      rating >= 7.5 &&
      votes >= 60 &&
      votes <= 5000 &&
      popularity < 45 &&
      (language !== "en" || votes < 1800 || popularity < 25)
    );
  };

  const franchisePattern =
    /\b(avengers|batman|clone wars|dc|dragon ball|evangelion|jojo|jujutsu|marvel|overlord|spider-man|star wars|superman|transformers|x-men)\b/i;

  const isFranchise = title =>
    franchisePattern.test(`${title.title || ""} ${title.overview || ""}`);

  const addTitle = (title, {allowSecondAnimation=false, allowThirdFranchise=false} = {}) => {
    if (!title || selected.length >= 6 || selectedIds.has(title.id)) return false;

    const classicCount = selected.filter(isClassic).length;
    const animationCount = selected.filter(isAnimation).length;
    const franchiseCount = selected.filter(isFranchise).length;

    if (isClassic(title) && classicCount >= 1) return false;
    if (isAnimation(title) && animationCount >= (allowSecondAnimation ? 2 : 1)) return false;
    if (isFranchise(title) && franchiseCount >= (allowThirdFranchise ? 3 : 2)) return false;

    selected.push(title);
    selectedIds.add(title.id);
    return true;
  };

  if (isSciFiSelection) {
    const classic = candidates.find(isClassic);

    const auteur = candidates.find(title =>
      title.id !== classic?.id &&
      !isFranchise(title) &&
      isAuteurLean(title)
    );

    const international = candidates.find(title =>
      title.id !== classic?.id &&
      title.id !== auteur?.id &&
      !isFranchise(title) &&
      String(title.original_language || "").toLowerCase() !== "en"
    );

    const series = contentMode !== "movie"
      ? candidates.find(title =>
          title.isTV &&
          title.id !== classic?.id &&
          title.id !== auteur?.id &&
          title.id !== international?.id
        )
      : null;

    const animation = candidates.find(title =>
      isAnimation(title) &&
      title.id !== classic?.id &&
      title.id !== auteur?.id &&
      title.id !== international?.id &&
      title.id !== series?.id
    );

    const mainstreamFilm = candidates.find(title =>
      !title.isTV &&
      !isAnimation(title) &&
      title.id !== classic?.id &&
      title.id !== auteur?.id &&
      title.id !== international?.id &&
      !isFranchise(title)
    ) || candidates.find(title => !title.isTV && !isAnimation(title));

    addTitle(classic);
    addTitle(auteur);
    addTitle(international);
    addTitle(series);
    addTitle(animation);
    addTitle(mainstreamFilm);
  } else if (contentMode === "both") {
    addTitle(candidates.find(title => title.isTV));
  }

  const bucketTargets = {
    mainstream: 2,
    auteur: 2,
    discovery: 2
  };

  for (const [bucket, target] of Object.entries(bucketTargets)) {
    let added = 0;

    for (const title of candidates) {
      if (selected.length >= 6 || added >= target) break;
      if (classifyTitle(title) !== bucket) continue;

      if (addTitle(title)) added += 1;
    }
  }

  for (const title of candidates) {
    if (selected.length >= 6) break;
    addTitle(title, {allowSecondAnimation:true, allowThirdFranchise:true});
  }

  return {
    hero: {
      i: heroes.indexOf(hero),
      whyWatch: whyTonight(hero),
      format: hero?.format || (hero?.isTV ? "TV Series" : "Film"),
      genres: hero?.genres || [],
      rtCritics: Math.round((hero?.rating || 0) * 10),
      rtAudience: Math.max(0, Math.round((hero?.rating || 0) * 10 - 3))
    },
    alts: selected.map(title => ({
      i: alts.indexOf(title),
      whyWatch: whyTonight(title),
      format: title.format || (title.isTV ? "TV Series" : "Film"),
      genres: title.genres || [],
      rtCritics: Math.round((title.rating || 0) * 10),
      rtAudience: Math.max(0, Math.round((title.rating || 0) * 10 - 3))
    }))
  };
}


// ── MY CINÉ ENGINE 2.0 ───────────────────────────────────────────────────────
const RECOMMENDATION_HISTORY_KEY = "mycine-recommendation-history-romcom-db-v3";
const HISTORY_WINDOW_DAYS = 30;
const HERO_HISTORY_WINDOW_DAYS = 60;

function safeReadRecommendationHistory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RECOMMENDATION_HISTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function recommendationSelectionKey(tab, selGenres, selMood, contentMode) {
  const sortedGenres = [...selGenres].sort();
  const selection = tab === "mood"
    ? `mood:${selMood || ""}`
    : `genres:${sortedGenres.join("+")}`;

  const canonVersion =
    tab === "genre" && sortedGenres.includes("romcom")
      ? "|database:romcom-v1"
      : "";

  return `${selection}|format:${contentMode}${canonVersion}`;
}

function recentHistoryIds(selectionKey, days, heroOnly = false) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  return new Set(
    safeReadRecommendationHistory()
      .filter(entry =>
        entry &&
        entry.selectionKey === selectionKey &&
        Number(entry.shownAt || 0) >= cutoff &&
        (!heroOnly || entry.hero)
      )
      .map(entry => `${entry.mediaType || "movie"}-${entry.id}`)
  );
}

function saveRecommendationHistory(selectionKey, titles) {
  const history = safeReadRecommendationHistory();
  const additions = titles
    .filter(Boolean)
    .map((title, index) => ({
      id: title.id,
      mediaType: title.media_type || (title.isTV ? "tv" : "movie"),
      selectionKey,
      shownAt: Date.now(),
      hero: index === 0
    }));

  const merged = [...history, ...additions]
    .filter(entry => Number(entry.shownAt || 0) >= Date.now() - 180 * 24 * 60 * 60 * 1000)
    .slice(-1400);

  localStorage.setItem(RECOMMENDATION_HISTORY_KEY, JSON.stringify(merged));
}

function titleIdentity(title) {
  return `${title.media_type || (title.isTV ? "tv" : "movie")}-${title.id}`;
}

function dedupeTitles(titles) {
  const seen = new Set();

  return titles.filter(title => {
    const key = titleIdentity(title);
    if (!title?.id || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function engineAudienceType(title) {
  const canonType = canonViewerType(title);
  if (canonType) return canonType;

  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);
  const year = Number(title.year || 0);
  const language = String(title.languageCode || title.original_language || "").toLowerCase();
  const country = String(title.countryCode || "").toUpperCase();

  const classic = year > 0 && year < 1990;
  const international = Boolean(language) && language !== "en";
  const auteurLean =
    Number(title.rating || 0) >= 7.5 &&
    votes >= 50 &&
    votes <= 4500 &&
    popularity < 45;

  if (classic || international || auteurLean || title.highlight?.label === "Auteur pick") {
    return "cinephile";
  }

  if (votes >= 2500 || popularity >= 45 || Number(title.revenue || 0) >= 75000000) {
    return "casual";
  }

  if (country && country !== "US" && votes < 2500) {
    return "cinephile";
  }

  return "specialist";
}

function engineScore(title, selectedLabels, preferredType = null) {
  const rating = Number(title.rating || 0);
  const votes = Number(title.vote_count || 0);
  const popularity = Number(title.popularity || 0);
  const year = Number(title.year || 0);
  const audienceType = engineAudienceType(title);
  const genreText = (title.genres || []).join(" ").toLowerCase();
  const keywordText = (title.keywords || []).join(" ").toLowerCase();
  const overview = String(title.overview || "").toLowerCase();
  const selectionText = selectedLabels.join(" ");

  let relevance = 0;
  selectedLabels.forEach(label => {
    const words = label.split(/\s+/).filter(Boolean);
    const haystack = `${genreText} ${keywordText} ${overview}`;
    const matches = words.filter(word => haystack.includes(word)).length;
    relevance += Math.min(18, matches * 7);
  });

  if (selectionText.includes("sci-fi") && /science fiction|space|future|robot|alien|time travel/.test(`${genreText} ${keywordText} ${overview}`)) relevance += 24;
  if (selectionText.includes("romance") && /romance|love story|relationship/.test(`${genreText} ${keywordText} ${overview}`)) relevance += 24;
  if (selectionText.includes("horror") && /horror|ghost|demon|slasher|zombie|haunted/.test(`${genreText} ${keywordText} ${overview}`)) relevance += 24;
  if (selectionText.includes("comedy") && genreText.includes("comedy")) relevance += 24;

  const ratingPoints = Math.max(0, rating - 7.5) * 22;
  const confidencePoints = Math.min(22, Math.log10(Math.max(votes, 10)) * 6);
  const popularityPoints = Math.min(12, popularity * 0.12);
  const freshnessPoints = year >= CURRENT_YEAR - 2 ? 5 : 0;
  const profilePoints = preferredType && audienceType === preferredType ? 18 : 0;

  return relevance + ratingPoints + confidencePoints + popularityPoints + freshnessPoints + profilePoints;
}

function isKoreanTitle(title) {
  return String(title.countryCode || "").toUpperCase() === "KR" ||
    String(title.languageCode || title.original_language || "").toLowerCase() === "ko";
}

function canAddForDiversity(title, selected, {
  contentMode,
  targetMovies,
  targetTV,
  allowExtraCountry = false,
  allowExtraLanguage = false,
  allowSecondKoreanTV = false
}) {
  if (!title) return false;

  const mediaType = title.media_type || (title.isTV ? "tv" : "movie");
  const movieCount = selected.filter(item => !item.isTV).length;
  const tvCount = selected.filter(item => item.isTV).length;

  if (contentMode === "both") {
    if (mediaType === "movie" && movieCount >= targetMovies) return false;
    if (mediaType === "tv" && tvCount >= targetTV) return false;
  }

  const country = String(title.countryCode || "").toUpperCase();
  if (country) {
    const countryCount = selected.filter(item => String(item.countryCode || "").toUpperCase() === country).length;
    if (countryCount >= (allowExtraCountry ? 3 : 2)) return false;
  }

  const language = String(title.languageCode || title.original_language || "").toLowerCase();
  if (language && language !== "en") {
    const languageCount = selected.filter(item =>
      String(item.languageCode || item.original_language || "").toLowerCase() === language
    ).length;
    if (languageCount >= (allowExtraLanguage ? 3 : 2)) return false;
  }

  if (title.isTV && isKoreanTitle(title) && !allowSecondKoreanTV) {
    const koreanTVCount = selected.filter(item => item.isTV && isKoreanTitle(item)).length;
    if (koreanTVCount >= 1) return false;
  }

  return true;
}


function isEastAsianTitle(title) {
  return ["KR","JP","CN","TW","HK"].includes(
    String(title.countryCode || title.canon?.country || "").toUpperCase()
  ) || ["ko","ja","zh"].includes(
    String(title.languageCode || title.original_language || title.canon?.language || "").toLowerCase()
  );
}

function canonRoleMatch(title, role) {
  const roles = title.canon?.roles || [];

  if (roles.includes(role)) return true;
  if (role === "crowd-favorite") {
    return title.canonTier === "essential" ||
      engineAudienceType(title) === "casual";
  }
  if (role === "classic-choice") {
    return Number(title.year || 0) < 1990;
  }
  if (role === "passport-pick") {
    return String(title.original_language || "").toLowerCase() !== "en";
  }
  if (role === "hidden-gem") {
    return title.canonTier === "outstanding" ||
      Number(title.vote_count || 0) < 4000;
  }
  if (role === "critics-choice") {
    return title.canonTier === "masterpiece" ||
      engineAudienceType(title) === "cinephile";
  }
  if (role === "curators-surprise") {
    return roles.includes("curators-surprise") ||
      title.canonTier === "outstanding";
  }

  return false;
}

function assembleRomcomDatabaseBatch(
  hero,
  candidates,
  contentMode,
  batchNumber
) {
  const selected = [];
  const used = new Set([titleIdentity(hero)]);

  const targetMovies = contentMode === "both"
    ? (batchNumber % 2 === 0 ? 3 : 4)
    : contentMode === "movie" ? 7 : 0;
  const targetTV = contentMode === "both"
    ? 7 - targetMovies
    : contentMode === "tv" ? 7 : 0;

  const rolePlan = [
    ["crowd-favorite","casual"],
    ["classic-choice","cinephile"],
    ["passport-pick","specialist"],
    ["hidden-gem","specialist"],
    ["critics-choice","cinephile"],
    ["curators-surprise","casual"]
  ];

  const countryCount = new Map();
  const decadeCount = new Map();
  let classicCount = Number(hero.year || 0) < 1990 ? 1 : 0;
  let eastAsianCount = isEastAsianTitle(hero) ? 1 : 0;

  const selectedMovieCount = () =>
    selected.filter(title => !title.isTV).length + (hero.isTV ? 0 : 1);
  const selectedTVCount = () =>
    selected.filter(title => title.isTV).length + (hero.isTV ? 1 : 0);

  const register = title => {
    const country = String(title.countryCode || title.canon?.country || "").toUpperCase();
    const decade = Math.floor(Number(title.year || 0) / 10) * 10;
    if (country) countryCount.set(country, (countryCount.get(country) || 0) + 1);
    if (decade) decadeCount.set(decade, (decadeCount.get(decade) || 0) + 1);
    if (Number(title.year || 0) < 1990) classicCount += 1;
    if (isEastAsianTitle(title)) eastAsianCount += 1;
  };

  const heroCountry = String(hero.countryCode || hero.canon?.country || "").toUpperCase();
  const heroDecade = Math.floor(Number(hero.year || 0) / 10) * 10;
  if (heroCountry) countryCount.set(heroCountry, 1);
  if (heroDecade) decadeCount.set(heroDecade, 1);

  const canAdd = (title, relax = 0) => {
    if (!title || used.has(titleIdentity(title))) return false;

    if (contentMode === "both") {
      if (!title.isTV && selectedMovieCount() >= targetMovies) return false;
      if (title.isTV && selectedTVCount() >= targetTV) return false;
    }

    const country = String(title.countryCode || title.canon?.country || "").toUpperCase();
    const decade = Math.floor(Number(title.year || 0) / 10) * 10;

    if (country && (countryCount.get(country) || 0) >= (relax >= 2 ? 3 : 2)) {
      return false;
    }

    if (decade && (decadeCount.get(decade) || 0) >= (relax >= 2 ? 3 : 2)) {
      return false;
    }

    if (Number(title.year || 0) < 1990 && classicCount >= 2 && relax < 2) {
      return false;
    }

    if (isEastAsianTitle(title) && eastAsianCount >= 1 && relax < 3) {
      return false;
    }

    return true;
  };

  const ranked = [...candidates].sort(
    (a,b) => engineScore(b, ["romcom"]) - engineScore(a, ["romcom"])
  );

  for (const [role, profile] of rolePlan) {
    let chosen = null;

    for (let relax = 0; relax <= 3 && !chosen; relax += 1) {
      chosen = ranked
        .filter(title => canonRoleMatch(title, role))
        .filter(title => engineAudienceType(title) === profile || relax >= 1)
        .find(title => canAdd(title, relax));
    }

    if (!chosen) {
      for (let relax = 0; relax <= 3 && !chosen; relax += 1) {
        chosen = ranked.find(title => canAdd(title, relax));
      }
    }

    if (chosen) {
      chosen.curationRole = role;
      selected.push(chosen);
      used.add(titleIdentity(chosen));
      register(chosen);
    }
  }

  if (selected.length < 6) {
    for (let relax = 0; relax <= 3 && selected.length < 6; relax += 1) {
      for (const title of ranked) {
        if (selected.length >= 6) break;
        if (!canAdd(title, relax)) continue;
        selected.push(title);
        used.add(titleIdentity(title));
        register(title);
      }
    }
  }

  if (selected.length < 6) {
    throw new Error("The Romcom Database could not compose six balanced alternatives.");
  }

  return selected.slice(0,6);
}

function assembleEngineBatch(hero, candidates, selectedLabels, contentMode, batchNumber) {
  const remainingSlots = 6;
  const selected = [];
  const used = new Set([titleIdentity(hero)]);

  const targetMovies = contentMode === "both"
    ? (batchNumber % 2 === 0 ? 3 : 4)
    : contentMode === "movie" ? 7 : 0;

  const targetTV = contentMode === "both"
    ? 7 - targetMovies
    : contentMode === "tv" ? 7 : 0;

  const heroMovies = hero.isTV ? 0 : 1;
  const heroTV = hero.isTV ? 1 : 0;

  const altTargetMovies = Math.max(0, targetMovies - heroMovies);
  const altTargetTV = Math.max(0, targetTV - heroTV);

  const sortedByProfile = profile =>
    [...candidates]
      .filter(title => engineAudienceType(title) === profile)
      .sort((a, b) => engineScore(b, selectedLabels, profile) - engineScore(a, selectedLabels, profile));

  const profiles = [
    ["casual", 2],
    ["specialist", 2],
    ["cinephile", 2]
  ];

  const tryAdd = (title, relax = 0) => {
    if (!title || selected.length >= remainingSlots || used.has(titleIdentity(title))) return false;

    const allowed = canAddForDiversity(title, selected, {
      contentMode,
      targetMovies: altTargetMovies,
      targetTV: altTargetTV,
      allowExtraCountry: relax >= 1,
      allowExtraLanguage: relax >= 2,
      allowSecondKoreanTV: relax >= 3
    });

    if (!allowed) return false;

    selected.push(title);
    used.add(titleIdentity(title));
    return true;
  };

  profiles.forEach(([profile, target]) => {
    let added = 0;
    for (const title of sortedByProfile(profile)) {
      if (added >= target || selected.length >= remainingSlots) break;
      if (tryAdd(title, 0)) {
        title.curationRole = profile;
        added += 1;
      }
    }
  });

  const allSorted = [...candidates].sort(
    (a, b) => engineScore(b, selectedLabels) - engineScore(a, selectedLabels)
  );

  for (let relax = 0; relax <= 3 && selected.length < remainingSlots; relax += 1) {
    for (const title of allSorted) {
      if (selected.length >= remainingSlots) break;
      tryAdd(title, relax);
    }
  }

  // Final safety net: preserve the 75% floor and relevance, but do not return
  // zero merely because the ideal diversity distribution was unavailable.
  if (selected.length < remainingSlots) {
    for (const title of allSorted) {
      if (selected.length >= remainingSlots) break;
      if (!title || used.has(titleIdentity(title))) continue;

      selected.push(title);
      used.add(titleIdentity(title));
    }
  }

  if (selected.length < remainingSlots) {
    throw new Error(
      `Only ${selected.length + 1} qualified titles remained after the live TMDB checks.`
    );
  }

  const cinephileOrSpecialist = selected
    .filter(title => ["cinephile", "specialist"].includes(engineAudienceType(title)))
    .sort((a, b) => engineScore(b, selectedLabels) - engineScore(a, selectedLabels))[0];

  if (cinephileOrSpecialist) {
    cinephileOrSpecialist.curatorSurprise = true;
  }

  return selected.slice(0, remainingSlots);
}


const CANON_TMDB_CACHE_KEY = "mycine-romcom-database-cache-v1";

function readCanonTmdbCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CANON_TMDB_CACHE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeCanonTmdbCache(cache) {
  localStorage.setItem(CANON_TMDB_CACHE_KEY, JSON.stringify(cache));
}

async function fetchCanonTitleCandidate(entry, token) {
  const cache = readCanonTmdbCache();
  const cacheKey = entry.key;

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const endpoint = entry.type === "tv" ? "tv" : "movie";
  const params = new URLSearchParams({
    query: entry.title,
    language: "en-US",
    include_adult: "false",
    page: "1"
  });

  if (entry.type !== "tv") {
    params.set("year", String(entry.year));
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/${endpoint}?${params.toString()}`,
    {
      headers:{
        Authorization:`Bearer ${token}`,
        accept:"application/json"
      }
    }
  );

  if (!response.ok) return null;

  const data = await response.json();
  const exact = (data.results || []).find(item => {
    const itemTitle = entry.type === "tv" ? item.name : item.title;
    const itemYear = String(
      (entry.type === "tv" ? item.first_air_date : item.release_date) || ""
    ).slice(0,4);

    return normalizeFilterLabel(itemTitle) === normalizeFilterLabel(entry.title) &&
      (!itemYear || Number(itemYear) === Number(entry.year));
  }) || (data.results || [])[0];

  if (!exact) return null;

  const candidate = {
    ...exact,
    media_type:endpoint
  };

  cache[cacheKey] = candidate;
  writeCanonTmdbCache(cache);

  return candidate;
}

async function fetchCanonCandidates(genre, contentMode, excludeIds = []) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) return [];

  const excluded = new Set(excludeIds.map(String));
  const entries = getCanonEntriesForGenre(genre)
    .filter(entry =>
      contentMode === "both" ||
      (contentMode === "movie" && entry.type === "movie") ||
      (contentMode === "tv" && entry.type === "tv")
    );

  const resolved = await mapWithConcurrency(
    entries,
    entry => fetchCanonTitleCandidate(entry, token),
    5
  );

  return dedupeTitles(
    resolved
      .filter(Boolean)
      .filter(item => !excluded.has(String(item.id)))
  );
}


async function fetchNewArrivalCandidates(genre, contentMode, excludeIds = []) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) return [];

  const excluded = new Set(excludeIds.map(String));
  const entries = getNewArrivalsForGenre(genre, contentMode);

  const resolved = await mapWithConcurrency(
    entries,
    async entry => {
      const candidate = await fetchCanonTitleCandidate({
        ...entry,
        key:`arrival:${entry.title}|${entry.year}`
      }, token);

      if (!candidate) return null;

      return {
        ...candidate,
        myCineArrival:{
          status:entry.status,
          priority:Number(entry.priority || 0),
          marketEvidence:entry.marketEvidence,
          editorialNote:entry.editorialNote
        }
      };
    },
    4
  );

  return dedupeTitles(
    resolved
      .filter(Boolean)
      .filter(item => !excluded.has(String(item.id)))
  );
}


const ENRICHED_TITLE_CACHE_KEY = "mycine-enriched-title-cache-v1";
const ENRICHED_TITLE_CACHE_TTL = 24 * 60 * 60 * 1000;

function readEnrichedTitleCache() {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(ENRICHED_TITLE_CACHE_KEY) || "{}"
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function enrichedTitleCacheKey(title, watchRegion) {
  return [
    title.media_type || (title.isTV ? "tv" : "movie"),
    title.id,
    watchRegion
  ].join(":");
}

function getCachedEnrichedTitle(title, watchRegion) {
  const cache = readEnrichedTitleCache();
  const key = enrichedTitleCacheKey(title, watchRegion);
  const entry = cache[key];

  if (
    !entry ||
    Date.now() - Number(entry.cachedAt || 0) > ENRICHED_TITLE_CACHE_TTL
  ) {
    return null;
  }

  return entry.value || null;
}

function saveCachedEnrichedTitle(title, watchRegion, value) {
  const cache = readEnrichedTitleCache();
  const key = enrichedTitleCacheKey(title, watchRegion);

  cache[key] = {
    cachedAt:Date.now(),
    value
  };

  const trimmed = Object.fromEntries(
    Object.entries(cache)
      .sort((a,b) => Number(b[1]?.cachedAt || 0) - Number(a[1]?.cachedAt || 0))
      .slice(0, 500)
  );

  localStorage.setItem(
    ENRICHED_TITLE_CACHE_KEY,
    JSON.stringify(trimmed)
  );
}


const ROMCOM_SESSION_ROTATION_KEY = "mycine-romcom-session-rotation-v1";

function readRomcomRotation() {
  try {
    const parsed = JSON.parse(
      sessionStorage.getItem(ROMCOM_SESSION_ROTATION_KEY) || "{}"
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeRomcomRotation(value) {
  sessionStorage.setItem(
    ROMCOM_SESSION_ROTATION_KEY,
    JSON.stringify(value)
  );
}

function romcomRotationIndex(selectionKey) {
  const rotation = readRomcomRotation();
  return Number(rotation[selectionKey] || 0);
}

function advanceRomcomRotation(selectionKey) {
  const rotation = readRomcomRotation();
  rotation[selectionKey] = Number(rotation[selectionKey] || 0) + 1;
  writeRomcomRotation(rotation);
}

function resetRomcomRotation(selectionKey) {
  const rotation = readRomcomRotation();
  rotation[selectionKey] = 0;
  writeRomcomRotation(rotation);
}

function rotateCandidates(titles, offset) {
  if (!titles.length) return [];

  const normalizedOffset =
    ((Number(offset || 0) % titles.length) + titles.length) % titles.length;

  return [
    ...titles.slice(normalizedOffset),
    ...titles.slice(0, normalizedOffset)
  ];
}

// ── TMDB LIVE FETCH ──────────────────────────────────────────────────────────
// Pull fresh candidates matching the selected genre or mood.

function normalizeFilterLabel(label = "") {
  return String(label)
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}&/+\-\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

async function fetchTMDBTitles(queryLabel, watchRegion, contentMode) {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  if (!TOKEN) {
    throw new Error("TMDB token is missing");
  }

  const MOVIE_FILTERS = {
    romcom: "10749|35", comedy: "35", romance: "10749", drama: "18",
    thriller: "53", mystery: "9648", "action & adventure": "28,12",
    horror: "27", "sci-fi": "878", fantasy: "14", animation: "16",
    musical: "10402", "true stories / biopic": "18,36", documentary: "99",
    "mind blown": "878,9648,53", "make me laugh": "35", "date night": "10749,35",
    "travel somewhere": "12", "ugly cry": "18,10749", "adrenaline rush": "28,53",
    "family night": "10751,16", "inspire me": "18,36", "luxury vibes": "18,10749"
  };

  const TV_FILTERS = {
    romcom: "35|18", comedy: "35", romance: "18", drama: "18",
    thriller: "9648,10759", mystery: "9648", "action & adventure": "10759",
    horror: "9648", "sci-fi": "10765", fantasy: "10765", animation: "16",
    musical: "18", "true stories / biopic": "18", documentary: "99",
    "mind blown": "10765,9648", "make me laugh": "35", "date night": "35,18",
    "travel somewhere": "10759", "ugly cry": "18", "adrenaline rush": "10759",
    "family night": "10751,16", "inspire me": "18", "luxury vibes": "18"
  };

  const labels = String(queryLabel || "")
    .split(",")
    .map(normalizeFilterLabel)
    .filter(Boolean);

  const genreIdsFor = mediaType => {
    const filters = mediaType === "tv" ? TV_FILTERS : MOVIE_FILTERS;
    return labels.map(label => filters[label]).filter(Boolean).join(",");
  };

  const textMatches = (value, pattern) => pattern.test(value);

  const matchesLabel = (label, item, mediaType) => {
    const genreIds = new Set(item.genre_ids || []);
    const titleText = `${item.name || item.title || ""} ${item.overview || ""}`.toLowerCase();
    const isMovie = mediaType === "movie";
    const originalLanguage = String(item.original_language || "").toLowerCase();
    const popularity = Number(item.popularity || 0);
    const votes = Number(item.vote_count || 0);

    const romanceWords = /\b(love|romance|romantic|couple|marriage|wedding|dating|boyfriend|girlfriend|soulmate|bride|groom|first love|fall in love|love story)\b/i;
    const sciFiWords = /\b(alien|android|artificial intelligence|astronaut|clone|cyber|cyborg|dystopi|experiment|extraterrestrial|future|galaxy|genetic|interstellar|mars|moon|parallel universe|planet|robot|science|space|spaceship|technology|time travel|virtual reality)\b/i;
    const fantasyWords = /\b(curse|demon|dragon|fairy|fantasy|god|goddess|immortal|kingdom|magic|myth|prophecy|sorcer|spell|spirit|supernatural|vampire|werewolf|witch|wizard)\b/i;
    const horrorWords = /\b(blood|demonic|evil|ghost|haunted|horror|killer|murder|nightmare|possession|serial killer|slasher|survival|terror|undead|zombie)\b/i;
    const thrillerWords = /\b(conspiracy|danger|detective|hostage|investigation|kidnap|manhunt|murder|pursuit|secret agent|serial killer|spy|suspense|terrorist|thriller)\b/i;
    const musicalWords = /\b(band|concert|dance|dancer|music|musical|singer|singing|song|stage performer)\b/i;
    const trueStoryWords = /\b(based on a true story|biograph|historical figure|real-life|true events|true story)\b/i;
    const travelWords = /\b(adventure|across the world|expedition|foreign country|journey|road trip|travel|voyage)\b/i;
    const emotionalWords = /\b(death|dying|farewell|grief|heartbreak|illness|loss|mourning|terminal|tragedy)\b/i;
    const inspiringWords = /\b(against the odds|courage|dream|fight for|inspir|overcome|pioneer|resilience|survive|triumph)\b/i;
    const luxuryWords = /\b(billionaire|couture|elite|fashion|glamour|high society|hotel|luxury|mansion|palace|privilege|rich|royal|wealth)\b/i;
    const mindBlownWords = /\b(alternate reality|consciousness|dream|memory|mind|paradox|parallel universe|reality|simulation|time loop|time travel|twist)\b/i;

    switch (label) {
      case "romcom":
        return isMovie
          ? genreIds.has(35) && genreIds.has(10749)
          : genreIds.has(35) && textMatches(titleText, romanceWords);
      case "comedy":
      case "make me laugh": return genreIds.has(35);
      case "romance": return isMovie ? genreIds.has(10749) : textMatches(titleText, romanceWords);
      case "drama": return genreIds.has(18);
      case "thriller": return isMovie ? genreIds.has(53) : (genreIds.has(9648) || genreIds.has(10759)) && textMatches(titleText, thrillerWords);
      case "mystery": return genreIds.has(9648);
      case "action & adventure": return isMovie ? genreIds.has(28) || genreIds.has(12) : genreIds.has(10759);
      case "horror": return isMovie ? genreIds.has(27) : textMatches(titleText, horrorWords);
      case "sci-fi": return isMovie ? genreIds.has(878) : genreIds.has(10765) && textMatches(titleText, sciFiWords);
      case "fantasy": return isMovie ? genreIds.has(14) : genreIds.has(10765) && textMatches(titleText, fantasyWords);
      case "animation": return genreIds.has(16);
      case "musical": return isMovie ? genreIds.has(10402) : textMatches(titleText, musicalWords);
      case "true stories / biopic": return genreIds.has(36) || textMatches(titleText, trueStoryWords);
      case "documentary": return genreIds.has(99);
      case "international": return Boolean(originalLanguage) && originalLanguage !== "en";
      case "hidden gems": return Number(item.vote_average || 0) >= 7.5 && votes >= 80 && votes <= 3500 && popularity < 45;
      case "mind blown": return (genreIds.has(878) || genreIds.has(9648) || genreIds.has(53) || genreIds.has(10765)) && textMatches(titleText, mindBlownWords);
      case "date night": return ((isMovie && genreIds.has(10749)) || textMatches(titleText, romanceWords)) && !genreIds.has(27);
      case "travel somewhere": return (genreIds.has(12) || genreIds.has(10759) || originalLanguage !== "en") && textMatches(titleText, travelWords);
      case "ugly cry": return genreIds.has(18) && textMatches(titleText, emotionalWords);
      case "adrenaline rush": return (genreIds.has(28) || genreIds.has(53) || genreIds.has(10759)) && popularity >= 15;
      case "family night": return genreIds.has(10751) || genreIds.has(16);
      case "inspire me": return (genreIds.has(18) || genreIds.has(36) || genreIds.has(99)) && textMatches(titleText, inspiringWords);
      case "luxury vibes": return textMatches(titleText, luxuryWords);
      default: return true;
    }
  };

  const titleFitsSelection = (item, mediaType) => {
    if (Number(item.vote_average || 0) < 7.5) return false;
    return labels.every(label => matchesLabel(label, item, mediaType));
  };

  const requestDiscover = async ({
    mediaType,
    year = null,
    page = 1,
    minimumVotes = 75,
    maximumVotes = null,
    dateLte = null,
    dateGte = null,
    sortBy = "vote_average.desc"
  }) => {
    const params = new URLSearchParams({
      language: "en-US",
      sort_by: sortBy,
      include_adult: "false",
      "vote_average.gte": "7.5",
      "vote_count.gte": String(minimumVotes),
      watch_region: watchRegion,
      with_watch_monetization_types: "flatrate|free|ads",
      page: String(page)
    });

    const genreIds = genreIdsFor(mediaType);
    if (genreIds) params.set("with_genres", genreIds);
    if (maximumVotes) params.set("vote_count.lte", String(maximumVotes));

    if (year) {
      params.set(mediaType === "tv" ? "first_air_date_year" : "primary_release_year", String(year));
    }
    if (dateLte) {
      params.set(mediaType === "tv" ? "first_air_date.lte" : "primary_release_date.lte", dateLte);
    }
    if (dateGte) {
      params.set(mediaType === "tv" ? "first_air_date.gte" : "primary_release_date.gte", dateGte);
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB ${mediaType} request failed: ${response.status}`);
    }

    const data = await response.json();

    return (data.results || [])
      .filter(item =>
        item.poster_path &&
        item.overview &&
        (mediaType === "tv" ? item.first_air_date : item.release_date) &&
        titleFitsSelection(item, mediaType)
      )
      .map(item => ({...item, media_type: mediaType}));
  };

  const mediaTypes = contentMode === "both" ? ["movie", "tv"] : [contentMode];

  const heroCurrentRequests = mediaTypes.flatMap(mediaType =>
    [1, 2, 3, 4].map(page =>
      requestDiscover({
        mediaType,
        year: CURRENT_YEAR,
        page,
        minimumVotes: mediaType === "tv" ? 5 : 8,
        sortBy: page % 2 === 0 ? "popularity.desc" : "vote_average.desc"
      })
    )
  );

  const heroPreviousRequests = mediaTypes.flatMap(mediaType =>
    [1, 2, 3, 4, 5].map(page =>
      requestDiscover({
        mediaType,
        year: CURRENT_YEAR - 1,
        page,
        minimumVotes: mediaType === "tv" ? 10 : 15,
        sortBy: page % 2 === 0 ? "popularity.desc" : "vote_average.desc"
      })
    )
  );

  const altRequests = mediaTypes.flatMap(mediaType => {
    const requests = [];
    for (let page = 1; page <= 10; page += 1) {
      requests.push(
        requestDiscover({
          mediaType,
          page,
          minimumVotes: mediaType === "tv" ? 50 : 75,
          sortBy: page % 2 === 0 ? "popularity.desc" : "vote_average.desc"
        })
      );
    }

    requests.push(
      requestDiscover({
        mediaType,
        page: 1,
        minimumVotes: 50,
        maximumVotes: 3500,
        sortBy: "vote_average.desc"
      })
    );

    requests.push(
      requestDiscover({
        mediaType,
        page: 1,
        minimumVotes: 75,
        dateLte: "1989-12-31",
        sortBy: "vote_average.desc"
      })
    );

    return requests;
  });

  const [currentGroups, previousGroups, altGroups] = await Promise.all([
    Promise.all(heroCurrentRequests),
    Promise.all(heroPreviousRequests),
    Promise.all(altRequests)
  ]);

  return {
    currentHeroTitles: dedupeTitles(currentGroups.flat()),
    previousHeroTitles: dedupeTitles(previousGroups.flat()),
    altTitles: dedupeTitles(altGroups.flat())
  };
}
// ── MAIN PIPELINE ─────────────────────────────────────────────────────────────
async function fetchTitleDetails(title) {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const mediaType = title.media_type || (title.isTV ? "tv" : "movie");

  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${title.id}?append_to_response=credits,keywords`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB details failed: ${response.status}`);
  }

  const details = await response.json();

  const director =
    mediaType === "movie"
      ? details.credits?.crew?.find(person => person.job === "Director")?.name || ""
      : details.created_by?.[0]?.name || "";

  const runtime =
    mediaType === "movie"
      ? details.runtime || null
      : details.episode_run_time?.[0] || details.last_episode_to_air?.runtime || null;

  const countryCode =
    mediaType === "movie"
      ? details.production_countries?.[0]?.iso_3166_1 || ""
      : details.origin_country?.[0] || "";

  const format =
    mediaType === "movie"
      ? "Film"
      : details.number_of_seasons === 1 ||
        String(details.type || "").toLowerCase().includes("mini")
        ? "Limited Series"
        : "TV Series";

  const keywordItems =
    details.keywords?.keywords ||
    details.keywords?.results ||
    [];

  return {
    ...title,
    genres: (details.genres || []).slice(0, 3).map(genre => genre.name),
    keywords: keywordItems.map(keyword => keyword.name).filter(Boolean),
    director,
    runtime,
    countryCode,
    languageCode: details.original_language || title.original_language || "",
    revenue: details.revenue || 0,
    seasons: details.number_of_seasons || null,
    format,
    isTV: mediaType === "tv",
    media_type: mediaType
  };
}

function passesDetailedIntent(title, selectedLabels) {
  const labels = selectedLabels.map(normalizeFilterLabel);

  for (const label of labels) {
    if (isEditoriallyExcluded(title.title, title.year, label)) {
      return false;
    }
  }

  if (
    labels.length === 1 &&
    isCanonApprovedFor(title.title, title.year, labels[0])
  ) {
    return true;
  }
  const genreNames = new Set((title.genres || []).map(genre => genre.toLowerCase()));
  const keywordText = (title.keywords || []).join(" ").toLowerCase();
  const titleText = `${title.title || ""} ${title.overview || ""}`.toLowerCase();

  const romcomRequested = labels.includes("romcom");

  const romanceRequested = labels.some(label =>
    ["romance", "date night"].includes(label)
  );

  const comedyRequested = labels.some(label =>
    ["comedy", "make me laugh"].includes(label)
  );

  const strongRomanceKeyword =
    /\b(romance|romantic comedy|love story|first love|romantic relationship|teen romance|lgbtq romance|marriage|wedding|dating)\b/i
      .test(keywordText);

  const romanceMatches = titleText.match(
    /\b(love|romance|romantic|couple|marriage|wedding|dating|boyfriend|girlfriend|soulmate|bride|groom|first love|fall in love|love story|relationship)\b/gi
  ) || [];

  const uniqueRomanceSignals = new Set(
    romanceMatches.map(value => value.toLowerCase())
  );

  const romanticTitle =
    /\b(love|heart|romance|wedding|dating|bride|groom|marry|married)\b/i
      .test(title.title || "");

  const hasStrongRomance =
    genreNames.has("romance") ||
    strongRomanceKeyword ||
    romanticTitle ||
    uniqueRomanceSignals.size >= 2;

  if (romcomRequested) {
    if (!genreNames.has("comedy")) {
      return false;
    }

    if (!title.isTV && !genreNames.has("romance")) {
      return false;
    }

    if (title.isTV && !hasStrongRomance) {
      return false;
    }
  }

  if (romanceRequested) {
    if (!title.isTV && !genreNames.has("romance")) {
      return false;
    }

    if (title.isTV && !hasStrongRomance) {
      return false;
    }
  }

  if (comedyRequested && !genreNames.has("comedy")) {
    return false;
  }

  return true;
}

function buildHighlight(title) {
  const famousDirectors = new Set([
    "Pedro Almodóvar", "Denis Villeneuve", "Guillermo del Toro",
    "Christopher Nolan", "Greta Gerwig", "Martin Scorsese",
    "Steven Spielberg", "Wes Anderson", "Sofia Coppola",
    "Bong Joon Ho", "Alfonso Cuarón", "Jane Campion",
    "Yorgos Lanthimos", "Paolo Sorrentino", "Céline Sciamma"
  ]);

  if (title.isTV && title.format === "Limited Series") {
    return {
      icon:"📺",
      label:"Binge-worthy",
      text:"A complete limited series made for one satisfying watch."
    };
  }

  if (title.revenue >= 100_000_000) {
    return {
      icon:"💰",
      label:"Box-office success",
      text:"A major theatrical success with genuine audience momentum."
    };
  }

  if (title.director && famousDirectors.has(title.director)) {
    return {
      icon:"🎬",
      label:"Famous filmmaker",
      text:`Directed by ${title.director}.`
    };
  }

  if (title.popularity >= 55) {
    return {
      icon:"🔥",
      label:"Trending",
      text:"One of the most talked-about titles available in your region."
    };
  }

  if (title.rating >= 8 && title.vote_count >= 1000) {
    return {
      icon:"⭐",
      label:"People’s favorite",
      text:"Exceptional audience enthusiasm makes this an unusually safe bet."
    };
  }

  if (classifyTitle(title) === "auteur") {
    return {
      icon:"🏆",
      label:"Auteur pick",
      text:"A distinctive filmmaker’s vision with strong critical appeal."
    };
  }

  return {
    icon:"💎",
    label:"Hidden discovery",
    text:"The less obvious choice that could become tonight’s best surprise."
  };
}


async function mapWithConcurrency(items, worker, concurrency = 5) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runWorker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;

      try {
        results[index] = await worker(items[index], index);
      } catch (error) {
        console.warn("My Ciné candidate skipped:", error);
        results[index] = null;
      }
    }
  }

  await Promise.all(
    Array.from(
      {length: Math.min(concurrency, Math.max(1, items.length))},
      () => runWorker()
    )
  );

  return results;
}


async function buildPrebuiltRomcomBatch(
  watchRegion,
  batchNumber = 1
) {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) {
    throw new Error("TMDB token is required to enrich the prepared Romcom batch.");
  }

  const safeIndex = Math.max(
    0,
    Math.min(ROMCOM_EDITORIAL_BATCHES.length - 1, Number(batchNumber || 1) - 1)
  );
  const editorialBatch = ROMCOM_EDITORIAL_BATCHES[safeIndex];

  if (!editorialBatch || editorialBatch.length !== 7) {
    throw new Error(`Prepared Romcom batch ${safeIndex + 1} is incomplete.`);
  }

  const enrichPreparedTitle = async editorial => {
    const entry = {
      ...editorial,
      key:`prepared-romcom:${editorial.title}|${editorial.year}`
    };

    const candidate = await fetchCanonTitleCandidate(entry, token);
    if (!candidate) {
      throw new Error(`${editorial.title} could not be matched on TMDB.`);
    }

    const normalized = {
      ...candidate,
      title:candidate.title || candidate.name || editorial.title,
      year:String(
        candidate.release_date || candidate.first_air_date || editorial.year
      ).slice(0,4),
      media_type:"movie",
      isTV:false,
      format:"Film",
      rating:Number(candidate.vote_average || 0),
      vote_count:Number(candidate.vote_count || 0),
      popularity:Number(candidate.popularity || 0),
      poster_path:candidate.poster_path || null,
      overview:candidate.overview || editorial.curatorNote || "Synopsis unavailable.",
      original_language:candidate.original_language || "",
      genre_ids:candidate.genre_ids || [],
      era:Number(editorial.year) < 1990
        ? "classic"
        : Number(editorial.year) < 2020
          ? "modern"
          : "current"
    };

    const details = await fetchTitleDetails(normalized);
    if (Number(details.rating || 0) < 7.5) {
      throw new Error(
        `${editorial.title} is below the live 75% TMDB standard.`
      );
    }

    let availability = {
      stream:[], free:[], ads:[], rent:[], buy:[], link:null
    };

    try {
      availability = await fetchWatchProviders(
        details.id,
        watchRegion,
        "movie"
      );
    } catch (error) {
      console.warn("Prepared Romcom providers unavailable:", editorial.title, error);
    }

    const providers = [
      ...(availability.stream || []),
      ...(availability.free || []),
      ...(availability.ads || []),
      ...(availability.rent || []),
      ...(availability.buy || [])
    ];

    const providerNames = [...new Set(
      providers
        .map(item => canonicalProviderName(item.provider_name))
        .filter(Boolean)
    )];

    return {
      ...details,
      editorialBatch:safeIndex + 1,
      editorialSlot:editorial.slot,
      roleBadge:editorial.badge,
      canonTier:editorial.tier,
      curatorNote:editorial.curatorNote,
      countryEditorial:editorial.country,
      languageEditorial:editorial.language,
      providerNames,
      provider:providerNames.length
        ? providerNames.slice(0,3).join(" • ")
        : "Check availability",
      watchLink:availability.link ||
        `https://www.themoviedb.org/movie/${details.id}/watch?locale=${watchRegion}`,
      watchRegionCode:watchRegion,
      highlight:{
        icon:editorial.badge.split(" ")[0],
        label:editorial.badge.replace(/^\\S+\\s*/, ""),
        text:editorial.curatorNote
      },
      whyWatch:editorial.curatorNote || details.overview
    };
  };

  const resolved = await mapWithConcurrency(
    editorialBatch,
    enrichPreparedTitle,
    4
  );

  const titles = resolved.filter(Boolean);
  if (titles.length !== 7) {
    throw new Error(
      `Prepared Romcom batch ${safeIndex + 1} could not resolve all seven titles.`
    );
  }

  return {
    hero:titles[0],
    alts:titles.slice(1)
  };
}

async function buildPicks(
  tab,
  selGenres,
  selMood,
  watchRegion,
  contentMode,
  excludeIds = [],
  batchNumber = 1
) {
  const queryLabel = tab === "mood"
    ? (MOODS.find(m => m.id === selMood)?.label || selMood)
    : selGenres
        .map(id => GENRES.find(g => g.id === id)?.label)
        .filter(Boolean)
        .join(", ");

  const selectionKey = recommendationSelectionKey(tab, selGenres, selMood, contentMode);
  const recentIds = recentHistoryIds(selectionKey, HISTORY_WINDOW_DAYS, false);
  const recentHeroIds = recentHistoryIds(selectionKey, HERO_HISTORY_WINDOW_DAYS, true);
  const sessionIds = new Set(excludeIds.map(id => String(id)));

  const tmdbResult = await fetchTMDBTitles(queryLabel, watchRegion, contentMode);
  const selectedLabels = String(queryLabel || "")
    .split(",")
    .map(normalizeFilterLabel)
    .filter(Boolean);

  const canonCandidates = selectedLabels.includes("romcom")
    ? await fetchCanonCandidates("romcom", contentMode, excludeIds)
    : [];

  const editorialNewArrivals = selectedLabels.includes("romcom")
    ? await fetchNewArrivalCandidates("romcom", contentMode, excludeIds)
    : [];

  const normalizeTitle = item => {
    const isTV = item.media_type === "tv";
    const date = isTV ? item.first_air_date : item.release_date;
    const year = (date || "").slice(0, 4);
    const numericYear = Number(year);

    return {
      id: item.id,
      title: isTV ? item.name : item.title,
      year,
      poster_path: item.poster_path,
      provider: "Where to Watch",
      rating: Number(item.vote_average || 0),
      vote_count: Number(item.vote_count || 0),
      popularity: Number(item.popularity || 0),
      overview: item.overview || "Synopsis unavailable.",
      original_language: item.original_language || "",
      genre_ids: item.genre_ids || [],
      media_type: item.media_type,
      isTV,
      format: isTV ? "TV Series" : "Film",
      era: numericYear < 1990 ? "classic" : numericYear < 2020 ? "modern" : "current",
      myCineArrival:item.myCineArrival || null
    };
  };

  const notShownInSession = title => !sessionIds.has(String(title.id));
  const notRecentlyShown = title => !recentIds.has(titleIdentity(title));
  const notRecentHero = title => !recentHeroIds.has(titleIdentity(title));

  const rawHeroPool = selectedLabels.includes("romcom")
    ? editorialNewArrivals
    : [
        ...(tmdbResult.currentHeroTitles || []),
        ...(tmdbResult.previousHeroTitles || [])
      ];

  const normalizedHeroPool = rawHeroPool
    .map(normalizeTitle)
    .filter(title =>
      title.rating >= 7.5 &&
      notShownInSession(title) &&
      notRecentHero(title)
    );

  const currentHeroes = normalizedHeroPool
    .filter(title => Number(title.year) === CURRENT_YEAR);

  const previousHeroes = normalizedHeroPool
    .filter(title => Number(title.year) === CURRENT_YEAR - 1);

  let heroCandidates = currentHeroes.length
    ? currentHeroes
    : previousHeroes.length
      ? previousHeroes
      : normalizedHeroPool
          .filter(title => Number(title.year) === CURRENT_YEAR - 2);

  if (!heroCandidates.length && !selectedLabels.includes("romcom")) {
    heroCandidates = (tmdbResult.currentHeroTitles || [])
      .map(normalizeTitle)
      .filter(title => title.rating >= 7.5 && notShownInSession(title));

    if (!heroCandidates.length) {
      heroCandidates = (tmdbResult.previousHeroTitles || [])
        .map(normalizeTitle)
        .filter(title => title.rating >= 7.5 && notShownInSession(title));
    }
  }

  const rawAlternativePool = selectedLabels.includes("romcom")
    ? canonCandidates
    : (tmdbResult.altTitles || []);

  const normalizedAlternativePool = rawAlternativePool
    .map(normalizeTitle)
    .filter(title => title.rating >= 7.5 && notShownInSession(title));

  let altCandidates = normalizedAlternativePool
    .filter(notRecentlyShown);

  // Recovery ladder:
  // 1. Prefer the 30-day history cooldown.
  // 2. If the pool is too small, relax only old cross-session history.
  // 3. Current-session exclusions remain absolute.
  if (selectedLabels.includes("romcom") && altCandidates.length < 18) {
    altCandidates = normalizedAlternativePool;
  }

  if (!selectedLabels.includes("romcom") && altCandidates.length < 28) {
    altCandidates = normalizedAlternativePool;
  }

  // An empty recent hero pool is allowed.
  // The final hero selector will fall back to an unused modern Canon title.
  if (altCandidates.length < 6) {
    throw new Error(`The "${queryLabel}" alternative pool needs another refresh.`);
  }

  const preRankedHero = [...heroCandidates]
    .sort((a, b) => {
      const arrivalPriority =
        Number(b.myCineArrival?.priority || 0) -
        Number(a.myCineArrival?.priority || 0);

      return arrivalPriority ||
        engineScore(b, selectedLabels, "casual") -
        engineScore(a, selectedLabels, "casual");
    })
    .slice(0, 24);

  const preRankedAlts = [...altCandidates]
    .sort((a, b) => engineScore(b, selectedLabels) - engineScore(a, selectedLabels))
    .slice(0, selectedLabels.includes("romcom") ? 60 : 48);

  const enrichTitle = async title => {
    const cached = getCachedEnrichedTitle(title, watchRegion);
    if (cached) {
      return applyCanonMetadata({
        ...cached,
        myCineArrival:title.myCineArrival || cached.myCineArrival || null
      });
    }

    let details;

    try {
      details = await fetchTitleDetails(title);
    } catch (error) {
      console.warn("TMDB detail request failed for", title.title, error);
      return null;
    }

    if (Number(details.rating || 0) < 7.5) return null;
    if (!passesDetailedIntent(details, selectedLabels)) return null;

    let availability = {
      stream: [],
      free: [],
      ads: [],
      rent: [],
      buy: [],
      link: null
    };

    try {
      availability = await fetchWatchProviders(
        title.id,
        watchRegion,
        title.media_type
      );
    } catch (error) {
      console.warn("Watch providers unavailable for", title.title, error);
    }

    const providers = [
      ...(availability.stream || []),
      ...(availability.free || []),
      ...(availability.ads || []),
      ...(availability.rent || []),
      ...(availability.buy || [])
    ];

    const providerNames = [...new Set(
      providers
        .map(item => canonicalProviderName(item.provider_name))
        .filter(Boolean)
    )];

    const tmdbWatchFallback =
      `https://www.themoviedb.org/${title.media_type}/${title.id}/watch?locale=${watchRegion}`;

    const enriched = {
      ...details,
      providerNames,
      provider: providerNames.length
        ? providerNames.slice(0, 3).join(" • ")
        : "Check availability",
      watchLink: availability.link || tmdbWatchFallback,
      watchRegionCode: watchRegion
    };

    const canonEnriched = applyCanonMetadata({
      ...enriched,
      highlight: buildHighlight(enriched),
      whyWatch: enriched.overview
    });

    if (
      canonEnriched.canon &&
      Number(canonEnriched.year) < CURRENT_YEAR - 1
    ) {
      canonEnriched.highlight = {
        icon:"🍿",
        label:"My Ciné favorite",
        text:"A trusted romantic-comedy choice selected from the My Ciné Canon."
      };
    }

    saveCachedEnrichedTitle(title, watchRegion, canonEnriched);
    return canonEnriched;
  };

  const enrichedHeroes = preRankedHero.length
    ? (
        await mapWithConcurrency(preRankedHero, enrichTitle, 4)
      ).filter(Boolean)
    : [];

  const enrichedAlts = (
    await mapWithConcurrency(
      preRankedAlts,
      enrichTitle,
      selectedLabels.includes("romcom") ? 4 : 5
    )
  ).filter(Boolean);

  const isConfidentRecentHero = title => {
    const votes = Number(title.vote_count || 0);
    const hasConfirmedProvider = Array.isArray(title.providerNames) &&
      title.providerNames.length > 0;
    const status = String(title.myCineArrival?.status || "").toLowerCase();

    const minimumVotes = status === "approved" ? 15 : 40;

    return votes >= minimumVotes && hasConfirmedProvider;
  };

  const rankRecentHeroes = titles =>
    [...titles].sort((a, b) => {
      const editorialPriority =
        Number(b.myCineArrival?.priority || 0) -
        Number(a.myCineArrival?.priority || 0);

      return editorialPriority ||
        engineScore(b, selectedLabels, "casual") -
        engineScore(a, selectedLabels, "casual");
    });

  const rankedCurrentHeroes = rankRecentHeroes(
    enrichedHeroes.filter(title =>
      Number(title.year) === CURRENT_YEAR &&
      isConfidentRecentHero(title)
    )
  );

  const rankedPreviousHeroes = rankRecentHeroes(
    enrichedHeroes.filter(title =>
      Number(title.year) === CURRENT_YEAR - 1 &&
      isConfidentRecentHero(title)
    )
  );

  const rankedTwoYearHeroes = rankRecentHeroes(
    enrichedHeroes.filter(title =>
      Number(title.year) === CURRENT_YEAR - 2 &&
      isConfidentRecentHero(title)
    )
  );

  const canonAlternativeCandidates = dedupeTitles(enrichedAlts)
    .filter(title =>
      !selectedLabels.includes("romcom") ||
      isCanonApprovedFor(title.title, title.year, "romcom")
    );

  const rankedModernCanonHeroes = canonAlternativeCandidates
    .filter(title => Number(title.year) >= 2010)
    .sort((a, b) =>
      engineScore(b, selectedLabels, "casual") -
      engineScore(a, selectedLabels, "casual")
    );

  const rankedAnyCanonHeroes = [...canonAlternativeCandidates]
    .sort((a, b) =>
      engineScore(b, selectedLabels, "casual") -
      engineScore(a, selectedLabels, "casual")
    );

  // Tonight's Pick hierarchy:
  // 1. Current year
  // 2. Previous year
  // 3. Strongest unused modern Canon title
  // 4. Strongest unused Canon title
  const hero =
    rankedCurrentHeroes[0] ||
    rankedPreviousHeroes[0] ||
    rankedTwoYearHeroes[0] ||
    rankedModernCanonHeroes[0] ||
    rankedAnyCanonHeroes[0] ||
    enrichedHeroes.sort(
      (a, b) => engineScore(b, selectedLabels) - engineScore(a, selectedLabels)
    )[0];

  if (!hero) {
    throw new Error("No unused Tonight’s Pick remains in the current Canon pool.");
  }

  const unrotatedCandidates = canonAlternativeCandidates
    .filter(title => titleIdentity(title) !== titleIdentity(hero));

  const candidates = selectedLabels.includes("romcom")
    ? rotateCandidates(
        unrotatedCandidates,
        romcomRotationIndex(selectionKey) * 7
      )
    : unrotatedCandidates;

  let alternatives;

  if (selectedLabels.includes("romcom")) {
    try {
      alternatives = assembleRomcomDatabaseBatch(
        hero,
        candidates,
        contentMode,
        batchNumber
      );
    } catch (strictError) {
      console.warn(
        "Strict Romcom composition failed; using balanced recovery.",
        strictError
      );

      const recovery = [];
      const recoveryIds = new Set([titleIdentity(hero)]);

      for (const title of candidates) {
        if (recovery.length >= 6) break;

        const key = titleIdentity(title);
        if (recoveryIds.has(key)) continue;

        recovery.push(title);
        recoveryIds.add(key);
      }

      if (recovery.length < 6) {
        throw strictError;
      }

      alternatives = recovery;
    }
  } else {
    alternatives = assembleEngineBatch(
      hero,
      candidates,
      selectedLabels,
      contentMode,
      batchNumber
    );
  }

  const finalTitles = [hero, ...alternatives];

  if (selectedLabels.includes("romcom")) {
    const invalidRomcom = finalTitles.find(title => {
      if (isEditoriallyExcluded(title.title, title.year, "romcom")) {
        return true;
      }

      if (isCanonApprovedFor(title.title, title.year, "romcom")) {
        return false;
      }

      const genres = new Set(
        (title.genres || []).map(genre => String(genre).toLowerCase())
      );

      if (!genres.has("comedy")) return true;
      if (!title.isTV && !genres.has("romance")) return true;
      return false;
    });

    if (invalidRomcom) {
      throw new Error(
        `${invalidRomcom.title} did not pass the My Ciné Romcom Canon audit.`
      );
    }
  }

  if (finalTitles.some(title => Number(title.rating || 0) < 7.5)) {
    throw new Error("A title below the 75% TMDB standard was rejected before display.");
  }

  saveRecommendationHistory(selectionKey, finalTitles);

  return {
    hero,
    alts: alternatives
  };
}
// ── POSTER COMPONENT ──────────────────────────────────────────────────────────
// poster_path is always a real TMDB path from seed data.
// <img> tag loads from image.tmdb.org CDN — no CORS issues.
function Poster({ path, title, size="w500", style={} }) {
  const [err, setErr] = useState(false);
  // Build full URL: https://image.tmdb.org/t/p/w500/path.jpg
  const src = !err && path
    ? `https://image.tmdb.org/t/p/${size}${path.startsWith("/") ? path : "/"+path}`
    : null;

  if (src) return (
    <img src={src} alt={title} onError={()=>setErr(true)}
      style={{width:"100%",height:"100%",objectFit:"cover",display:"block",...style}}/>
  );
  return (
    <div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,${C.navyMid},${C.navy})`,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"8px",...style}}>
      <div style={{fontSize:"36px"}}>🎞️</div>
      <p style={{color:C.goldBright,fontSize:"11px",fontWeight:"700",textAlign:"center",padding:"0 12px",margin:0,fontFamily:"Georgia,serif"}}>{title}</p>
    </div>
  );
}

// ── CHIP ──────────────────────────────────────────────────────────────────────
function Chip({label, emoji, selected, onClick}) {
  return (
    <button onClick={onClick} style={{
      display:"inline-flex",alignItems:"center",gap:"5px",padding:"6px 13px",borderRadius:"999px",
      border:`1.5px solid ${selected?C.goldBright:C.navyMid}`,
      background:selected?C.goldBright:C.navyMid,
      color:selected?C.navy:C.goldBright,
      fontWeight:selected?"800":"500",fontSize:"13px",cursor:"pointer",fontFamily:"inherit",
    }}>{emoji} {label}</button>
  );
}
// ── COUNTRY-AWARE WATCH PROVIDERS ─────────────────────────────────────────────
const WATCH_REGIONS = [
  { code: "MX", label: "🇲🇽 Mexico" },
  { code: "US", label: "🇺🇸 United States" },
  { code: "FR", label: "🇫🇷 France" },
  { code: "CA", label: "🇨🇦 Canada" },
  { code: "GB", label: "🇬🇧 United Kingdom" },
  { code: "ES", label: "🇪🇸 Spain" }
];

async function fetchWatchProviders(titleId, region, mediaType = "movie") {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  if (!TOKEN) {
    throw new Error("TMDB token is missing");
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/watch/providers`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Watch providers failed: ${response.status}`);
  }

  const data = await response.json();
  const countryData = data.results?.[region];

  return {
    link: countryData?.link || null,
    stream: countryData?.flatrate || [],
    free: countryData?.free || [],
    ads: countryData?.ads || [],
    rent: countryData?.rent || [],
    buy: countryData?.buy || []
  };
}

function canonicalProviderName(name = "") {
  const normalized = name.toLowerCase();

  if (normalized.includes("netflix")) return "Netflix";
  if (normalized.includes("amazon") || normalized.includes("prime video")) return "Prime Video";
  if (normalized.includes("max") || normalized.includes("hbo")) return "HBO Max";
  if (normalized.includes("apple tv")) return "Apple TV+";
  if (normalized.includes("disney")) return "Disney+";
  if (normalized.includes("claro")) return "Claro video";
  if (normalized === "vix" || normalized.includes("vix premium")) return "ViX";

  return name;
}

function providerSearchUrl(providerName, title, region) {
  const query = encodeURIComponent(title);
  const provider = canonicalProviderName(providerName);

  const urls = {
    "Netflix": `https://www.netflix.com/search?q=${query}`,
    "Prime Video": `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${query}`,
    "HBO Max": `https://www.max.com/search?q=${query}`,
    "Apple TV+": `https://tv.apple.com/search?term=${query}`,
    "Disney+": `https://www.disneyplus.com/search?q=${query}`,
    "Claro video": region === "MX"
      ? "https://www.clarovideo.com/mexico/home"
      : "https://www.clarovideo.com/",
    "ViX": region === "MX"
      ? "https://vix.com/es-es"
      : "https://vix.com/"
  };

  return urls[provider] ||
    `https://www.google.com/search?q=${encodeURIComponent(`${title} ${provider} streaming`)}`;
}

function ProviderPill({ providerName, title, region, compact = false }) {
  const canonicalName = canonicalProviderName(providerName);
  const background = PROVIDER_COLORS[canonicalName] || C.navyMid;
  const isLight = canonicalName === "Apple TV+";

  return (
    <a
      href={providerSearchUrl(canonicalName, title, region)}
      target="_blank"
      rel="noopener noreferrer"
      title={`Search for ${title} on ${canonicalName}`}
      style={{
        display:"inline-flex",
        alignItems:"center",
        justifyContent:"center",
        background,
        color:isLight ? C.navy : C.white,
        border:`1px solid ${isLight ? C.white : `${C.white}33`}`,
        borderRadius:"999px",
        padding:compact ? "3px 7px" : "5px 10px",
        fontSize:compact ? "8px" : "10px",
        fontWeight:"800",
        textDecoration:"none",
        lineHeight:1.2,
        boxShadow:"0 2px 8px rgba(0,0,0,0.22)"
      }}
    >
      {canonicalName}
    </a>
  );
}

function WhereToWatch({ titleId, region, title, mediaType = "movie" }) {
  const [open, setOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [providerError, setProviderError] = useState("");

  const loadProviders = async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);

    if (providers) return;

    setLoading(true);
    setProviderError("");

    try {
      const result = await fetchWatchProviders(titleId, region, mediaType);
      setProviders(result);
    } catch (error) {
      setProviderError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const streamingProviders = [
    ...(providers?.stream || []),
    ...(providers?.free || []),
    ...(providers?.ads || [])
  ];

  const uniqueProviders = streamingProviders.reduce((result, provider) => {
    const canonicalName = canonicalProviderName(provider.provider_name);

    if (!result.some(item => item.canonicalName === canonicalName)) {
      result.push({
        ...provider,
        canonicalName
      });
    }

    return result;
  }, []);

  return (
    <div style={{marginTop:"8px"}}>
      <button
        onClick={loadProviders}
        style={{
          width:"100%",
          background:"transparent",
          border:`1px solid ${C.goldBright}55`,
          borderRadius:"8px",
          padding:"8px",
          color:C.goldBright,
          fontSize:"11px",
          fontWeight:"700",
          cursor:"pointer",
          fontFamily:"inherit"
        }}
      >
        📺 {open ? "Hide options" : "Where to Watch"}
      </button>

      {open && (
        <div style={{
          marginTop:"8px",
          padding:"9px",
          background:"rgba(0,0,0,0.22)",
          borderRadius:"8px"
        }}>
          {loading && (
            <p style={{color:C.white,fontSize:"10px",margin:0}}>
              Checking availability…
            </p>
          )}

          {providerError && (
            <p style={{color:C.goldBright,fontSize:"10px",margin:0}}>
              Availability could not be loaded.
            </p>
          )}

          {!loading && !providerError && uniqueProviders.length > 0 && (
            <>
              <p style={{
                color:C.white,
                fontSize:"9px",
                fontWeight:"700",
                margin:"0 0 7px",
                textTransform:"uppercase"
              }}>
                Stream
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                {uniqueProviders.map(provider => (
                  <ProviderPill
                    key={provider.canonicalName}
                    providerName={provider.canonicalName}
                    title={title}
                    region={region}
                  />
                ))}
              </div>

              {providers?.link && (
                <a
                  href={providers.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:"inline-block",
                    color:C.goldBright,
                    fontSize:"9px",
                    fontWeight:"700",
                    marginTop:"9px",
                    textDecoration:"underline"
                  }}
                >
                  View all streaming, rental and purchase options →
                </a>
              )}
            </>
          )}

          {!loading && !providerError && providers && uniqueProviders.length === 0 && (
            <p style={{color:C.white,fontSize:"10px",margin:0,opacity:0.8}}>
              No subscription streaming option is listed for this country.
            </p>
          )}

          {!loading && providers && (
            <p style={{
              color:`${C.white}88`,
              fontSize:"8px",
              margin:"7px 0 0"
            }}>
              Availability data powered by JustWatch via TMDB.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
function countryName(code) {
  if (!code) return "";

  try {
    return new Intl.DisplayNames(["en"], {type:"region"}).of(code) || code;
  } catch {
    return code;
  }
}

function languageName(code) {
  if (!code) return "";

  try {
    return new Intl.DisplayNames(["en"], {type:"language"}).of(code) || code;
  } catch {
    return code.toUpperCase();
  }
}

function runtimeLabel(film) {
  if (!film.runtime) return "";

  if (film.isTV) {
    return `${film.runtime} min episodes`;
  }

  const hours = Math.floor(film.runtime / 60);
  const minutes = film.runtime % 60;

  return hours
    ? `${hours}h ${minutes ? `${minutes}m` : ""}`.trim()
    : `${minutes} min`;
}

// ── HERO CARD ─────────────────────────────────────────────────────────────────
function HeroCard({film, watched, onToggle, watchRegion}) {
  const platColor  = PROVIDER_COLORS[film.provider] || C.navy;
  const critScore  = film.rtCritics || 0;
  const scoreColor = critScore>=85?"#4ADE80":critScore>=70?C.goldBright:"#aaa";
  const search  = `https://www.google.com/search?q=${encodeURIComponent(film.title)}`;
  const tmdbLink = `https://www.themoviedb.org/${film.isTV ? "tv" : "movie"}/${film.id}`;
  const tmdbWatchLink = `https://www.themoviedb.org/${film.isTV ? "tv" : "movie"}/${film.id}/watch?locale=${watchRegion || "MX"}`;
  const trailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(film.title+" "+film.year+" official trailer")}`;

  return (
    <div style={{borderRadius:"20px",overflow:"hidden",border:`1.5px solid ${C.goldBright}55`,
      boxShadow:`0 8px 48px rgba(11,31,74,0.6)`,background:`linear-gradient(160deg,${C.navyMid},${C.navy})`,marginBottom:"4px"}}>

      <a
  href={`https://www.google.com/search?q=${encodeURIComponent(
    `${film.title} ${film.year} movie`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
        style={{display:"block",position:"relative",width:"100%",aspectRatio:"2/3",maxHeight:"400px",overflow:"hidden",textDecoration:"none"}}>
        <Poster path={film.poster_path} title={film.title} size="w500"/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"50%",background:"linear-gradient(to top,rgba(11,20,48,1),transparent)"}}/>
        <div style={{position:"absolute",top:"12px",left:"12px"}}>
          <span style={{background:ROLE_BADGE_COLORS[film.roleBadge] || C.goldBright,color:C.navy,fontSize:"10px",fontWeight:"800",padding:"4px 12px",borderRadius:"999px",textTransform:"uppercase",letterSpacing:"0.08em"}}>{film.roleBadge || "🍿 Tonight's Pick"}</span>
        </div>
        {Number(film.year) === CURRENT_YEAR && (
          <div style={{position:"absolute",top:"12px",right:"12px"}}>
            <span style={{background:C.red,color:C.white,fontSize:"10px",fontWeight:"800",padding:"4px 10px",borderRadius:"999px"}}>
              NEW {film.year}
            </span>
          </div>
        )}
      </a>

      <div style={{padding:"16px 18px 20px"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontWeight:"800",fontSize:"28px",color:C.white,margin:"0 0 6px",lineHeight:1.1,textDecoration:watched?"line-through":"none"}}>{film.title}</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"12px"}}>
          {film.format&&<span style={{background:`${C.red}55`,border:`1px solid ${C.red}99`,color:C.white,fontSize:"10px",fontWeight:"800",padding:"3px 10px",borderRadius:"999px"}}>{film.format}</span>}
          {(film.genres||[]).map(g=><span key={g} style={{background:`${C.goldBright}22`,border:`1px solid ${C.goldBright}55`,color:C.goldBright,fontSize:"10px",fontWeight:"700",padding:"3px 10px",borderRadius:"999px"}}>{g}</span>)}
        </div>

        {film.highlight&&(
          <div style={{background:"rgba(255,184,0,0.1)",border:`1px solid ${C.goldBright}44`,borderRadius:"12px",padding:"11px 12px",marginBottom:"12px"}}>
            <div style={{color:C.goldBright,fontSize:"9px",fontWeight:"900",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"4px"}}>
              {film.highlight.icon} {film.highlight.label}
            </div>
            <div style={{color:C.white,fontSize:"12px",fontWeight:"700",lineHeight:"1.45"}}>
              {film.highlight.text}
            </div>
            {film.director&&(
              <div style={{color:`${C.white}AA`,fontSize:"10px",marginTop:"5px"}}>
                {film.isTV?"Created by":"Directed by"} {film.director}
              </div>
            )}
          </div>
        )}

        <p className="hero-story">{film.overview || "Story details are currently unavailable."}</p>

        <div style={{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"13px"}}>
          {runtimeLabel(film)&&<span style={{color:C.white,fontSize:"10px",fontWeight:"700"}}>⏱ {runtimeLabel(film)}</span>}
          {film.countryCode&&<span style={{color:C.white,fontSize:"10px",fontWeight:"700"}}>🌍 {countryName(film.countryCode)}</span>}
          {film.languageCode&&<span style={{color:C.white,fontSize:"10px",fontWeight:"700"}}>🗣 {languageName(film.languageCode)}</span>}
          {film.isTV&&film.seasons&&<span style={{color:C.white,fontSize:"10px",fontWeight:"700"}}>📺 {film.seasons} season{film.seasons>1?"s":""}</span>}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
            {(film.providerNames || [film.provider]).map(providerName => (
              <ProviderPill
                key={providerName}
                providerName={providerName}
                title={film.title}
                region={watchRegion}
              />
            ))}
          </div>
          <span style={{color:`${C.goldBright}55`}}>•</span>
          <span style={{color:C.white,fontSize:"12px"}}>{film.year}</span>
        </div>
        <div style={{marginBottom:"16px",borderTop:`1px solid ${C.goldBright}22`,paddingTop:"14px"}}>
          <a href={tmdbLink} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"inline-block"}}>
            <div style={{display:"flex",alignItems:"baseline",gap:"9px"}}>
              <div style={{fontSize:"30px",fontWeight:"800",color:scoreColor,fontFamily:"Georgia,serif",lineHeight:1}}>
                {film.rating ? Math.round(film.rating * 10) + "%" : "—"}
              </div>
              <div>
                <div style={{fontSize:"9px",color:C.white,letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:"800"}}>
                  TMDB Community
                </div>
                <div style={{fontSize:"9px",color:`${C.white}99`,marginTop:"3px"}}>
                  {film.vote_count ? `${film.vote_count.toLocaleString()} votes` : "Vote count unavailable"}
                </div>
              </div>
            </div>
          </a>
        </div>
      <div className="hero-actions">
        <a
          href={trailer}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-action secondary"
        >
          ▶ Trailer
        </a>

        <button
          onClick={()=>onToggle(film.id)}
          className={watched ? "hero-action watchlist saved" : "hero-action watchlist"}
        >
          {watched ? "✓ On Watchlist" : "🍿 Add to Watchlist"}
        </button>

        <a
          href={tmdbWatchLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-action secondary"
        >
          📺 Where to Watch
        </a>
      </div>


</div>
</div>
  );
}

// ── ALT CARD ──────────────────────────────────────────────────────────────────
function AltCard({film, watched, onToggle, watchRegion}) {
  const platColor  = PROVIDER_COLORS[film.provider] || C.navy;
  const critScore  = film.rtCritics || 0;
  const scoreColor = critScore>=85?"#4ADE80":critScore>=70?C.goldBright:"#aaa";
  const eraColor   = ERA_COLORS[film.era] || C.gold;
  const search  = `https://www.google.com/search?q=${encodeURIComponent(film.title)}`;
  const tmdbLink = `https://www.themoviedb.org/${film.isTV ? "tv" : "movie"}/${film.id}`;
  const trailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(film.title+" "+film.year+" official trailer")}`;

  return (
    <div style={{width:"100%",background:C.navyMid,border:`1px solid ${C.goldBright}33`,borderRadius:"14px",overflow:"hidden",opacity:watched?0.5:1,flexShrink:0}}>
      <a
  href={`https://www.google.com/search?q=${encodeURIComponent(
    `${film.title} ${film.year} movie`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display:"block",
    width:"100%",
    aspectRatio:"2/3",
    maxHeight:"230px",
    position:"relative",
    overflow:"hidden",
    textDecoration:"none"
  }}
>
  <Poster path={film.poster_path} title={film.title} size="w342"/>

{film.roleBadge && (
  <div style={{position:"absolute",top:"7px",left:"7px"}}>
    <span
      style={{
        background:ROLE_BADGE_COLORS[film.roleBadge] || C.goldBright,
        color:film.roleBadge.includes("Tonight") || film.roleBadge.includes("Classic")
          ? C.navy
          : C.white,
        fontSize:"8px",
        fontWeight:"900",
        padding:"3px 7px",
        borderRadius:"5px",
        textTransform:"uppercase",
        boxShadow:"0 2px 8px rgba(0,0,0,.35)"
      }}
    >
      {film.roleBadge}
    </span>
  </div>
)}

</a>
      <div style={{padding:"10px 10px 12px"}}>
        <p style={{fontFamily:"Georgia,serif",fontWeight:"800",fontSize:"12px",color:watched?`${C.gold}66`:C.white,margin:"0 0 4px",lineHeight:1.2,textDecoration:watched?"line-through":"none"}}>{film.title}</p>
        <p style={{fontSize:"10px",color:C.white,margin:"0 0 4px",opacity:0.7}}>{film.year}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"5px"}}>
          {(film.providerNames || [film.provider]).map(providerName => (
            <ProviderPill
              key={providerName}
              providerName={providerName}
              title={film.title}
              region={watchRegion}
              compact
            />
          ))}
        </div>
        <a href={tmdbLink} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <span style={{color:scoreColor,fontWeight:"800",fontSize:"11px",textDecoration:"underline"}}>
            ⭐ {film.rating ? Math.round(film.rating * 10) : "—"}% TMDB
          </span>
        </a>
       <div style={{display:"flex",gap:"4px",marginTop:"8px"}}>
  <a
    href={trailer}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      flex:1,
      background:"transparent",
      border:`1px solid ${C.white}33`,
      borderRadius:"6px",
      padding:"5px",
      color:C.white,
      fontSize:"10px",
      fontWeight:"700",
      textDecoration:"none",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}
  >
    ▶
  </a>

  <button
    onClick={()=>onToggle(film.id)}
    style={{
      flex:2,
      background:watched?C.navyMid:`${C.goldBright}22`,
      border:`1px solid ${C.goldBright}44`,
      borderRadius:"6px",
      padding:"5px",
      color:watched?`${C.gold}88`:C.goldBright,
      fontSize:"10px",
      fontWeight:"700",
      cursor:"pointer",
      fontFamily:"inherit"
    }}
  >
    {watched?"✓":"+ List"}
  </button>
</div>

<WhereToWatch
  titleId={film.id}
  region={watchRegion}
  title={film.title}
  mediaType={film.media_type}
/>

</div>
</div>
  );
}

function Skeleton() {
  return (
    <div style={{borderRadius:"20px",overflow:"hidden",border:`1.5px solid ${C.goldBright}33`,animation:"shimmer 1.4s ease-in-out infinite"}}>
      <div style={{width:"100%",aspectRatio:"2/3",maxHeight:"400px",background:C.navyMid}}/>
      <div style={{padding:"16px 18px 20px",background:C.navy}}>
        <div style={{height:28,background:C.navyMid,borderRadius:6,width:"60%",marginBottom:10}}/>
        <div style={{height:14,background:C.navyMid,borderRadius:4,width:"85%",marginBottom:16}}/>
        <div style={{height:44,background:C.navyMid,borderRadius:10}}/>
      </div>
    </div>
  );
}

function AboutModal({onClose}) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:1000,overflowY:"auto",padding:"20px 16px 40px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#C0001A",border:`2px solid ${C.goldBright}`,borderRadius:"20px",padding:"28px 24px",maxWidth:"560px",margin:"0 auto",position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:"16px",right:"16px",background:"none",border:"none",color:C.goldBright,fontSize:"24px",cursor:"pointer"}}>✕</button>
        <h2 style={{fontFamily:"Georgia,serif",color:C.goldBright,fontSize:"20px",fontWeight:"800",margin:"0 0 4px"}}>
          <a href="https://mycine.netlify.app/" target="_blank" rel="noopener noreferrer" style={{color:C.goldBright,textDecoration:"underline"}}>My Ciné</a> Standard 🎬
        </h2>
        <p style={{color:C.goldBright,fontSize:"12px",margin:"0 0 18px",fontStyle:"italic"}}>
          by <a href="https://www.armelle.com/screenplays" target="_blank" rel="noopener noreferrer" style={{color:C.goldBright,fontWeight:"700",textDecoration:"underline"}}>Armelle Cloche</a>
        </p>
        {["Hi! I'm Armelle. Watching a truly great movie can completely change my day. Yet finding something worth watching feels harder than ever. I got tired of spending 45 minutes scrolling to settle for something mediocre.",
          "So I built My Ciné. As a screenwriter, I love films that inspire, move us, make us think, or leave us smiling long after the credits roll.",
          "I didn't build this just for me. I built it for my spouse, my family, my friends... and now, for you."
        ].map((t,i)=><p key={i} style={{color:C.cream,fontSize:"13px",lineHeight:"1.7",margin:"0 0 14px"}}>{t}</p>)}
        <div style={{background:"rgba(0,0,0,0.2)",border:`1px solid ${C.goldBright}44`,borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
          <h3 style={{color:C.goldBright,fontSize:"14px",fontWeight:"800",margin:"0 0 8px",fontFamily:"Georgia,serif"}}>⭐ The My Ciné Standard</h3>
          {["⭐ TMDB Community Score: 75%+","👥 Meaningful vote count","🏆 Awards, cultural impact or strong audience enthusiasm"].map(item=><div key={item} style={{color:C.cream,fontSize:"12px",marginBottom:"4px"}}>• {item}</div>)}
        </div>
        <div style={{background:"rgba(0,0,0,0.2)",border:`1px solid ${C.goldBright}44`,borderRadius:"12px",padding:"14px",marginBottom:"16px"}}>
          <p style={{color:C.goldBright,fontSize:"13px",fontWeight:"700",margin:"0 0 6px",fontFamily:"Georgia,serif"}}>The My Ciné Promise</p>
          <p style={{color:C.cream,fontSize:"12px",lineHeight:"1.6",margin:0}}>No endless scrolling. No filler. No marketing-driven recommendations. Just carefully curated films that deserve your time. Life is too short for mediocre movies.</p>
        </div>
        <p style={{color:C.goldBright,fontSize:"12px",fontStyle:"italic",lineHeight:"1.6",margin:"0 0 20px"}}>P.S. If you're a talented film producer looking for your next unforgettable project... I'd love to hear from you. 🎬😄</p>
        <a href="https://wa.me/14155057678" target="_blank" rel="noopener noreferrer"
          style={{display:"block",textAlign:"center",background:"#25D366",color:"#fff",fontWeight:"800",fontSize:"14px",padding:"12px",borderRadius:"10px",textDecoration:"none",fontFamily:"Georgia,serif"}}>💬 WhatsApp Armelle</a>
      </div>
    </div>
  );
}


const CINEMA_MOMENTS = [
  {
    type:"🎬 Great Dialogue",
    title:"Casablanca (1942)",
    quote:"“Here’s looking at you, kid.”",
    credit:"Written by Julius J. Epstein, Philip G. Epstein and Howard Koch.",
    note:"Ranked among AFI’s greatest American movie quotations.",
    sourceLabel:"American Film Institute",
    sourceLink:"https://www.afi.com/afis-100-years-100-movie-quotes/"
  },
  {
    type:"🎬 Great Dialogue",
    title:"The Godfather (1972)",
    quote:"“I’m gonna make him an offer he can’t refuse.”",
    credit:"Screenplay by Mario Puzo and Francis Ford Coppola.",
    note:"AFI ranked it among the most memorable lines in American cinema.",
    sourceLabel:"American Film Institute",
    sourceLink:"https://www.afi.com/afis-100-years-100-movie-quotes/"
  },
  {
    type:"🎬 Great Dialogue",
    title:"The Wizard of Oz (1939)",
    quote:"“Toto, I’ve a feeling we’re not in Kansas anymore.”",
    credit:"Screenplay by Noel Langley, Florence Ryerson and Edgar Allan Woolf.",
    note:"A line whose meaning escaped the film and entered everyday language.",
    sourceLabel:"American Film Institute",
    sourceLink:"https://www.afi.com/afis-100-years-100-movie-quotes/"
  },
  {
    type:"🎨 Makeup History",
    title:"The Wizard of Oz (1939)",
    quote:"The original Tin Man had to leave the production after reacting to aluminum makeup.",
    credit:"Buddy Ebsen was replaced by Jack Haley.",
    note:"The production’s makeup methods became one of classic Hollywood’s cautionary tales.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🏀 One-Take Wonder",
    title:"Alien: Resurrection (1997)",
    quote:"Sigourney Weaver really sank Ripley’s behind-the-back basketball shot.",
    credit:"The ball briefly leaves frame, but the successful shot was real.",
    note:"Sometimes the most convincing special effect is extraordinary skill.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"📼 Home Cinema History",
    title:"E.T. the Extra-Terrestrial (1982)",
    quote:"Universal released the film on green VHS cassettes to discourage counterfeiting.",
    credit:"The unusual cassette made genuine copies instantly recognizable.",
    note:"The release went on to break home-entertainment records.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🎭 Beautiful Accident",
    title:"Rocky (1976)",
    quote:"A costume mistake in a fight poster became an improvised line in the finished film.",
    credit:"The art department printed Rocky’s trunks in the wrong colors.",
    note:"Sylvester Stallone turned the error into a character moment about being underestimated.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"👘 Costume Detail",
    title:"Star Wars (1977)",
    quote:"Alec Guinness weathered Obi-Wan’s robes by rolling in the Tunisian desert.",
    credit:"The actor wanted the costume to feel genuinely lived-in before filming began.",
    note:"A tiny preparation choice helped sell an entire galaxy’s history.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"⚾ Scene Detective",
    title:"Ferris Bueller’s Day Off (1986)",
    quote:"Fans identified the exact baseball game attended by Ferris, Cameron and Sloane.",
    credit:"Clues in the broadcast point to a Cubs game played on June 5, 1985.",
    note:"Cinema lovers can turn a few seconds of background audio into historical evidence.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🐦 Lucky Collaborator",
    title:"It’s a Wonderful Life (1946)",
    quote:"Director Frank Capra placed his lucky raven Jimmy in George Bailey’s workshop.",
    credit:"Capra had cast the bird in his films since 1938.",
    note:"Even celebrated directors can carry a favorite collaborator from set to set.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🎖️ Lived Experience",
    title:"The Great Escape (1963)",
    quote:"Donald Pleasence had actually been a prisoner of war during World War II.",
    credit:"He was shot down, imprisoned for a year and performed in camp productions.",
    note:"His real history brought an extraordinary layer of authenticity to the film.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🏢 Real Location",
    title:"Die Hard (1988)",
    quote:"Nakatomi Plaza was not a studio invention.",
    credit:"The film used Fox Plaza, then the recently completed headquarters of 20th Century Fox.",
    note:"The filmmakers staged spectacular destruction inside their own studio’s new home.",
    sourceLabel:"GamesRadar+ Movie Trivia",
    sourceLink:"https://www.gamesradar.com/60-greatest-movie-trivia-facts/"
  },
  {
    type:"🏆 Historic Moment",
    title:"The First Academy Awards",
    quote:"May 16, 1929",
    credit:"Held at the Hollywood Roosevelt Hotel.",
    note:"The ceremony lasted about 15 minutes.",
    sourceLabel:"Academy history",
    sourceLink:"https://www.oscars.org/oscars/ceremonies/1929"
  },
  {
    type:"🎼 Music That Changed Cinema",
    title:"Star Wars (1977)",
    quote:"A score heard around the world.",
    credit:"Composed by John Williams.",
    note:"Its symphonic language helped reshape the sound of the modern blockbuster.",
    sourceLabel:"My Ciné editorial",
    sourceLink:"https://www.themoviedb.org/movie/11"
  },
  {
    type:"📷 Cinematography",
    title:"Blade Runner 2049 (2017)",
    quote:"Light, color and scale turned into atmosphere.",
    credit:"Cinematography by Roger Deakins.",
    note:"The work earned Deakins his first Academy Award.",
    sourceLabel:"My Ciné editorial",
    sourceLink:"https://www.themoviedb.org/movie/335984"
  },
  {
    type:"✍️ Screenwriter Spotlight",
    title:"Nora Ephron",
    quote:"Romance can be witty, adult and unforgettable.",
    credit:"Screenwriter of When Harry Met Sally…",
    note:"Her voice helped define a generation of romantic comedy.",
    sourceLabel:"My Ciné editorial",
    sourceLink:"https://www.imdb.com/name/nm0001188/"
  },
  {
    type:"🎞️ Editing Magic",
    title:"Thelma Schoonmaker",
    quote:"Rhythm is one of cinema’s invisible superpowers.",
    credit:"Editor and longtime collaborator of Martin Scorsese.",
    note:"Her cuts helped shape some of modern cinema’s most kinetic storytelling.",
    sourceLabel:"My Ciné editorial",
    sourceLink:"https://www.imdb.com/name/nm0774817/"
  },
  {
    type:"🎭 Cinema Quote",
    title:"Martin Scorsese (director)",
    quote:"Cinema is a matter of what’s in the frame and what’s out.",
    credit:"Director, producer and film-preservation advocate.",
    note:"A reminder that every image is also a choice.",
    sourceLabel:"My Ciné editorial",
    sourceLink:"https://www.imdb.com/name/nm0000217/"
  }
];

const CURATED_CINEMA_MOMENTS = CINEMA_MOMENTS.map((moment, index) => ({
  ...moment,
  key:`curated-${index}`
}));



async function fetchCinemaMomentCandidates() {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  if (!TOKEN) return [];

  const endpoints = [
    "movie/top_rated",
    "movie/popular",
    "trending/movie/week"
  ];

  const requests = [];

  for (const endpoint of endpoints) {
    for (let page = 1; page <= 4; page += 1) {
      requests.push(
        fetch(`https://api.themoviedb.org/3/${endpoint}?language=en-US&page=${page}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "application/json"
          }
        })
          .then(response => response.ok ? response.json() : {results:[]})
          .then(data => data.results || [])
          .catch(() => [])
      );
    }
  }

  const groups = await Promise.all(requests);
  const unique = new Map();

  groups.flat().forEach(movie => {
    if (
      movie?.id &&
      movie?.title &&
      movie?.overview &&
      movie?.release_date &&
      movie?.vote_average >= 7
    ) {
      unique.set(movie.id, movie);
    }
  });

  return [...unique.values()];
}

async function fetchCinemaMomentDetail(movieId) {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  if (!TOKEN) return null;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json"
        }
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function compactMoney(value) {
  if (!value) return "";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)} billion`;
  if (value >= 1_000_000) return `$${Math.round(value / 1_000_000)} million`;
  return `$${value.toLocaleString()}`;
}

function buildDynamicCinemaMoment(movie, details) {
  const year = String(movie.release_date || details?.release_date || "").slice(0, 4);
  const director = details?.credits?.crew?.find(person => person.job === "Director")?.name || "";
  const screenwriters = [...new Set(
    (details?.credits?.crew || [])
      .filter(person => ["Screenplay", "Writer", "Story"].includes(person.job))
      .map(person => person.name)
      .filter(Boolean)
  )].slice(0, 3);

  const composer = details?.credits?.crew?.find(person =>
    ["Original Music Composer", "Music"].includes(person.job)
  )?.name || "";

  const cinematographer = details?.credits?.crew?.find(person =>
    person.job === "Director of Photography"
  )?.name || "";

  const editor = details?.credits?.crew?.find(person =>
    person.job === "Editor"
  )?.name || "";

  const country = details?.production_countries?.[0]?.name || "";
  const language = details?.spoken_languages?.[0]?.english_name || "";
  const runtime = Number(details?.runtime || 0);
  const budget = Number(details?.budget || 0);
  const revenue = Number(details?.revenue || 0);
  const rating = Number(movie.vote_average || details?.vote_average || 0);
  const votes = Number(movie.vote_count || details?.vote_count || 0);
  const genres = (details?.genres || []).map(genre => genre.name).filter(Boolean);
  const productionCompany = details?.production_companies?.[0]?.name || "";

  const options = [];

  if (screenwriters.length) {
    const writerText = screenwriters.join(
      screenwriters.length > 2 ? ", " : " & "
    );

    options.push({
      key:`writer-${movie.id}`,
      type:"✍️ Great Writing",
      title:`${movie.title} (${year})`,
      quote:"Every memorable film begins long before the cameras roll.",
      credit:`Written by ${writerText}.`,
      note:director
        ? `Directed by ${director}.`
        : "Celebrating the storytellers who created the film on the page."
    });
  }

  if (composer && director) {
    options.push({
      key:`music-${movie.id}`,
      type:"🎼 Music Behind the Movie",
      title:`${movie.title} (${year})`,
      quote:`Its emotional world was scored by ${composer}.`,
      credit:`Directed by ${director}.`,
      note:runtime
        ? `${runtime} minutes shaped by image, performance and music.`
        : "A reminder that a film’s soul is often heard before it is understood."
    });
  }

  if (cinematographer && director) {
    options.push({
      key:`camera-${movie.id}`,
      type:"📷 Behind the Image",
      title:`${movie.title} (${year})`,
      quote:`Photographed by ${cinematographer}.`,
      credit:`Directed by ${director}.`,
      note:country
        ? `A production from ${country}.`
        : "Celebrating the artist responsible for the film’s visual language."
    });
  }

  if (editor && director && runtime) {
    options.push({
      key:`editing-${movie.id}`,
      type:"🎞️ Editing Craft",
      title:`${movie.title} (${year})`,
      quote:`${runtime} finished minutes shaped in the editing room.`,
      credit:`Edited by ${editor}.`,
      note:`Directed by ${director}.`
    });
  }

  if (revenue >= 75_000_000 && budget > 0) {
    const multiplier = revenue / budget;

    options.push({
      key:`boxoffice-${movie.id}`,
      type:"💰 Box Office Story",
      title:`${movie.title} (${year})`,
      quote:`Made for ${compactMoney(budget)} and earned ${compactMoney(revenue)} worldwide.`,
      credit:director ? `Directed by ${director}.` : "A remarkable theatrical journey.",
      note:multiplier >= 2
        ? `Its worldwide gross was about ${multiplier.toFixed(1)} times its production budget.`
        : "A reminder that cultural impact and financial outcome do not always travel together."
    });
  }

  if (rating >= 8 && votes >= 2500 && director) {
    options.push({
      key:`audience-${movie.id}`,
      type:"⭐ Audience Favorite",
      title:`${movie.title} (${year})`,
      quote:`Rated ${Math.round(rating * 10)}% by TMDB viewers.`,
      credit:`Directed by ${director}.`,
      note:`Based on more than ${votes.toLocaleString()} audience votes.`
    });
  }

  if (language && language !== "English" && country && director) {
    options.push({
      key:`world-${movie.id}`,
      type:"🌍 World Cinema",
      title:`${movie.title} (${year})`,
      quote:`A ${language}-language film from ${country}.`,
      credit:`Directed by ${director}.`,
      note:genres.length
        ? `Its cinematic territory: ${genres.slice(0, 2).join(" and ")}.`
        : "A reminder that cinema has no single language."
    });
  }

  if (productionCompany && director && year) {
    options.push({
      key:`production-${movie.id}`,
      type:"🎥 Behind the Production",
      title:`${movie.title} (${year})`,
      quote:`Produced by ${productionCompany}.`,
      credit:`Directed by ${director}.`,
      note:country
        ? `Made in ${country}.`
        : "Celebrating the production teams that turn scripts into finished films."
    });
  }

  // Quality gate: reject generic cards and any card that repeats the same fact.
  return options.filter(moment => {
    const combined = `${moment.quote} ${moment.credit} ${moment.note}`.toLowerCase();

    const repeatedDirector =
      director &&
      [moment.quote, moment.credit, moment.note]
        .filter(Boolean)
        .filter(line => line.toLowerCase().includes(director.toLowerCase()))
        .length > 1;

    const tooGeneric =
      /a film shaped by|a title embraced by|carefully shaped screen time|found a global audience/i
        .test(combined);

    const meaningfulFacts = [
      director,
      screenwriters.length ? screenwriters.join(",") : "",
      composer,
      cinematographer,
      editor,
      country,
      language,
      runtime,
      budget,
      revenue,
      productionCompany,
      rating >= 8 && votes >= 2500 ? `${rating}-${votes}` : ""
    ].filter(Boolean).length;

    return !repeatedDirector && !tooGeneric && meaningfulFacts >= 2;
  });
}

function readMomentHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem("mycine-moment-history") || "[]");
    const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return raw.filter(item => item?.key && item?.seenAt >= cutoff);
  } catch {
    return [];
  }
}

function saveMomentSeen(key) {
  const history = readMomentHistory().filter(item => item.key !== key);
  history.push({key, seenAt:Date.now()});
  localStorage.setItem("mycine-moment-history", JSON.stringify(history.slice(-500)));
}

function pickUnseenMoment(momentOptions) {
  const seen = new Set(readMomentHistory().map(item => item.key));
  const unseen = momentOptions.filter(moment => !seen.has(moment.key));

  const pool = unseen.length ? unseen : momentOptions;
  if (!pool.length) return null;

  return pool[Math.floor(Math.random() * pool.length)];
}

function LobbyDecor() {
  return (
    <>
      <div className="curtain curtain-left">
        <div className="curtain-folds"/>
        <div className="curtain-tie"/>
      </div>
      <div className="curtain curtain-right">
        <div className="curtain-folds"/>
        <div className="curtain-tie"/>
      </div>
      <div className="projector-beam"/>
      <div className="seat-row seat-row-back"/>
      <div className="seat-row seat-row-front"/>
    </>
  );
}

function TopNav({page, setPage, savedCount}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    {id:"home", label:"MY CINÉ"},
    {id:"standard", label:"Standard 🎞️"},
    {id:"saved", label:`💙 Watchlist${savedCount ? ` ${savedCount}` : ""}`},
    {id:"curator", label:"Meet the Curator 👋"}
  ];

  const goTo = id => {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({top:0, behavior:"smooth"});
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-inner desktop-nav">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => goTo(item.id)}
            className={page === item.id ? "nav-link active" : "nav-link"}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mobile-nav">
        <button onClick={() => goTo("home")} className="mobile-brand">
          MY CINÉ
        </button>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-label="Open My Ciné menu"
        >
          {menuOpen ? "✕" : "☰"} Menu
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-panel">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={page === item.id ? "mobile-menu-link active" : "mobile-menu-link"}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function CinemaMomentCard({moment, compact=false}) {
  return (
    <article className={compact ? "cinema-moment compact" : "cinema-moment"}>
      <div className="marquee-lights marquee-top"/>
      <div className="cinema-moment-inner">
        <div className="cinema-moments-title">🎞️ Cinema Moments</div>
        <div className="moment-kicker">{moment.type}</div>
        <h3>{moment.title}</h3>
        <blockquote>{moment.quote}</blockquote>
        <p className="moment-credit">{moment.credit}</p>
        <p className="moment-note">{moment.note}</p>
        <div className="moment-ribbon">
          ✨ Celebrating the people behind the Seventh Art
        </div>
      </div>
      <div className="marquee-lights marquee-bottom"/>
    </article>
  );
}

function CinemaMomentsPage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span>🎞️</span>
        <h1>Cinema Moments</h1>
        <p>Dialogue, craft, history and the artists who make cinema unforgettable.</p>
      </div>
      <div className="moments-grid">
        {CINEMA_MOMENTS.map(moment => (
          <CinemaMomentCard key={`${moment.type}-${moment.title}`} moment={moment}/>
        ))}
      </div>
    </main>
  );
}

function StandardPage() {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span>🎞️</span>
        <h1>My Ciné Standard</h1>
        <p>The philosophy behind every recommendation</p>
      </div>

      <div className="standard-grid">
        <section className="standard-card">
          <h2>🎞️ Cinema is the Seventh Art</h2>
          <p>Cinema is more than entertainment. My Ciné exists to celebrate it as one of humanity’s greatest art forms.</p>
        </section>

        <section className="standard-card">
          <h2>🍿 The Rule of Seven™</h2>
          <p>Every recommendation arrives in a carefully curated set of seven because cinema is known as the Seventh Art. If none feels right, simply ask for seven more.</p>
        </section>

        <section className="standard-card">
          <h2>🎬 A Cinematic Concierge</h2>
          <p>My Ciné is not a database. It does not try to show you everything. It tries to help you discover the right film or series for tonight.</p>
        </section>

        <section className="standard-card">
          <h2>⭐ A Quality Standard</h2>
          <p>Every recommendation must reach at least 75% in the live TMDB community rating. Romcom now serves precomposed editorial batches from the My Ciné Database. TMDB supplies posters, ratings, trailers and availability, but never chooses or rearranges the seven films.</p>
          <p>My Ciné displays the source transparently. It does not present TMDB scores as Rotten Tomatoes, IMDb, Google, or a fabricated average.</p>
          <p>Future versions may integrate additional verified rating sources, but each source will remain clearly identified.</p>
        </section>

        <section className="standard-card">
          <h2>🌎 Ready to Watch</h2>
          <p>Recommendations are filtered for the selected country and prioritize titles available through streaming services.</p>
        </section>

        <section className="standard-card">
          <h2>❤️ People Behind the Camera</h2>
          <p>My Ciné celebrates directors, screenwriters, cinematographers, editors, composers, costume designers, production designers, producers, animators and many more.</p>
        </section>

        <section className="standard-card">
          <h2>🎞️ Learn Something Every Visit</h2>
          <p>Cinema Moments bring dialogue, milestones, craft, innovation and film history into the experience.</p>
        </section>

        <section className="standard-card">
          <h2>✨ Quality Over Quantity</h2>
          <p>Thousands of choices rarely make choosing easier. Seven thoughtful recommendations often do.</p>
        </section>
      </div>

      <div className="promise-card">
        <h2 className="promise-title">Our Promise</h2>
        <h3>My Ciné does not try to recommend every movie.</h3>
        <p>It tries to recommend your next great one.</p>
      </div>
    </main>
  );
}

function CuratorPage() {
  return (
    <main className="page-shell">
      <div className="curator-card cinematic-biography">
        <div className="curator-identity">
          <div className="curator-photo-frame">
            <img
              src={curatorPhoto}
              alt="Armelle Cloche, screenwriter and creator of My Ciné"
              className="curator-photo"
            />
          </div>
          <div className="curator-role"><span>Screenwriter</span><span>Founder of My Ciné</span></div>

          <div className="legacy-card">
            <div className="legacy-kicker">A family legacy</div>
            <div className="legacy-title">Maurice Cloche</div>
            <div className="legacy-copy">
              My grandfather directed{" "}
              <a
                href="https://tv.apple.com/us/movie/monsieur-vincent/umc.cmc.6lf2lqexscwi3nth7wk77429q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <em>Monsieur Vincent</em>
              </a>
              {" "}— winner of the first-ever Oscar for Best Foreign Film, 1948.
              In our family, cinema was never just a passion. It was an inheritance.
            </div>
          </div>
        </div>

        <div className="curator-story">
          <div className="moment-kicker">🎬 Meet the Curator</div>

          <h1 className="curator-name">Armelle Cloche</h1>

          <p className="curator-tagline">
            Curating cinema from Guadalajara — seven films at a time.
          </p>

          <p className="curator-lead">
            I arrived in Hollywood at 20 with a suitcase, a strong French accent, and the certainty that stories could change the world.
          </p>

          <p>
            Sixteen screenplays later, I write, watch, and celebrate cinema from Guadalajara, Mexico.
          </p>

          <p>
            Along the way, I learned that loving movies means more than what appears on screen. It means honoring the writers, directors, editors, composers, cinematographers, costume designers, and all the people behind the camera whose names deserve to be remembered.
          </p>

          <p>
            My Ciné grew from a very modern frustration: 45 minutes of scrolling, only to settle for something mediocre.
          </p>

          <p>
            So I built the app I wished already existed — a cinematic concierge offering seven thoughtful recommendations at a time, available where you live.
          </p>

          <div className="project-slate">
            <div className="project-slate-heading">Current Screen Projects</div>

            <div className="project-credit">
              <div className="project-type">📺 Limited Series</div>
              <div className="project-title">Boda All Inclusive</div>
              <div className="project-representation">
                Represented by{" "}
                <a href="https://www.blucreators.mx/" target="_blank" rel="noopener noreferrer">
                  Blu Creators
                </a>
                {" "}· Mexico City
              </div>
            </div>

            <div className="project-credit">
              <div className="project-type">💕 Romantic Comedy</div>
              <div className="project-title">Truth or Love</div>
              <div className="project-representation">
                Represented by Pedro Hernández Santos of{" "}
                <a href="https://www.aquiyallifilms.com/" target="_blank" rel="noopener noreferrer">
                  Aquí y Allí Films
                </a>
                {" "}· Madrid
              </div>
            </div>

            <div className="project-credit">
              <div className="project-type">🎬 More Screenplays</div>
              <div className="project-title project-title-small more-screenplays-copy">
                The 11th Commandment · Michelangelo · October 3rd · Call Me Bruce or Josephine ·{" "}
                <a
                  href="https://www.armelle.com/screenplays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  and many more screenplays
                </a>.
              </div>
              <div className="project-representation">
                Interested in a project?{" "}
                <a
                  className="contact-armelle"
                  href="https://wa.me/14155057678"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Armelle
                </a>
              </div>
            </div>
          </div>

          <blockquote className="curator-quote">
            “Every recommendation is curated with the same passion that goes into writing a great screenplay.”
          </blockquote>

          <div className="letter-signature">
            <div>Enjoy the show! 🍿</div>
            <span>Armelle</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function SavedPage({savedTitles, onToggle}) {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <span>💙</span>
        <h1>My personal collection</h1>
      </div>

      {savedTitles.length === 0 ? (
        <div className="empty-library">
          <div>🎞️</div>
          <h2>Your collection is waiting</h2>
          <p>Save a film or series and begin building your personal collection.</p>
        </div>
      ) : (
        <div className="saved-grid">
          {savedTitles.map(title => {
            const googleLink = `https://www.google.com/search?q=${encodeURIComponent(
              `${title.title} ${title.year || ""} ${title.isTV ? "TV series" : "film"}`
            )}`;
            const tmdbLink = `https://www.themoviedb.org/${title.isTV ? "tv" : "movie"}/${title.id}`;
            const genres = (title.genres || []).filter(Boolean).slice(0, 3);
            const score = title.rating ? Math.round(Number(title.rating) * 10) : null;

            return (
              <div key={`${title.media_type || "movie"}-${title.id}`} className="saved-card">
                <a
                  href={googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="saved-card-link"
                  aria-label={`Search for ${title.title} on Google`}
                >
                  <Poster path={title.poster_path} title={title.title} size="w342"/>
                </a>

                <div className="saved-card-body">
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="saved-title-link"
                  >
                    {title.title}
                  </a>

                  <p className="saved-meta">
                    {title.year} · {title.format || (title.isTV ? "TV Series" : "Film")}
                  </p>

                  {genres.length > 0 && (
                    <div className="saved-genres">
                      {genres.map(genre => <span key={genre}>{genre}</span>)}
                    </div>
                  )}

                  <a
                    className="saved-rating"
                    href={tmdbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ⭐ {score ? `${score}%` : "—"} TMDB Community
                    {title.vote_count ? <small>{Number(title.vote_count).toLocaleString()} votes</small> : null}
                  </a>

                  <button onClick={() => onToggle(title.id)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]               = useState("genre");
  const [selGenres, setSelGenres]   = useState([]);
  const [selMood, setSelMood]       = useState(null);
  const [hero, setHero]             = useState(null);
  const [alts, setAlts]             = useState([]);
  const [loading, setLoading]       = useState(false);
  const [watched, setWatched]       = useState({});
  const [error, setError]           = useState(null);
  const [generated, setGenerated]   = useState(false);
  const [showAbout, setShowAbout]   = useState(false);
  const [watchRegion, setWatchRegion] = useState("MX");
  const [contentMode, setContentMode] = useState("both");
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0]);
  const [page, setPage] = useState("home");
  const [momentIndex, setMomentIndex] = useState(0);
  const [cinemaMoment, setCinemaMoment] = useState(CURATED_CINEMA_MOMENTS[0]);
  const [seenPickIds, setSeenPickIds] = useState([]);
  const [batchNumber, setBatchNumber] = useState(0);
  const [savedTitles, setSavedTitles] = useState(() => {
    try {
      const permanent = JSON.parse(localStorage.getItem("mycine-watchlist") || "[]");
      const legacy = JSON.parse(localStorage.getItem("mycine-saved") || "[]");
      const merged = new Map();

      [...legacy, ...permanent].forEach(item => {
        if (item?.id) merged.set(`${item.isTV ? "tv" : "movie"}-${item.id}`, item);
      });

      return [...merged.values()];
    } catch {
      return [];
    }
  });

  const toggleGenre = id => setSelGenres(prev =>
    prev.includes(id)
      ? (prev.length > 1 ? prev.filter(g => g !== id) : prev)
      : [...prev, id]
  );

  const toggleWatched = id => {
    const currentTitles = [hero, ...alts].filter(Boolean);
    const title = currentTitles.find(item => item.id === id);

    setWatched(prev => ({...prev, [id]: !prev[id]}));

    if (!title) {
      setSavedTitles(prev => prev.filter(item => item.id !== id));
      return;
    }

    setSavedTitles(prev => {
      const exists = prev.some(item => item.id === id);
      return exists
        ? prev.filter(item => item.id !== id)
        : [...prev, title];
    });
  };

  const canFetch =
    tab === "genre" ? selGenres.length > 0 : !!selMood;
  const cycleMsg = () => {
  let i = 0;

  return setInterval(() => {
    i = (i + 1) % LOADING_MSGS.length;
    setLoadingMsg(LOADING_MSGS[i]);
  }, 3000);
};

const run = async (
  excludeIds = [],
  resetSession = false,
  requestedBatch = null
) => {
  setLoading(true);
  setError(null);
  setLoadingMsg(LOADING_MSGS[0]);

  const timer = cycleMsg();
  const targetBatch = requestedBatch ?? (
    resetSession ? 1 : Math.min(7, batchNumber + 1)
  );

  try {
    const isPreparedRomcom =
      tab === "genre" &&
      selGenres.length === 1 &&
      selGenres.includes("romcom") &&
      contentMode !== "tv";

    const result = isPreparedRomcom
      ? await buildPrebuiltRomcomBatch(watchRegion, targetBatch)
      : await buildPicks(
          tab,
          selGenres,
          selMood,
          watchRegion,
          contentMode,
          excludeIds,
          targetBatch
        );

    const newIds = [result.hero?.id, ...result.alts.map(item => item.id)].filter(Boolean);
    const previousBatchIds = new Set(
      [hero?.id, ...alts.map(item => item.id)].filter(Boolean).map(String)
    );

    const repeatedFromPreviousBatch = newIds.filter(
      id => previousBatchIds.has(String(id))
    );

    if (newIds.length > 0 && repeatedFromPreviousBatch.length > 0) {
      throw new Error(
        `Fresh batch contained ${repeatedFromPreviousBatch.length} repeated title(s).`
      );
    }

    if (newIds.length !== 7 || new Set(newIds.map(String)).size !== 7) {
      throw new Error("My Ciné did not receive seven distinct recommendations.");
    }

    setHero(result.hero);
    setAlts(result.alts);
    setGenerated(true);

    setSeenPickIds(previous =>
      [...new Set([...previous, ...newIds])]
    );

    setBatchNumber(targetBatch);
  } catch (error) {
    // Preserve the current seven if the next batch cannot be assembled.
    console.error("MY CINÉ recommendation error:", error);
    setError("fresh-set-unavailable");
  } finally {
    setLoading(false);
    clearInterval(timer);
  }
};

  const doFetch = () => {
    if (loading) return;

    const isPreparedRomcom =
      tab === "genre" &&
      selGenres.length === 1 &&
      selGenres.includes("romcom") &&
      contentMode !== "tv";

    const previousIds = [hero?.id, ...alts.map(item => item.id), ...seenPickIds]
      .filter(Boolean);

    if (isPreparedRomcom) {
      const nextBatch = batchNumber >= 7 ? 1 : batchNumber + 1;
      run([...new Set(previousIds)], false, nextBatch);
      return;
    }

    run([...new Set(previousIds)], true, 1);
  };

  const startNewRecommendationSession = () => {
    const key = recommendationSelectionKey(
      tab,
      selGenres,
      selMood,
      contentMode
    );


    setSeenPickIds([]);
    setBatchNumber(0);
    run([], true, 1);
  };

  const doMore = () => {
    if (loading || batchNumber >= 7) return;

    const nextBatch = Math.min(7, batchNumber + 1);
    const currentIds = [hero?.id, ...alts.map(item => item.id), ...seenPickIds]
      .filter(Boolean);

    run([...new Set(currentIds)], false, nextBatch);
  };

  const watchedCount = Object.values(watched).filter(Boolean).length;
  const total = (hero?1:0) + alts.length;

  useEffect(() => {
    localStorage.setItem("mycine-watchlist", JSON.stringify(savedTitles));
  }, [savedTitles]);



  useEffect(() => {
    const showNextMoment = () => {
      const moment = pickUnseenMoment(CURATED_CINEMA_MOMENTS);

      if (moment) {
        saveMomentSeen(moment.key);
        setCinemaMoment(moment);
      }
    };

    showNextMoment();
    const timer = setInterval(showNextMoment, 16000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={[
        "cinematic-app",
        page==="home" && !generated && !loading ? "home-before-results" : "",
        page==="home" && generated ? "home-with-results" : ""
      ].filter(Boolean).join(" ")}
      style={{minHeight:"100vh",fontFamily:"'Helvetica Neue',Arial,sans-serif"}}
    >
      <style>{`
  *{box-sizing:border-box;}
  body{margin:0;background:#B0001A;}
  button{font-family:inherit;}
  .cinematic-app{
    position:relative;
    overflow-x:hidden;
    min-height:100vh;
    background:
      radial-gradient(circle at 50% 16%,rgba(255,184,0,0.16),transparent 22%),
      linear-gradient(180deg,#B0001A 0%,#b0001a 34%,#B0001A 68%,#0b1f4a 100%);
  }
  .cinematic-app > *:not(.curtain):not(.projector-beam):not(.seat-row):not(.cinema-prop){
    position:relative;
    z-index:3;
  }
  .top-nav{
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(11,31,74,0.94);
    border-bottom:1px solid rgba(255,184,0,0.4);
    backdrop-filter:blur(14px);
    box-shadow:0 6px 18px rgba(11,31,74,0.24);
  }
  .top-nav-inner{
    max-width:1180px;
    margin:0 auto;
    display:flex;
    gap:8px;
    align-items:center;
    justify-content:center;
    overflow-x:auto;
    padding:8px 12px;
    scrollbar-width:none;
  }
  .mobile-nav,
  .mobile-menu-panel{
    display:none;
  }

  .top-nav-inner::-webkit-scrollbar{display:none;}
  .nav-link{
    flex:0 0 auto;
    background:transparent;
    border:1px solid transparent;
    color:#fff;
    border-radius:999px;
    padding:9px 13px;
    font-size:11px;
    font-weight:800;
    cursor:pointer;
    white-space:nowrap;
  }
  .nav-link:first-child{
    font-family:Georgia,serif;
    color:${C.goldBright};
    letter-spacing:0.08em;
  }
  .nav-link.active{
    background:${C.goldBright};
    color:${C.navy};
    border-color:${C.goldBright};
  }
  .curtain{
    position:fixed;
    top:0;
    bottom:0;
    width:min(16vw,190px);
    z-index:1;
    opacity:0.62;
    pointer-events:none;
    background:
      repeating-linear-gradient(90deg,rgba(80,0,10,0.95) 0 18px,rgba(160,0,25,0.95) 18px 40px,rgba(95,0,14,0.98) 40px 56px);
    filter:drop-shadow(0 0 24px rgba(11,31,74,0.6));
  }
  .curtain-left{left:0;border-radius:0 0 95% 0;}
  .curtain-right{right:0;transform:scaleX(-1);border-radius:0 0 95% 0;}
  .projector-beam{
    position:fixed;
    z-index:0;
    top:50px;
    left:50%;
    width:58vw;
    height:70vh;
    transform:translateX(-50%);
    background:linear-gradient(180deg,rgba(255,238,190,0.2),rgba(255,238,190,0.02));
    clip-path:polygon(43% 0,57% 0,100% 100%,0 100%);
    filter:blur(6px);
    pointer-events:none;
  }
  .seat-row{
    position:fixed;
    left:0;
    right:0;
    bottom:-18px;
    height:90px;
    z-index:1;
    opacity:0.38;
    pointer-events:none;
    background:
      radial-gradient(ellipse at center bottom,#320008 0 34%,transparent 36%) 0 0/82px 86px repeat-x;
  }
  .seat-row-two{bottom:34px;opacity:0.2;transform:scale(0.92);}
  .cinema-prop{
    position:fixed;
    z-index:2;
    font-size:clamp(30px,4vw,58px);
    opacity:0.18;
    filter:drop-shadow(0 6px 10px rgba(0,0,0,0.5));
    pointer-events:none;
  }
  .prop-camera{left:5vw;top:32vh;transform:rotate(-12deg);}
  .prop-popcorn{right:5vw;top:48vh;transform:rotate(11deg);}
  .prop-clap{right:7vw;bottom:15vh;transform:rotate(-8deg);}
  .lobby-wrap{
    width:min(980px,calc(100% - 24px));
    margin:0 auto;
    padding:4px 0 18px;
  }
  .home-hero{
    text-align:center;
    padding:12px 14px 8px;
  }
  .home-hero .logo{
    font-family:Georgia,serif;
    font-size:clamp(36px,7vw,68px);
    font-weight:900;
    letter-spacing:0.08em;
    text-shadow:0 0 28px rgba(255,184,0,0.36);
  }
  .home-hero .tagline{
    color:white;
    text-transform:uppercase;
    letter-spacing:0.18em;
    font-family:Georgia,serif;
    font-size:12px;
  }
  .moment-strip{
    margin:4px auto 16px;
    max-width:760px;
  }
  .moment-card{
    background:linear-gradient(145deg,rgba(11,31,74,0.96),rgba(22,45,96,0.92));
    border:1px solid rgba(255,184,0,0.45);
    border-radius:22px;
    padding:24px;
    box-shadow:0 18px 45px rgba(11,31,74,0.32);
  }
  .moment-card.compact{padding:18px 20px;}
  .moment-kicker{
    color:${C.goldBright};
    text-transform:uppercase;
    letter-spacing:0.12em;
    font-size:10px;
    font-weight:900;
  }
  .moment-card h3{
    color:#fff;
    margin:8px 0 10px;
    font-family:Georgia,serif;
    font-size:clamp(22px,4vw,34px);
  }
  .moment-card blockquote{
    margin:0 0 12px;
    color:#fff;
    font-family:Georgia,serif;
    font-style:italic;
    font-size:clamp(17px,3vw,25px);
    line-height:1.4;
  }
  .moment-credit{color:${C.goldBright};font-weight:800;margin:0 0 7px;}
  .moment-note{color:rgba(255,255,255,0.78);margin:0;line-height:1.55;}
  .moment-ribbon{
    margin-top:16px;
    padding-top:12px;
    border-top:1px solid rgba(255,184,0,0.24);
    color:rgba(255,184,0,0.78);
    font-size:10px;
    font-style:italic;
  }
  .concierge-panel{
    max-width:760px;
    margin:0 auto 18px;
    background:rgba(11,31,74,0.9);
    border:1px solid rgba(255,184,0,0.42);
    border-radius:24px;
    padding:22px 18px 4px;
    box-shadow:0 20px 55px rgba(11,31,74,0.28);
    backdrop-filter:blur(12px);
  }
  .concierge-title{
    text-align:center;
    color:#fff;
    font-family:Georgia,serif;
    margin:0 0 18px;
    font-size:24px;
  }
  .page-shell{
    width:min(1040px,calc(100% - 32px));
    margin:0 auto;
    padding:46px 0 90px;
  }
  .page-heading{text-align:center;margin-bottom:28px;color:#fff;}
  .page-heading > span{font-size:46px;}
  .page-heading h1{font-family:Georgia,serif;font-size:clamp(32px,6vw,58px);margin:8px 0;}
  .page-heading p{color:${C.goldBright};margin:0;font-size:15px;}
  .moments-grid,.standard-grid{
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:18px;
  }
  .standard-card,.promise-card,.curator-card,.empty-library{
    background:rgba(11,31,74,0.94);
    border:1px solid rgba(255,184,0,0.38);
    border-radius:22px;
    padding:24px;
    color:#fff;
    box-shadow:0 18px 44px rgba(11,31,74,0.32);
  }
  .standard-card h2{font-family:Georgia,serif;color:${C.goldBright};margin-top:0;}
  .standard-card p{line-height:1.65;color:rgba(255,255,255,0.86);}
  .promise-card{text-align:center;margin-top:22px;}
  .promise-title{
    font-family:Georgia,serif;
    color:${C.goldBright};
    font-size:1.5em;
    margin:0 0 12px;
  }
  .promise-card h3{
    font-family:Georgia,serif;
    font-size:30px;
    margin:10px 0;
    color:#fff;
  }
  .curator-card{
    display:grid;
    grid-template-columns:150px 1fr;
    gap:26px;
    align-items:start;
    max-width:820px;
    margin:0 auto;
  }
  .curator-photo-frame{
    width:160px;
    aspect-ratio:1;
    margin:0 auto;
    border-radius:50%;
    overflow:hidden;
    border:6px solid ${C.goldBright};
    box-shadow:0 12px 28px rgba(11,31,74,0.48);
    background:${C.navyMid};
  }
  .curator-photo{
    width:100%;
    height:100%;
    display:block;
    object-fit:cover;
    object-position:50% 30%;
  }

  .curator-card h1{font-family:Georgia,serif;font-size:42px;margin:8px 0;color:#fff;}
  .curator-card p{font-family:Arial,sans-serif;color:rgba(255,255,255,0.86);line-height:1.7;}
  .curator-lead{color:${C.goldBright}!important;font-weight:800;}
  .curator-signature{font-family:Georgia,serif;font-size:22px;color:${C.goldBright};margin-top:18px;}
  .saved-grid{
    display:grid;
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:16px;
  }
  .saved-card{background:rgba(11,31,74,0.94);border:1px solid rgba(255,184,0,0.35);border-radius:18px;overflow:hidden;}
  .saved-card-body{padding:12px;color:#fff;}
  .saved-card-link{
    display:block;
    text-decoration:none;
  }
  .saved-title-link{
    display:block;
    margin:0 0 6px;
    color:${C.white};
    font-family:Georgia,serif;
    font-size:16px;
    font-weight:900;
    line-height:1.2;
    text-decoration:none;
  }
  .saved-title-link:hover{
    color:${C.goldBright};
    text-decoration:underline;
  }
  .saved-card-body h3{font-family:Georgia,serif;margin:0 0 6px;}
  .saved-card-body p{font-size:11px;color:${C.goldBright};}
  .saved-meta{margin:0 0 8px;}
  .saved-genres{
    display:flex;
    flex-wrap:wrap;
    gap:5px;
    margin-bottom:9px;
  }
  .saved-genres span{
    border:1px solid rgba(255,184,0,0.42);
    border-radius:999px;
    padding:3px 7px;
    color:${C.goldBright};
    font-size:9px;
    font-weight:800;
  }
  .saved-rating{
    display:flex;
    flex-direction:column;
    gap:2px;
    margin-bottom:10px;
    color:${C.white};
    font-size:10px;
    font-weight:900;
    text-decoration:none;
  }
  .saved-rating small{
    color:rgba(255,255,255,0.62);
    font-size:8px;
    font-weight:600;
  }
  .saved-card-body button{width:100%;border:1px solid rgba(255,184,0,0.5);background:transparent;color:${C.goldBright};border-radius:8px;padding:8px;cursor:pointer;}
  .empty-library{text-align:center;max-width:620px;margin:0 auto;}
  .empty-library > div{font-size:56px;}

  /* Elegant theater architecture */
  

  .curtain{
    top:52px;
    width:min(9vw,112px);
    opacity:0.72;
    background:
      linear-gradient(90deg,rgba(25,0,5,0.68),transparent 14%,rgba(255,70,80,0.16) 34%,rgba(20,0,4,0.5) 52%,rgba(255,70,80,0.12) 72%,rgba(20,0,5,0.78)),
      repeating-linear-gradient(90deg,#B0001A 0 18px,#E50914 18px 42px,#B0001A 42px 62px);
    box-shadow:
      inset -18px 0 30px rgba(11,31,74,0.52),
      18px 0 40px rgba(11,31,74,0.34);
    border-radius:0 0 54% 0;
  }
  .curtain-right{
    box-shadow:
      inset -18px 0 30px rgba(11,31,74,0.52),
      -18px 0 40px rgba(11,31,74,0.34);
  }
  .curtain-folds{
    position:absolute;
    inset:0;
    background:
      repeating-linear-gradient(90deg,transparent 0 20px,rgba(255,255,255,0.055) 20px 27px,rgba(0,0,0,0.17) 27px 43px);
    mix-blend-mode:screen;
  }
  .curtain-tie{
    position:absolute;
    top:37%;
    width:74%;
    height:18px;
    background:linear-gradient(180deg,#ffe09b,#bd7900 45%,#6e3d00);
    border-radius:50%;
    box-shadow:0 3px 12px rgba(11,31,74,0.6);
  }
  .curtain-left .curtain-tie{right:-5%;transform:rotate(-8deg);}
  .curtain-right .curtain-tie{right:-5%;transform:rotate(-8deg);}

  
  
  

  .seat-row{
    height:126px;
    opacity:0.72;
    background:
      radial-gradient(ellipse 36px 48px at 41px 62px,#B0001A 0 52%,#0B1F4A 55% 66%,transparent 68%) 0 0/82px 118px repeat-x,
      linear-gradient(180deg,transparent 0 45%,rgba(11,31,74,0.72) 100%);
    filter:drop-shadow(0 -7px 10px rgba(11,31,74,0.34));
  }
  .seat-row-back{bottom:116px;opacity:0.22;transform:scale(0.88);}
  
  .seat-row-front{bottom:-24px;opacity:0.58;}

  /* Cinema Moments: strict My Ciné palette */
  .cinema-moment{
    position:relative;
    overflow:hidden;
    max-width:860px;
    margin:0 auto;
    padding:13px;
    border-radius:24px;
    background:linear-gradient(145deg,${C.goldBright},#ffd45c);
    box-shadow:0 18px 44px rgba(11,31,74,0.38);
  }
  .cinema-moment.compact{
    max-width:760px;
  }
  .cinema-moment-inner{
    position:relative;
    min-height:260px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    padding:34px clamp(22px,5vw,66px);
    border-radius:16px;
    background:
      radial-gradient(circle at 50% 0%,rgba(255,255,255,0.08),transparent 42%),
      linear-gradient(150deg,${C.navyMid},${C.navy} 72%);
    border:2px solid ${C.red};
  }
  .cinema-moment.compact .cinema-moment-inner{
    min-height:220px;
    padding-top:28px;
    padding-bottom:28px;
  }
  .cinema-moments-title{
    color:${C.white};
    font-family:Georgia,serif;
    font-size:clamp(13px,1.4vw,17px);
    font-weight:900;
    letter-spacing:0.08em;
    text-transform:uppercase;
    margin-bottom:14px;
    padding-bottom:9px;
    border-bottom:1px solid rgba(255,184,0,0.28);
  }
  .cinema-moment .moment-kicker{
    color:${C.goldBright};
  }
  .cinema-moment h3{
    color:${C.white};
    margin:8px 0 10px;
    font-family:Georgia,serif;
    font-size:clamp(24px,4vw,39px);
  }
  .cinema-moment blockquote{
    color:${C.white};
    max-width:680px;
    margin:0 0 14px;
    font-family:Georgia,serif;
    font-style:italic;
    font-size:clamp(18px,3vw,27px);
    line-height:1.42;
  }
  .cinema-moment .moment-credit{
    color:${C.goldBright};
  }
  .cinema-moment .moment-note{
    color:rgba(255,255,255,0.82);
  }


  .cinema-moment .moment-ribbon{
    color:rgba(255,255,255,0.78);
    border-top-color:rgba(255,184,0,0.28);
  }
  .marquee-lights{
    position:absolute;
    left:18px;
    right:18px;
    height:7px;
    z-index:2;
    background:
      radial-gradient(circle,${C.white} 0 2px,${C.goldBright} 2.5px 4px,transparent 4.5px)
      0 0/22px 7px repeat-x;
    filter:drop-shadow(0 0 5px rgba(255,184,0,0.9));
  }
  .marquee-top{top:3px;}
  .marquee-bottom{bottom:3px;}
  .moments-grid{
    grid-template-columns:1fr;
    max-width:920px;
    margin:0 auto;
    gap:24px;
  }

  /* Fuller curator page */
  .curator-card{
    grid-template-columns:190px minmax(0,1fr);
    padding:34px;
    gap:34px;
  }
  .curator-identity{
    position:sticky;
    top:92px;
    text-align:center;
  }
  .curator-role{
    color:${C.goldBright};
    font-family:Arial,sans-serif;
    font-size:11px;
    line-height:1.45;
    margin-top:12px;
    font-weight:800;
    text-transform:uppercase;
    letter-spacing:0.08em;
  }
  .curator-role span{
    display:block;
    white-space:nowrap;
  }
  .curator-story strong{color:#fff;}
  
  
  
  
  
  .curator-quote{
    margin:24px 0 0;
    padding:20px;
    border-left:3px solid ${C.goldBright};
    background:rgba(22,45,96,0.72);
    color:#fff;
    font-family:Georgia,serif;
    font-size:18px;
    font-style:italic;
    line-height:1.55;
  }
  .curator-signature{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    gap:16px;
  }
  .curator-signature span{
    color:#fff;
    font-family:Georgia,serif;
    font-size:16px;
    font-style:normal;
  }


  .format-selector{
    max-width:430px;
    margin:0 auto 18px;
    padding:12px;
    border-radius:16px;
    background:linear-gradient(145deg,rgba(229,9,20,0.22),rgba(11,31,74,0.82));
    border:1px solid rgba(255,184,0,0.48);
    box-shadow:inset 0 0 24px rgba(255,184,0,0.06);
  }
  .format-selector-label{
    color:${C.white};
    font-size:9px;
    font-weight:900;
    letter-spacing:0.14em;
    text-transform:uppercase;
    margin-bottom:8px;
  }
  .format-selector-options{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:7px;
  }
  .format-option{
    min-height:62px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:4px;
    background:${C.navy};
    color:${C.white};
    border:2px solid rgba(255,255,255,0.18);
    border-radius:12px;
    cursor:pointer;
    transition:transform 0.18s ease,border-color 0.18s ease,background 0.18s ease;
  }
  .format-option:hover{
    transform:translateY(-2px);
    border-color:${C.goldBright};
  }
  .format-option.active{
    background:${C.goldBright};
    color:${C.navy};
    border-color:${C.white};
    box-shadow:0 5px 18px rgba(255,184,0,0.34);
  }
  .format-option-icon{font-size:19px;}
  .format-option-text{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.05em;}

  .legacy-card{
    margin-top:20px;
    padding:14px;
    border-radius:14px;
    background:linear-gradient(145deg,rgba(176,0,26,0.56),rgba(22,45,96,0.88));
    border:1px solid rgba(255,184,0,0.34);
    text-align:left;
  }
  .legacy-kicker{
    color:${C.goldBright};
    text-transform:uppercase;
    letter-spacing:0.1em;
    font-size:8px;
    font-weight:900;
  }
  .legacy-title{
    color:${C.white};
    font-family:Georgia,serif;
    font-size:18px;
    font-weight:800;
    margin:5px 0;
  }
  .legacy-copy{
    font-family:Arial,sans-serif;
    color:rgba(255,255,255,0.78);
    font-size:10px;
    line-height:1.5;
  }
  .legacy-copy a,
  .legacy-copy a:visited{
    color:${C.goldBright};
    font-weight:900;
    text-decoration:underline;
    text-decoration-thickness:2px;
    text-underline-offset:2px;
  }
  .project-slate{
    margin:26px 0;
    border-radius:18px;
    overflow:hidden;
    border:1px solid rgba(255,184,0,0.42);
    background:${C.navy};
  }
  .project-slate-heading{
    background:${C.goldBright};
    color:${C.navy};
    padding:10px 14px;
    font-size:10px;
    font-weight:900;
    letter-spacing:0.13em;
    text-transform:uppercase;
  }
  .project-credit{
    padding:16px;
    border-top:1px solid rgba(255,184,0,0.2);
  }
  .project-credit:first-of-type{border-top:none;}
  .project-type{
    color:${C.goldBright};
    font-size:9px;
    font-weight:900;
    text-transform:uppercase;
    letter-spacing:0.08em;
  }
  .project-title{
    color:${C.white};
    font-family:Georgia,serif;
    font-size:22px;
    font-weight:900;
    margin:5px 0;
  }
  .project-representation{
    color:rgba(255,255,255,0.78);
    font-size:11px;
    line-height:1.5;
  }
  .project-representation a{
    color:${C.goldBright};
    font-weight:800;
    text-decoration:underline;
  }

  .lobby-feature-grid{
    display:grid;
    grid-template-columns:minmax(0,1.02fr) minmax(420px,0.98fr);
    gap:18px;
    align-items:stretch;
    max-width:1120px;
    margin:0 auto 18px;
  }
  .lobby-feature-grid .moment-strip,
  .lobby-feature-grid .concierge-panel{
    margin:0;
    max-width:none;
    height:100%;
  }
  .lobby-feature-grid .cinema-moment,
  .lobby-feature-grid .cinema-moment-inner{
    height:100%;
  }

  .selection-proof{
    max-width:760px;
    margin:0 auto 10px;
    padding:9px 12px;
    border-radius:999px;
    background:${C.navyMid};
    border:1px solid rgba(255,184,0,0.42);
    color:${C.white};
    text-align:center;
    font-size:10px;
  }
  .selection-proof strong{
    color:${C.goldBright};
  }

  .public-error{
    display:flex;
    flex-direction:column;
    gap:6px;
    background:${C.navyMid};
    border:1px solid rgba(255,184,0,0.55);
    border-radius:12px;
    padding:14px 16px;
    color:${C.white};
    font-size:12px;
    margin-bottom:14px;
  }
  .public-error strong{
    color:${C.goldBright};
    font-family:Georgia,serif;
    font-size:15px;
  }
  .public-error details{
    margin-top:4px;
    color:rgba(255,255,255,0.62);
    font-size:10px;
  }
  .public-error summary{
    cursor:pointer;
    color:${C.goldBright};
  }
  .public-error code{
    display:block;
    margin-top:6px;
    white-space:normal;
    line-height:1.5;
  }

  .mycine-footer{
    position:relative;
    overflow:hidden;
    padding:20px 18px 12px;
    background:
      linear-gradient(180deg,${C.redDark} 0%,${C.navyMid} 42%,${C.navy} 100%);
    border-top:2px solid ${C.goldBright};
    text-align:center;
  }
  .footer-content{
    max-width:980px;
    margin:0 auto;
  }
  .mycine-footer .closing-promise{
    max-width:760px;
    margin:0 auto 6px;
    color:${C.white};
    font-family:Georgia,serif;
    font-size:clamp(22px,2.8vw,34px);
    line-height:1.08;
    font-weight:900;
  }
  .footer-subtitle{
    color:${C.goldBright};
    font-family:Georgia,serif;
    font-style:italic;
    font-size:clamp(12px,1.4vw,16px);
    margin:0 0 10px;
  }
  .footer-signature-line{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1px;
  }
  .footer-signature-line > span{
    color:rgba(255,255,255,0.68);
    font-family:Arial,sans-serif;
    font-size:9px;
    text-transform:uppercase;
    letter-spacing:0.12em;
  }
  .footer-signature-line strong{
    color:${C.white};
    font-family:Georgia,serif;
    font-size:18px;
    font-weight:900;
  }
  .footer-signature-line small{
    color:${C.goldBright};
    font-size:10px;
  }
  .footer-meta{
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    gap:6px 18px;
    margin-top:9px;
    padding-top:7px;
    border-top:1px solid rgba(255,184,0,0.25);
    color:rgba(255,255,255,0.72);
    font-family:Arial,sans-serif;
    font-size:9px;
    line-height:1.35;
  }
  .footer-legal{
    color:rgba(255,255,255,0.86);
    font-weight:700;
  }

  /* Laptop homepage: no scrolling before recommendations are generated. */
  @media (min-width:1200px) and (min-height:760px){
    .home-before-results .lobby-wrap{
      width:min(1240px,calc(100% - 40px));
      max-width:1240px;
      justify-content:flex-start;
      padding-top:18px;
    }
    .home-before-results .home-hero{
      padding:8px 14px 24px;
    }
    .home-before-results .home-hero .logo{
      font-size:clamp(58px,5.3vw,82px);
      line-height:0.95;
    }
    .home-before-results .home-hero .tagline{
      font-size:11px;
      margin-top:10px;
      letter-spacing:0.2em;
    }
    .home-before-results .lobby-feature-grid{
      width:min(1120px,100%);
      max-width:1120px;
      max-height:560px;
      margin:0 auto 8px;
      grid-template-columns:minmax(0,1.03fr) minmax(470px,0.97fr);
      gap:22px;
    }
    .home-before-results .cinema-moment{
      min-height:100%;
    }
    .home-before-results .cinema-moment-inner{
      padding:34px 44px;
    }
    .home-before-results .cinema-moment h3{
      font-size:clamp(32px,3vw,46px);
    }
    .home-before-results .cinema-moment blockquote{
      font-size:clamp(21px,2vw,29px);
    }
    .home-before-results .concierge-panel{
      padding:22px 20px 5px;
    }
    .home-before-results .concierge-title{
      font-size:27px;
      margin-bottom:14px;
    }
    .home-before-results .format-option{
      min-height:64px;
    }
  }

  @media (min-width:981px) and (min-height:700px){
    .home-before-results{
      height:100vh;
      min-height:100vh!important;
      display:flex;
      flex-direction:column;
      overflow:hidden;
    }
    .home-before-results .top-nav{
      flex:0 0 auto;
    }
    .home-before-results .lobby-wrap{
      flex:1 1 auto;
      min-height:0;
      width:min(1000px,calc(100% - 24px));
      padding:2px 0 5px;
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    .home-before-results .home-hero{
      padding:10px 14px 18px;
      flex:0 0 auto;
    }
    .home-before-results .home-hero .logo{
      font-size:clamp(34px,4.2vw,54px);
    }
    .home-before-results .home-hero .tagline{
      margin:8px 0 0;
      font-size:9px;
    }
    .home-before-results .lobby-feature-grid{
      flex:1 1 auto;
      min-height:0;
      width:100%;
      max-height:510px;
      margin-bottom:5px;
      gap:14px;
      align-items:stretch;
    }
    .home-before-results .cinema-moment{
      padding:9px;
    }
    .home-before-results .cinema-moment-inner{
      min-height:0;
      padding:20px 28px;
    }
    .home-before-results .cinema-moment h3{
      font-size:clamp(22px,2.4vw,32px);
    }
    .home-before-results .cinema-moment blockquote{
      font-size:clamp(16px,1.7vw,21px);
      margin-bottom:8px;
    }
    .home-before-results .moment-note,
    .home-before-results .moment-credit{
      font-size:10px;
      margin-bottom:4px;
    }
    .home-before-results .moment-ribbon{
      margin-top:8px;
      padding-top:7px;
      font-size:7px;
    }
    .home-before-results .concierge-panel{
      padding:15px 14px 0;
    }
    .home-before-results .concierge-title{
      font-size:20px;
      margin-bottom:10px;
    }
    .home-before-results .format-selector{
      margin-bottom:10px;
      padding:8px;
    }
    .home-before-results .format-option{
      min-height:51px;
    }
    .home-before-results .mycine-footer{
      flex:0 0 auto;
      padding:10px 18px 7px;
    }
    .home-before-results .mycine-footer .closing-promise{
      font-size:20px;
      margin-bottom:2px;
    }
    .home-before-results .footer-subtitle{
      font-size:11px;
      margin-bottom:4px;
    }
    .home-before-results .footer-signature-line strong{
      font-size:14px;
    }
    .home-before-results .footer-meta{
      margin-top:4px;
      padding-top:4px;
      gap:3px 14px;
      font-size:8px;
      line-height:1.2;
    }
    .home-before-results > div:last-child{
      flex:0 0 3px;
    }
  }

  @media (max-width:980px){
    .lobby-feature-grid{
      grid-template-columns:1fr;
      max-width:760px;
    }
  }


  .page-heading{
    padding-top:0;
  }
  .page-heading h1{
    line-height:1.02;
  }

  @media (max-width:760px){
    .desktop-nav{
      display:none;
    }
    .mobile-nav{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      padding:9px 14px;
    }
    .mobile-brand{
      background:${C.goldBright};
      border:1px solid ${C.white};
      border-radius:999px;
      padding:10px 15px;
      color:${C.navy};
      font-family:Georgia,serif;
      font-size:15px;
      font-weight:900;
      letter-spacing:0.08em;
      cursor:pointer;
    }
    .mobile-menu-button{
      background:${C.navyMid};
      border:1px solid rgba(255,184,0,0.55);
      border-radius:999px;
      padding:10px 15px;
      color:${C.white};
      font-size:13px;
      font-weight:900;
      cursor:pointer;
    }
    .mobile-menu-panel{
      display:grid;
      grid-template-columns:1fr;
      gap:6px;
      padding:8px 14px 14px;
      background:${C.navy};
      border-top:1px solid rgba(255,184,0,0.25);
    }
    .mobile-menu-link{
      width:100%;
      border:1px solid rgba(255,184,0,0.3);
      border-radius:10px;
      padding:11px 12px;
      background:${C.navyMid};
      color:${C.white};
      font-size:13px;
      font-weight:800;
      text-align:left;
      cursor:pointer;
    }
    .mobile-menu-link.active{
      background:${C.goldBright};
      color:${C.navy};
    }

    .home-hero{
      padding-top:16px;
      padding-bottom:22px;
    }
    .home-hero .logo{
      font-size:clamp(42px,12vw,58px);
    }
    .home-hero .tagline{
      margin-top:12px;
      line-height:1.45;
    }

    .page-shell{
      padding-top:26px;
    }
    .page-heading{
      margin-bottom:22px;
    }
    .page-heading > span{
      font-size:38px;
    }
    .page-heading h1{
      font-size:clamp(38px,11vw,54px);
    }
    .page-heading p{
      font-size:13px;
      line-height:1.45;
    }

    .standard-card{
      padding:22px 20px;
    }
    .standard-card h2{
      font-size:clamp(28px,8vw,40px);
      line-height:1.05;
    }

    .curator-card{
      padding-top:24px;
    }
    .curator-name{
      align-items:flex-start;
      text-align:left;
      font-size:clamp(48px,14vw,68px);
      line-height:0.92;
    }
    .curator-tagline{
      text-align:left;
      font-size:15px;
      line-height:1.5;
    }
    .curator-photo-frame{
      width:190px;
    }
    .curator-role{
      font-size:10px;
      line-height:1.45;
    }
    .legacy-card{
      text-align:center;
    }
  }

  @media (max-width:760px){
    .curtain{width:38px;opacity:0.38;}
    .cinema-prop{display:none;}
    .moments-grid,.standard-grid{grid-template-columns:1fr;}
    .saved-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
    .curator-card{grid-template-columns:1fr;text-align:left;padding:22px;}
    .curator-identity{position:static;text-align:center;}
    .curator-credentials{grid-template-columns:1fr;}
    .curator-signature{align-items:center;}
    .curtain{width:28px;opacity:0.48;}
    .seat-row-back,.seat-row-middle{display:none;}
    .seat-row-front{opacity:0.24;height:80px;}
    .format-selector-options{gap:5px;}
    .format-option{min-height:56px;padding:6px 2px;}
    .format-option-text{font-size:8px;}
    .legacy-card{text-align:center;}
    .curator-name{align-items:center;text-align:center;}
    .curator-tagline{text-align:center;}
    .letter-signature{text-align:left;}
    .mycine-footer{padding:22px 14px 12px;}
    .mycine-footer .closing-promise{font-size:22px;}
    .footer-meta{flex-direction:column;gap:4px;font-size:9px;}

  }

  @keyframes shimmer{0%,100%{opacity:1;}50%{opacity:0.4;}}
  @keyframes softGlow{
    0%,100%{box-shadow:0 4px 18px rgba(255,184,0,0.28);}
    50%{box-shadow:0 7px 30px rgba(255,184,0,0.52);}
  }

  .hero-story{
    margin:0 0 14px;
    color:${C.goldBright};
    font-family:Georgia,serif;
    font-size:14px;
    line-height:1.58;
    font-style:italic;
  }
  .hero-actions{
    display:grid;
    grid-template-columns:1fr 1.65fr 1fr;
    gap:8px;
  }
  .hero-action{
    min-width:0;
    min-height:46px;
    border-radius:10px;
    padding:11px 8px;
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    font-family:Arial,sans-serif;
    font-size:13px;
    font-weight:800;
    text-decoration:none;
    cursor:pointer;
  }
  .hero-action.secondary{
    background:transparent;
    border:1.5px solid rgba(255,255,255,0.28);
    color:${C.white};
  }
  .hero-action.watchlist{
    border:none;
    background:${C.goldBright};
    color:${C.navy};
  }
  .hero-action.watchlist.saved{
    background:${C.navyMid};
    color:${C.goldBright};
    border:1px solid rgba(255,184,0,0.45);
  }

  .app-content{
    width:100%;
    max-width:760px;
    margin:0 auto;
    padding:0 18px 80px;
  }

  .picks-grid{
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:12px;
    padding-bottom:12px;
  }

  .primary-cta{
    animation:softGlow 4s ease-in-out infinite;
  }

  .closing-promise{
    font-family:Georgia,serif;
    font-size:clamp(28px,5vw,46px);
    line-height:1.08;
    font-weight:900;
    color:${C.white};
    max-width:760px;
    margin:0 auto 12px;
    text-wrap:balance;
  }

  .footer-credit{
    font-size:12px;
  }

  @media (max-width:760px){
    .app-content{
      max-width:640px;
      padding-left:14px;
      padding-right:14px;
    }
    .picks-grid{
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:10px;
    }
  }

  @media (max-width:460px){
    .app-content{
      padding-left:10px;
      padding-right:10px;
      padding-bottom:58px;
    }
    .picks-grid{
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:8px;
    }
    .closing-promise{
      font-size:31px;
    }
    .footer-credit{
      font-size:11px;
      line-height:1.5;
    }
  }
  .results-heading-wrap{
    width:100%;
    padding:22px 18px 18px;
    text-align:center;
  }
  .results-heading{
    margin:0 auto;
    color:${C.goldBright};
    font-family:Georgia,serif;
    font-size:clamp(22px,2vw,32px);
    font-weight:900;
    line-height:1.15;
    letter-spacing:0.03em;
    text-align:center;
  }
  @media (max-width:760px){
    .results-heading-wrap{
      padding:18px 14px 14px;
    }
    .results-heading{
      font-size:24px;
    }
  }

  .footer-signature-spaced{
    padding-top:16px;
  }
  .alternatives-heading{
    margin:26px auto 18px;
    text-align:center;
  }
  @media (max-width:760px){
    .footer-signature-spaced{
      padding-top:14px;
    }
    .alternatives-heading{
      margin:22px auto 16px;
    }
  }
  /* V21: all textual links remain visibly gold in every browser state */
  a,
  a:link,
  a:visited,
  a:hover,
  a:active,
  a:focus-visible,
  .text-link,
  .text-link:link,
  .text-link:visited,
  .text-link:hover,
  .text-link:active,
  .legacy-copy a,
  .legacy-copy a:visited,
  .project-representation a,
  .project-representation a:visited,
  .project-title a,
  .project-title a:visited,
  .contact-armelle,
  .contact-armelle:visited,
  .footer-curator-link{
    color:${C.goldBright};
    text-decoration:underline;
    text-underline-offset:3px;
    text-decoration-thickness:1.5px;
  }

  a:hover,
  a:focus-visible,
  .text-link:hover,
  .text-link:focus-visible,
  .legacy-copy a:hover,
  .project-representation a:hover,
  .project-title a:hover,
  .contact-armelle:hover,
  .footer-curator-link:hover,
  .footer-curator-link:focus-visible{
    color:${C.white};
    text-decoration-thickness:2px;
  }

  .footer-curator-link{
    appearance:none;
    border:0;
    padding:0;
    margin:0;
    background:transparent;
    font-family:Georgia,serif;
    font-size:18px;
    font-weight:900;
    cursor:pointer;
  }

  .footer-curator-link:focus-visible{
    outline:2px solid ${C.goldBright};
    outline-offset:4px;
  }

  /* Buttons and pill-style links remain button-like, not underlined */
  .hero-action,
  .hero-action:link,
  .hero-action:visited,
  .provider-chip,
  .provider-chip:link,
  .provider-chip:visited,
  .nav-link,
  .mobile-menu-link,
  .mobile-brand,
  .mobile-menu-button{
    text-decoration:none;
  }

  .letter-signature{
    margin-top:24px;
  }
  @media (max-width:760px){
    .letter-signature{
      margin-top:20px;
    }
  }
.more-screenplays-copy{
    font-family:Arial,sans-serif;
    font-size:16px !important;
    line-height:1.7 !important;
    font-weight:400 !important;
  }

  .more-screenplays-copy a{
    font-family:inherit;
    font-size:inherit;
    line-height:inherit;
    font-weight:700;
  }

  @media (max-width:760px){
    .more-screenplays-copy{
      font-size:15px !important;
      line-height:1.65 !important;
    }
  }

  /* V25: corrected fixed navigation and mobile home order */
  body{
    margin:0;
    padding:0 !important;
    overflow-x:hidden;
  }

  .cinematic-app{
    padding-top:58px;
  }

  .cinematic-app > .top-nav{
    position:fixed !important;
    top:0 !important;
    left:0 !important;
    right:0 !important;
    width:100% !important;
    max-width:100vw !important;
    margin:0 !important;
    z-index:10000 !important;
  }

  .top-nav{
    box-sizing:border-box;
    overflow:visible;
  }

  @media (max-width:760px){
    .cinematic-app{
      padding-top:72px;
    }

    .cinematic-app > .top-nav{
      min-height:72px;
    }

    .mobile-nav{
      width:100%;
      max-width:100%;
      min-height:72px;
      padding:8px 12px !important;
      margin:0 !important;
      box-sizing:border-box;
      gap:10px;
    }

    .mobile-brand{
      flex:0 1 auto;
      max-width:58%;
      padding:10px 18px !important;
      font-size:18px !important;
      white-space:nowrap;
    }

    .mobile-menu-button{
      flex:0 0 auto;
      max-width:40%;
      padding:10px 16px !important;
      font-size:16px !important;
      white-space:nowrap;
    }

    .mobile-menu-panel{
      position:absolute;
      top:100%;
      left:0;
      right:0;
      width:100%;
      max-width:100vw;
      margin:0;
      box-sizing:border-box;
      z-index:10001;
    }

    .lobby-wrap,
    .home-hero,
    .lobby-feature-grid,
    .home-moment-card,
    .home-curate-card{
      width:100%;
      max-width:100%;
      box-sizing:border-box;
    }

    .lobby-feature-grid{
      display:flex !important;
      flex-direction:column !important;
      gap:18px;
      padding-left:12px !important;
      padding-right:12px !important;
    }

    .home-curate-card{
      order:1 !important;
    }

    .home-moment-card{
      order:2 !important;
    }

    .home-curate-card,
    .home-moment-card,
    .home-moment-card .cinema-moment{
      width:100% !important;
      max-width:100% !important;
      margin-left:0 !important;
      margin-right:0 !important;
      transform:none !important;
    }
  }

  /* V26: lock the application to the viewport and eliminate horizontal drift */
  html,
  body,
  #root{
    width:100%;
    max-width:100%;
    margin:0;
    padding:0;
    overflow-x:hidden !important;
  }

  .cinematic-app{
    width:100%;
    max-width:100vw;
    overflow-x:hidden !important;
  }

  .cinematic-app *,
  .cinematic-app *::before,
  .cinematic-app *::after{
    min-width:0;
  }

  .cinematic-app > .top-nav{
    width:auto !important;
    max-width:none !important;
    inset:0 0 auto 0 !important;
    overflow:hidden;
  }

  @media (max-width:760px){
    .mobile-nav{
      display:grid !important;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      width:100%;
      max-width:100%;
      padding:8px 12px !important;
      gap:10px;
      overflow:hidden;
    }

    .mobile-brand{
      justify-self:start;
      width:auto;
      max-width:100%;
      margin:0;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .mobile-menu-button{
      justify-self:end;
      width:auto;
      max-width:none;
      margin:0;
    }

    .mobile-menu-panel{
      width:100% !important;
      max-width:100% !important;
      left:0 !important;
      right:0 !important;
      overflow:hidden;
    }

    .lobby-wrap{
      width:100% !important;
      max-width:100% !important;
      margin:0 auto !important;
      padding-left:12px !important;
      padding-right:12px !important;
      overflow:hidden;
    }

    .home-hero{
      width:100%;
      max-width:100%;
      margin:0 auto;
      padding-left:8px !important;
      padding-right:8px !important;
      overflow:hidden;
    }

    .home-hero .logo{
      max-width:100%;
      margin:0 auto;
      text-align:center;
      letter-spacing:0.05em;
      white-space:normal;
      overflow-wrap:anywhere;
    }

    .home-hero .tagline{
      width:100%;
      max-width:100%;
      margin-left:auto;
      margin-right:auto;
      padding:0 8px;
      text-align:center;
      white-space:normal !important;
      overflow-wrap:anywhere;
      word-break:normal;
      letter-spacing:0.11em;
      line-height:1.45;
    }

    .lobby-feature-grid{
      width:100% !important;
      max-width:100% !important;
      margin:0 auto 18px !important;
      padding-left:0 !important;
      padding-right:0 !important;
      align-items:stretch;
      overflow:hidden;
    }

    .home-curate-card,
    .home-moment-card,
    .concierge-panel,
    .moment-strip,
    .cinema-moment,
    .cinema-moment-inner{
      width:100% !important;
      max-width:100% !important;
      min-width:0 !important;
      margin-left:auto !important;
      margin-right:auto !important;
      overflow:hidden;
    }

    .concierge-panel{
      padding-left:14px !important;
      padding-right:14px !important;
    }

    .format-selector,
    .format-selector-options{
      width:100%;
      max-width:100%;
      min-width:0;
    }

    .format-selector-options{
      grid-template-columns:repeat(3,minmax(0,1fr));
    }

    .format-option{
      width:100%;
      min-width:0;
      padding-left:2px;
      padding-right:2px;
    }

    .format-option-text{
      max-width:100%;
      white-space:normal;
      overflow-wrap:anywhere;
      text-align:center;
    }

    .concierge-panel button,
    .concierge-panel select{
      max-width:100%;
    }

    .page-shell,
    .standard-grid,
    .curator-card,
    .saved-grid,
    .mycine-footer{
      width:100%;
      max-width:100%;
      overflow-x:hidden;
    }
  }

`}</style>
      <LobbyDecor/>
      <TopNav page={page} setPage={setPage} savedCount={savedTitles.length}/>
      <div style={{height:"4px",background:`linear-gradient(90deg,${C.navy},${C.goldBright},${C.navy})`}}/>

      {showAbout && <AboutModal onClose={()=>setShowAbout(false)}/>}

      {page === "standard" && <StandardPage/>}
      {page === "saved" && <SavedPage savedTitles={savedTitles} onToggle={toggleWatched}/>}
      {page === "curator" && <CuratorPage/>}

      {page === "home" && (
      <>
      <div className="lobby-wrap">
      <section className="home-hero">
        <div className="logo">
          <span style={{color:C.white}}>MY </span><span style={{color:C.goldBright}}>CIN</span><span style={{color:C.white}}>É</span>
        </div>
        <p className="tagline">The Art of Choosing Tonight's Movie</p>
      </section>

      <div className="lobby-feature-grid">
      <section className="moment-strip home-moment-card">
        <CinemaMomentCard moment={cinemaMoment} compact/>
      </section>

      <section className="concierge-panel home-curate-card">
        <h2 className="concierge-title">🍿 Curate My Movie Night</h2>

      <div style={{padding:"0 0 0",textAlign:"center"}}>
        <div style={{display:"flex",background:"rgba(11,20,48,0.6)",borderRadius:"12px",border:`1px solid ${C.goldBright}33`,overflow:"hidden",marginBottom:"14px"}}>
  {[{id:"genre",label:"🎬 Genres"},{id:"mood",label:"🎭 Mood"}].map(t=>(
    <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"12px",background:tab===t.id?C.goldBright:"#162D60",color:tab===t.id?C.navy:C.goldBright,border:"none",fontWeight:"800",fontSize:"13px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>{t.label}</button>
  ))}
</div>

<div style={{
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  gap:"8px",
  marginBottom:"14px"
}}>
  <span style={{
    color:C.white,
    fontSize:"11px",
    fontWeight:"700"
  }}>
    🌐 Watch region
  </span>

  <select
    value={watchRegion}
    onChange={event => {
      setWatchRegion(event.target.value);
      setHero(null);
      setAlts([]);
      setGenerated(false);
      setError(null);
    }}
    style={{
      background:C.navyMid,
      color:C.goldBright,
      border:`1px solid ${C.goldBright}66`,
      borderRadius:"8px",
      padding:"7px 9px",
      fontSize:"11px",
      fontWeight:"700"
    }}
  >
    {WATCH_REGIONS.map(region => (
      <option key={region.code} value={region.code}>
        {region.label}
      </option>
    ))}
  </select>
</div>

<div className="format-selector">
  <div className="format-selector-label">Choose format</div>
  <div className="format-selector-options">
    {MEDIA_OPTIONS.map(option => (
      <button
        key={option.id}
        onClick={() => {
          setContentMode(option.id);
          setHero(null);
          setAlts([]);
          setGenerated(false);
          setError(null);
        }}
        className={contentMode===option.id ? "format-option active" : "format-option"}
      >
        <span className="format-option-icon">{option.label.split(" ")[0]}</span>
        <span className="format-option-text">{option.label.replace(/^[^ ]+\s/, "")}</span>
      </button>
    ))}
  </div>
</div>

<div style={{display:"flex",flexWrap:"wrap",gap:"7px",justifyContent:"center",marginBottom:"14px"}}>
          {tab==="genre"
            ? GENRES.map(g=><Chip key={g.id} emoji={g.emoji} label={g.label} selected={selGenres.includes(g.id)} onClick={()=>toggleGenre(g.id)}/>)
            : MOODS.map(m=><Chip key={m.id} emoji={m.emoji} label={m.label} selected={selMood===m.id} onClick={()=>setSelMood(m.id)}/>)
          }
        </div>

        <button className="primary-cta" onClick={generated ? doFetch : startNewRecommendationSession} disabled={loading||!canFetch} style={{
          width:"100%",maxWidth:"400px",
          background:loading?C.navyMid:C.goldBright,
          color:loading?C.goldBright:C.navy,
          border:loading?`2px solid ${C.goldBright}`:"none",
          borderRadius:"10px",padding:"14px",
          fontWeight:"800",fontSize:loading?"13px":"15px",
          cursor:(loading||!canFetch)?"not-allowed":"pointer",
          fontFamily:"Georgia,serif",
          boxShadow:loading?"none":`0 2px 20px ${C.goldBright}44`,
          marginBottom:"20px",
        }}>
          {loading ? loadingMsg : generated ? "🔄 Start fresh" : "✨ Curate My Movie Night"}
        </button>
      </div>

      </section>
      </div>
      </div>

      {generated&&total>0&&(
        <div className="results-heading-wrap">
          <h2 className="results-heading">
            7 Picks • Celebrating the Seventh Art 🎦
          </h2>
        </div>
      )}

      <div className="app-content">
        {error&&(
          <div className="public-error">
            <strong>🎬 My Ciné could not complete the next rotation.</strong>
            <span>Please tap the button again. The current seven remain safely in place.</span>
          </div>
        )}
        {loading&&generated&&(
          <div className="public-error">
            <strong>🎦 Curating seven completely different choices…</strong>
            <span>The current set remains visible until the new one is ready.</span>
          </div>
        )}
        {loading&&!generated&&<Skeleton/>}

        {!loading&&generated&&hero&&(
          <div>
            <HeroCard
  film={hero}
  watched={!!watched[hero.id]}
  onToggle={toggleWatched}
  watchRegion={watchRegion}
/>
            {alts.length>0&&(
              <div style={{marginTop:"24px"}}>
                <h2 className="results-heading alternatives-heading">
                  {alts.length} Great Alternatives to Explore
                </h2>
                <div className="picks-grid">
                  {alts.map(film => (
                    <AltCard
                      key={film.id}
                      film={film}
                      watched={!!watched[film.id]}
                      onToggle={toggleWatched}
                      watchRegion={watchRegion}
                    />
                  ))}
                </div>
              </div>
            )}
            <div style={{marginTop:"28px"}}>
              <button
                onClick={doMore}
                disabled={loading || batchNumber >= 7}
                style={{
                  width:"100%",
                  background:"transparent",
                  border:`1.5px solid ${C.goldBright}88`,
                  borderRadius:"10px",
                  padding:"13px",
                  color:C.goldBright,
                  fontWeight:"800",
                  fontSize:"14px",
                  cursor:(loading || batchNumber >= 7)?"not-allowed":"pointer",
                  fontFamily:"Georgia,serif",
                  opacity:(loading || batchNumber >= 7)?0.5:1
                }}
              >
                {loading
                  ? loadingMsg
                  : batchNumber >= 7
                    ? "🎦 Seven complete sets revealed"
                    : batchNumber >= 7
      ? "🎦 Exploration Complete 7/7"
      : `🎦 Keep Exploring ${Math.min(7, batchNumber + 1)}/7`}
              </button>
            </div>
          </div>
        )}
      </div>

      </>
      )}

      <footer className="mycine-footer">
        <div className="footer-content">
          <h2 className="closing-promise">
            Never waste 45 minutes choosing a movie again
          </h2>

          <p className="footer-subtitle">
            Seven thoughtful choices. One unforgettable night.
          </p>

          <div className="footer-signature-line footer-signature-spaced">
            <button
              type="button"
              className="footer-curator-link"
              onClick={() => {
                setPage("curator");
                window.scrollTo({top:0, behavior:"smooth"});
              }}
            >
              Armelle Cloche
            </button>
            <small>Screenwriter • Founder of My Ciné</small>
          </div>

          <div className="footer-meta">
            <span>Celebrating cinema, seven picks at a time.</span>
            <span className="footer-legal">© 2026 My Ciné by Armelle Cloche. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
      <div style={{height:"4px",background:`linear-gradient(90deg,${C.navy},${C.goldBright},${C.navy})`}}/>
    </div>
  );
}
