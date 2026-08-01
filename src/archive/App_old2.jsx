import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// MY CINÉ — Clean Single Architecture
// 1. Seed data (pre-fetched from TMDB with real poster_paths)
// 2. Claude ranks candidates and writes whyWatch  
// 3. Display: 1 Hero (2026) + exactly 6 Alternatives
// Poster: https://image.tmdb.org/t/p/w500${poster_path} in <img> tag (no CORS needed)
// ═══════════════════════════════════════════════════════════════════════════

const C = {
  red:"#E50914", redDark:"#B0001A",
  goldBright:"#FFB800", gold:"#E0A800",
  navy:"#0B1F4A", navyMid:"#162D60",
  white:"#FFFFFF", cream:"#FFF8E7",
};
const PROVIDER_LINKS  = {"Netflix":"https://www.netflix.com","Prime Video":"https://www.primevideo.com","Disney+":"https://www.disneyplus.com"};
const PROVIDER_COLORS = {"Netflix":"#E50914","Prime Video":"#00A8E0","Disney+":"#1152CC"};
const ERA_COLORS      = {classic:C.goldBright,modern:"#5B8DEF",current:C.red};
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
function rankLocally(heroes, alts, queryLabel) {

  const sortedHeroes = [...heroes]
    .filter(f => f.poster_path)
    .sort((a,b) => (b.rating || 0) - (a.rating || 0));

  const sortedAlts = [...alts]
    .filter(f => f.poster_path)
    .sort((a,b) => (b.rating || 0) - (a.rating || 0));

  const whyWatchLines = [
    "A cinematic discovery worth your evening.",
    "A story that lingers long after the credits.",
    "A memorable journey into the heart of cinema.",
    "A compelling choice for a perfect movie night.",
    "A hidden gem waiting to be uncovered.",
    "A timeless experience for film lovers."
  ];

  const hero = sortedHeroes[0] || heroes[0];

  return {
    hero: {
      i: heroes.indexOf(hero),
      whyWatch: whyWatchLines[0],
      format: hero?.isTV ? "TV Series" : "Film",
      genres: [],
      rtCritics: Math.round((hero?.rating || 0) * 10),
      rtAudience: Math.round((hero?.rating || 0) * 10 - 3)
    },

    alts: sortedAlts.slice(0, 6).map((film, index) => ({
      i: alts.indexOf(film),
      whyWatch: whyWatchLines[index + 1] || whyWatchLines[0],
      format: film.isTV ? "TV Series" : "Film",
      genres: [],
      rtCritics: Math.round((film.rating || 0) * 10),
      rtAudience: Math.round((film.rating || 0) * 10 - 3)
    }))
   };
}
// ── TMDB LIVE FETCH ──────────────────────────────────────────────────────────
// Pull fresh candidates matching the selected genre or mood.

async function fetchTMDBMovies(queryLabel) {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  if (!TOKEN) {
    throw new Error("TMDB token is missing");
  }

  const TMDB_FILTERS = {
    romcom: "10749,35",
    comedy: "35",
    romance: "10749",
    drama: "18",
    thriller: "53",
    mystery: "9648",
    "action & adventure": "28,12",
    horror: "27",
    "sci-fi": "878",
    fantasy: "14",
    animation: "16",
    musical: "10402",
    "true stories / biopic": "18,36",
    documentary: "99",
    "mind blown": "878,9648,53",
    "make me laugh": "35",
    "date night": "10749,35",
    "travel somewhere": "12",
    "ugly cry": "18,10749",
    "adrenaline rush": "28,53",
    "family night": "10751,16",
    "inspire me": "18,36",
    "luxury vibes": "18,10749"
  };

  const selectedLabels = String(queryLabel || "")
    .split(",")
    .map(label => label.trim().toLowerCase());

  const selectedGenreIds = selectedLabels
    .map(label => TMDB_FILTERS[label])
    .filter(Boolean)
    .join(",");

  const requestMovies = async ({ year = null, page = 1, minimumVotes = 100 }) => {
    const params = new URLSearchParams({
      language: "en-US",
      sort_by: "vote_average.desc",
      include_adult: "false",
      include_video: "false",
      "vote_count.gte": String(minimumVotes),
      page: String(page)
    });

    if (selectedGenreIds) {
      params.set("with_genres", selectedGenreIds);
    }

    if (year) {
      params.set("primary_release_year", String(year));
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status}`);
    }

    const data = await response.json();

    return (data.results || []).filter(movie =>
      movie.poster_path &&
      movie.overview &&
      movie.release_date
    );
  };

  let heroMovies = await requestMovies({
    year: CURRENT_YEAR,
    page: 1,
    minimumVotes: 5
  });

  if (!heroMovies.length) {
    heroMovies = await requestMovies({
      year: CURRENT_YEAR - 1,
      page: 1,
      minimumVotes: 20
    });
  }

  const dailyPage = (new Date().getDate() % 4) + 1;

  const [altMoviesOne, altMoviesTwo] = await Promise.all([
    requestMovies({
      page: dailyPage,
      minimumVotes: 100
    }),
    requestMovies({
      page: dailyPage + 1,
      minimumVotes: 100
    })
  ]);

  return {
    heroMovies,
    altMovies: [...altMoviesOne, ...altMoviesTwo]
  };
}
// ── MAIN PIPELINE ─────────────────────────────────────────────────────────────
async function buildPicks(tab, selGenres, selMood, excludeIds = []) {

  const key = getSeedKey(tab, selGenres, selMood);

  const queryLabel = tab === "mood"
    ? (MOODS.find(m => m.id === selMood)?.label || selMood)
    : selGenres.map(id => GENRES.find(g => g.id === id)?.label).join(", ");


  // ── STEP 1: LIVE TMDB ─────────────────────────────────────────────────────
let tmdbResult = {
  heroMovies: [],
  altMovies: []
};

try {
  tmdbResult = await fetchTMDBMovies(queryLabel);
} catch (err) {
  console.warn("TMDB failed. Using SEED fallback.", err);
}


// ── STEP 2: Convert TMDB movies ────────────────────────────────────────────
const normalizeTMDBMovie = movie => {
  const year = (movie.release_date || "").slice(0, 4);
  const numericYear = Number(year);

  return {
    id: movie.id,
    title: movie.title,
    year,
    poster_path: movie.poster_path,
    provider: "Where to Watch",
    rating: movie.vote_average || 0,
    overview: movie.overview || "Synopsis unavailable.",
    isTV: false,
    era:
      numericYear < 1990
        ? "classic"
        : numericYear < 2020
          ? "modern"
          : "current"
  };
};

let heroes = (tmdbResult.heroMovies || [])
  .filter(movie =>
    movie.poster_path &&
    movie.overview &&
    !excludeIds.includes(movie.id)
  )
  .map(normalizeTMDBMovie);

const heroIds = new Set(heroes.map(movie => movie.id));

let alts = (tmdbResult.altMovies || [])
  .filter(movie =>
    movie.poster_path &&
    movie.overview &&
    !excludeIds.includes(movie.id) &&
    !heroIds.has(movie.id)
  )
  .map(normalizeTMDBMovie);

  // ── STEP 3: FALLBACK TO SEED ──────────────────────────────────────────────
  if (!heroes.length) {

    const d = SEED[key] || {};

    heroes = (d.h || [])
      .filter(h => h[3] && !excludeIds.includes(h[0]))
      .map(expandHero);


    const heroIds = new Set(heroes.map(h => h.id));

    alts = (d.a || [])
      .filter(a =>
        a[4] &&
        !excludeIds.includes(a[0]) &&
        !heroIds.has(a[0])
      )
      .map(expandAlt);
  }


  if (!heroes.length) {
    throw new Error(`No films found for "${queryLabel}".`);
  }


  // ── STEP 4: MY CINÉ ranking ───────────────────────────────────────────────
  const ranked = rankLocally(
    heroes,
    alts,
    queryLabel
  );


  // ── STEP 5: Build hero ───────────────────────────────────────────────────
  const heroRaw = heroes[ranked.hero?.i ?? 0] || heroes[0];

  const hero = {
    ...heroRaw,
    whyWatch:
      ranked.hero?.whyWatch ||
      "A cinematic discovery worth your evening.",
    format:
      heroRaw.isTV ? "TV Series" : "Film",
    genres:
      ranked.hero?.genres || [],
    rtCritics:
      ranked.hero?.rtCritics ||
      Math.round((heroRaw.rating || 0) * 10),
    rtAudience:
      ranked.hero?.rtAudience ||
      Math.round((heroRaw.rating || 0) * 10 - 3),
  };


  // ── STEP 6: Build exactly 6 alternatives ─────────────────────────────────
  const result = [];
  const usedIds = new Set([hero.id]);


  for (const ac of (ranked.alts || [])) {

    if (result.length >= 6) break;

    const raw = alts[ac.i];

    if (!raw || usedIds.has(raw.id)) continue;

    usedIds.add(raw.id);

    result.push({
      ...raw,
      whyWatch:
        ac.whyWatch ||
        "Worth discovering tonight.",
      format:
        raw.isTV ? "TV Series" : "Film",
      genres:
        ac.genres || [],
      rtCritics:
        ac.rtCritics || Math.round((raw.rating || 0) * 10),
      rtAudience:
        ac.rtAudience || Math.round((raw.rating || 0) * 10 - 3),
    });
  }


  // ── STEP 7: Safety padding ────────────────────────────────────────────────
  for (const raw of alts) {

    if (result.length >= 6) break;

    if (usedIds.has(raw.id)) continue;

    usedIds.add(raw.id);

    result.push({
      ...raw,
      whyWatch:"A hidden gem worth your evening.",
      format:
        raw.isTV ? "TV Series" : "Film",
      genres:[],
      rtCritics:
        Math.round((raw.rating || 0) * 10),
      rtAudience:
        Math.round((raw.rating || 0) * 10 - 3),
    });
  }


  return {
    hero,
    alts: result
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

async function fetchWatchProviders(movieId, region) {
  const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  if (!TOKEN) {
    throw new Error("TMDB token is missing");
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
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

function WhereToWatch({ movieId, region }) {
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
      const result = await fetchWatchProviders(movieId, region);
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
  ].filter(
    (provider, index, array) =>
      array.findIndex(item => item.provider_id === provider.provider_id) === index
  );

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

          {!loading && !providerError && streamingProviders.length > 0 && (
            <>
              <p style={{
                color:C.white,
                fontSize:"9px",
                fontWeight:"700",
                margin:"0 0 6px",
                textTransform:"uppercase"
              }}>
                Stream
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                {streamingProviders.map(provider => (
                  <span
                    key={provider.provider_id}
                    style={{
                      background:C.navy,
                      color:C.white,
                      borderRadius:"999px",
                      padding:"4px 7px",
                      fontSize:"9px"
                    }}
                  >
                    {provider.provider_name}
                  </span>
                ))}
              </div>
            </>
          )}

          {!loading &&
            !providerError &&
            providers &&
            streamingProviders.length === 0 && (
              <p style={{color:C.white,fontSize:"10px",margin:"0 0 6px"}}>
                No subscription streaming option is listed for this country.
              </p>
            )}

          {!loading && providers?.link && (
            <a
              href={providers.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"block",
                color:C.goldBright,
                fontSize:"10px",
                fontWeight:"700",
                marginTop:"8px",
                textDecoration:"underline"
              }}
            >
              View streaming, rental and purchase options →
            </a>
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
// ── HERO CARD ─────────────────────────────────────────────────────────────────
function HeroCard({film, watched, onToggle, watchRegion}) {
  const [synOpen, setSynOpen] = useState(false);
  const platColor  = PROVIDER_COLORS[film.provider] || C.navy;
  const critScore  = film.rtCritics || 0;
  const scoreColor = critScore>=85?"#4ADE80":critScore>=70?C.goldBright:"#aaa";
  const search  = `https://www.google.com/search?q=${encodeURIComponent(film.title)}`;
  const trailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(film.title+" "+film.year+" official trailer")}`;

  return (
    <div style={{borderRadius:"20px",overflow:"hidden",border:`1.5px solid ${C.goldBright}55`,
      boxShadow:`0 8px 48px rgba(0,0,0,0.6)`,background:`linear-gradient(160deg,${C.navyMid},${C.navy})`,marginBottom:"4px"}}>

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
          <span style={{background:C.goldBright,color:C.navy,fontSize:"10px",fontWeight:"800",padding:"4px 12px",borderRadius:"999px",textTransform:"uppercase",letterSpacing:"0.1em"}}>🍿 Tonight's Pick</span>
        </div>
        <div style={{position:"absolute",top:"12px",right:"12px"}}>
          <span style={{background:C.red,color:C.white,fontSize:"10px",fontWeight:"800",padding:"4px 10px",borderRadius:"999px"}}>NEW {film.year}</span>
        </div>
      </a>

      <div style={{padding:"16px 18px 20px"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontWeight:"800",fontSize:"28px",color:C.white,margin:"0 0 6px",lineHeight:1.1,textDecoration:watched?"line-through":"none"}}>{film.title}</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"10px"}}>
          {film.format&&<span style={{background:`${C.red}55`,border:`1px solid ${C.red}99`,color:C.white,fontSize:"10px",fontWeight:"800",padding:"2px 10px",borderRadius:"999px"}}>{film.format}</span>}
          {(film.genres||[]).map(g=><span key={g} style={{background:`${C.goldBright}22`,border:`1px solid ${C.goldBright}55`,color:C.goldBright,fontSize:"10px",fontWeight:"700",padding:"2px 10px",borderRadius:"999px"}}>{g}</span>)}
        </div>
        <p style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:C.goldBright,fontSize:"14px",lineHeight:"1.55",margin:"0 0 14px"}}>"{film.whyWatch}"</p>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
          <a
  href={`https://www.google.com/search?q=${encodeURIComponent(
    `${film.title} ${film.year} movie`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
            style={{color:platColor,fontWeight:"800",fontSize:"12px",textDecoration:"underline"}}>{film.provider}</a>
          <span style={{color:`${C.goldBright}55`}}>•</span>
          <span style={{color:C.white,fontSize:"12px"}}>{film.year}</span>
        </div>
        <div style={{display:"flex",gap:"20px",marginBottom:"16px",borderTop:`1px solid ${C.goldBright}22`,paddingTop:"14px"}}>
          <a href={search} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"28px",fontWeight:"800",color:scoreColor,fontFamily:"Georgia,serif",lineHeight:1}}>{film.rtCritics?film.rtCritics+"%":"—"}</div>
              <div style={{fontSize:"9px",color:C.white,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:"3px",fontWeight:"700",textDecoration:"underline"}}>🍅 Critics</div>
            </div>
          </a>
          <div style={{width:"1px",background:`${C.goldBright}22`}}/>
          <a href={search} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"28px",fontWeight:"800",color:C.goldBright,fontFamily:"Georgia,serif",lineHeight:1}}>{film.rtAudience?film.rtAudience+"%":"—"}</div>
              <div style={{fontSize:"9px",color:C.white,letterSpacing:"0.08em",textTransform:"uppercase",marginTop:"3px",fontWeight:"700",textDecoration:"underline"}}>👥 Audience</div>
            </div>
          </a>
        </div>
        {synOpen&&(
  <p style={{
    fontSize:"13px",
    color:C.white,
    lineHeight:"1.65",
    margin:"0 0 14px",
    borderLeft:`2px solid ${C.goldBright}44`,
    paddingLeft:"12px",
    opacity:0.85,
    whiteSpace:"normal",
    overflow:"visible",
    display:"block"
  }}>
    {film.overview}
  </p>
)}
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
  <a
    href={trailer}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      flex:1,
      minWidth:"90px",
      background:"transparent",
      border:`1.5px solid ${C.white}44`,
      borderRadius:"10px",
      padding:"11px 8px",
      color:C.white,
      fontWeight:"700",
      fontSize:"13px",
      textDecoration:"underline",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}
  >
    ▶ Trailer
  </a>

  <button
    onClick={()=>onToggle(film.id)}
    style={{
      flex:2,
      minWidth:"130px",
      background:watched?C.navyMid:C.goldBright,
      border:"none",
      borderRadius:"10px",
      padding:"11px 8px",
      color:watched?C.gold:C.navy,
      fontWeight:"800",
      fontSize:"13px",
      cursor:"pointer",
      fontFamily:"inherit",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}
  >
    {watched?"✓ On My List":"🍿 Add to My List"}
  </button>

  <button
    onClick={()=>setSynOpen(!synOpen)}
    style={{
      flex:1,
      minWidth:"70px",
      background:"transparent",
      border:`1.5px solid ${C.goldBright}44`,
      borderRadius:"10px",
      padding:"11px 8px",
      color:C.goldBright,
      fontWeight:"600",
      fontSize:"12px",
      cursor:"pointer",
      fontFamily:"inherit"
    }}
  >
    {synOpen?"Less ↑":"Story ↓"}
  </button>
</div>

<WhereToWatch
  movieId={film.id}
  region={watchRegion}
/>

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

<div style={{position:"absolute",top:"7px",left:"7px"}}>
  <span
    style={{
      background:eraColor,
      color:C.white,
      fontSize:"8px",
      fontWeight:"800",
      padding:"2px 7px",
      borderRadius:"4px",
      textTransform:"uppercase"
    }}
  >
    {film.era === "classic"
      ? "Classic"
      : film.era === "modern"
        ? "Modern"
        : "New"}
  </span>
</div>

</a>
      <div style={{padding:"10px 10px 12px"}}>
        <p style={{fontFamily:"Georgia,serif",fontWeight:"800",fontSize:"12px",color:watched?`${C.gold}66`:C.white,margin:"0 0 4px",lineHeight:1.2,textDecoration:watched?"line-through":"none"}}>{film.title}</p>
        <p style={{fontSize:"10px",color:C.white,margin:"0 0 4px",opacity:0.7}}>{film.year}</p>
        <a
  href={`https://www.google.com/search?q=${encodeURIComponent(
    `${film.title} ${film.year} movie`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
          style={{color:platColor,fontWeight:"700",fontSize:"9px",textDecoration:"underline",display:"block",marginBottom:"5px"}}>{film.provider}</a>
        <a href={search} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
          <span style={{color:scoreColor,fontWeight:"800",fontSize:"11px",textDecoration:"underline"}}>🍅 {film.rtCritics||"—"}%</span>
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
  movieId={film.id}
  region={watchRegion}
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
          {["🍅 Rotten Tomatoes Critics: 75%+","👥 Rotten Tomatoes Audience: 75%+","⭐ IMDb: Strong overall rating","🏆 Major awards or lasting cultural impact"].map(item=><div key={item} style={{color:C.cream,fontSize:"12px",marginBottom:"4px"}}>• {item}</div>)}
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
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MSGS[0]);

  const toggleGenre = id => setSelGenres(prev =>
    prev.includes(id)
      ? (prev.length > 1 ? prev.filter(g => g !== id) : prev)
      : [...prev, id]
  );

  const toggleWatched = id =>
    setWatched(prev => ({...prev, [id]: !prev[id]}));

  const canFetch =
    tab === "genre" ? selGenres.length > 0 : !!selMood;
  const cycleMsg = () => {
  let i = 0;

  return setInterval(() => {
    i = (i + 1) % LOADING_MSGS.length;
    setLoadingMsg(LOADING_MSGS[i]);
  }, 3000);
};

const run = async (excludeIds = []) => {
  setLoading(true);
  setError(null);
  setLoadingMsg(LOADING_MSGS[0]);

  const timer = cycleMsg();

  try {
    const result = await buildPicks(
      tab,
      selGenres,
      selMood,
      excludeIds
    );

    setHero(result.hero);
    setAlts(result.alts);
    setGenerated(true);
  } catch (error) {
    console.error("MY CINÉ recommendation error:", error);
    setError(error.message || "Unable to load movie recommendations.");
  } finally {
    setLoading(false);
    clearInterval(timer);
  }
};
    const doFetch = () => { setHero(null); setAlts([]); run([]); };
  const doMore  = () => run([hero?.id, ...alts.map(a=>a.id)].filter(Boolean));

  const watchedCount = Object.values(watched).filter(Boolean).length;
  const total = (hero?1:0) + alts.length;

  return (
    <div style={{minHeight:"100vh",background:C.red,fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
      <style>{`*{box-sizing:border-box;}@keyframes shimmer{0%,100%{opacity:1;}50%{opacity:0.4;}}`}</style>
      <div style={{height:"4px",background:`linear-gradient(90deg,${C.navy},${C.goldBright},${C.navy})`}}/>

      {showAbout && <AboutModal onClose={()=>setShowAbout(false)}/>}

      <div style={{padding:"20px 18px 0",textAlign:"center"}}>
        <a href="https://mycine.netlify.app/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"block",marginBottom:"4px"}}>
          <span style={{fontFamily:"Georgia,serif",fontSize:"32px",fontWeight:"800",letterSpacing:"0.06em",textShadow:`0 0 32px ${C.goldBright}66`}}>
            <span style={{color:C.white}}>MY </span><span style={{color:C.goldBright}}>CIN</span><span style={{color:C.white}}>É</span>
          </span>
        </a>
        <button onClick={()=>setShowAbout(true)} style={{background:"transparent",border:`1px solid ${C.goldBright}88`,borderRadius:"999px",padding:"4px 16px",color:C.goldBright,fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"Georgia,serif",marginBottom:"10px",textDecoration:"underline"}}>
          My Ciné Standard 🎬
        </button>
        <p style={{color:C.white,fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase",margin:"0 0 16px",fontFamily:"Georgia,serif",fontWeight:"600",textShadow:"0 1px 6px rgba(0,0,0,0.5)"}}>
          The Art of Choosing Tonight's Movie
        </p>

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
    onChange={event => setWatchRegion(event.target.value)}
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

<div style={{display:"flex",flexWrap:"wrap",gap:"7px",justifyContent:"center",marginBottom:"14px"}}>
          {tab==="genre"
            ? GENRES.map(g=><Chip key={g.id} emoji={g.emoji} label={g.label} selected={selGenres.includes(g.id)} onClick={()=>toggleGenre(g.id)}/>)
            : MOODS.map(m=><Chip key={m.id} emoji={m.emoji} label={m.label} selected={selMood===m.id} onClick={()=>setSelMood(m.id)}/>)
          }
        </div>

        <button onClick={doFetch} disabled={loading||!canFetch} style={{
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
          {loading ? loadingMsg : generated ? "🔄 Start fresh" : "🎟 Show me 7 great picks"}
        </button>
      </div>

      {generated&&total>0&&(
        <div style={{padding:"0 18px 14px",display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"11px",color:C.goldBright,fontWeight:"700",whiteSpace:"nowrap"}}>7 Picks • Celebrating the Seventh Art 🎬</span>
          <div style={{flex:1,height:"3px",background:"rgba(255,255,255,0.2)",borderRadius:"3px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${total?(watchedCount/total)*100:0}%`,background:`linear-gradient(90deg,${C.redDark},${C.goldBright})`,borderRadius:"3px",transition:"width 0.4s"}}/>
          </div>
        </div>
      )}

      <div style={{padding:"0 14px 80px",maxWidth:"520px",margin:"0 auto"}}>
        {error&&<div style={{background:"rgba(80,0,0,0.9)",border:`1px solid ${C.goldBright}66`,borderRadius:"10px",padding:"14px",color:C.goldBright,fontSize:"13px",marginBottom:"14px"}}>{error}</div>}
        {loading&&<Skeleton/>}

        {!loading&&!generated&&!error&&(
          <div style={{textAlign:"center",padding:"48px 20px"}}>
            <div style={{fontSize:"56px",marginBottom:"14px"}}>🎞️</div>
            <p style={{fontSize:"17px",fontWeight:"700",color:C.goldBright,margin:"0 0 8px",fontFamily:"Georgia,serif"}}>The house lights are up</p>
            <p style={{fontSize:"14px",color:C.white,margin:0}}>Pick a genre or mood and roll the film</p>
          </div>
        )}

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
                <p style={{color:C.goldBright,fontSize:"13px",fontWeight:"700",margin:"0 0 12px"}}>
                  ✦ Not tonight? {alts.length} great alternatives
                </p>
                <div style={{
  display:"grid",
  gridTemplateColumns:"repeat(3, 1fr)",
  gap:"12px",
  paddingBottom:"12px"
}}>
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
              <button onClick={doMore} disabled={loading} style={{width:"100%",background:"transparent",border:`1.5px solid ${C.goldBright}88`,borderRadius:"10px",padding:"13px",color:C.goldBright,fontWeight:"800",fontSize:"14px",cursor:loading?"not-allowed":"pointer",fontFamily:"Georgia,serif",opacity:loading?0.5:1}}>
                {loading?loadingMsg:"🎬 Show me 7 more"}
              </button>
              <p style={{color:`${C.goldBright}55`,fontSize:"11px",textAlign:"center",marginTop:"6px",fontStyle:"italic"}}>7 fresh picks · no repeats · the 7th Art</p>
            </div>
          </div>
        )}
      </div>

      <div style={{background:"rgba(0,0,0,0.3)",borderTop:`1px solid ${C.goldBright}33`,padding:"16px",textAlign:"center"}}>
        <p style={{margin:0,fontSize:"12px",color:C.white,fontFamily:"Georgia,serif"}}>
          Created by Screenwriter{" "}
          <a href="https://www.armelle.com/screenplays" target="_blank" rel="noopener noreferrer" style={{color:C.white,fontWeight:"700",textDecoration:"underline"}}>Armelle Cloche</a>
          {" "}· <a href="https://mycine.netlify.app/" target="_blank" rel="noopener noreferrer" style={{color:C.goldBright,fontWeight:"700",textDecoration:"underline"}}>My Ciné</a> © 2026
        </p>
      </div>
      <div style={{height:"4px",background:`linear-gradient(90deg,${C.navy},${C.goldBright},${C.navy})`}}/>
    </div>
  );
}
