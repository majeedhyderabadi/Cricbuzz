import "./MatchSummary.css";
import type { CricbuzzMatchHeader,CricbuzzMiniScore } from "../types/CricbuzzLiveMatchInfo";

type MatchSummaryProps = {
  matchHeader: CricbuzzMatchHeader;
  miniscore: CricbuzzMiniScore;
};

function MatchSummary({
  matchHeader,
  miniscore
}: MatchSummaryProps) {

  const innings = miniscore.matchScoreDetails.inningsScoreList;

  const team1Scores = innings.filter(
    (inning) => inning.batTeamId === matchHeader.team1.id
  );

  const team2Scores = innings.filter(
    (inning) => inning.batTeamId === matchHeader.team2.id
  );

  const formatScore = (
    teamInnings: typeof innings
  ) => {
    if (teamInnings.length === 0) {
      return "Yet to bat";
    }

    return teamInnings
      .map(
        (inning) =>
          `${inning.score}/${inning.wickets} (${inning.overs})`
      )
      .join(" & ");
  };

  return (
    <section className="match-summary">

      <div className="match-summary__teams">

        <div className="match-summary__team">
          <span className="match-summary__team-name">
            {matchHeader.team1.name}
          </span>

          <span className="match-summary__score">
            {formatScore(team1Scores)}
          </span>
        </div>

        <div className="match-summary__team">
          <span className="match-summary__team-name">
            {matchHeader.team2.name}
          </span>

          <span className="match-summary__score">
            {formatScore(team2Scores)}
          </span>
        </div>

      </div>

      <div className="match-summary__footer">
        <span>{matchHeader.status}</span>
      </div>

      <div className="match-summary__result">
        {matchHeader.result.winningTeam
          ? `Winner: ${matchHeader.result.winningTeam}`
          : matchHeader.status}
      </div>

    </section>
  );
}

export default MatchSummary;