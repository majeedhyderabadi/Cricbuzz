import "./MatchStats.css";
import type { CricbuzzMiniScore } from "../types/CricbuzzLiveMatchInfo";

type MatchStatsProps = {
  miniscore: CricbuzzMiniScore;
};

function MatchStats({ miniscore }: MatchStatsProps) {
  return (
    <section className="match-stats">

      <h2>Match Stats</h2>

      <div className="match-stats__grid">

        <div className="match-stats__item">
          <span>Current Run Rate</span>
          <strong>{miniscore.currentRunRate}</strong>
        </div>

        <div className="match-stats__item">
          <span>Required Run Rate</span>
          <strong>
            {miniscore.requiredRunRate || "-"}
          </strong>
        </div>

        <div className="match-stats__item">
          <span>Overs</span>
          <strong>{miniscore.overs}</strong>
        </div>

        <div className="match-stats__item">
          <span>Target</span>
          <strong>{miniscore.target || "-"}</strong>
        </div>

        <div className="match-stats__item">
          <span>Partnership</span>
          <strong>
            {miniscore.partnerShip
              ? `${miniscore.partnerShip.runs} (${miniscore.partnerShip.balls} balls)`
              : "-"}
          </strong>
        </div>

        <div className="match-stats__item">
          <span>Runs Required</span>
          <strong>
            {miniscore.remRunsToWin || "-"}
          </strong>
        </div>

      </div>

    </section>
  );
}

export default MatchStats;