export interface CricbuzzMatchDetailsResponse {
  matchCommentary: Record<string, CricbuzzMatchCommentary>;
  miniscore: CricbuzzMiniScore;
  enableNoContent: boolean;
  matchHeader: CricbuzzMatchHeader;
  matchVideos: unknown[];
  page: string;
  responseLastUpdated: number;
}

export interface CricbuzzMatchCommentary {
  matchId: number;
  commType: string;
  commText: string;
  inningsId: number;
  event: string[];
  ballMetric: number | null;
  teamName: string;
  timestamp: number;
  overSeparator: CricbuzzOverSeparator | null;
  batsmanDetails: CricbuzzCommentaryPlayer;
  bowlerDetails: CricbuzzCommentaryPlayer;
}

export interface CricbuzzCommentaryPlayer {
  playerId: number;
  playerName: string;
}

export interface CricbuzzOverSeparator {
  timestamp: number;
  overNumber: number;
  overSummary: string;
  overRuns: number;
  batTeamObj: {
    teamName: string;
    teamScore: string;
  };
  batStrikerObj: CricbuzzOverPlayer;
  batNonStrikerObj: CricbuzzOverPlayer;
  bowlerObj: CricbuzzOverPlayer;
}

export interface CricbuzzOverPlayer {
  playerId: number;
  playerName: string;
  playerScore: string;
}

export interface CricbuzzMiniScore {
  inningsId: number;
  batTeam: {
    teamId: number;
    teamScore: number;
    teamWkts: number;
  };

  status: string;

  batsmanStriker: CricbuzzBatsman;
  batsmanNonStriker: CricbuzzBatsman;

  bowlerStriker: CricbuzzBowler;
  bowlerNonStriker: CricbuzzBowler;

  overs: number;
  target: number | null;

  partnerShip: {
    balls: number;
    runs: number;
  };

  currentRunRate: number;
  requiredRunRate: number;
  runsPerBall: number;
  requiredRunsPerBall: number;

  matchScoreDetails: CricbuzzMatchScoreDetails;

  lastWicket: string;
  remRunsToWin: number;
  oversRem: number;

  responseLastUpdated: number;

  latestPerformance: unknown[];

  recentOvsStats: string;
  event: string;

  batTeamScoreObj: CricbuzzTeamScoreObject;
  bowlTeamScoreObj: CricbuzzTeamScoreObject;

  matchUdrs: unknown | null;
}

export interface CricbuzzBatsman {
  id: number;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
  playerUrl: string;
  playerMatchHighlightsUrl: string;
}

export interface CricbuzzBowler {
  id: number;
  name: string;
  overs: number;
  maidens: number;
  economy: number;
  runs: number;
  wickets: number;
  playerUrl: string;
  playerMatchHighlightsUrl: string;
}

export interface CricbuzzMatchScoreDetails {
  matchId: number;
  inningsScoreList: CricbuzzInningsScore[];
  isMatchNotCovered: boolean;
  matchFormat: string;
  customStatus: string;
  state: string;
}

export interface CricbuzzInningsScore {
  inningsId: number;
  batTeamId: number;
  batTeamName: string;
  score: number;
  wickets: number;
  overs: number;
  isDeclared: boolean;
  isFollowOn: boolean;
  ballNbr: number;
}

export interface CricbuzzTeamScoreObject {
  teamName: string;
  teamInningsArray: CricbuzzInningsScore[];
}

export interface CricbuzzMatchHeader {
  matchId: number;
  matchDescription: string;
  matchFormat: string;
  matchType: string;

  complete: boolean;
  domestic: boolean;

  matchStartTimestamp: number;

  matchStartTimeIST: string;
  matchStartTimeGMT: string;
  matchStartTimeLocal: string;

  matchCompleteTimeIST: string;
  matchCompleteTimeGMT: string;
  matchCompleteTimeLocal: string;

  dayNight: boolean;
  year: number;

  state: string;
  status: string;

  tossResults: {
    tossWinnerId: number;
    tossWinnerName: string;
    decision: string;
  };

  result: {
    resultType: string | null;
    winningTeam: string | null;
    winningTeamId: number | null;
    winningMargin: number | null;
    winByRuns: boolean | null;
    winByInnings: boolean | null;
  };

  revisedTarget: {
    reason: number | null;
    revisedTarget: number | null;
    revisedOvers: number | null;
  };

  playersOfTheMatch: unknown[];
  playersOfTheSeries: unknown[];

  matchTeamInfo: CricbuzzMatchTeamInfo[];

  team1: CricbuzzMatchTeam;
  team2: CricbuzzMatchTeam;

  seriesDesc: string;
  seriesId: number;
  seriesName: string;

  alertType: string;
  isMatchNotCovered: boolean;
  livestreamEnabled: boolean;
}

export interface CricbuzzMatchTeamInfo {
  battingTeamId: number;
  battingTeamShortName: string;
  bowlingTeamId: number;
  bowlingTeamShortName: string;
}

export interface CricbuzzMatchTeam {
  id: number;
  name: string;
  playerDetails: unknown[];
  shortName: string;
}