import "./MatchInfo.css";

import type {
  MatchHeaderModel
} from "../types/MatchDetailsModel";

type MatchInfoProps = {
  header: MatchHeaderModel;
};

function MatchInfo({ header }: MatchInfoProps) {
  return (
    <section className="match-info">

      <div className="match-info__header">
        <h2>Match Information</h2>
      </div>

      <div className="match-info__body">

        <div className="match-info__row">
          <span>Format</span>
          <span>{header.matchFormat.toUpperCase()}</span>
        </div>

        <div className="match-info__row">
          <span>Match</span>
          <span>{header.matchDescription}</span>
        </div>

        <div className="match-info__row">
          <span>Series</span>
          <span>{header.seriesName}</span>
        </div>

        <div className="match-info__row">
          <span>Date</span>
          <span>
            {new Date(
              header.matchStartTimestamp
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="match-info__row">
          <span>Time</span>
          <span>{header.matchStartTimeIST}</span>
        </div>

        <div className="match-info__row">
          <span>Toss</span>
          <span>
            {header.tossResults.tossWinnerName} chose to{" "}
            {header.tossResults.decision}
          </span>
        </div>

        <div className="match-info__row">
          <span>Winner</span>
          <span>
            {header.result.winningTeam || "TBD"}
          </span>
        </div>

      </div>

    </section>
  );
}

export default MatchInfo;