export interface MatchDetailsModel {
  id: string;

  header: MatchDetailsHeaderModel;
  live: MatchLiveModel;
  commentary: Record<string, MatchCommentaryModel>;
}

export interface MatchDetailsHeaderModel {
  matchDescription: string;
  matchFormat: string;

  state: string;
  status: string;

  team1: MatchTeamModel;
  team2: MatchTeamModel;

  seriesName: string;

  matchStartTimeIST: string;
  matchStartTimeGMT: string;
  matchStartTimeLocal: string;
}

export interface MatchTeamModel {
  id: string;
  name: string;
  shortName: string;
}

export interface MatchLiveModel {
  inningsId: number;

  battingTeam: MatchBattingTeamModel;

  status: string;

  batsmanStriker: MatchBatsmanModel;
  batsmanNonStriker: MatchBatsmanModel;

  bowlerStriker: MatchBowlerModel;
  bowlerNonStriker: MatchBowlerModel;

  overs: number;
  target: number | null;

  currentRunRate: number;
  requiredRunRate: number;

  lastWicket: string;

  recentOversStats: string;
}

export interface MatchBattingTeamModel {
  teamId: string;
  score: number;
  wickets: number;
}

export interface MatchBatsmanModel {
  id: string;
  name: string;

  runs: number;
  balls: number;

  fours: number;
  sixes: number;

  strikeRate: string;
}

export interface MatchBowlerModel {
  id: string;
  name: string;

  overs: number;
  maidens: number;

  economy: number;
  runs: number;
  wickets: number;
}

export interface MatchCommentaryModel {
  matchId: string;

  commType: string;
  commText: string;

  inningsId: number;

  event: string[];

  ballMetric: number | null;

  teamName: string;

  timestamp: number;

  overSeparator: MatchOverSeparatorModel | null;
}

export interface MatchOverSeparatorModel {
  timestamp: number;

  overNumber: number;
  overSummary: string;
  overRuns: number;

  battingTeamName: string;
  battingTeamScore: string;

  striker: MatchOverPlayerModel;
  nonStriker: MatchOverPlayerModel;
  bowler: MatchOverPlayerModel;
}

export interface MatchOverPlayerModel {
  id: string;
  name: string;
  score: string;
}