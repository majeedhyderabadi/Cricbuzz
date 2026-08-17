import "./MatchSummary.css";

import type {
  MatchHeaderModel,
  MatchLiveModel,
} from "../types/MatchDetailsModel";

type MatchSummaryProps = {
  header: MatchHeaderModel;
  live: MatchLiveModel;
};

function MatchSummary({ header, live }: MatchSummaryProps) {
  const innings = live.matchScoreDetails.inningsScoreList;

  const team1Scores = innings.filter(
    (inning) => inning.batTeamId === header.team1.id,
  );

  const team2Scores = innings.filter(
    (inning) => inning.batTeamId === header.team2.id,
  );

  const formatScore = (teamInnings: typeof innings) => {
    if (teamInnings.length === 0) {
      // If there are no innings recorded yet, but the match live data
      // indicates this team is currently batting, display the live
      // team score and overs instead of "Yet to bat".
      const battingTeamId = live?.batTeam?.teamId;
      if (battingTeamId) {
        // Team 1 is batting
        if (battingTeamId === header.team1.id) {
          return `${live?.batTeam?.teamScore ?? 0}/${live?.batTeam?.teamWkts ?? 0} (${live?.overs ?? 0})`;
        }

        // Team 2 is batting
        if (battingTeamId === header.team2.id) {
          return `${live?.batTeam?.teamScore ?? 0}/${live?.batTeam?.teamWkts ?? 0} (${live?.overs ?? 0})`;
        }
      }

      return "Yet to bat";
    }

    return teamInnings
      .map((inning) => `${inning.score}/${inning.wickets} (${inning.overs})`)
      .join(" & ");
  };

  return (
    <section className="match-summary">
      <div className="match-summary__teams">
        <div className="match-summary__team">
          <span className="match-summary__team-name">{header.team1.name}</span>

          <span className="match-summary__score">
            {formatScore(team1Scores)}
          </span>
        </div>

        <div className="match-summary__team">
          <span className="match-summary__team-name">{header.team2.name}</span>

          <span className="match-summary__score">
            {formatScore(team2Scores)}
          </span>
        </div>
      </div>

      <div className="match-summary__footer">
        <span>{header.status}</span>
      </div>

      <div className="match-summary__result">
        {header.result.winningTeam
          ? `Winner: ${header.result.winningTeam}`
          : header.status}
      </div>
    </section>
  );
}

export default MatchSummary;
