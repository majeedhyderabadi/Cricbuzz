import "./MatchHeader.css";
import type { CricbuzzMatchHeader } from "../types/CricbuzzLiveMatchInfo";
import type { MatchHeaderModel } from "../types/MatchDetailsModel";

// type MatchHeaderProps = {
//   matchHeader: CricbuzzMatchHeader;
// };
type MatchHeaderProps = {
  header: MatchHeaderModel;
};

function MatchHeader({ header }: MatchHeaderProps) {
  return (
    <section className="match-header">

      <div className="match-header__top">
        <span className="match-header__sport">
          {header.matchFormat.toUpperCase()}
        </span>

        <span className="match-header__status">
          {header.complete ? "ENDED" : "LIVE"}
        </span>
      </div>

      <h1 className="match-header__title">
        {header.team1.name} vs {header.team2.name}
      </h1>

      <div className="match-header__meta">
        <span>{header.matchDescription}</span>

        <span>•</span>

        <span>{header.seriesName}</span>

        <span>•</span>

        <span>
          {new Date(header.matchStartTimestamp).toLocaleDateString()}
        </span>
      </div>

    </section>
  );
}

export default MatchHeader;