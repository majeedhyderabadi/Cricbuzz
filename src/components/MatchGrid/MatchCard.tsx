import "./MatchGrid.css";
import { Link } from "react-router-dom";
import type { CricbuzzMatch } from "../types/Matches";

type MatchCardProps = {
  match: CricbuzzMatch;
};

function MatchCard({ match }: MatchCardProps) {
  const { matchInfo, matchScore } = match;

  const team1Score = matchScore?.team1Score?.inngs1;
  const team2Score = matchScore?.team2Score?.inngs1;

  return (
    <Link
      to={`/match/${matchInfo.matchId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="match-card">
        <div className="match-card__header">
          <span className="match-card__sport">
            {matchInfo.matchFormat}
          </span>

          <span className="match-card__live">
            <span className="match-card__live-dot"></span>
            {matchInfo.state === "In Progress" ? "LIVE" : matchInfo.state}
          </span>
        </div>

        <div className="match-card__teams">
          <div className="match-card__team">
            <div className="match-card__team-info">
              <span className="orange-dot"></span>
              <span>{matchInfo.team1.teamName}</span>
            </div>

            <span className="match-card__score">
              {team1Score
                ? `${team1Score.runs}/${team1Score.wickets ?? 0}`
                : "-"}
            </span>
          </div>

          <div className="match-card__team">
            <div className="match-card__team-info">
              <span className="blue-dot"></span>
              <span>{matchInfo.team2.teamName}</span>
            </div>

            <span className="match-card__score">
              {team2Score
                ? `${team2Score.runs}/${team2Score.wickets ?? 0}`
                : "-"}
            </span>
          </div>
        </div>

        <div className="match-card__footer">
          <span>{matchInfo.shortStatus}</span>

          <span>
            {team2Score?.overs ?? team1Score?.overs ?? 0} Overs
          </span>
        </div>
      </article>
    </Link>
  );
}

export default MatchCard;