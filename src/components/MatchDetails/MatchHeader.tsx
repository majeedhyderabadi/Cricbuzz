import "./MatchHeader.css";
import type { CricbuzzMatchHeader } from "../types/CricbuzzLiveMatchInfo";

type MatchHeaderProps = {
  matchHeader: CricbuzzMatchHeader;
};

function MatchHeader({ matchHeader }: MatchHeaderProps) {
  return (
    <section className="match-header">

      <div className="match-header__top">
        <span className="match-header__sport">
          {matchHeader.matchFormat.toUpperCase()}
        </span>

        <span className="match-header__status">
          {matchHeader.complete ? "ENDED" : "LIVE"}
        </span>
      </div>

      <h1 className="match-header__title">
        {matchHeader.team1.name} vs {matchHeader.team2.name}
      </h1>

      <div className="match-header__meta">
        <span>{matchHeader.matchDescription}</span>

        <span>•</span>

        <span>{matchHeader.seriesName}</span>

        <span>•</span>

        <span>
          {new Date(matchHeader.matchStartTimestamp).toLocaleDateString()}
        </span>
      </div>

    </section>
  );
}

export default MatchHeader;