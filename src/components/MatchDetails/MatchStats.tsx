import "./MatchStats.css";

import type {
  MatchLiveModel
} from "../types/MatchDetailsModel";

type MatchStatsProps = {
  live: MatchLiveModel;
};

function MatchStats({ live }: MatchStatsProps) {
  return (
    <section className="match-stats">

      <h2>Match Stats</h2>

      <div className="match-stats__grid">

        <div className="match-stats__item">
          <span>Current Run Rate</span>
          <strong>{live.currentRunRate}</strong>
        </div>

        <div className="match-stats__item">
          <span>Required Run Rate</span>
          <strong>
            {live.requiredRunRate || "-"}
          </strong>
        </div>

        <div className="match-stats__item">
          <span>Overs</span>
          <strong>{live.overs}</strong>
        </div>

        <div className="match-stats__item">
          <span>Target</span>
          <strong>{live.target || "-"}</strong>
        </div>

        <div className="match-stats__item">
          <span>Partnership</span>
          <strong>
            {live.partnerShip
              ? `${live.partnerShip.runs} (${live.partnerShip.balls} balls)`
              : "-"}
          </strong>
        </div>

        <div className="match-stats__item">
          <span>Runs Required</span>
          <strong>
            {live.remRunsToWin || "-"}
          </strong>
        </div>

      </div>

    </section>
  );
}

export default MatchStats;