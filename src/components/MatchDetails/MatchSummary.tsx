import "./MatchSummary.css";
import type { MatchDetails } from "../types/Matches";

type MatchSummaryProps = {
  match: MatchDetails;
};

function MatchSummary({ match }: MatchSummaryProps) {

  const team1Score = match.score[0];
  const team2Score = match.score[1];

  return (
    <section className="match-summary">

      <div className="match-summary__teams">

        <div className="match-summary__team">
          <span className="match-summary__team-name">
            {match.teams[0]}
          </span>

          <span className="match-summary__score">
            {team1Score
              ? `${team1Score.r}/${team1Score.w} (${team1Score.o})`
              : "Yet to bat"}
          </span>
        </div>

        <div className="match-summary__team">
          <span className="match-summary__team-name">
            {match.teams[1]}
          </span>

          <span className="match-summary__score">
            {team2Score
              ? `${team2Score.r}/${team2Score.w} (${team2Score.o})`
              : "Yet to bat"}
          </span>
        </div>

      </div>

      <div className="match-summary__footer">
        <span>{match.status}</span>
      </div>

      <div className="match-summary__result">
        {match.matchWinner
          ? `Winner: ${match.matchWinner}`
          : match.status}
      </div>

    </section>
  );
}

export default MatchSummary;