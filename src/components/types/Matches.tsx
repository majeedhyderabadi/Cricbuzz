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