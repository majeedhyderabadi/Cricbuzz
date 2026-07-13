import "./MatchInfo.css";
import type { MatchDetails } from "../types/Matches";

type MatchInfoProps = {
  match: MatchDetails;
};

function MatchInfo({ match }: MatchInfoProps) {
  return (
    <section className="match-info">

      <div className="match-info__header">
        <h2>Match Information</h2>
      </div>

      <div className="match-info__body">

        <div className="match-info__row">
          <span>Sport</span>
          <span>{match.matchType.toUpperCase()}</span>
        </div>

        <div className="match-info__row">
          <span>Match</span>
          <span>{match.name}</span>
        </div>

        <div className="match-info__row">
          <span>Venue</span>
          <span>{match.venue}</span>
        </div>

        <div className="match-info__row">
          <span>Date</span>
          <span>{match.date}</span>
        </div>

        <div className="match-info__row">
          <span>Toss</span>
          <span>
            {match.tossWinner} chose to {match.tossChoice}
          </span>
        </div>

        <div className="match-info__row">
          <span>Winner</span>
          <span>{match.matchWinner || "TBD"}</span>
        </div>

      </div>
    </section>
  );
}

export default MatchInfo;