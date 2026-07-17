import "./MatchGrid.css";
import { Link } from "react-router-dom";
import type { MatchCardModel } from "../types/MatchCardModel";

type MatchCardProps = {
  match: MatchCardModel;
};

function MatchCard({ match }: MatchCardProps) {

const route =
  match.source === "cricbuzz"
    ? `/match/${match.id}`
    : `/fixture/${match.id}`;

  return (
    <Link
      to={route}
      style={{
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <article className="match-card">

        <div className="match-card__header">

          <span className="match-card__sport">
            {match.sport}
          </span>

          <span className="match-card__live">

            {match.status === "In Progress" && (
              <span className="match-card__live-dot" />
            )}

            {match.status === "In Progress"
              ? "LIVE"
              : match.status}

          </span>

        </div>

        <div className="match-card__teams">

          <div className="match-card__team">

            <div className="match-card__team-info">
              <span className="orange-dot" />
              <span>{match.team1Name}</span>
            </div>

            <span className="match-card__score">
              {match.team1Score !== null
                ? `${match.team1Score}/${match.team1Wickets ?? 0}`
                : "-"}
            </span>

          </div>

          <div className="match-card__team">

            <div className="match-card__team-info">
              <span className="blue-dot" />
              <span>{match.team2Name}</span>
            </div>

            <span className="match-card__score">
              {match.team2Score !== null
                ? `${match.team2Score}/${match.team2Wickets ?? 0}`
                : "-"}
            </span>

          </div>

        </div>

        <div className="match-card__footer">

          <span>
            {match.shortStatus}
          </span>

          {match.overs !== null && (
            <span>
              {match.overs} Overs
            </span>
          )}

        </div>

      </article>
    </Link>
  );
}

export default MatchCard;