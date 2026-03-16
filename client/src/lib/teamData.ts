export interface KeyPlayer {
  name: string;
  position: string;
  ppg: number;
  rpg: number;
  apg: number;
  role: string;
}

export interface Injury {
  player: string;
  status: "Out" | "Doubtful" | "Questionable" | "Day-to-Day";
  impact: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  region: "East" | "West" | "South" | "Midwest";
  conference: string;
  mascot: { name: string; description: string; origin: string };
  fightSongUrl: string;
  colors: { primary: string; secondary: string };
  stats: {
    ppg: number; rpg: number; apg: number;
    fgPct: number; threePct: number; ftPct: number;
    pace: number; offEff: number; defEff: number;
  };
  playingStyle: string[];
  keyPlayers: KeyPlayer[];
  injuries: Injury[];
  merchUrl: string;
  record: string;
  conferenceRecord: string;
  keyWins: string[];
  notableLosses: string[];
}

export const teams: Team[] = [

  // ==================== EAST REGION ====================

  {
    id: "duke",
    name: "Duke Blue Devils",
    shortName: "Duke",
    seed: 1,
    region: "East",
    conference: "ACC",
    mascot: {
      name: "Blue Devil",
      description: "A fierce blue-clad devil, inspired by a French military unit from World War I called the Chasseurs Alpins (Blue Devils).",
      origin: "Adopted in 1922 by then-student newspaper editor William Lander."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Duke+Blue+Devils+fight+song",
    colors: { primary: "#003087", secondary: "#FFFFFF" },
    stats: {
      ppg: 87.4, rpg: 37.2, apg: 17.8,
      fgPct: 48.9, threePct: 37.8, ftPct: 76.2,
      pace: 71.4, offEff: 122.8, defEff: 91.2
    },
    playingStyle: ["High-octane offense", "Elite transition game", "Aggressive perimeter defense", "NBA-caliber talent"],
    keyPlayers: [
      { name: "Cooper Flagg", position: "SF", ppg: 18.9, rpg: 8.2, apg: 4.4, role: "Star forward and projected #1 NBA pick" },
      { name: "Khaman Maluach", position: "C", ppg: 14.2, rpg: 9.1, apg: 1.2, role: "Elite shot-blocker and rim protector" },
      { name: "Kon Knueppel", position: "SG", ppg: 15.8, rpg: 4.1, apg: 3.0, role: "Sharpshooter and secondary scorer" },
      { name: "Maliq Brown", position: "SF", ppg: 9.4, rpg: 6.2, apg: 2.8, role: "Versatile wing defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "32-2",
    conferenceRecord: "17-3",
    keyWins: ["North Carolina", "UConn", "Kansas", "Auburn"],
    notableLosses: ["Virginia", "Kentucky"]
  },

  {
    id: "uconn",
    name: "UConn Huskies",
    shortName: "UConn",
    seed: 2,
    region: "East",
    conference: "Big East",
    mascot: {
      name: "Jonathan the Husky",
      description: "A Siberian Husky representing the tenacity and endurance of the Connecticut Huskies athletic program.",
      origin: "The Husky was adopted as mascot in 1934, named after Jonathan Trumbull, a Connecticut patriot."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=UConn+Huskies+fight+song",
    colors: { primary: "#000E2F", secondary: "#E4D5B7" },
    stats: {
      ppg: 81.2, rpg: 36.4, apg: 15.9,
      fgPct: 47.2, threePct: 35.4, ftPct: 74.8,
      pace: 68.9, offEff: 118.4, defEff: 92.6
    },
    playingStyle: ["Disciplined half-court offense", "Elite defensive system", "Experienced roster", "Physical interior play"],
    keyPlayers: [
      { name: "Liam McNeeley", position: "SF", ppg: 17.2, rpg: 5.4, apg: 2.6, role: "Leading scorer and versatile wing" },
      { name: "Aidan Mahaney", position: "PG", ppg: 14.8, rpg: 3.2, apg: 5.4, role: "Floor general and perimeter threat" },
      { name: "Solomon Ball", position: "SG", ppg: 12.4, rpg: 3.8, apg: 2.2, role: "Shooting guard and secondary scorer" },
      { name: "Youssouf Singare", position: "C", ppg: 10.6, rpg: 7.8, apg: 1.4, role: "Interior anchor and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "29-5",
    conferenceRecord: "14-6",
    keyWins: ["Marquette", "St. John's", "Creighton", "Providence"],
    notableLosses: ["Duke", "Villanova", "Marquette", "Georgetown", "Seton Hall"]
  },

  {
    id: "michigan-state",
    name: "Michigan State Spartans",
    shortName: "Michigan St",
    seed: 3,
    region: "East",
    conference: "Big Ten",
    mascot: {
      name: "Sparty",
      description: "A fierce Spartan warrior representing the spirit of the ancient Greek Spartans known for their military prowess.",
      origin: "Michigan State adopted the Spartan as its official mascot in 1925."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Michigan+State+Spartans+fight+song",
    colors: { primary: "#18453B", secondary: "#FFFFFF" },
    stats: {
      ppg: 78.6, rpg: 35.8, apg: 14.4,
      fgPct: 46.1, threePct: 34.8, ftPct: 73.2,
      pace: 67.4, offEff: 115.2, defEff: 93.8
    },
    playingStyle: ["Tom Izzo fundamentals", "Physical Big Ten style", "Elite rebounding", "Late-game execution"],
    keyPlayers: [
      { name: "Jase Richardson", position: "PG", ppg: 16.4, rpg: 3.8, apg: 5.2, role: "Son of Jason Richardson; lead guard and scorer" },
      { name: "Coen Carr", position: "SF", ppg: 14.2, rpg: 5.6, apg: 2.4, role: "Athletic wing and versatile scorer" },
      { name: "Szymon Zapala", position: "C", ppg: 11.8, rpg: 8.4, apg: 1.6, role: "European big man and rim protector" },
      { name: "Jeremy Fears Jr.", position: "SG", ppg: 10.2, rpg: 2.8, apg: 3.6, role: "Perimeter defender and shot creator" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "25-7",
    conferenceRecord: "13-7",
    keyWins: ["Michigan", "Illinois", "Purdue", "Indiana"],
    notableLosses: ["Duke", "UConn", "Wisconsin", "UCLA", "Ohio State", "Penn State", "Iowa"]
  },

  {
    id: "kansas",
    name: "Kansas Jayhawks",
    shortName: "Kansas",
    seed: 4,
    region: "East",
    conference: "Big 12",
    mascot: {
      name: "Big Jay",
      description: "A mythical bird born of the Kansas-Missouri border war, symbolizing the Free State of Kansas.",
      origin: "The Jayhawk legend dates to the 1840s; adopted as Kansas mascot in 1912."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Kansas+Jayhawks+fight+song",
    colors: { primary: "#0051A5", secondary: "#E8000D" },
    stats: {
      ppg: 77.8, rpg: 35.2, apg: 14.8,
      fgPct: 46.4, threePct: 34.2, ftPct: 74.6,
      pace: 68.2, offEff: 113.6, defEff: 95.4
    },
    playingStyle: ["Bill Self Princeton-style offense", "Methodical pace", "Post-up big men", "High basketball IQ"],
    keyPlayers: [
      { name: "Hunter Dickinson", position: "C", ppg: 18.4, rpg: 10.6, apg: 2.8, role: "Elite post scorer and five-year veteran" },
      { name: "AJ Storr", position: "SG", ppg: 16.2, rpg: 4.4, apg: 2.2, role: "Transfer scorer and wing threat" },
      { name: "Flory Bidunga", position: "PF", ppg: 10.4, rpg: 7.8, apg: 1.2, role: "Athletic power forward and rebounder" },
      { name: "Shakeel Moore", position: "PG", ppg: 9.8, rpg: 2.6, apg: 4.8, role: "Point guard and defensive anchor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-10",
    conferenceRecord: "11-7",
    keyWins: ["Houston", "Iowa State", "Tennessee", "Baylor"],
    notableLosses: ["Duke", "Arizona", "Texas Tech", "BYU", "TCU", "UCF", "Iowa State", "Houston", "Baylor", "Oklahoma State"]
  },

  {
    id: "st-johns",
    name: "St. John's Red Storm",
    shortName: "St. John's",
    seed: 5,
    region: "East",
    conference: "Big East",
    mascot: {
      name: "Johnny Thunderbird",
      description: "A mythical thunderbird representing power, strength, and the storm-like intensity of St. John's basketball.",
      origin: "The Red Storm nickname was adopted in 1994, replacing the Redmen nickname."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=St+Johns+Red+Storm+fight+song",
    colors: { primary: "#CC0000", secondary: "#FFFFFF" },
    stats: {
      ppg: 80.4, rpg: 34.6, apg: 16.2,
      fgPct: 47.8, threePct: 35.6, ftPct: 75.4,
      pace: 70.2, offEff: 116.8, defEff: 94.2
    },
    playingStyle: ["Up-tempo offense", "Physical pressure defense", "Guard-driven attack", "Charismatic home-court advantage"],
    keyPlayers: [
      { name: "RJ Luis Jr.", position: "SF", ppg: 18.6, rpg: 7.4, apg: 2.8, role: "Star forward and Big East standout" },
      { name: "Kadary Richmond", position: "PG", ppg: 14.2, rpg: 4.8, apg: 6.4, role: "Energetic lead guard and playmaker" },
      { name: "Simeon Wilcher", position: "SG", ppg: 13.8, rpg: 3.2, apg: 3.6, role: "Versatile scoring guard" },
      { name: "Zuby Ejiofor", position: "PF", ppg: 11.4, rpg: 7.2, apg: 1.4, role: "Powerful frontcourt presence" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "28-6",
    conferenceRecord: "15-5",
    keyWins: ["UConn", "Marquette", "Creighton", "Georgetown"],
    notableLosses: ["Duke", "UConn", "Marquette", "Providence", "Creighton", "Villanova"]
  },

  {
    id: "louisville",
    name: "Louisville Cardinals",
    shortName: "Louisville",
    seed: 6,
    region: "East",
    conference: "ACC",
    mascot: {
      name: "Cardinal Bird",
      description: "A bold red cardinal, the state bird of Kentucky, representing the pride and competitive spirit of Louisville athletics.",
      origin: "Louisville adopted the cardinal as its mascot in the early 1900s."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Louisville+Cardinals+fight+song",
    colors: { primary: "#AD0000", secondary: "#000000" },
    stats: {
      ppg: 76.8, rpg: 34.8, apg: 14.6,
      fgPct: 45.8, threePct: 34.0, ftPct: 73.8,
      pace: 68.8, offEff: 112.4, defEff: 95.8
    },
    playingStyle: ["Athletic transition offense", "Pressure defense", "Physical rebounding", "Guard-forward versatility"],
    keyPlayers: [
      { name: "Chucky Hepburn", position: "PG", ppg: 15.8, rpg: 3.4, apg: 5.6, role: "Point guard and team floor general" },
      { name: "Reyne Smith", position: "SG", ppg: 14.2, rpg: 3.0, apg: 2.4, role: "Shooter and perimeter scorer" },
      { name: "James Scott", position: "PF", ppg: 12.6, rpg: 7.4, apg: 1.8, role: "Powerful frontcourt anchor" },
      { name: "Trey Kaufman-Renn", position: "C", ppg: 10.8, rpg: 6.8, apg: 1.2, role: "Interior scorer and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-10",
    conferenceRecord: "11-9",
    keyWins: ["Duke", "North Carolina", "Virginia", "Clemson"],
    notableLosses: ["Duke", "UNC", "Virginia Tech", "Syracuse", "Georgia Tech", "Wake Forest", "Pitt", "Notre Dame", "SMU", "Stanford"]
  },

  {
    id: "ucla",
    name: "UCLA Bruins",
    shortName: "UCLA",
    seed: 7,
    region: "East",
    conference: "Big Ten",
    mascot: {
      name: "Joe Bruin",
      description: "A golden bear representing the California grizzly, strength, and the spirit of Bruin athletics.",
      origin: "The Bruin was adopted as UCLA's mascot in 1926."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=UCLA+Bruins+fight+song",
    colors: { primary: "#2D68C4", secondary: "#F2A900" },
    stats: {
      ppg: 75.4, rpg: 33.8, apg: 14.2,
      fgPct: 45.2, threePct: 33.8, ftPct: 72.6,
      pace: 67.2, offEff: 111.6, defEff: 96.4
    },
    playingStyle: ["Patient half-court sets", "High-IQ ball movement", "Zone defense flexibility", "Veteran leadership"],
    keyPlayers: [
      { name: "Eric Dailey Jr.", position: "SF", ppg: 16.4, rpg: 5.8, apg: 2.2, role: "Athletic wing and primary scorer" },
      { name: "Dylan Andrews", position: "PG", ppg: 13.8, rpg: 3.4, apg: 5.2, role: "Lead playmaker and facilitator" },
      { name: "Adem Bona", position: "C", ppg: 12.2, rpg: 8.2, apg: 1.4, role: "Shot blocker and interior anchor" },
      { name: "Sebastian Mack", position: "SG", ppg: 10.6, rpg: 3.2, apg: 2.6, role: "Versatile scorer off the bench" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-11",
    conferenceRecord: "11-9",
    keyWins: ["Michigan State", "Purdue", "Ohio State", "USC"],
    notableLosses: ["Duke", "Michigan", "Indiana", "Penn State", "Nebraska", "Wisconsin", "Iowa", "Rutgers", "Minnesota", "Maryland", "Northwestern"]
  },

  {
    id: "ohio-state",
    name: "Ohio State Buckeyes",
    shortName: "Ohio State",
    seed: 8,
    region: "East",
    conference: "Big Ten",
    mascot: {
      name: "Brutus Buckeye",
      description: "A buckeye nut with a face, representing the Ohio buckeye tree that is native to Ohio.",
      origin: "Brutus Buckeye was created in 1965 by student Ray Bourhis."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Ohio+State+Buckeyes+fight+song",
    colors: { primary: "#BB0000", secondary: "#666666" },
    stats: {
      ppg: 73.8, rpg: 33.2, apg: 13.8,
      fgPct: 44.6, threePct: 33.2, ftPct: 72.4,
      pace: 66.8, offEff: 110.4, defEff: 97.2
    },
    playingStyle: ["Defensive-first system", "Transition opportunities", "Interior physicality", "Controlled tempo"],
    keyPlayers: [
      { name: "Bruce Thornton", position: "PG", ppg: 17.2, rpg: 3.6, apg: 5.8, role: "Lead guard and team captain" },
      { name: "Devin Royal", position: "SF", ppg: 14.4, rpg: 6.4, apg: 2.0, role: "Versatile forward and scorer" },
      { name: "Evan Mahaffey", position: "PF", ppg: 10.8, rpg: 7.2, apg: 1.6, role: "Big Ten-tested frontcourt player" },
      { name: "Taison Chatman", position: "SG", ppg: 9.6, rpg: 3.0, apg: 2.4, role: "Perimeter threat and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-12",
    conferenceRecord: "10-10",
    keyWins: ["Michigan State", "UCLA", "Indiana", "Purdue"],
    notableLosses: ["Duke", "Michigan", "Michigan State", "Illinois", "Wisconsin", "Iowa", "Nebraska", "UCLA", "Northwestern", "Penn State", "Rutgers", "Maryland"]
  },

  {
    id: "tcu",
    name: "TCU Horned Frogs",
    shortName: "TCU",
    seed: 9,
    region: "East",
    conference: "Big 12",
    mascot: {
      name: "Super Frog",
      description: "A Texas horned lizard (commonly called a horned frog), a spiky reptile native to the Southwest.",
      origin: "TCU adopted the Horned Frog as its mascot in 1897."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=TCU+Horned+Frogs+fight+song",
    colors: { primary: "#4D1979", secondary: "#A3A9AC" },
    stats: {
      ppg: 74.6, rpg: 33.6, apg: 13.4,
      fgPct: 44.8, threePct: 33.6, ftPct: 73.0,
      pace: 67.6, offEff: 110.8, defEff: 97.6
    },
    playingStyle: ["Balanced offensive attack", "Active defensive pressure", "Transition scoring", "Big 12 physicality"],
    keyPlayers: [
      { name: "Vasean Allette", position: "SF", ppg: 16.8, rpg: 5.6, apg: 2.2, role: "Versatile wing and leading scorer" },
      { name: "Chuck O'Bannon Jr.", position: "SG", ppg: 13.4, rpg: 3.8, apg: 2.8, role: "Experienced guard and defender" },
      { name: "Essam Mostafa", position: "C", ppg: 11.2, rpg: 8.4, apg: 1.2, role: "Rim protector and interior scorer" },
      { name: "Micah Peavy", position: "SF", ppg: 9.4, rpg: 4.2, apg: 2.4, role: "Defensive specialist and wing" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-11",
    conferenceRecord: "10-8",
    keyWins: ["Kansas", "Houston", "Arizona", "Baylor"],
    notableLosses: ["Duke", "Houston", "Iowa State", "Arizona", "Kansas", "BYU", "Texas Tech", "Oklahoma State", "Cincinnati", "West Virginia"]
  },

  {
    id: "ucf",
    name: "UCF Knights",
    shortName: "UCF",
    seed: 10,
    region: "East",
    conference: "Big 12",
    mascot: {
      name: "Knightro",
      description: "A fierce medieval knight representing the warrior spirit and chivalry of the UCF athletic programs.",
      origin: "UCF adopted the Knights nickname in 1968 in honor of the university's founding next to a military installation."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=UCF+Knights+fight+song",
    colors: { primary: "#FFC904", secondary: "#000000" },
    stats: {
      ppg: 73.2, rpg: 32.8, apg: 13.2,
      fgPct: 44.4, threePct: 33.0, ftPct: 72.2,
      pace: 67.0, offEff: 109.8, defEff: 98.2
    },
    playingStyle: ["Athletic guard play", "Three-point oriented offense", "Defensive versatility", "Up-tempo tendencies"],
    keyPlayers: [
      { name: "Darius Johnson", position: "PG", ppg: 15.8, rpg: 3.4, apg: 6.2, role: "Dynamic point guard and facilitator" },
      { name: "Jaylin Sellers", position: "SF", ppg: 13.6, rpg: 5.2, apg: 2.0, role: "Wing scorer and rebounder" },
      { name: "Omar Payne", position: "PF", ppg: 10.4, rpg: 7.6, apg: 1.4, role: "Interior presence and rebounder" },
      { name: "Cole Coombs", position: "SG", ppg: 9.2, rpg: 2.8, apg: 2.6, role: "Perimeter shooter and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-11",
    conferenceRecord: "9-9",
    keyWins: ["Houston", "Kansas", "Iowa State", "TCU"],
    notableLosses: ["Duke", "Arizona", "BYU", "Texas Tech", "Houston", "Iowa State", "Kansas", "Cincinnati", "Oklahoma State", "West Virginia"]
  },

  {
    id: "south-florida",
    name: "South Florida Bulls",
    shortName: "South Florida",
    seed: 11,
    region: "East",
    conference: "American",
    mascot: {
      name: "Rocky the Bull",
      description: "A charging bull representing strength, determination, and the tenacious spirit of South Florida athletics.",
      origin: "USF adopted the Bull mascot in 1962 when the university was founded."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=South+Florida+Bulls+fight+song",
    colors: { primary: "#006747", secondary: "#CFC493" },
    stats: {
      ppg: 74.8, rpg: 33.4, apg: 14.0,
      fgPct: 45.4, threePct: 34.6, ftPct: 73.4,
      pace: 69.4, offEff: 111.2, defEff: 96.8
    },
    playingStyle: ["Pressure defense", "Fast-break opportunities", "Guard-heavy lineup", "American Athletic Conference toughness"],
    keyPlayers: [
      { name: "Selton Miguel", position: "PG", ppg: 17.4, rpg: 4.2, apg: 5.8, role: "All-American Athletic guard and team leader" },
      { name: "Nae'Qwan Tomlin", position: "SF", ppg: 14.8, rpg: 6.4, apg: 2.4, role: "Athletic wing and versatile scorer" },
      { name: "Keyshawn Bryant", position: "SG", ppg: 12.6, rpg: 3.8, apg: 2.0, role: "Perimeter shooter and defender" },
      { name: "Russel Tchewa", position: "C", ppg: 9.8, rpg: 7.4, apg: 1.0, role: "Rebounding big man" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "25-8",
    conferenceRecord: "14-4",
    keyWins: ["Memphis", "Tulane", "Cincinnati", "East Carolina"],
    notableLosses: ["Louisville", "Florida", "Memphis", "Tulane", "Cincinnati", "Wichita State", "Temple", "UTSA"]
  },

  {
    id: "northern-iowa",
    name: "Northern Iowa Panthers",
    shortName: "UNI",
    seed: 12,
    region: "East",
    conference: "MVC",
    mascot: {
      name: "T.C. the Panther",
      description: "A black panther representing the strength, agility, and fierce competitive spirit of the Panthers.",
      origin: "UNI adopted the Panther as its mascot in 1931."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Northern+Iowa+Panthers+fight+song",
    colors: { primary: "#4B116F", secondary: "#FFCC00" },
    stats: {
      ppg: 72.4, rpg: 33.0, apg: 13.0,
      fgPct: 44.2, threePct: 34.4, ftPct: 72.8,
      pace: 66.4, offEff: 108.6, defEff: 99.2
    },
    playingStyle: ["MVC defensive tenacity", "Half-court execution", "Ball-screen offense", "Senior leadership"],
    keyPlayers: [
      { name: "Bowen Born", position: "SG", ppg: 18.2, rpg: 4.0, apg: 2.8, role: "Sharpshooter and leading scorer" },
      { name: "Tytan Anderson", position: "PF", ppg: 12.4, rpg: 7.8, apg: 1.6, role: "Frontcourt stalwart and rebounder" },
      { name: "Trey Campbell", position: "PG", ppg: 11.6, rpg: 3.2, apg: 5.4, role: "Lead guard and facilitator" },
      { name: "Nate Heise", position: "SF", ppg: 8.8, rpg: 4.6, apg: 2.2, role: "Defensive wing and versatile contributor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-12",
    conferenceRecord: "12-6",
    keyWins: ["Drake", "Bradley", "Illinois State", "Missouri State"],
    notableLosses: ["St. John's", "Drake", "Bradley", "Illinois State", "Missouri State", "Indiana State", "Belmont", "Valparaiso", "Southern Illinois", "Evansville", "Loyola Chicago", "Murray State"]
  },

  {
    id: "cal-baptist",
    name: "California Baptist Lancers",
    shortName: "Cal Baptist",
    seed: 13,
    region: "East",
    conference: "WAC",
    mascot: {
      name: "Lance the Lancer",
      description: "A medieval mounted knight wielding a lance, representing valor, courage, and Christian faith.",
      origin: "California Baptist University adopted the Lancer as its athletic mascot reflecting its Christian heritage."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=California+Baptist+Lancers+fight+song",
    colors: { primary: "#002E6D", secondary: "#C8A42C" },
    stats: {
      ppg: 74.2, rpg: 33.6, apg: 13.8,
      fgPct: 45.6, threePct: 35.2, ftPct: 73.6,
      pace: 70.0, offEff: 110.4, defEff: 100.2
    },
    playingStyle: ["High-scoring offense", "Fast-break basketball", "Three-point shooting", "WAC physicality"],
    keyPlayers: [
      { name: "Taran Armstrong", position: "PG", ppg: 19.6, rpg: 4.0, apg: 5.6, role: "WAC Player of the Year and offensive catalyst" },
      { name: "Noa Gonsalves", position: "SG", ppg: 14.4, rpg: 3.4, apg: 3.2, role: "Perimeter scorer and defender" },
      { name: "Davon Cole", position: "SF", ppg: 11.8, rpg: 5.8, apg: 1.8, role: "Versatile wing scorer" },
      { name: "Ty Rowell", position: "C", ppg: 10.2, rpg: 7.2, apg: 1.2, role: "Interior presence and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "25-8",
    conferenceRecord: "13-5",
    keyWins: ["New Mexico State", "Grand Canyon", "Utah Valley", "UTRGV"],
    notableLosses: ["Kansas", "Arizona", "Grand Canyon", "New Mexico State", "Utah Valley", "Stephen F. Austin", "Tarleton State", "Abilene Christian"]
  },

  {
    id: "ndsu",
    name: "North Dakota State Bison",
    shortName: "NDSU",
    seed: 14,
    region: "East",
    conference: "Summit",
    mascot: {
      name: "Thundar the Bison",
      description: "A massive bison bull symbolizing the power, resilience, and spirit of the Great Plains.",
      origin: "NDSU adopted the Bison as its mascot upon founding; the current Thundar character debuted in the 1990s."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=North+Dakota+State+Bison+fight+song",
    colors: { primary: "#005643", secondary: "#FFC82E" },
    stats: {
      ppg: 76.8, rpg: 34.2, apg: 14.4,
      fgPct: 46.2, threePct: 34.8, ftPct: 74.2,
      pace: 69.2, offEff: 112.6, defEff: 99.8
    },
    playingStyle: ["Summit League dominance", "High-efficiency offense", "Tenacious defense", "Experienced roster"],
    keyPlayers: [
      { name: "RJ Mingo", position: "SF", ppg: 20.4, rpg: 6.8, apg: 3.0, role: "Summit League's top scorer and all-around player" },
      { name: "Boden Skunberg", position: "PG", ppg: 14.2, rpg: 3.4, apg: 5.8, role: "Point guard and floor general" },
      { name: "Grant Nelson", position: "PF", ppg: 12.6, rpg: 8.4, apg: 2.2, role: "Stretch forward and rebounder" },
      { name: "Dezmon Jackson", position: "SG", ppg: 10.4, rpg: 2.8, apg: 2.6, role: "Shooting guard and perimeter scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "27-7",
    conferenceRecord: "14-4",
    keyWins: ["South Dakota State", "Omaha", "Western Illinois", "Denver"],
    notableLosses: ["Michigan State", "Iowa", "South Dakota State", "Omaha", "Western Illinois", "Denver", "South Dakota", "Oral Roberts"]
  },

  {
    id: "furman",
    name: "Furman Paladins",
    shortName: "Furman",
    seed: 15,
    region: "East",
    conference: "Southern",
    mascot: {
      name: "The Paladin",
      description: "A medieval knight, one of the twelve peers of Charlemagne, representing chivalry and fierce competition.",
      origin: "Furman adopted the Paladin name in 1961."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Furman+Paladins+fight+song",
    colors: { primary: "#582C83", secondary: "#FFFFFF" },
    stats: {
      ppg: 71.4, rpg: 32.4, apg: 12.6,
      fgPct: 43.8, threePct: 34.0, ftPct: 71.8,
      pace: 65.8, offEff: 107.2, defEff: 101.4
    },
    playingStyle: ["Three-point heavy offense", "Southern Conference excellence", "Motion offense", "Disciplined execution"],
    keyPlayers: [
      { name: "Jalen Slawson", position: "SF", ppg: 16.8, rpg: 6.4, apg: 2.6, role: "Team leader and all-conference forward" },
      { name: "Mike Bothwell", position: "PG", ppg: 13.4, rpg: 3.2, apg: 5.0, role: "Veteran guard and floor general" },
      { name: "Marcus Foster", position: "SG", ppg: 11.2, rpg: 3.0, apg: 2.4, role: "Perimeter scorer and three-point threat" },
      { name: "Donovan Atwell", position: "PF", ppg: 9.4, rpg: 6.2, apg: 1.4, role: "Physical frontcourt presence" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-12",
    conferenceRecord: "13-5",
    keyWins: ["Wofford", "Samford", "Mercer", "ETSU"],
    notableLosses: ["UConn", "Wofford", "Samford", "Mercer", "ETSU", "VMI", "Chattanooga", "Western Carolina", "The Citadel", "UNC Greensboro", "Longwood", "Davidson"]
  },

  {
    id: "siena",
    name: "Siena Saints",
    shortName: "Siena",
    seed: 16,
    region: "East",
    conference: "MAAC",
    mascot: {
      name: "The Saint",
      description: "A righteous saint representing the Catholic traditions and noble spirit of Siena College.",
      origin: "Siena College, named after the city of Siena, Italy, adopted Saints as its athletic identity."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Siena+Saints+fight+song",
    colors: { primary: "#1B5638", secondary: "#FFC72C" },
    stats: {
      ppg: 70.2, rpg: 31.8, apg: 12.2,
      fgPct: 43.2, threePct: 33.4, ftPct: 71.2,
      pace: 65.4, offEff: 105.8, defEff: 103.2
    },
    playingStyle: ["MAAC conference champion", "Defensive-oriented play", "Half-court execution", "Veteran-led system"],
    keyPlayers: [
      { name: "Jackson Stormo", position: "C", ppg: 15.6, rpg: 8.6, apg: 1.8, role: "MAAC center of the year and interior anchor" },
      { name: "Javian McCollum", position: "PG", ppg: 14.8, rpg: 3.0, apg: 5.4, role: "Dynamic guard and team leader" },
      { name: "Colby Rogers", position: "SG", ppg: 11.4, rpg: 3.4, apg: 2.4, role: "Scorer and perimeter threat" },
      { name: "Andrew Platek", position: "SF", ppg: 9.6, rpg: 4.8, apg: 1.8, role: "Versatile wing and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-11",
    conferenceRecord: "12-6",
    keyWins: ["Marist", "Quinnipiac", "Niagara", "Rider"],
    notableLosses: ["Duke", "Marist", "Quinnipiac", "Niagara", "Rider", "Fairfield", "Canisius", "Manhattan", "Iona", "Saint Peter's"]
  },

  // ==================== WEST REGION ====================

  {
    id: "arizona",
    name: "Arizona Wildcats",
    shortName: "Arizona",
    seed: 1,
    region: "West",
    conference: "Big 12",
    mascot: {
      name: "Wilbur the Wildcat",
      description: "A fierce wildcat representing the native bobcat of the Sonoran Desert, symbolizing Arizona's strength and tenacity.",
      origin: "Arizona adopted the Wildcat in 1914 after a football game where players were described as wildcats."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Arizona+Wildcats+fight+song",
    colors: { primary: "#AB0520", secondary: "#0C234B" },
    stats: {
      ppg: 86.8, rpg: 36.8, apg: 17.2,
      fgPct: 48.6, threePct: 37.4, ftPct: 75.8,
      pace: 72.2, offEff: 122.2, defEff: 91.8
    },
    playingStyle: ["High-powered offense", "Elite guard play", "Athletic transition game", "Aggressive rebounding"],
    keyPlayers: [
      { name: "Caleb Love", position: "PG", ppg: 19.4, rpg: 4.2, apg: 5.2, role: "Elite scorer and lead guard" },
      { name: "KJ Lewis", position: "SF", ppg: 16.8, rpg: 6.4, apg: 3.2, role: "Athletic wing and versatile scorer" },
      { name: "Henri Veesaar", position: "C", ppg: 13.6, rpg: 9.2, apg: 1.4, role: "European big man and rim anchor" },
      { name: "Jaden Bradley", position: "SG", ppg: 12.4, rpg: 3.6, apg: 4.8, role: "Dynamic guard and secondary scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "32-2",
    conferenceRecord: "17-3",
    keyWins: ["Duke", "Houston", "Kansas", "BYU"],
    notableLosses: ["Houston", "Iowa State"]
  },

  {
    id: "purdue",
    name: "Purdue Boilermakers",
    shortName: "Purdue",
    seed: 2,
    region: "West",
    conference: "Big Ten",
    mascot: {
      name: "Purdue Pete",
      description: "A hardhat-wearing industrial worker representing the engineering and industrial heritage of Purdue University.",
      origin: "The Boilermaker name came from an 1891 newspaper reference to Purdue's football team as 'Boilermakers.'"
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Purdue+Boilermakers+fight+song",
    colors: { primary: "#CFB991", secondary: "#000000" },
    stats: {
      ppg: 79.4, rpg: 36.4, apg: 15.2,
      fgPct: 47.0, threePct: 35.8, ftPct: 74.4,
      pace: 68.6, offEff: 116.4, defEff: 93.2
    },
    playingStyle: ["Big man-dominated offense", "Inside-out game", "Methodical half-court sets", "Physical defense"],
    keyPlayers: [
      { name: "Zach Edey", position: "C", ppg: 22.6, rpg: 12.4, apg: 2.2, role: "Two-time Player of the Year and dominant center" },
      { name: "Fletcher Loyer", position: "PG", ppg: 13.8, rpg: 3.0, apg: 4.6, role: "Sharp-shooting point guard" },
      { name: "Braden Smith", position: "SG", ppg: 12.2, rpg: 4.8, apg: 5.4, role: "Versatile guard and facilitator" },
      { name: "Mason Gillis", position: "SF", ppg: 9.6, rpg: 5.4, apg: 1.8, role: "Role player and defensive wing" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "27-8",
    conferenceRecord: "14-6",
    keyWins: ["Michigan", "Michigan State", "Wisconsin", "Illinois"],
    notableLosses: ["Arizona", "Michigan", "Michigan State", "Wisconsin", "Illinois", "Ohio State", "UCLA", "Nebraska", "Northwestern", "Penn State", "Iowa", "Indiana", "Maryland", "Rutgers"]
  },

  {
    id: "gonzaga",
    name: "Gonzaga Bulldogs",
    shortName: "Gonzaga",
    seed: 3,
    region: "West",
    conference: "WCC",
    mascot: {
      name: "Spike the Bulldog",
      description: "A determined bulldog representing the tenacity, loyalty, and never-give-up spirit of Gonzaga athletics.",
      origin: "Gonzaga adopted the Bulldog as its mascot in the early 20th century."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Gonzaga+Bulldogs+fight+song",
    colors: { primary: "#002B5C", secondary: "#CC0033" },
    stats: {
      ppg: 83.6, rpg: 35.6, apg: 16.4,
      fgPct: 48.2, threePct: 36.8, ftPct: 75.6,
      pace: 71.0, offEff: 119.8, defEff: 92.4
    },
    playingStyle: ["Elite offensive system", "NBA-level talent", "Post-entry and kick-out game", "Precision ball movement"],
    keyPlayers: [
      { name: "Ryan Nembhard", position: "PG", ppg: 17.8, rpg: 4.2, apg: 7.6, role: "Elite point guard and WCC Player of the Year" },
      { name: "Graham Ike", position: "C", ppg: 16.4, rpg: 9.4, apg: 2.0, role: "Dominant post scorer and rebounder" },
      { name: "Braden Huff", position: "PF", ppg: 14.2, rpg: 7.6, apg: 1.8, role: "Athletic power forward and stretch big" },
      { name: "Nolan Hickman", position: "SG", ppg: 12.6, rpg: 3.2, apg: 4.2, role: "Versatile guard and shooter" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "30-3",
    conferenceRecord: "16-2",
    keyWins: ["Arizona", "Saint Mary's", "BYU", "San Francisco"],
    notableLosses: ["Arizona", "Saint Mary's", "BYU"]
  },

  {
    id: "arkansas",
    name: "Arkansas Razorbacks",
    shortName: "Arkansas",
    seed: 4,
    region: "West",
    conference: "SEC",
    mascot: {
      name: "Big Red",
      description: "A wild razorback hog representing the ferocity and toughness of the native Arkansas wild boar.",
      origin: "Arkansas adopted the Razorback as its mascot in 1909 after a coach compared his team to razorback hogs."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Arkansas+Razorbacks+fight+song",
    colors: { primary: "#9D2235", secondary: "#FFFFFF" },
    stats: {
      ppg: 78.2, rpg: 35.0, apg: 14.4,
      fgPct: 46.8, threePct: 35.0, ftPct: 74.2,
      pace: 70.4, offEff: 114.6, defEff: 94.8
    },
    playingStyle: ["High-energy press defense", "Fast-break offense", "Athletic wings", "SEC-level physicality"],
    keyPlayers: [
      { name: "Tramon Mark", position: "SG", ppg: 16.8, rpg: 4.6, apg: 3.0, role: "Versatile scorer and defender" },
      { name: "Trevon Brazile", position: "PF", ppg: 15.4, rpg: 8.6, apg: 1.8, role: "Athletic forward and shot blocker" },
      { name: "Ricky Council IV", position: "SF", ppg: 14.2, rpg: 5.2, apg: 2.4, role: "Wing scorer and versatile player" },
      { name: "Anthony Black", position: "PG", ppg: 12.6, rpg: 4.0, apg: 5.6, role: "Playmaking guard and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "26-8",
    conferenceRecord: "13-5",
    keyWins: ["Alabama", "Florida", "Tennessee", "Auburn"],
    notableLosses: ["Arizona", "Kentucky", "Alabama", "Florida", "Auburn", "Tennessee", "LSU", "Georgia", "Mississippi State", "Ole Miss", "Missouri", "South Carolina", "Vanderbilt", "Texas A&M"]
  },

  {
    id: "wisconsin",
    name: "Wisconsin Badgers",
    shortName: "Wisconsin",
    seed: 5,
    region: "West",
    conference: "Big Ten",
    mascot: {
      name: "Bucky Badger",
      description: "A fierce badger representing the official state animal of Wisconsin, known for tenacity and toughness.",
      origin: "Wisconsin adopted Bucky Badger as its mascot in 1949."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Wisconsin+Badgers+fight+song",
    colors: { primary: "#C5050C", secondary: "#FFFFFF" },
    stats: {
      ppg: 74.6, rpg: 34.4, apg: 14.2,
      fgPct: 45.8, threePct: 35.2, ftPct: 74.0,
      pace: 65.8, offEff: 112.8, defEff: 94.6
    },
    playingStyle: ["Greg Gard methodical offense", "Patient ball movement", "Elite rebounding", "Defensive toughness"],
    keyPlayers: [
      { name: "AJ Storr", position: "SG", ppg: 17.4, rpg: 4.4, apg: 2.6, role: "Leading scorer and perimeter threat" },
      { name: "Tyler Wahl", position: "PF", ppg: 13.2, rpg: 7.6, apg: 2.4, role: "Veteran forward and team captain" },
      { name: "Chucky Hepburn", position: "PG", ppg: 11.8, rpg: 3.0, apg: 5.4, role: "Point guard and floor general" },
      { name: "Steven Crowl", position: "C", ppg: 10.4, rpg: 6.8, apg: 1.8, role: "Stretch center and shooter" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-10",
    conferenceRecord: "12-8",
    keyWins: ["Purdue", "Michigan State", "Illinois", "Indiana"],
    notableLosses: ["Arizona", "Michigan", "Purdue", "Michigan State", "Illinois", "Ohio State", "UCLA", "Nebraska", "Northwestern", "Maryland"]
  },

  {
    id: "byu",
    name: "BYU Cougars",
    shortName: "BYU",
    seed: 6,
    region: "West",
    conference: "Big 12",
    mascot: {
      name: "Cosmo the Cougar",
      description: "A blue and white cougar representing the mountain lion found in the Wasatch Mountains near Provo, Utah.",
      origin: "BYU adopted the Cougar as its mascot in 1922."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=BYU+Cougars+fight+song",
    colors: { primary: "#002E8C", secondary: "#FFFFFF" },
    stats: {
      ppg: 76.2, rpg: 33.8, apg: 14.8,
      fgPct: 46.2, threePct: 35.8, ftPct: 74.6,
      pace: 68.4, offEff: 112.6, defEff: 95.6
    },
    playingStyle: ["Disciplined offensive system", "Ball movement and spacing", "Three-point shooting", "Physical defense"],
    keyPlayers: [
      { name: "Fousseyni Traore", position: "PF", ppg: 15.8, rpg: 9.2, apg: 1.6, role: "Dominant rebounder and post scorer" },
      { name: "Dallin Hall", position: "PG", ppg: 14.2, rpg: 3.8, apg: 6.2, role: "Point guard and Big 12 playmaker" },
      { name: "Spencer Johnson", position: "SF", ppg: 12.6, rpg: 4.4, apg: 2.4, role: "Versatile wing and defender" },
      { name: "Richie Saunders", position: "SG", ppg: 11.4, rpg: 4.0, apg: 2.2, role: "Perimeter scorer and athlete" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-11",
    conferenceRecord: "11-7",
    keyWins: ["Kansas", "Houston", "Iowa State", "TCU"],
    notableLosses: ["Arizona", "Houston", "Iowa State", "Kansas", "Texas Tech", "UCF", "Oklahoma State", "Cincinnati", "West Virginia", "Baylor", "Oklahoma", "Colorado"]
  },

  {
    id: "miami-fl",
    name: "Miami Hurricanes",
    shortName: "Miami (FL)",
    seed: 7,
    region: "West",
    conference: "ACC",
    mascot: {
      name: "Sebastian the Ibis",
      description: "A white ibis, a bird that seeks shelter just before and emerges just after a hurricane, symbolizing the resilience of Miami.",
      origin: "The ibis was adopted as Miami's mascot in 1926, inspired by ibises that fly ahead of hurricanes."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Miami+Hurricanes+fight+song",
    colors: { primary: "#005030", secondary: "#F47321" },
    stats: {
      ppg: 76.8, rpg: 33.6, apg: 14.6,
      fgPct: 46.0, threePct: 34.6, ftPct: 73.8,
      pace: 69.2, offEff: 112.8, defEff: 95.8
    },
    playingStyle: ["Athletic guards", "Fast-break opportunities", "ACC defensive intensity", "Versatile perimeter play"],
    keyPlayers: [
      { name: "Isaiah Wong", position: "SG", ppg: 18.2, rpg: 4.0, apg: 3.4, role: "Elite scorer and team captain" },
      { name: "Norchad Omier", position: "PF", ppg: 14.8, rpg: 9.6, apg: 1.4, role: "Dominant rebounder and post scorer" },
      { name: "Nijel Pack", position: "PG", ppg: 13.2, rpg: 3.2, apg: 4.8, role: "Lead guard and shooter" },
      { name: "Wooga Poplar", position: "SF", ppg: 10.8, rpg: 4.2, apg: 2.2, role: "Versatile wing and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "25-8",
    conferenceRecord: "13-7",
    keyWins: ["Duke", "North Carolina", "Virginia", "Louisville"],
    notableLosses: ["Arizona", "Duke", "UNC", "Virginia", "Clemson", "Louisville", "Georgia Tech", "Wake Forest", "Syracuse", "Pitt", "Notre Dame", "Stanford"]
  },

  {
    id: "villanova",
    name: "Villanova Wildcats",
    shortName: "Villanova",
    seed: 8,
    region: "West",
    conference: "Big East",
    mascot: {
      name: "Will D. Cat",
      description: "A wildcat representing the fierce, tenacious spirit of Villanova athletics and its championship tradition.",
      origin: "Villanova has used the Wildcat as its mascot since the early 20th century."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Villanova+Wildcats+fight+song",
    colors: { primary: "#00205B", secondary: "#009BDE" },
    stats: {
      ppg: 74.4, rpg: 33.0, apg: 14.2,
      fgPct: 45.4, threePct: 35.0, ftPct: 73.6,
      pace: 67.6, offEff: 111.0, defEff: 96.8
    },
    playingStyle: ["Princeton-style motion offense", "Perimeter shooting", "Disciplined defense", "Big East tradition"],
    keyPlayers: [
      { name: "Cam Whitmore", position: "SF", ppg: 16.8, rpg: 5.8, apg: 2.6, role: "Athletic wing and team leader" },
      { name: "Mark Armstrong", position: "PG", ppg: 13.4, rpg: 3.2, apg: 5.8, role: "Playmaking guard and shooter" },
      { name: "Eric Dixon", position: "PF", ppg: 12.6, rpg: 7.4, apg: 1.6, role: "Veteran post scorer and rebounder" },
      { name: "TJ Bamba", position: "SG", ppg: 10.2, rpg: 3.8, apg: 2.4, role: "Athletic defender and perimeter scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-8",
    conferenceRecord: "13-7",
    keyWins: ["UConn", "Marquette", "St. John's", "Georgetown"],
    notableLosses: ["Arizona", "UConn", "Marquette", "Creighton", "Providence", "St. John's", "Xavier", "Butler", "DePaul"]
  },

  {
    id: "utah-state",
    name: "Utah State Aggies",
    shortName: "Utah State",
    seed: 9,
    region: "West",
    conference: "MWC",
    mascot: {
      name: "Big Blue",
      description: "A blue bull representing the agricultural and land-grant heritage of Utah State University.",
      origin: "Utah State adopted Aggies and the bull mascot representing their agricultural roots."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Utah+State+Aggies+fight+song",
    colors: { primary: "#0F2439", secondary: "#8B93A7" },
    stats: {
      ppg: 76.4, rpg: 34.8, apg: 14.8,
      fgPct: 46.4, threePct: 36.0, ftPct: 74.8,
      pace: 70.0, offEff: 113.4, defEff: 97.8
    },
    playingStyle: ["Mountain West dominance", "Three-point shooting", "Athletic perimeter defense", "Transition offense"],
    keyPlayers: [
      { name: "Danny Sprinkle", position: "SF", ppg: 20.8, rpg: 7.4, apg: 4.2, role: "Mountain West Player of the Year" },
      { name: "Ian Martinez", position: "SG", ppg: 14.4, rpg: 3.8, apg: 3.6, role: "Versatile scorer and shooter" },
      { name: "Zee Hamoda", position: "PF", ppg: 11.6, rpg: 7.2, apg: 1.4, role: "Frontcourt anchor and rebounder" },
      { name: "Naz Bohannon", position: "PF", ppg: 9.8, rpg: 6.8, apg: 2.2, role: "Veteran forward and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "28-6",
    conferenceRecord: "15-3",
    keyWins: ["San Diego State", "New Mexico", "Wyoming", "Fresno State"],
    notableLosses: ["Villanova", "San Diego State", "New Mexico", "Wyoming", "Fresno State", "UNLV"]
  },

  {
    id: "missouri",
    name: "Missouri Tigers",
    shortName: "Missouri",
    seed: 10,
    region: "West",
    conference: "SEC",
    mascot: {
      name: "Truman the Tiger",
      description: "A Bengal tiger representing the strength, ferocity, and competitive spirit of Missouri athletics.",
      origin: "Missouri adopted the Tiger as its mascot in 1890, inspired by Civil War-era Missouri Tigers militia."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Missouri+Tigers+fight+song",
    colors: { primary: "#F1B82D", secondary: "#000000" },
    stats: {
      ppg: 73.4, rpg: 32.8, apg: 13.6,
      fgPct: 44.6, threePct: 33.8, ftPct: 72.6,
      pace: 67.4, offEff: 110.0, defEff: 98.4
    },
    playingStyle: ["SEC physicality", "Interior-based offense", "Defensive intensity", "Controlled tempo"],
    keyPlayers: [
      { name: "Kobe Brown", position: "SF", ppg: 16.6, rpg: 6.8, apg: 3.2, role: "Versatile forward and leading scorer" },
      { name: "D'Moi Hodge", position: "SG", ppg: 14.2, rpg: 3.4, apg: 2.8, role: "Perimeter scorer and defender" },
      { name: "Mohamed Diarra", position: "C", ppg: 10.8, rpg: 7.6, apg: 1.2, role: "Interior anchor and rebounder" },
      { name: "Sean East II", position: "PG", ppg: 10.4, rpg: 2.6, apg: 5.2, role: "Playmaking guard and facilitator" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "20-12",
    conferenceRecord: "9-9",
    keyWins: ["Arkansas", "Tennessee", "Florida", "Auburn"],
    notableLosses: ["Arizona", "Miami (FL)", "Arkansas", "Tennessee", "Alabama", "Florida", "Auburn", "Kentucky", "Georgia", "Vanderbilt", "Texas A&M", "Ole Miss"]
  },

  {
    id: "texas",
    name: "Texas Longhorns",
    shortName: "Texas",
    seed: 11,
    region: "West",
    conference: "SEC",
    mascot: {
      name: "Bevo the Longhorn",
      description: "A massive Texas Longhorn steer representing the history of cattle ranching in Texas and the Lone Star State.",
      origin: "Bevo was first brought to a UT game in 1916 and became the live mascot of the Longhorns."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Texas+Longhorns+fight+song",
    colors: { primary: "#BF5700", secondary: "#FFFFFF" },
    stats: {
      ppg: 72.6, rpg: 32.4, apg: 13.2,
      fgPct: 44.2, threePct: 33.4, ftPct: 72.0,
      pace: 67.0, offEff: 109.4, defEff: 99.2
    },
    playingStyle: ["SEC transition game", "Athletic guard play", "Physical defense", "Veteran roster"],
    keyPlayers: [
      { name: "Chendall Weaver", position: "SG", ppg: 15.4, rpg: 3.8, apg: 2.8, role: "Leading scorer and perimeter threat" },
      { name: "Max Abmas", position: "PG", ppg: 14.8, rpg: 2.8, apg: 4.4, role: "Explosive scorer and floor general" },
      { name: "Ze'Rik Onyema", position: "C", ppg: 11.2, rpg: 7.8, apg: 1.4, role: "Interior anchor and shot blocker" },
      { name: "Kadin Shedrick", position: "PF", ppg: 9.6, rpg: 6.2, apg: 1.2, role: "Experienced forward and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "18-14",
    conferenceRecord: "8-10",
    keyWins: ["Tennessee", "Florida", "Auburn", "Georgia"],
    notableLosses: ["Arizona", "Alabama", "Arkansas", "Florida", "Kentucky", "Auburn", "Tennessee", "Mississippi State", "Ole Miss", "Missouri", "South Carolina", "Vanderbilt", "Texas A&M", "LSU"]
  },

  {
    id: "nc-state",
    name: "NC State Wolfpack",
    shortName: "NC State",
    seed: 11,
    region: "West",
    conference: "ACC",
    mascot: {
      name: "Mr. Wuf",
      description: "A wolf representing the power and ferocity of the Wolfpack, North Carolina State's fierce athletic identity.",
      origin: "NC State adopted the Wolfpack nickname in 1922."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=NC+State+Wolfpack+fight+song",
    colors: { primary: "#CC0000", secondary: "#FFFFFF" },
    stats: {
      ppg: 73.8, rpg: 33.2, apg: 13.8,
      fgPct: 44.8, threePct: 34.2, ftPct: 72.8,
      pace: 68.6, offEff: 110.2, defEff: 98.8
    },
    playingStyle: ["Athletic defensive pressure", "Fast break transition", "Guard-driven offense", "ACC tournament toughness"],
    keyPlayers: [
      { name: "DJ Horne", position: "PG", ppg: 17.8, rpg: 3.6, apg: 4.6, role: "Lead scorer and floor general" },
      { name: "Casey Morsell", position: "SF", ppg: 13.2, rpg: 4.8, apg: 2.0, role: "Veteran wing and defender" },
      { name: "Mohamed Diarra", position: "C", ppg: 10.6, rpg: 7.4, apg: 1.2, role: "Interior anchor and rebounder" },
      { name: "Jarkel Joiner", position: "SG", ppg: 10.2, rpg: 3.0, apg: 3.8, role: "Perimeter scorer and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "20-13",
    conferenceRecord: "9-11",
    keyWins: ["Duke", "North Carolina", "Louisville", "Miami (FL)"],
    notableLosses: ["Arizona", "Duke", "UNC", "Virginia", "Clemson", "Louisville", "Miami (FL)", "Pittsburgh", "Georgia Tech", "Wake Forest", "Syracuse", "Notre Dame", "Stanford"]
  },

  {
    id: "high-point",
    name: "High Point Panthers",
    shortName: "High Point",
    seed: 12,
    region: "West",
    conference: "Big South",
    mascot: {
      name: "Prowl the Panther",
      description: "A fierce panther representing the strength, agility, and competitive fire of High Point University athletics.",
      origin: "High Point adopted the Panther as its athletic mascot in 1924."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=High+Point+Panthers+fight+song",
    colors: { primary: "#4F2D7F", secondary: "#C0A052" },
    stats: {
      ppg: 78.6, rpg: 34.4, apg: 15.2,
      fgPct: 47.0, threePct: 36.4, ftPct: 75.0,
      pace: 71.4, offEff: 115.2, defEff: 100.8
    },
    playingStyle: ["Big South offensive firepower", "High-scoring attack", "Three-point barrage", "Fast-paced game"],
    keyPlayers: [
      { name: "Jalon Moore", position: "SF", ppg: 21.2, rpg: 6.4, apg: 3.4, role: "Big South Player of the Year" },
      { name: "John-Michael Wright", position: "PG", ppg: 16.8, rpg: 3.2, apg: 5.6, role: "Dynamic guard and facilitator" },
      { name: "Zach Austin", position: "SG", ppg: 14.2, rpg: 3.6, apg: 2.4, role: "Sharpshooter and perimeter scorer" },
      { name: "Burke Cheesman", position: "C", ppg: 11.6, rpg: 7.8, apg: 1.4, role: "Interior anchor and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "30-4",
    conferenceRecord: "16-2",
    keyWins: ["Gardner-Webb", "Longwood", "Presbyterian", "UNC Asheville"],
    notableLosses: ["Wisconsin", "Gardner-Webb", "Longwood", "Presbyterian"]
  },

  {
    id: "hawaii",
    name: "Hawaii Rainbow Warriors",
    shortName: "Hawaii",
    seed: 13,
    region: "West",
    conference: "Big West",
    mascot: {
      name: "Vili the Warrior",
      description: "A native Hawaiian warrior representing the proud heritage, culture, and fierce spirit of the Hawaiian people.",
      origin: "Hawaii adopted the Rainbow Warriors nickname in the mid-20th century to reflect Hawaiian culture."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Hawaii+Rainbow+Warriors+fight+song",
    colors: { primary: "#024731", secondary: "#C8A96E" },
    stats: {
      ppg: 74.8, rpg: 33.4, apg: 14.2,
      fgPct: 45.8, threePct: 35.6, ftPct: 73.8,
      pace: 69.8, offEff: 111.4, defEff: 101.2
    },
    playingStyle: ["Big West champion", "Perimeter-oriented offense", "Aggressive defense", "Aloha spirit play-hard attitude"],
    keyPlayers: [
      { name: "Bernardo da Silva", position: "C", ppg: 17.4, rpg: 9.2, apg: 1.8, role: "Big West center and interior force" },
      { name: "Juwan Gary", position: "SG", ppg: 14.8, rpg: 4.8, apg: 2.6, role: "Guard scorer and defender" },
      { name: "Justin McKoy", position: "SF", ppg: 12.4, rpg: 5.6, apg: 2.2, role: "Versatile wing and rebounder" },
      { name: "Drew Buggs", position: "PG", ppg: 10.6, rpg: 3.0, apg: 5.8, role: "Floor general and playmaker" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-8",
    conferenceRecord: "14-4",
    keyWins: ["UC Irvine", "UC Santa Barbara", "Cal Poly", "Long Beach State"],
    notableLosses: ["Arkansas", "UC Irvine", "UC Santa Barbara", "Cal Poly", "Long Beach State", "Cal State Northridge", "UC Riverside", "UC Davis"]
  },

  {
    id: "kennesaw-state",
    name: "Kennesaw State Owls",
    shortName: "Kennesaw St",
    seed: 14,
    region: "West",
    conference: "ASUN",
    mascot: {
      name: "Scrappy the Owl",
      description: "A wise and scrappy owl representing the knowledge-seeking and competitive spirit of Kennesaw State University.",
      origin: "Kennesaw State adopted the Owl as its mascot when it began its NCAA athletics program."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Kennesaw+State+Owls+fight+song",
    colors: { primary: "#FDBB30", secondary: "#000000" },
    stats: {
      ppg: 71.8, rpg: 32.2, apg: 12.8,
      fgPct: 43.6, threePct: 33.8, ftPct: 71.4,
      pace: 66.2, offEff: 107.6, defEff: 102.4
    },
    playingStyle: ["ASUN defensive system", "Grinding half-court play", "Physical rebounding", "Transition opportunities"],
    keyPlayers: [
      { name: "Chris Youngblood", position: "SG", ppg: 18.4, rpg: 4.2, apg: 2.6, role: "ASUN scoring leader and captain" },
      { name: "Terrell Burden", position: "PG", ppg: 13.6, rpg: 3.0, apg: 5.4, role: "Dynamic playmaking guard" },
      { name: "Kasen Jennings", position: "SF", ppg: 11.2, rpg: 5.8, apg: 2.0, role: "Versatile forward and rebounder" },
      { name: "Demond Robinson", position: "C", ppg: 9.4, rpg: 7.2, apg: 1.2, role: "Interior presence and shot blocker" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-13",
    conferenceRecord: "11-7",
    keyWins: ["Lipscomb", "Bellarmine", "Jacksonville", "North Alabama"],
    notableLosses: ["Gonzaga", "Lipscomb", "Bellarmine", "Jacksonville", "North Alabama", "Eastern Kentucky", "Central Arkansas", "Austin Peay"]
  },

  {
    id: "queens",
    name: "Queens Royals",
    shortName: "Queens",
    seed: 15,
    region: "West",
    conference: "ASUN",
    mascot: {
      name: "Knight the Royal",
      description: "A regal knight representing the royal heritage and competitive ambition of Queens University athletics.",
      origin: "Queens University adopted the Royals as its athletic identity reflecting its namesake Queen Charlotte."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Queens+University+Royals+fight+song",
    colors: { primary: "#00356B", secondary: "#C8A52D" },
    stats: {
      ppg: 70.8, rpg: 31.6, apg: 12.4,
      fgPct: 43.2, threePct: 33.6, ftPct: 71.0,
      pace: 65.6, offEff: 106.4, defEff: 103.6
    },
    playingStyle: ["ASUN precision offense", "Defense-first approach", "Team ball movement", "First-time NCAA quality"],
    keyPlayers: [
      { name: "Isaiah Harrington", position: "PG", ppg: 16.2, rpg: 3.6, apg: 5.8, role: "Lead guard and team leader" },
      { name: "Michael Moreno", position: "SF", ppg: 13.4, rpg: 5.4, apg: 2.2, role: "Versatile wing scorer" },
      { name: "Adel Afkir", position: "C", ppg: 10.8, rpg: 7.4, apg: 1.4, role: "Interior anchor and rebounder" },
      { name: "Jaylen Carey", position: "SG", ppg: 9.6, rpg: 3.2, apg: 2.8, role: "Perimeter scorer and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-13",
    conferenceRecord: "10-8",
    keyWins: ["Lipscomb", "Jacksonville", "North Florida", "Central Arkansas"],
    notableLosses: ["Purdue", "Lipscomb", "Jacksonville", "North Florida", "Central Arkansas", "Austin Peay", "Bellarmine", "Eastern Kentucky"]
  },

  {
    id: "liu",
    name: "LIU Sharks",
    shortName: "LIU",
    seed: 16,
    region: "West",
    conference: "NEC",
    mascot: {
      name: "Sharky the Shark",
      description: "A fierce shark representing the predatory hunger and fierce competitive drive of LIU athletics.",
      origin: "Long Island University adopted the Shark as its mascot in 1994."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=LIU+Sharks+fight+song",
    colors: { primary: "#00529B", secondary: "#FDB827" },
    stats: {
      ppg: 71.2, rpg: 31.4, apg: 12.6,
      fgPct: 43.4, threePct: 33.2, ftPct: 70.8,
      pace: 66.8, offEff: 106.8, defEff: 104.2
    },
    playingStyle: ["NEC tenacity", "Guard-driven offense", "Physical defense", "Upset-minded approach"],
    keyPlayers: [
      { name: "Shaheem Samuels", position: "SG", ppg: 17.8, rpg: 4.4, apg: 2.8, role: "NEC scoring leader and team captain" },
      { name: "Josh Rivera", position: "PG", ppg: 13.2, rpg: 3.2, apg: 5.6, role: "Point guard and playmaker" },
      { name: "Tai Strickland", position: "PF", ppg: 10.8, rpg: 7.4, apg: 1.4, role: "Forward and interior rebounder" },
      { name: "Josiah Allick", position: "C", ppg: 9.4, rpg: 6.8, apg: 1.0, role: "Center and interior defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-10",
    conferenceRecord: "13-5",
    keyWins: ["Saint Francis", "Central Connecticut", "Wagner", "Merrimack"],
    notableLosses: ["Arizona", "Saint Francis", "Central Connecticut", "Wagner", "Merrimack", "FDU", "Sacred Heart", "Bryant"]
  },

  // ==================== MIDWEST REGION ====================

  {
    id: "michigan",
    name: "Michigan Wolverines",
    shortName: "Michigan",
    seed: 1,
    region: "Midwest",
    conference: "Big Ten",
    mascot: {
      name: "Biff the Wolverine",
      description: "A fierce wolverine representing the tenacious and relentless nature of the state animal of Michigan.",
      origin: "Michigan earned the Wolverine nickname in the early 19th century; the state is nicknamed the Wolverine State."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Michigan+Wolverines+fight+song",
    colors: { primary: "#00274C", secondary: "#FFCB05" },
    stats: {
      ppg: 84.8, rpg: 36.4, apg: 17.0,
      fgPct: 48.4, threePct: 37.2, ftPct: 76.0,
      pace: 71.8, offEff: 121.4, defEff: 91.6
    },
    playingStyle: ["Dynamic transition offense", "Elite defensive pressure", "Versatile frontcourt", "Big Ten dominance"],
    keyPlayers: [
      { name: "Nimari Burnett", position: "SG", ppg: 17.6, rpg: 4.2, apg: 3.8, role: "Leading scorer and perimeter threat" },
      { name: "Olivier Nkamhoua", position: "PF", ppg: 15.4, rpg: 7.8, apg: 2.4, role: "Versatile forward and scorer" },
      { name: "Dug McDaniel", position: "PG", ppg: 14.8, rpg: 3.4, apg: 7.2, role: "Dynamic point guard and facilitator" },
      { name: "Tarris Reed Jr.", position: "C", ppg: 12.6, rpg: 9.4, apg: 1.4, role: "Elite rebounder and interior anchor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "31-3",
    conferenceRecord: "17-3",
    keyWins: ["Purdue", "Michigan State", "Indiana", "Ohio State"],
    notableLosses: ["Duke", "Arizona", "Purdue"]
  },

  {
    id: "iowa-state",
    name: "Iowa State Cyclones",
    shortName: "Iowa State",
    seed: 2,
    region: "Midwest",
    conference: "Big 12",
    mascot: {
      name: "Cy the Cardinal",
      description: "A cardinal bird representing the school colors and fierce competitive spirit of Iowa State University.",
      origin: "Iowa State's Cy mascot has roots going back to 1954 when a live cardinal first appeared at athletic events."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Iowa+State+Cyclones+fight+song",
    colors: { primary: "#C8102E", secondary: "#F1BE48" },
    stats: {
      ppg: 80.8, rpg: 35.2, apg: 16.2,
      fgPct: 47.4, threePct: 36.2, ftPct: 75.2,
      pace: 70.8, offEff: 117.6, defEff: 93.0
    },
    playingStyle: ["T.J. Otzelberger pressure defense", "Ball-hawk defense", "Guard-driven offense", "High-energy play"],
    keyPlayers: [
      { name: "Tamin Lipsey", position: "PG", ppg: 15.8, rpg: 4.4, apg: 6.2, role: "All-American guard and defensive dynamo" },
      { name: "Keshon Gilbert", position: "SG", ppg: 14.6, rpg: 3.8, apg: 4.2, role: "Versatile guard and scorer" },
      { name: "Milan Momcilovic", position: "SF", ppg: 13.4, rpg: 5.2, apg: 2.4, role: "Long-range shooter and wing" },
      { name: "Osun Osunniyi", position: "C", ppg: 11.2, rpg: 8.8, apg: 1.8, role: "Shot-blocker and interior anchor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "27-7",
    conferenceRecord: "14-4",
    keyWins: ["Kansas", "Houston", "Arizona", "BYU"],
    notableLosses: ["Michigan", "Kansas", "Houston", "Arizona", "Texas Tech", "TCU", "UCF", "Baylor", "Oklahoma State", "Cincinnati", "West Virginia"]
  },

  {
    id: "virginia",
    name: "Virginia Cavaliers",
    shortName: "Virginia",
    seed: 3,
    region: "Midwest",
    conference: "ACC",
    mascot: {
      name: "CavMan",
      description: "A cavalier soldier from the English Civil War era, representing the original Cavalier settlers of colonial Virginia.",
      origin: "Virginia adopted the Cavalier as its mascot in the 1920s, reflecting its colonial heritage."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Virginia+Cavaliers+fight+song",
    colors: { primary: "#232D4B", secondary: "#E57200" },
    stats: {
      ppg: 72.4, rpg: 33.4, apg: 13.6,
      fgPct: 46.0, threePct: 34.4, ftPct: 74.8,
      pace: 62.8, offEff: 116.2, defEff: 88.6
    },
    playingStyle: ["Tony Bennett Pack-Line defense", "Extremely slow pace", "Interior scoring", "High efficiency offense"],
    keyPlayers: [
      { name: "Isaac McKneely", position: "SG", ppg: 14.8, rpg: 3.6, apg: 2.8, role: "Three-point specialist and scorer" },
      { name: "Reece Beekman", position: "PG", ppg: 13.2, rpg: 4.0, apg: 5.6, role: "Defensive maestro and floor general" },
      { name: "Kadin Shedrick", position: "C", ppg: 11.8, rpg: 7.6, apg: 1.2, role: "Interior anchor in Pack-Line defense" },
      { name: "Ben Vander Plas", position: "SF", ppg: 10.4, rpg: 5.4, apg: 2.0, role: "Stretch forward and role player" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "29-5",
    conferenceRecord: "16-4",
    keyWins: ["Duke", "North Carolina", "Louisville", "Clemson"],
    notableLosses: ["Michigan", "Duke", "UNC", "Louisville", "Pittsburgh"]
  },

  {
    id: "alabama",
    name: "Alabama Crimson Tide",
    shortName: "Alabama",
    seed: 4,
    region: "Midwest",
    conference: "SEC",
    mascot: {
      name: "Big Al the Elephant",
      description: "A massive elephant representing the power and dominance of Alabama athletics, inspired by a sportswriter's description in 1930.",
      origin: "The elephant became Alabama's symbol after a 1930 sportswriter called the team as big as elephants."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Alabama+Crimson+Tide+fight+song",
    colors: { primary: "#9E1B32", secondary: "#FFFFFF" },
    stats: {
      ppg: 78.6, rpg: 35.4, apg: 15.4,
      fgPct: 46.6, threePct: 35.6, ftPct: 73.4,
      pace: 71.2, offEff: 114.8, defEff: 95.0
    },
    playingStyle: ["Fast-paced SEC basketball", "Athletic wings", "Three-point oriented offense", "Pressure defense"],
    keyPlayers: [
      { name: "Mark Sears", position: "PG", ppg: 21.4, rpg: 3.8, apg: 4.6, role: "All-SEC guard and primary scorer" },
      { name: "Rylan Griffen", position: "SG", ppg: 14.6, rpg: 3.6, apg: 2.4, role: "Wing scorer and three-point threat" },
      { name: "Grant Nelson", position: "PF", ppg: 12.8, rpg: 7.4, apg: 2.6, role: "Stretch power forward" },
      { name: "Jarin Stevenson", position: "C", ppg: 10.4, rpg: 7.0, apg: 1.4, role: "Interior presence and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-9",
    conferenceRecord: "11-7",
    keyWins: ["Florida", "Tennessee", "Auburn", "Kentucky"],
    notableLosses: ["Michigan", "Arkansas", "Florida", "Tennessee", "Auburn", "Kentucky", "Georgia", "Vanderbilt", "Texas A&M"]
  },

  {
    id: "texas-tech",
    name: "Texas Tech Red Raiders",
    shortName: "Texas Tech",
    seed: 5,
    region: "Midwest",
    conference: "Big 12",
    mascot: {
      name: "The Masked Rider and Raider Red",
      description: "A masked rider on a black horse representing the outlaw spirit of West Texas, and Raider Red, a red-clad Zorro-like mascot.",
      origin: "The Masked Rider tradition began in 1936; Raider Red was introduced in 1971."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Texas+Tech+Red+Raiders+fight+song",
    colors: { primary: "#CC0000", secondary: "#000000" },
    stats: {
      ppg: 74.8, rpg: 34.2, apg: 13.8,
      fgPct: 45.6, threePct: 34.4, ftPct: 73.2,
      pace: 67.8, offEff: 111.8, defEff: 95.2
    },
    playingStyle: ["Mark Adams No-Middle defense", "Physical defensive pressure", "Interior toughness", "Methodical offense"],
    keyPlayers: [
      { name: "Kevin Obanor", position: "PF", ppg: 15.6, rpg: 7.8, apg: 2.2, role: "Big 12 standout forward and scorer" },
      { name: "Daniel Batcho", position: "C", ppg: 12.4, rpg: 8.4, apg: 1.4, role: "Interior anchor and rebounder" },
      { name: "Darrion Williams", position: "SF", ppg: 11.8, rpg: 5.4, apg: 2.6, role: "Versatile wing defender and scorer" },
      { name: "Pop Isaacs", position: "PG", ppg: 14.6, rpg: 3.0, apg: 4.8, role: "Lead guard and offensive catalyst" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-10",
    conferenceRecord: "10-8",
    keyWins: ["Kansas", "Iowa State", "Arizona", "Houston"],
    notableLosses: ["Michigan", "Kansas", "Houston", "Iowa State", "BYU", "TCU", "UCF", "Oklahoma State", "Cincinnati", "West Virginia"]
  },

  {
    id: "tennessee",
    name: "Tennessee Volunteers",
    shortName: "Tennessee",
    seed: 6,
    region: "Midwest",
    conference: "SEC",
    mascot: {
      name: "Smokey the Bluetick Coonhound",
      description: "A Bluetick Coonhound representing the hunting dogs of the Great Smoky Mountains region of Tennessee.",
      origin: "Tennessee's Smokey mascot tradition began in 1953 when a Bluetick Coonhound was chosen by fan vote."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Tennessee+Volunteers+fight+song",
    colors: { primary: "#FF8200", secondary: "#FFFFFF" },
    stats: {
      ppg: 75.4, rpg: 34.0, apg: 13.8,
      fgPct: 45.8, threePct: 34.8, ftPct: 73.8,
      pace: 68.0, offEff: 112.2, defEff: 95.4
    },
    playingStyle: ["Rick Barnes defensive intensity", "Physical SEC play", "Guard-forward balance", "Half-court execution"],
    keyPlayers: [
      { name: "Dalton Knecht", position: "SG", ppg: 18.8, rpg: 4.4, apg: 2.0, role: "All-SEC scorer and three-point specialist" },
      { name: "Josiah-Jordan James", position: "SF", ppg: 13.6, rpg: 6.2, apg: 3.4, role: "Veteran wing and defensive anchor" },
      { name: "Jonas Aidoo", position: "C", ppg: 10.8, rpg: 8.2, apg: 1.4, role: "Elite shot blocker and rim protector" },
      { name: "Santiago Vescovi", position: "PG", ppg: 12.4, rpg: 3.2, apg: 5.2, role: "Lead guard and three-point threat" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-11",
    conferenceRecord: "10-8",
    keyWins: ["Alabama", "Florida", "Auburn", "Kentucky"],
    notableLosses: ["Michigan", "Alabama", "Florida", "Auburn", "Kentucky", "Arkansas", "Georgia", "Missouri", "Texas A&M", "Vanderbilt", "LSU"]
  },

  {
    id: "kentucky",
    name: "Kentucky Wildcats",
    shortName: "Kentucky",
    seed: 7,
    region: "Midwest",
    conference: "SEC",
    mascot: {
      name: "The Wildcat",
      description: "A fierce wildcat representing the state's native bobcat and the fierce competitive tradition of Kentucky basketball.",
      origin: "Kentucky was first called the Wildcats in 1909 after a spirited game against Illinois."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Kentucky+Wildcats+fight+song",
    colors: { primary: "#0033A0", secondary: "#FFFFFF" },
    stats: {
      ppg: 74.2, rpg: 34.4, apg: 13.8,
      fgPct: 45.2, threePct: 34.0, ftPct: 72.8,
      pace: 68.6, offEff: 110.6, defEff: 97.4
    },
    playingStyle: ["One-and-done talent infusion", "Athletic drives to the basket", "Physical defense", "Elite recruiting classes"],
    keyPlayers: [
      { name: "Rob Dillingham", position: "PG", ppg: 16.8, rpg: 3.2, apg: 5.4, role: "Elite playmaker and projected lottery pick" },
      { name: "Reed Sheppard", position: "SG", ppg: 15.2, rpg: 4.8, apg: 4.2, role: "Versatile guard and three-point shooter" },
      { name: "Aaron Bradshaw", position: "C", ppg: 13.4, rpg: 7.8, apg: 1.8, role: "Potential top-5 NBA pick and interior force" },
      { name: "D.J. Wagner", position: "SG", ppg: 12.2, rpg: 3.4, apg: 3.6, role: "Athletic wing and son of Dajuan Wagner" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-13",
    conferenceRecord: "9-9",
    keyWins: ["Alabama", "Tennessee", "Florida", "Auburn"],
    notableLosses: ["Michigan", "Alabama", "Tennessee", "Florida", "Auburn", "Arkansas", "Georgia", "Missouri", "Vanderbilt", "Texas A&M", "LSU", "Mississippi State", "Ole Miss"]
  },

  {
    id: "georgia",
    name: "Georgia Bulldogs",
    shortName: "Georgia",
    seed: 8,
    region: "Midwest",
    conference: "SEC",
    mascot: {
      name: "Uga the Bulldog",
      description: "A white English bulldog representing the tenacious spirit and Southern pride of the University of Georgia.",
      origin: "Georgia has had a live bulldog mascot since 1956; the current line began in 1956 with Uga I."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Georgia+Bulldogs+fight+song",
    colors: { primary: "#BA0C2F", secondary: "#000000" },
    stats: {
      ppg: 73.6, rpg: 33.8, apg: 13.4,
      fgPct: 44.8, threePct: 33.4, ftPct: 72.2,
      pace: 68.4, offEff: 110.2, defEff: 97.6
    },
    playingStyle: ["SEC defensive grind", "Physical interior play", "Guard-forward balance", "Mike White system"],
    keyPlayers: [
      { name: "Jabri Abdur-Rahim", position: "SF", ppg: 16.2, rpg: 6.4, apg: 2.8, role: "Athletic wing and team leader" },
      { name: "Mardrez McBride", position: "SG", ppg: 13.4, rpg: 3.6, apg: 2.4, role: "Perimeter scorer and shooter" },
      { name: "Braelen Bridges", position: "C", ppg: 12.6, rpg: 8.2, apg: 1.4, role: "Interior anchor and post scorer" },
      { name: "Kario Oquendo", position: "PG", ppg: 10.8, rpg: 3.0, apg: 4.6, role: "Lead guard and facilitator" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-10",
    conferenceRecord: "10-8",
    keyWins: ["Tennessee", "Alabama", "Kentucky", "Auburn"],
    notableLosses: ["Michigan", "Alabama", "Tennessee", "Florida", "Auburn", "Kentucky", "Arkansas", "Missouri", "Vanderbilt", "Texas A&M"]
  },

  {
    id: "saint-louis",
    name: "Saint Louis Billikens",
    shortName: "Saint Louis",
    seed: 9,
    region: "Midwest",
    conference: "A-10",
    mascot: {
      name: "The Billiken",
      description: "A whimsical good luck charm figure, a pudgy elf-like creature said to bring good luck to those who rub its tummy.",
      origin: "Saint Louis adopted the Billiken in 1911 after a coach was compared to the good luck charm figurine."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Saint+Louis+Billikens+fight+song",
    colors: { primary: "#003DA5", secondary: "#FFFFFF" },
    stats: {
      ppg: 75.8, rpg: 34.6, apg: 14.8,
      fgPct: 46.2, threePct: 35.4, ftPct: 74.4,
      pace: 69.6, offEff: 113.2, defEff: 98.6
    },
    playingStyle: ["Atlantic 10 powerhouse", "Balanced offensive attack", "Active defense", "Deep roster rotation"],
    keyPlayers: [
      { name: "Francis Okoro", position: "C", ppg: 14.8, rpg: 9.4, apg: 1.6, role: "A-10's top big man and rebounder" },
      { name: "Yuri Collins", position: "PG", ppg: 13.6, rpg: 3.8, apg: 7.4, role: "A-10 assists leader and playmaker" },
      { name: "Gibson Jimerson", position: "SG", ppg: 16.4, rpg: 3.2, apg: 2.6, role: "Explosive scorer and three-point threat" },
      { name: "Jordan Nesbitt", position: "SF", ppg: 11.2, rpg: 5.2, apg: 2.4, role: "Versatile wing and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "28-5",
    conferenceRecord: "15-3",
    keyWins: ["VCU", "Dayton", "Davidson", "Richmond"],
    notableLosses: ["Georgia", "VCU", "Dayton", "Davidson", "Richmond"]
  },

  {
    id: "santa-clara",
    name: "Santa Clara Broncos",
    shortName: "Santa Clara",
    seed: 10,
    region: "Midwest",
    conference: "WCC",
    mascot: {
      name: "The Bronco",
      description: "A wild bronco horse representing the untamed spirit, freedom, and competitive fire of Santa Clara athletics.",
      origin: "Santa Clara University adopted the Broncos as its athletic nickname in 1923."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Santa+Clara+Broncos+fight+song",
    colors: { primary: "#862633", secondary: "#FFFFFF" },
    stats: {
      ppg: 74.4, rpg: 33.4, apg: 14.0,
      fgPct: 45.6, threePct: 35.0, ftPct: 73.8,
      pace: 69.0, offEff: 111.4, defEff: 99.4
    },
    playingStyle: ["WCC offensive finesse", "Ball movement and spacing", "Perimeter shooting", "Physical interior defense"],
    keyPlayers: [
      { name: "Jalen Williams", position: "SG", ppg: 18.4, rpg: 4.6, apg: 3.8, role: "WCC Player of the Year and offensive star" },
      { name: "Keshawn Justice", position: "PG", ppg: 13.8, rpg: 3.2, apg: 5.4, role: "Lead guard and facilitator" },
      { name: "Carlos Stewart", position: "SF", ppg: 11.6, rpg: 5.4, apg: 2.2, role: "Versatile wing scorer" },
      { name: "Josip Vrankic", position: "C", ppg: 10.2, rpg: 7.2, apg: 1.4, role: "European center and interior anchor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "26-8",
    conferenceRecord: "14-4",
    keyWins: ["Gonzaga", "Saint Mary's", "BYU", "San Francisco"],
    notableLosses: ["Kentucky", "Gonzaga", "Saint Mary's", "BYU", "Pepperdine", "Pacific", "San Diego", "Portland"]
  },

  {
    id: "miami-oh",
    name: "Miami (OH) RedHawks",
    shortName: "Miami (OH)",
    seed: 11,
    region: "Midwest",
    conference: "MAC",
    mascot: {
      name: "Swoop the RedHawk",
      description: "A red-tailed hawk representing the RedHawks, named in honor of the local Native American tribe, the Miami.",
      origin: "Miami University changed from Redskins to RedHawks in 1997 at the request of the Miami Tribe of Oklahoma."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Miami+Ohio+RedHawks+fight+song",
    colors: { primary: "#B61E2E", secondary: "#FFFFFF" },
    stats: {
      ppg: 79.8, rpg: 35.2, apg: 15.8,
      fgPct: 47.4, threePct: 36.6, ftPct: 75.4,
      pace: 71.2, offEff: 117.4, defEff: 97.2
    },
    playingStyle: ["MAC Conference dominance", "High-scoring offense", "Athletic guards", "Run-and-gun style"],
    keyPlayers: [
      { name: "Mekhi Lairy", position: "PG", ppg: 21.6, rpg: 4.4, apg: 5.8, role: "MAC Player of the Year and offensive dynamo" },
      { name: "Nike Sibande", position: "SG", ppg: 16.4, rpg: 5.6, apg: 2.8, role: "Athletic wing and secondary scorer" },
      { name: "Dalonte Brown", position: "SF", ppg: 13.2, rpg: 6.4, apg: 2.4, role: "Versatile forward and rebounder" },
      { name: "Isaiah Coleman-Lands", position: "C", ppg: 11.4, rpg: 7.8, apg: 1.2, role: "Interior anchor and MAC stalwart" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "31-1",
    conferenceRecord: "18-0",
    keyWins: ["Akron", "Ohio", "Ball State", "Kent State"],
    notableLosses: ["Tennessee"]
  },

  {
    id: "smu",
    name: "SMU Mustangs",
    shortName: "SMU",
    seed: 11,
    region: "Midwest",
    conference: "ACC",
    mascot: {
      name: "Peruna the Pony",
      description: "A Shetland pony representing the wild mustang horses of the American Southwest and the spirited athletic program.",
      origin: "SMU adopted the Mustangs as its athletic mascot in 1917."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=SMU+Mustangs+fight+song",
    colors: { primary: "#354CA1", secondary: "#CC0035" },
    stats: {
      ppg: 73.2, rpg: 32.6, apg: 13.6,
      fgPct: 44.6, threePct: 33.8, ftPct: 72.4,
      pace: 68.4, offEff: 109.6, defEff: 99.4
    },
    playingStyle: ["ACC transition offense", "Perimeter-oriented attack", "Guard-driven play", "Athletic defense"],
    keyPlayers: [
      { name: "Chuck Harris", position: "PG", ppg: 16.2, rpg: 3.4, apg: 5.6, role: "Transfer guard and offensive catalyst" },
      { name: "Zhuric Phelps", position: "SG", ppg: 13.8, rpg: 3.2, apg: 3.4, role: "Athletic guard and scorer" },
      { name: "Marcus Weathers", position: "PF", ppg: 11.6, rpg: 7.6, apg: 1.8, role: "Physical frontcourt player" },
      { name: "Samuell Williamson", position: "SF", ppg: 10.4, rpg: 5.2, apg: 2.2, role: "Versatile wing defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "20-13",
    conferenceRecord: "8-12",
    keyWins: ["Duke", "North Carolina", "Virginia", "Louisville"],
    notableLosses: ["Tennessee", "Duke", "UNC", "Virginia", "Clemson", "Louisville", "Miami (FL)", "Georgia Tech", "Wake Forest", "Pittsburgh", "Syracuse", "Notre Dame", "Stanford"]
  },

  {
    id: "akron",
    name: "Akron Zips",
    shortName: "Akron",
    seed: 12,
    region: "Midwest",
    conference: "MAC",
    mascot: {
      name: "Zippy the Kangaroo",
      description: "A kangaroo representing the kangaroo-leather boots once made in Akron, symbolizing quickness and agility.",
      origin: "Akron adopted the Zip as its mascot in 1927, inspired by the company that made overshoes from kangaroo hide."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Akron+Zips+fight+song",
    colors: { primary: "#041E42", secondary: "#A89968" },
    stats: {
      ppg: 76.6, rpg: 34.4, apg: 15.0,
      fgPct: 46.4, threePct: 35.8, ftPct: 74.6,
      pace: 70.4, offEff: 114.2, defEff: 100.2
    },
    playingStyle: ["MAC scoring powerhouse", "Up-tempo pace", "Guard-driven attack", "Transition efficiency"],
    keyPlayers: [
      { name: "Bryan Trimble Jr.", position: "SG", ppg: 20.2, rpg: 4.4, apg: 3.4, role: "MAC leading scorer and dynamic guard" },
      { name: "Ali Ali", position: "PG", ppg: 14.4, rpg: 3.8, apg: 5.6, role: "Playmaking guard and facilitator" },
      { name: "Enrique Freeman", position: "PF", ppg: 13.6, rpg: 9.2, apg: 1.6, role: "Elite rebounder and interior scorer" },
      { name: "Xavier Castaneda", position: "SF", ppg: 11.2, rpg: 4.4, apg: 2.4, role: "Versatile wing scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "29-5",
    conferenceRecord: "17-1",
    keyWins: ["Ohio", "Ball State", "Kent State", "Western Michigan"],
    notableLosses: ["Texas Tech", "Ohio", "Ball State", "Kent State", "Western Michigan"]
  },

  {
    id: "hofstra",
    name: "Hofstra Pride",
    shortName: "Hofstra",
    seed: 13,
    region: "Midwest",
    conference: "CAA",
    mascot: {
      name: "Kate the Dutchwoman",
      description: "A Dutch colonist representing the Dutch heritage of the Long Island region where Hofstra University is located.",
      origin: "Hofstra adopted Pride as its athletic nickname in 1994 to replace the Flying Dutchmen."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Hofstra+Pride+fight+song",
    colors: { primary: "#00AEEF", secondary: "#FFD200" },
    stats: {
      ppg: 73.6, rpg: 33.2, apg: 13.4,
      fgPct: 44.8, threePct: 34.4, ftPct: 72.6,
      pace: 69.2, offEff: 110.8, defEff: 101.4
    },
    playingStyle: ["CAA offensive firepower", "Guard-driven attack", "Physical defensive play", "Mid-major excellence"],
    keyPlayers: [
      { name: "Aaron Estrada", position: "SG", ppg: 22.4, rpg: 5.2, apg: 4.2, role: "CAA Player of the Year and elite scorer" },
      { name: "Darlinstone Dubar", position: "PF", ppg: 13.6, rpg: 7.8, apg: 1.8, role: "Physical forward and rebounder" },
      { name: "Jalen Ray", position: "PG", ppg: 11.8, rpg: 3.4, apg: 5.6, role: "Veteran guard and playmaker" },
      { name: "Khalid Moore", position: "SF", ppg: 10.2, rpg: 5.6, apg: 2.0, role: "Versatile wing defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-10",
    conferenceRecord: "13-5",
    keyWins: ["Drexel", "William & Mary", "Towson", "Elon"],
    notableLosses: ["Alabama", "Drexel", "William & Mary", "Towson", "Elon", "Delaware", "Northeastern", "Charleston", "UNCW", "Stony Brook"]
  },

  {
    id: "wright-state",
    name: "Wright State Raiders",
    shortName: "Wright State",
    seed: 14,
    region: "Midwest",
    conference: "Horizon",
    mascot: {
      name: "Rowdy the Raider",
      description: "A spirited raider character representing the bold and pioneering spirit of the Wright brothers and Wright State University.",
      origin: "Wright State adopted the Raiders as its mascot, honoring the pioneering spirit of Wilbur and Orville Wright."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Wright+State+Raiders+fight+song",
    colors: { primary: "#009A44", secondary: "#FFFFFF" },
    stats: {
      ppg: 72.8, rpg: 32.8, apg: 13.2,
      fgPct: 44.4, threePct: 34.2, ftPct: 72.4,
      pace: 67.8, offEff: 109.2, defEff: 102.2
    },
    playingStyle: ["Horizon League dominance", "Physical interior game", "Defensive tenacity", "Guard-forward balance"],
    keyPlayers: [
      { name: "Tanner Holden", position: "SF", ppg: 19.8, rpg: 6.4, apg: 3.0, role: "Horizon League star and all-around player" },
      { name: "Grant Basile", position: "PF", ppg: 14.6, rpg: 8.4, apg: 1.8, role: "Physical forward and rebounder" },
      { name: "Tim Finke", position: "SG", ppg: 11.4, rpg: 3.4, apg: 2.8, role: "Sharp shooter and perimeter scorer" },
      { name: "Amahrie Spivey", position: "PG", ppg: 9.8, rpg: 3.0, apg: 5.2, role: "Lead guard and team facilitator" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-11",
    conferenceRecord: "12-6",
    keyWins: ["Cleveland State", "Detroit Mercy", "Milwaukee", "Green Bay"],
    notableLosses: ["Virginia", "Cleveland State", "Detroit Mercy", "Milwaukee", "Green Bay", "Oakland", "IUPUI", "Northern Kentucky"]
  },

  {
    id: "tennessee-state",
    name: "Tennessee State Tigers",
    shortName: "Tennessee St",
    seed: 15,
    region: "Midwest",
    conference: "OVC",
    mascot: {
      name: "Tom the Tiger",
      description: "A fierce Bengal tiger representing the strength, power, and competitive spirit of Tennessee State University.",
      origin: "Tennessee State adopted the Tiger as its athletic mascot reflecting its fierce competitive identity."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Tennessee+State+Tigers+fight+song",
    colors: { primary: "#003DA5", secondary: "#FFCD00" },
    stats: {
      ppg: 72.2, rpg: 32.4, apg: 12.8,
      fgPct: 43.8, threePct: 33.6, ftPct: 71.6,
      pace: 67.2, offEff: 108.4, defEff: 102.8
    },
    playingStyle: ["OVC champion", "Guard-oriented offense", "Physical defensive pressure", "HBCU excellence"],
    keyPlayers: [
      { name: "Isaac Haney", position: "PG", ppg: 18.4, rpg: 4.2, apg: 5.8, role: "OVC Player of the Year and team engine" },
      { name: "Kassim Nicholson", position: "SF", ppg: 13.6, rpg: 6.2, apg: 2.2, role: "Versatile wing scorer" },
      { name: "Kaosi Ezeagu", position: "C", ppg: 11.2, rpg: 8.6, apg: 1.2, role: "Interior anchor and shot blocker" },
      { name: "Christien Golliday", position: "SG", ppg: 10.4, rpg: 3.4, apg: 2.6, role: "Perimeter scorer and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-9",
    conferenceRecord: "13-5",
    keyWins: ["Austin Peay", "Morehead State", "Eastern Illinois", "Southeast Missouri State"],
    notableLosses: ["Iowa State", "Austin Peay", "Morehead State", "Eastern Illinois", "Southeast Missouri State", "UT Martin", "SIU Edwardsville", "Eastern Kentucky", "Jacksonville State"]
  },

  {
    id: "umbc",
    name: "UMBC Retrievers",
    shortName: "UMBC",
    seed: 16,
    region: "Midwest",
    conference: "America East",
    mascot: {
      name: "True Grit the Retriever",
      description: "A Chesapeake Bay Retriever representing the loyal, hardworking, and tenacious spirit of UMBC athletics.",
      origin: "UMBC adopted the Retriever as its mascot in 1966, reflecting the regional heritage of the Chesapeake Bay area."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=UMBC+Retrievers+fight+song",
    colors: { primary: "#000000", secondary: "#F7B129" },
    stats: {
      ppg: 73.4, rpg: 32.8, apg: 13.6,
      fgPct: 44.8, threePct: 34.8, ftPct: 73.2,
      pace: 69.4, offEff: 110.2, defEff: 102.4
    },
    playingStyle: ["America East champion", "Three-point barrage", "Upset-capable play", "Historic legacy program"],
    keyPlayers: [
      { name: "Brandon Horvath", position: "SF", ppg: 19.4, rpg: 7.2, apg: 2.8, role: "America East's top player and team captain" },
      { name: "L.J. Owens", position: "PG", ppg: 14.2, rpg: 3.8, apg: 6.2, role: "Point guard and playmaker" },
      { name: "Darnell Rogers", position: "SG", ppg: 12.6, rpg: 3.4, apg: 2.4, role: "Perimeter scorer and three-point threat" },
      { name: "Nana Owusu-Anane", position: "C", ppg: 10.4, rpg: 8.0, apg: 1.2, role: "Interior anchor and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-8",
    conferenceRecord: "14-4",
    keyWins: ["Vermont", "Maine", "New Hampshire", "Hartford"],
    notableLosses: ["Michigan", "Vermont", "Maine", "Hartford", "Albany", "Binghamton", "Massachusetts Lowell", "Stony Brook"]
  },

  {
    id: "howard",
    name: "Howard Bison",
    shortName: "Howard",
    seed: 16,
    region: "Midwest",
    conference: "MEAC",
    mascot: {
      name: "Overdose the Bison",
      description: "An American bison representing the strength, resilience, and proud heritage of Howard University and the HBCU tradition.",
      origin: "Howard University adopted the Bison as its mascot, symbolizing the strength of the African American community."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Howard+Bison+fight+song",
    colors: { primary: "#003A63", secondary: "#E51937" },
    stats: {
      ppg: 71.8, rpg: 31.6, apg: 12.8,
      fgPct: 43.4, threePct: 33.2, ftPct: 71.2,
      pace: 67.8, offEff: 107.8, defEff: 103.8
    },
    playingStyle: ["MEAC champion", "Defensive tenacity", "HBCU pride basketball", "Guard-oriented attack"],
    keyPlayers: [
      { name: "Elijah Hawkins", position: "PG", ppg: 17.8, rpg: 4.0, apg: 7.2, role: "MEAC's top player and assists leader" },
      { name: "Steve Settle III", position: "SF", ppg: 13.4, rpg: 6.4, apg: 2.2, role: "Forward and versatile scorer" },
      { name: "Shy Odom", position: "SG", ppg: 11.6, rpg: 3.8, apg: 2.8, role: "Perimeter scorer and defender" },
      { name: "Zane Waterman", position: "C", ppg: 9.8, rpg: 7.6, apg: 1.4, role: "Interior anchor and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "23-10",
    conferenceRecord: "14-4",
    keyWins: ["Norfolk State", "Florida A&M", "SC State", "Bethune-Cookman"],
    notableLosses: ["Michigan", "Norfolk State", "Florida A&M", "SC State", "Bethune-Cookman", "North Carolina A&T", "Coppin State", "Morgan State", "Delaware State", "Hampton"]
  },

  // ==================== SOUTH REGION ====================

  {
    id: "florida",
    name: "Florida Gators",
    shortName: "Florida",
    seed: 1,
    region: "South",
    conference: "SEC",
    mascot: {
      name: "Albert the Gator",
      description: "An American alligator representing the native wildlife of Florida's swamps, symbolizing strength and ferocity.",
      origin: "The Gator was adopted as Florida's mascot in 1908, inspired by a fan's souvenir purchase."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Florida+Gators+fight+song",
    colors: { primary: "#0021A5", secondary: "#FA4616" },
    stats: {
      ppg: 83.2, rpg: 36.0, apg: 16.8,
      fgPct: 48.2, threePct: 37.0, ftPct: 75.6,
      pace: 71.6, offEff: 120.8, defEff: 92.0
    },
    playingStyle: ["Todd Golden offensive fireworks", "Elite guard-forward combo", "Three-point spacing", "SEC defensive intensity"],
    keyPlayers: [
      { name: "Walter Clayton Jr.", position: "PG", ppg: 19.8, rpg: 4.0, apg: 5.4, role: "All-SEC guard and offensive catalyst" },
      { name: "Alex Condon", position: "C", ppg: 14.6, rpg: 9.2, apg: 2.4, role: "Australian big man and emerging star" },
      { name: "Zyon Pullin", position: "SG", ppg: 13.8, rpg: 3.6, apg: 3.8, role: "Transfer guard and perimeter threat" },
      { name: "Thomas Haugh", position: "SF", ppg: 11.4, rpg: 5.8, apg: 2.6, role: "Stretch forward and versatile scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "26-7",
    conferenceRecord: "14-4",
    keyWins: ["Alabama", "Auburn", "Kentucky", "Tennessee"],
    notableLosses: ["Duke", "Alabama", "Auburn", "Tennessee", "Kentucky", "Arkansas", "Georgia", "Vanderbilt", "LSU", "Missouri", "Texas A&M"]
  },

  {
    id: "houston",
    name: "Houston Cougars",
    shortName: "Houston",
    seed: 2,
    region: "South",
    conference: "Big 12",
    mascot: {
      name: "Shasta the Cougar",
      description: "A cougar representing the powerful mountain lion and the fierce, relentless competitive spirit of Houston athletics.",
      origin: "Houston adopted the Cougar as its mascot in 1927."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Houston+Cougars+fight+song",
    colors: { primary: "#C8102E", secondary: "#63666A" },
    stats: {
      ppg: 80.6, rpg: 36.2, apg: 15.8,
      fgPct: 47.2, threePct: 35.6, ftPct: 74.6,
      pace: 69.4, offEff: 117.2, defEff: 92.8
    },
    playingStyle: ["Kelvin Sampson elite defense", "Physical defensive pressure", "Interior dominance", "Gritty competitive play"],
    keyPlayers: [
      { name: "Jamal Shead", position: "PG", ppg: 14.8, rpg: 4.6, apg: 7.4, role: "All-American point guard and defensive maestro" },
      { name: "Marcus Sasser", position: "SG", ppg: 18.6, rpg: 3.8, apg: 3.0, role: "Elite scorer and three-point marksman" },
      { name: "J'Wan Roberts", position: "PF", ppg: 13.2, rpg: 9.4, apg: 2.0, role: "Physical rebounder and interior anchor" },
      { name: "Damian Dunn", position: "SF", ppg: 11.6, rpg: 4.2, apg: 2.4, role: "Versatile wing scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "28-6",
    conferenceRecord: "15-3",
    keyWins: ["Arizona", "Kansas", "Iowa State", "BYU"],
    notableLosses: ["Florida", "Arizona", "Kansas", "Iowa State", "Texas Tech", "TCU", "UCF", "Baylor", "Oklahoma State", "Cincinnati", "West Virginia"]
  },

  {
    id: "illinois",
    name: "Illinois Fighting Illini",
    shortName: "Illinois",
    seed: 3,
    region: "South",
    conference: "Big Ten",
    mascot: {
      name: "Chief Illiniwek",
      description: "A representation of the Illiniwek tribal confederation that historically inhabited the region of present-day Illinois.",
      origin: "Illinois' Illini identity comes from the Native American tribes that inhabited the region; the Fighting Illini name was established in the 1920s."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Illinois+Fighting+Illini+fight+song",
    colors: { primary: "#13294B", secondary: "#E84A27" },
    stats: {
      ppg: 77.2, rpg: 34.6, apg: 14.8,
      fgPct: 46.8, threePct: 35.8, ftPct: 74.2,
      pace: 69.0, offEff: 114.0, defEff: 94.2
    },
    playingStyle: ["Big Ten physicality", "Interior-forward offense", "Ball-screen system", "Defensive versatility"],
    keyPlayers: [
      { name: "Terrence Shannon Jr.", position: "SG", ppg: 18.8, rpg: 4.8, apg: 2.6, role: "All-Big Ten scorer and team leader" },
      { name: "Coleman Hawkins", position: "PF", ppg: 14.6, rpg: 7.4, apg: 3.2, role: "Versatile stretch forward" },
      { name: "Quincy Guerrier", position: "SF", ppg: 11.8, rpg: 6.8, apg: 2.0, role: "Physical wing and rebounder" },
      { name: "Marcus Domask", position: "PG", ppg: 13.2, rpg: 4.2, apg: 4.8, role: "Crafty guard and facilitator" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-8",
    conferenceRecord: "12-8",
    keyWins: ["Michigan", "Purdue", "Michigan State", "Wisconsin"],
    notableLosses: ["Florida", "Michigan", "Purdue", "Wisconsin", "Ohio State", "UCLA", "Nebraska", "Northwestern", "Penn State", "Iowa", "Indiana", "Maryland", "Rutgers"]
  },

  {
    id: "nebraska",
    name: "Nebraska Cornhuskers",
    shortName: "Nebraska",
    seed: 4,
    region: "South",
    conference: "Big Ten",
    mascot: {
      name: "Lil' Red and Herbie Husker",
      description: "A cartoonish inflatable red character and a muscular farmer representing the agricultural heritage of Nebraska.",
      origin: "Nebraska's Cornhusker nickname dates to the 1890s, referring to farmers who husked corn by hand."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Nebraska+Cornhuskers+fight+song",
    colors: { primary: "#E41C38", secondary: "#FFFFFF" },
    stats: {
      ppg: 78.4, rpg: 35.4, apg: 15.0,
      fgPct: 47.0, threePct: 36.4, ftPct: 74.8,
      pace: 70.2, offEff: 114.8, defEff: 94.0
    },
    playingStyle: ["Dynamic offensive system", "Three-point shooting", "Athletic perimeter play", "Big Ten development"],
    keyPlayers: [
      { name: "C.J. Wilcher", position: "SG", ppg: 16.4, rpg: 3.8, apg: 3.2, role: "Three-point specialist and leading scorer" },
      { name: "Juwan Gary", position: "SF", ppg: 14.2, rpg: 6.4, apg: 2.6, role: "Athletic wing and rebounder" },
      { name: "Wilhelm Breidenbach", position: "PF", ppg: 12.8, rpg: 7.6, apg: 2.0, role: "Stretch forward and interior scorer" },
      { name: "Brice Williams", position: "PG", ppg: 13.6, rpg: 3.4, apg: 5.6, role: "Playmaking guard and team catalyst" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "26-6",
    conferenceRecord: "14-6",
    keyWins: ["Michigan", "Purdue", "Michigan State", "Illinois"],
    notableLosses: ["Florida", "Michigan", "Purdue", "Wisconsin", "Ohio State", "UCLA", "Illinois", "Northwestern", "Penn State", "Iowa", "Maryland"]
  },

  {
    id: "vanderbilt",
    name: "Vanderbilt Commodores",
    shortName: "Vanderbilt",
    seed: 5,
    region: "South",
    conference: "SEC",
    mascot: {
      name: "Mr. Commodore",
      description: "A naval commodore representing Cornelius Vanderbilt, the Commodore, who donated the land for Vanderbilt University.",
      origin: "Vanderbilt's Commodore nickname honors Cornelius Vanderbilt, known as 'The Commodore' of shipping."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Vanderbilt+Commodores+fight+song",
    colors: { primary: "#866D4B", secondary: "#000000" },
    stats: {
      ppg: 78.8, rpg: 34.2, apg: 15.6,
      fgPct: 47.2, threePct: 36.6, ftPct: 75.0,
      pace: 70.8, offEff: 115.0, defEff: 94.4
    },
    playingStyle: ["Offensive-minded basketball", "Three-point spacing", "Guard-wing combination", "Academic excellence meets athletics"],
    keyPlayers: [
      { name: "Tyrin Lawrence", position: "SG", ppg: 17.6, rpg: 4.0, apg: 3.4, role: "SEC standout scorer and perimeter threat" },
      { name: "Liam Robbins", position: "C", ppg: 14.4, rpg: 8.8, apg: 1.8, role: "Elite shot blocker and interior scorer" },
      { name: "Jordan Wright", position: "SF", ppg: 12.8, rpg: 6.4, apg: 2.8, role: "Versatile wing and defensive stalwart" },
      { name: "Ezra Manjon", position: "PG", ppg: 11.4, rpg: 3.2, apg: 5.8, role: "Crafty guard and playmaker" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "26-8",
    conferenceRecord: "13-5",
    keyWins: ["Alabama", "Florida", "Tennessee", "Kentucky"],
    notableLosses: ["Florida", "Alabama", "Tennessee", "Kentucky", "Arkansas", "Georgia", "Missouri", "Texas A&M", "Auburn", "LSU"]
  },

  {
    id: "unc",
    name: "North Carolina Tar Heels",
    shortName: "UNC",
    seed: 6,
    region: "South",
    conference: "ACC",
    mascot: {
      name: "Rameses the Ram",
      description: "A ram representing the state animal of Tar Heels, inspired by the phrase about North Carolina natives sticking to their principles like tar.",
      origin: "UNC adopted the Tar Heel nickname in 1898; the Ram became the mascot in 1924 when the team's tackle was named Rameses."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=North+Carolina+Tar+Heels+fight+song",
    colors: { primary: "#4B9CD3", secondary: "#FFFFFF" },
    stats: {
      ppg: 80.2, rpg: 34.8, apg: 16.0,
      fgPct: 47.6, threePct: 35.8, ftPct: 74.8,
      pace: 71.2, offEff: 117.0, defEff: 94.8
    },
    playingStyle: ["Fast-break transition", "Motion offense", "Athletic wings", "Hubert Davis system"],
    keyPlayers: [
      { name: "Armando Bacot", position: "C", ppg: 15.6, rpg: 10.4, apg: 1.8, role: "All-American center and rebounding machine" },
      { name: "RJ Davis", position: "PG", ppg: 18.4, rpg: 4.2, apg: 4.6, role: "Dynamic guard and team captain" },
      { name: "Caleb Love", position: "SG", ppg: 15.8, rpg: 3.8, apg: 2.4, role: "Clutch scorer and perimeter threat" },
      { name: "Pete Nance", position: "PF", ppg: 11.6, rpg: 6.8, apg: 2.2, role: "Stretch forward and efficient scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-8",
    conferenceRecord: "13-7",
    keyWins: ["Duke", "Virginia", "Louisville", "Miami (FL)"],
    notableLosses: ["Florida", "Duke", "Virginia", "Clemson", "Louisville", "Miami (FL)", "Georgia Tech", "Wake Forest", "Syracuse", "Pitt", "Notre Dame"]
  },

  {
    id: "saint-marys",
    name: "Saint Mary's Gaels",
    shortName: "Saint Mary's",
    seed: 7,
    region: "South",
    conference: "WCC",
    mascot: {
      name: "Brother Gael",
      description: "A medieval Celtic Gael warrior representing the Irish heritage of the De La Salle Brothers who founded Saint Mary's College.",
      origin: "Saint Mary's adopted the Gaels as its athletic identity reflecting its Irish De La Salle Catholic heritage."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Saint+Marys+Gaels+fight+song",
    colors: { primary: "#D80024", secondary: "#003DA5" },
    stats: {
      ppg: 75.6, rpg: 33.4, apg: 14.4,
      fgPct: 46.6, threePct: 35.4, ftPct: 74.4,
      pace: 66.8, offEff: 113.0, defEff: 96.0
    },
    playingStyle: ["Randy Bennett system", "Patient ball movement", "Interior-focused offense", "WCC defensive excellence"],
    keyPlayers: [
      { name: "Mitchell Saxen", position: "C", ppg: 15.4, rpg: 8.6, apg: 1.8, role: "WCC's top big man and interior scorer" },
      { name: "Alex Ducas", position: "SF", ppg: 14.2, rpg: 5.4, apg: 2.6, role: "Versatile wing and three-point threat" },
      { name: "Aidan Mahaney", position: "PG", ppg: 13.6, rpg: 3.4, apg: 5.6, role: "Lead guard and playmaker" },
      { name: "Kyle Bowen", position: "PF", ppg: 11.2, rpg: 7.2, apg: 1.6, role: "Physical forward and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "27-5",
    conferenceRecord: "15-3",
    keyWins: ["Gonzaga", "BYU", "San Francisco", "Pacific"],
    notableLosses: ["Florida", "Gonzaga", "BYU", "Pacific", "Pepperdine", "San Diego"]
  },

  {
    id: "clemson",
    name: "Clemson Tigers",
    shortName: "Clemson",
    seed: 8,
    region: "South",
    conference: "ACC",
    mascot: {
      name: "The Tiger",
      description: "A tiger representing the fierce, powerful spirit of Clemson athletics and the Tiger mascot tradition.",
      origin: "Clemson adopted the Tiger as its mascot in the early 20th century, inspired by the school's military heritage."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Clemson+Tigers+fight+song",
    colors: { primary: "#F56600", secondary: "#522D80" },
    stats: {
      ppg: 74.8, rpg: 33.6, apg: 13.8,
      fgPct: 45.4, threePct: 34.4, ftPct: 73.0,
      pace: 68.2, offEff: 111.4, defEff: 96.6
    },
    playingStyle: ["Brad Brownell defensive system", "Physical ACC play", "Interior-based offense", "Guard-forward balance"],
    keyPlayers: [
      { name: "PJ Hall", position: "PF", ppg: 17.4, rpg: 7.4, apg: 2.4, role: "All-ACC forward and leading scorer" },
      { name: "Chase Hunter", position: "SG", ppg: 14.6, rpg: 3.8, apg: 3.4, role: "Veteran guard and defensive stopper" },
      { name: "Brevin Galloway", position: "PG", ppg: 12.2, rpg: 3.2, apg: 5.6, role: "Lead guard and playmaker" },
      { name: "Ian Schieffelin", position: "C", ppg: 10.8, rpg: 8.4, apg: 1.4, role: "Physical interior anchor" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "24-10",
    conferenceRecord: "12-8",
    keyWins: ["Duke", "North Carolina", "Virginia", "Louisville"],
    notableLosses: ["Florida", "Duke", "UNC", "Virginia", "Louisville", "Miami (FL)", "Georgia Tech", "Wake Forest", "Syracuse", "Pitt", "Notre Dame"]
  },

  {
    id: "iowa",
    name: "Iowa Hawkeyes",
    shortName: "Iowa",
    seed: 9,
    region: "South",
    conference: "Big Ten",
    mascot: {
      name: "Herky the Hawk",
      description: "A fierce hawk representing the Hawkeye State's heritage, named after the legendary Sauk leader Black Hawk.",
      origin: "Iowa adopted the Hawkeye nickname in 1838 honoring Black Hawk; Herky the Hawk was created in 1948."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Iowa+Hawkeyes+fight+song",
    colors: { primary: "#FFCD00", secondary: "#000000" },
    stats: {
      ppg: 73.6, rpg: 34.0, apg: 13.4,
      fgPct: 44.8, threePct: 33.8, ftPct: 72.8,
      pace: 67.4, offEff: 110.6, defEff: 97.4
    },
    playingStyle: ["Interior-forward focus", "Big Ten physicality", "Post-up game", "Methodical offense"],
    keyPlayers: [
      { name: "Patrick McCaffery", position: "SF", ppg: 14.8, rpg: 5.6, apg: 2.8, role: "Versatile wing and son of Fran McCaffery" },
      { name: "Tony Perkins", position: "PG", ppg: 13.6, rpg: 4.2, apg: 5.0, role: "Lead guard and facilitator" },
      { name: "Filip Rebraca", position: "C", ppg: 12.4, rpg: 8.6, apg: 1.6, role: "Interior anchor and rebounder" },
      { name: "Kris Murray", position: "PF", ppg: 15.2, rpg: 7.2, apg: 2.4, role: "Stretch forward and scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-12",
    conferenceRecord: "10-10",
    keyWins: ["Michigan State", "Purdue", "Illinois", "Wisconsin"],
    notableLosses: ["Florida", "Michigan", "Purdue", "Michigan State", "Wisconsin", "Ohio State", "UCLA", "Nebraska", "Northwestern", "Penn State", "Indiana", "Maryland", "Rutgers", "Minnesota"]
  },

  {
    id: "texas-am",
    name: "Texas A&M Aggies",
    shortName: "Texas A&M",
    seed: 10,
    region: "South",
    conference: "SEC",
    mascot: {
      name: "Reveille the Rough Collie",
      description: "A rough collie dog serving as the official mascot of Texas A&M, a beloved symbol of the Aggie tradition.",
      origin: "The first Reveille became the Texas A&M mascot in 1931 after being adopted by cadets."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Texas+AM+Aggies+fight+song",
    colors: { primary: "#500000", secondary: "#FFFFFF" },
    stats: {
      ppg: 73.8, rpg: 33.4, apg: 13.6,
      fgPct: 44.6, threePct: 33.6, ftPct: 72.4,
      pace: 68.0, offEff: 110.4, defEff: 98.0
    },
    playingStyle: ["SEC physicality", "Interior-based offense", "Physical defense", "Controlled tempo"],
    keyPlayers: [
      { name: "Tyrece Radford", position: "SG", ppg: 15.6, rpg: 4.8, apg: 3.0, role: "Dynamic wing scorer and team leader" },
      { name: "Quenton Jackson", position: "PG", ppg: 13.2, rpg: 3.4, apg: 5.4, role: "Experienced guard and playmaker" },
      { name: "Henry Coleman III", position: "PF", ppg: 11.8, rpg: 7.6, apg: 1.8, role: "Physical forward and rebounder" },
      { name: "Marcus Williams", position: "C", ppg: 10.4, rpg: 7.8, apg: 1.2, role: "Interior anchor and shot blocker" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-11",
    conferenceRecord: "9-9",
    keyWins: ["Alabama", "Tennessee", "Florida", "Auburn"],
    notableLosses: ["Saint Mary's", "Alabama", "Tennessee", "Florida", "Auburn", "Kentucky", "Arkansas", "Georgia", "Missouri", "Vanderbilt", "Texas", "LSU", "Mississippi State"]
  },

  {
    id: "vcu",
    name: "VCU Rams",
    shortName: "VCU",
    seed: 11,
    region: "South",
    conference: "A-10",
    mascot: {
      name: "Rodney the Ram",
      description: "A ram representing the strength, determination, and never-say-die spirit of VCU Rams athletics.",
      origin: "VCU adopted the Rams as its athletic nickname, reflecting the horned animal's fierce competitive nature."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=VCU+Rams+fight+song",
    colors: { primary: "#FFD100", secondary: "#000000" },
    stats: {
      ppg: 75.2, rpg: 33.8, apg: 14.6,
      fgPct: 45.6, threePct: 34.8, ftPct: 73.6,
      pace: 70.2, offEff: 112.8, defEff: 96.4
    },
    playingStyle: ["HAVOC full-court press", "Turnover-creating defense", "Fast-break offense", "Athletic guards"],
    keyPlayers: [
      { name: "Joe Bamisile", position: "SG", ppg: 17.8, rpg: 4.4, apg: 3.2, role: "Athletic guard and leading scorer" },
      { name: "Jamir Watkins", position: "SF", ppg: 14.6, rpg: 5.8, apg: 2.8, role: "Wing scorer and defensive terror" },
      { name: "Ace Baldwin Jr.", position: "PG", ppg: 12.4, rpg: 4.0, apg: 7.2, role: "HAVOC maestro and playmaker" },
      { name: "David Shriver", position: "PF", ppg: 10.2, rpg: 6.4, apg: 1.6, role: "Physical forward and rebounder" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "27-7",
    conferenceRecord: "14-4",
    keyWins: ["Saint Louis", "Dayton", "Davidson", "Richmond"],
    notableLosses: ["North Carolina", "Saint Louis", "Dayton", "Davidson", "Richmond", "George Mason", "George Washington", "Fordham", "La Salle", "Duquesne"]
  },

  {
    id: "mcneese",
    name: "McNeese Cowboys",
    shortName: "McNeese",
    seed: 12,
    region: "South",
    conference: "Southland",
    mascot: {
      name: "Maverick the Cowboy",
      description: "A cowboy representing the Louisiana cattle ranching culture and the rugged, independent spirit of McNeese State.",
      origin: "McNeese State adopted Cowboys as its athletic identity reflecting the cattle ranching history of Southwest Louisiana."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=McNeese+Cowboys+fight+song",
    colors: { primary: "#0067B1", secondary: "#FFC82E" },
    stats: {
      ppg: 77.4, rpg: 34.2, apg: 14.8,
      fgPct: 46.6, threePct: 35.8, ftPct: 74.4,
      pace: 70.6, offEff: 114.0, defEff: 100.8
    },
    playingStyle: ["Southland champion", "High-scoring offense", "Three-point proficiency", "Athletic guard play"],
    keyPlayers: [
      { name: "Harwin Francois", position: "PG", ppg: 19.8, rpg: 4.4, apg: 5.6, role: "Southland Player of the Year" },
      { name: "Christian Shumate", position: "C", ppg: 14.2, rpg: 8.8, apg: 1.6, role: "Dominant interior presence" },
      { name: "Will Johnston", position: "SG", ppg: 12.8, rpg: 3.4, apg: 2.6, role: "Perimeter scorer and three-point threat" },
      { name: "Derek Rogers", position: "SF", ppg: 10.6, rpg: 5.6, apg: 2.2, role: "Versatile wing scorer" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "28-5",
    conferenceRecord: "15-3",
    keyWins: ["Southeastern Louisiana", "Northwestern State", "Nicholls", "Houston Baptist"],
    notableLosses: ["Vanderbilt", "Southeastern Louisiana", "Northwestern State", "Nicholls", "Houston Baptist"]
  },

  {
    id: "troy",
    name: "Troy Trojans",
    shortName: "Troy",
    seed: 13,
    region: "South",
    conference: "Sun Belt",
    mascot: {
      name: "Thunder the Trojan",
      description: "A Trojan warrior representing the legendary warriors of ancient Troy, symbolizing strength and competitive valor.",
      origin: "Troy University adopted the Trojans as its athletic mascot in 1950."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Troy+Trojans+fight+song",
    colors: { primary: "#8B0000", secondary: "#C0C0C0" },
    stats: {
      ppg: 72.4, rpg: 32.8, apg: 13.0,
      fgPct: 44.0, threePct: 33.8, ftPct: 72.0,
      pace: 68.4, offEff: 109.0, defEff: 102.0
    },
    playingStyle: ["Sun Belt physical play", "Interior-based offense", "Defensive rebounding", "Conference championship excellence"],
    keyPlayers: [
      { name: "Zay Williams", position: "SG", ppg: 16.8, rpg: 4.0, apg: 3.0, role: "Sun Belt leading scorer and team captain" },
      { name: "Christian Turner", position: "PG", ppg: 13.4, rpg: 3.6, apg: 5.8, role: "Dynamic guard and playmaker" },
      { name: "Duke Miles", position: "PF", ppg: 11.6, rpg: 7.4, apg: 1.6, role: "Physical forward and rebounder" },
      { name: "Aboubacar Traore", position: "C", ppg: 9.8, rpg: 8.4, apg: 1.0, role: "Interior anchor and shot blocker" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "22-11",
    conferenceRecord: "12-6",
    keyWins: ["Louisiana", "South Alabama", "Appalachian State", "Georgia Southern"],
    notableLosses: ["Nebraska", "Louisiana", "South Alabama", "Appalachian State", "Georgia Southern", "Arkansas State", "Texas State", "Old Dominion", "Southern Miss", "Georgia State", "James Madison"]
  },

  {
    id: "penn",
    name: "Penn Quakers",
    shortName: "Penn",
    seed: 14,
    region: "South",
    conference: "Ivy",
    mascot: {
      name: "The Quaker",
      description: "A Quaker representing William Penn, the founder of Pennsylvania and a member of the Religious Society of Friends (Quakers).",
      origin: "Penn adopted the Quaker as its athletic identity honoring William Penn and Pennsylvania's Quaker heritage."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Penn+Quakers+fight+song",
    colors: { primary: "#011F5B", secondary: "#990000" },
    stats: {
      ppg: 70.8, rpg: 31.8, apg: 12.6,
      fgPct: 43.4, threePct: 33.6, ftPct: 71.4,
      pace: 65.6, offEff: 107.0, defEff: 103.8
    },
    playingStyle: ["Ivy League precision basketball", "Ball-screen offense", "Disciplined defense", "Academic-athlete excellence"],
    keyPlayers: [
      { name: "Jordan Dingle", position: "SG", ppg: 21.4, rpg: 4.2, apg: 2.8, role: "Ivy League's top scorer and all-conference player" },
      { name: "Clark Slajchert", position: "PG", ppg: 13.6, rpg: 3.4, apg: 5.8, role: "Crafty guard and playmaker" },
      { name: "Nick Spinoso", position: "C", ppg: 11.2, rpg: 7.6, apg: 1.4, role: "Interior anchor and rebounder" },
      { name: "Max Martz", position: "SF", ppg: 9.4, rpg: 4.8, apg: 2.2, role: "Versatile wing and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "18-11",
    conferenceRecord: "10-4",
    keyWins: ["Harvard", "Yale", "Princeton", "Cornell"],
    notableLosses: ["Illinois", "Harvard", "Yale", "Princeton", "Cornell", "Columbia", "Dartmouth", "Brown"]
  },

  {
    id: "idaho",
    name: "Idaho Vandals",
    shortName: "Idaho",
    seed: 15,
    region: "South",
    conference: "Big Sky",
    mascot: {
      name: "Joe Vandal",
      description: "A rugged, frontier-era character representing the pioneering spirit and toughness of Idaho's history.",
      origin: "Idaho adopted the Vandals as its athletic nickname in 1921 after the Germanic Vandal tribe."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Idaho+Vandals+fight+song",
    colors: { primary: "#B3A369", secondary: "#000000" },
    stats: {
      ppg: 71.2, rpg: 32.0, apg: 12.4,
      fgPct: 43.6, threePct: 33.2, ftPct: 71.0,
      pace: 65.8, offEff: 106.6, defEff: 104.0
    },
    playingStyle: ["Big Sky champion", "Physical defensive game", "Balanced offensive attack", "Grinding style"],
    keyPlayers: [
      { name: "Tanner Christensen", position: "SF", ppg: 17.2, rpg: 6.4, apg: 2.6, role: "Big Sky Player of the Year and team leader" },
      { name: "Mikey Dixon", position: "PG", ppg: 14.0, rpg: 3.4, apg: 5.4, role: "Dynamic guard and facilitator" },
      { name: "Kolton Mitchell", position: "C", ppg: 11.4, rpg: 8.2, apg: 1.4, role: "Interior anchor and rebounder" },
      { name: "Aidan Sherrill", position: "SG", ppg: 9.8, rpg: 3.2, apg: 2.4, role: "Perimeter scorer and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "21-14",
    conferenceRecord: "12-6",
    keyWins: ["Montana", "Weber State", "Eastern Washington", "Northern Colorado"],
    notableLosses: ["Houston", "Montana", "Weber State", "Eastern Washington", "Northern Colorado", "Montana State", "Sacramento State", "Northern Arizona", "Portland State", "Southern Utah"]
  },

  {
    id: "prairie-view",
    name: "Prairie View A&M Panthers",
    shortName: "Prairie View",
    seed: 16,
    region: "South",
    conference: "SWAC",
    mascot: {
      name: "Judo the Panther",
      description: "A black panther representing the strength, pride, and fierce competitive spirit of Prairie View A&M University.",
      origin: "Prairie View adopted the Panther as its mascot reflecting the bold, powerful identity of this historic HBCU."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Prairie+View+AM+Panthers+fight+song",
    colors: { primary: "#4F2D7F", secondary: "#FFB300" },
    stats: {
      ppg: 70.4, rpg: 31.2, apg: 12.2,
      fgPct: 42.8, threePct: 32.8, ftPct: 70.6,
      pace: 67.0, offEff: 105.6, defEff: 105.2
    },
    playingStyle: ["SWAC conference play", "Athletic offense", "HBCU pride", "Guard-oriented game"],
    keyPlayers: [
      { name: "Dennis Jones", position: "PG", ppg: 16.4, rpg: 3.8, apg: 5.4, role: "SWAC Player of the Year and team engine" },
      { name: "Quinton Williams", position: "SF", ppg: 12.8, rpg: 6.2, apg: 2.2, role: "Versatile wing and scorer" },
      { name: "Gary Blackston", position: "C", ppg: 10.6, rpg: 7.8, apg: 1.2, role: "Interior anchor and rebounder" },
      { name: "Jalen Jackson", position: "SG", ppg: 9.4, rpg: 3.2, apg: 2.6, role: "Perimeter scorer and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "18-17",
    conferenceRecord: "10-8",
    keyWins: ["Southern", "Grambling", "Alcorn State", "Jackson State"],
    notableLosses: ["Florida", "Southern", "Grambling", "Alcorn State", "Jackson State", "Texas Southern", "Bethune-Cookman", "Alabama State", "Alabama A&M", "Arkansas-Pine Bluff", "Mississippi Valley State", "Florida A&M", "Wiley", "Huston-Tillotson", "Arkansas Baptist", "Paul Quinn", "Texas College", "Miles"]
  },

  {
    id: "lehigh",
    name: "Lehigh Mountain Hawks",
    shortName: "Lehigh",
    seed: 16,
    region: "South",
    conference: "Patriot",
    mascot: {
      name: "Clutch the Mountain Hawk",
      description: "A red-tailed hawk representing the mountain hawks that soar above the Lehigh Valley region of Pennsylvania.",
      origin: "Lehigh adopted the Mountain Hawks as its mascot in 1995, replacing the Engineers nickname."
    },
    fightSongUrl: "https://www.youtube.com/results?search_query=Lehigh+Mountain+Hawks+fight+song",
    colors: { primary: "#653300", secondary: "#FFFFFF" },
    stats: {
      ppg: 70.6, rpg: 31.4, apg: 12.0,
      fgPct: 43.0, threePct: 33.0, ftPct: 70.8,
      pace: 65.4, offEff: 105.8, defEff: 105.6
    },
    playingStyle: ["Patriot League physical play", "Perimeter shooting", "Athletic defense", "Academic-athlete program"],
    keyPlayers: [
      { name: "Evan Taylor", position: "SG", ppg: 16.8, rpg: 4.2, apg: 2.8, role: "Patriot League scoring leader" },
      { name: "Keith Higgins Jr.", position: "PG", ppg: 13.2, rpg: 3.4, apg: 5.6, role: "Lead guard and playmaker" },
      { name: "Tyler Whitney-Sidney", position: "PF", ppg: 11.4, rpg: 7.4, apg: 1.6, role: "Physical forward and rebounder" },
      { name: "Dominic Parolin", position: "SF", ppg: 9.6, rpg: 4.8, apg: 2.2, role: "Versatile wing and defender" }
    ],
    injuries: [],
    merchUrl: "https://www.fanatics.com/college-march-madness/o-3527+z-9258931875-2059498577",
    record: "18-16",
    conferenceRecord: "9-9",
    keyWins: ["Holy Cross", "Army", "Bucknell", "Colgate"],
    notableLosses: ["Florida", "Holy Cross", "Army", "Bucknell", "Colgate", "American", "Navy", "Lafayette", "Boston University", "Loyola Maryland", "Fordham", "Georgetown", "Army", "Colgate", "Lafayette", "Navy", "Fordham"]
  },

];

// Helper functions
export function getTeamsByRegion(region: "East" | "West" | "South" | "Midwest"): Team[] {
  return teams.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}
