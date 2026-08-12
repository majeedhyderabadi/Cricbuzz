export interface CricbuzzScorecardResponse {
  scoreCard: CricbuzzScorecardInnings[];
  matchHeader: CricbuzzScorecardMatchHeader | null;
  status: string | null;
  videos: unknown[];
  responseLastUpdated: number;
  isMatchComplete: boolean;
}

export interface CricbuzzScorecardInnings {
  matchId: number;
  inningsId: number;
  timeScore: number;

  batTeamDetails: CricbuzzBatTeamDetails | null;
  bowlTeamDetails: CricbuzzBowlTeamDetails | null;
  scoreDetails: CricbuzzScoreDetails | null;
  extrasData: CricbuzzExtrasData | null;

  ppData: Record<string, CricbuzzPowerPlay>;
  wicketsData: Record<string, CricbuzzWicketData>;
  partnershipsData: Record<string, CricbuzzPartnershipData>;
}


// ============================================================
// MATCH HEADER
// ============================================================

export interface CricbuzzScorecardMatchHeader {
  matchId: number;
  matchDescription: string | null;
  matchFormat: string | null;
  matchType: string | null;
  complete: boolean;
  domestic: boolean;
  matchStartTimestamp: number;
  matchStartTimeIST: string | null;
  matchStartTimeGMT: string | null;
  matchStartTimeLocal: string | null;
  matchCompleteTimeIST: string | null;
  matchCompleteTimeGMT: string | null;
  matchCompleteTimeLocal: string | null;
  dayNight: boolean;
  year: number;
  state: string | null;
  status: string | null;
  seriesDesc: string | null;
  seriesId: number;
  seriesName: string | null;
  alertType: string | null;
  isMatchNotCovered: boolean;
  livestreamEnabled: boolean;
}


// ============================================================
// BATTING TEAM
// ============================================================

export interface CricbuzzBatTeamDetails {
  batTeamId: number;
  batTeamName: string | null;
  batTeamShortName: string | null;

  batsmenData: Record<string, CricbuzzScorecardBatsman>;
}

export interface CricbuzzScorecardBatsman {
  batId: number;
  batName: string | null;
  batShortName: string | null;

  isCaptain: boolean;
  isKeeper: boolean;

  runs: number;
  balls: number;
  dots: number;
  fours: number;
  sixes: number;
  mins: number;

  strikeRate: number;

  outDesc: string | null;

  bowlerId: number;
  fielderId1: number;
  fielderId2: number;
  fielderId3: number;

  ones: number;
  twos: number;
  threes: number;
  fives: number;

  boundaries: number;
  sixers: number;

  wicketCode: string | null;

  isOverseas: boolean;

  inMatchChange: string | null;
  playingXIChange: string | null;
}


// ============================================================
// BOWLING TEAM
// ============================================================

export interface CricbuzzBowlTeamDetails {
  bowlTeamId: number;
  bowlTeamName: string | null;
  bowlTeamShortName: string | null;

  bowlersData: Record<string, CricbuzzScorecardBowler>;
}

export interface CricbuzzScorecardBowler {
  bowlerId: number;
  bowlName: string | null;
  bowlShortName: string | null;

  isCaptain: boolean;
  isKeeper: boolean;

  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;

  no_Balls: number;
  wides: number;
  dots: number;
  balls: number;

  runsPerBall: number;

  isOverseas: boolean;

  inMatchChange: string | null;
  playingXIChange: string | null;
}


// ============================================================
// SCORE DETAILS
// ============================================================

export interface CricbuzzScoreDetails {
  ballNbr: number;
  overs: number;
  revisedOvers: number;
  runRate: number;
  runs: number;
  wickets: number;
  runsPerBall: number;
  isDeclared: boolean;
  isFollowOn: boolean;
}


// ============================================================
// EXTRAS
// ============================================================

export interface CricbuzzExtrasData {
  byes: number;
  legByes: number;
  noBalls: number;
  penalty: number;
  total: number;
  wides: number;
}


// ============================================================
// POWERPLAY
// ============================================================

export interface CricbuzzPowerPlay {
  ppId: number;
  ppOversFrom: number;
  ppOversTo: number;
  ppType: string | null;
  runsScored: number;
}


// ============================================================
// WICKETS
// ============================================================

export interface CricbuzzWicketData {
  batId: number;
  batName: string | null;
  wktNbr: number;
  wktOver: number;
  wktRuns: number;
  ballNbr: number;
}


// ============================================================
// PARTNERSHIPS
// ============================================================

export interface CricbuzzPartnershipData {
  bat1Id: number;
  bat1Name: string | null;
  bat1Runs: number;

  bat2Id: number;
  bat2Name: string | null;
  bat2Runs: number;

  totalRuns: number;
  totalBalls: number;

  bat1Ones: number;
  bat1Twos: number;
  bat1Threes: number;
  bat1Fives: number;
  bat1Boundaries: number;
  bat1Sixers: number;

  bat2Ones: number;
  bat2Twos: number;
  bat2Threes: number;
  bat2Fives: number;
  bat2Boundaries: number;
  bat2Sixers: number;

  bat1Fours: number;
  bat1Sixes: number;

  bat2Fours: number;
  bat2Sixes: number;

  bat1Balls: number;
  bat2Balls: number;
}