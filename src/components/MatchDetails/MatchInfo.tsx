import "./MatchInfo.css";
import type { CricbuzzMatchHeader } from "../types/CricbuzzLiveMatchInfo";

type MatchInfoProps = {
  matchHeader: CricbuzzMatchHeader;
};

function MatchInfo({ matchHeader }: MatchInfoProps) {
  return (
    <section className="match-info">

      <div className="match-info__header">
        <h2>Match Information</h2>
      </div>

      <div className="match-info__body">

        <div className="match-info__row">
          <span>Format</span>
          <span>{matchHeader.matchFormat.toUpperCase()}</span>
        </div>

        <div className="match-info__row">
          <span>Match</span>
          <span>{matchHeader.matchDescription}</span>
        </div>

        <div className="match-info__row">
          <span>Series</span>
          <span>{matchHeader.seriesName}</span>
        </div>

        <div className="match-info__row">
          <span>Date</span>
          <span>
            {new Date(
              matchHeader.matchStartTimestamp
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="match-info__row">
          <span>Time</span>
          <span>{matchHeader.matchStartTimeIST}</span>
        </div>

        <div className="match-info__row">
          <span>Toss</span>
          <span>
            {matchHeader.tossResults.tossWinnerName} chose to{" "}
            {matchHeader.tossResults.decision}
          </span>
        </div>

        <div className="match-info__row">
          <span>Winner</span>
          <span>
            {matchHeader.result.winningTeam || "TBD"}
          </span>
        </div>

      </div>
    </section>
  );
}

export default MatchInfo;