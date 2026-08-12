


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

