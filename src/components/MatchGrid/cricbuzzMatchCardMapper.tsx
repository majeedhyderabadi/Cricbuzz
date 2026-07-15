import type {
  CricbuzzMatchItem
} from "../types/Matches";

import type {
  MatchCardModel
} from "../types/MatchCardModel";

export function mapCricbuzzMatchToCard(
  item: CricbuzzMatchItem
): MatchCardModel {

  const { matchInfo, matchScore } = item.match;

  const team1Innings =
    matchScore?.team1Score?.inngs1;

  const team2Innings =
    matchScore?.team2Score?.inngs1;

  return {
    id: String(matchInfo.matchId),
    source: "cricbuzz",

    sport: matchInfo.matchFormat,
    status: matchInfo.state,
    shortStatus: matchInfo.shortStatus,

    team1Name: matchInfo.team1.teamName,
    team2Name: matchInfo.team2.teamName,

    team1Score: team1Innings?.runs ?? null,
    team1Wickets: team1Innings?.wickets ?? null,

    team2Score: team2Innings?.runs ?? null,
    team2Wickets: team2Innings?.wickets ?? null,

    overs:
      team2Innings?.overs ??
      team1Innings?.overs ??
      null
  };
}