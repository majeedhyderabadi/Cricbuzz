export interface CurrentMatchesResponse {
  apikey: string;
  data: CurrentMatch[];
}

export interface CurrentMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  series_Id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface MatchDetailsResponse {
  data: MatchDetails;
  status: string;
}

export interface MatchDetails {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;

  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];

  tossWinner: string;
  tossChoice: string;
  matchWinner: string;

  scorecard: Scorecard[];
  matchStarted: boolean;
  matchEnded: boolean;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface Scorecard {
  batting: Batting[];
  bowling: Bowling[];
  extras: Extras;
  inning: string;
}

export interface Batting {
  batsman: Player;
  dismissalText: string;
  r: number;
  b: number;
  fours: number;
  sixes: number;
  sr: number;
}

export interface Bowling {
  bowler: Player;
  o: number;
  m: number;
  r: number;
  w: number;
  nb: number;
  wd: number;
  eco: number;
}

export interface Player {
  id: string;
  name: string;
}

export interface Extras {
  r: number;
  b: number;
}


/////cricbuzz

export interface CricbuzzMatchList {
  matches: CricbuzzMatchItem[];
  responseLastUpdated: number;
}

export interface CricbuzzMatchItem {
  match: CricbuzzMatch;
}

export interface CricbuzzMatch {
  matchInfo: CricbuzzMatchInfo;
  matchScore: CricbuzzMatchScore | null;
}

export interface CricbuzzMatchInfo {
  matchId: number;
  seriesId: number;
  seriesName: string;
  matchDesc: string;
  matchFormat: string;
  startDate: number;
  endDate: number;
  state: string;
  status: string;
  team1: CricbuzzTeam;
  team2: CricbuzzTeam;
  venueInfo: CricbuzzVenue;
  currBatTeamId: number | null;
  stateTitle: string;
  matchType: string;
  shortStatus: string;
}

export interface CricbuzzTeam {
  teamId: number;
  teamName: string;
  teamSName: string;
  imageId: number;
}

export interface CricbuzzVenue {
  id: number;
  ground: string;
  city: string;
  timezone: string;
}

export interface CricbuzzMatchScore {
  team1Score: CricbuzzTeamScore | null;
  team2Score: CricbuzzTeamScore | null;
}

export interface CricbuzzTeamScore {
  inngs1: CricbuzzInningsScore | null;
  inngs2: CricbuzzInningsScore | null;
}

export interface CricbuzzInningsScore {
  inningsId: number;
  runs: number;
  wickets: number | null;
  overs: number;
  isDeclared: boolean | null;
}



/// cricbuzz math info types 

