export interface Fixture {
  id: string;

  homeTeamId: string;
  homeTeamName: string;

  awayTeamId: string;
  awayTeamName: string;

  sport: string;
  scheduledAtUtc: string;
  status: string;

  homeScore: number;
  homeWickets: number;

  awayScore: number;
  awayWickets: number;
}