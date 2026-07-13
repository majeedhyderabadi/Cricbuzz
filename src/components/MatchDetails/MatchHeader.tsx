import "./MatchHeader.css";
import type { MatchDetails } from "../types/Matches";

type MatchHeaderProps = {
  match: MatchDetails;
};

function MatchHeader({ match }: MatchHeaderProps) {
  return (
    <section className="match-header">

      <div className="match-header__top">
        <span className="match-header__sport">
          {match.matchType.toUpperCase()}
        </span>

        <span className="match-header__status">
          {match.matchEnded ? "ENDED" : "LIVE"}
        </span>
      </div>

      <h1 className="match-header__title">
        {match.teams[0]} vs {match.teams[1]}
      </h1>

      <div className="match-header__meta">
        <span>{match.name}</span>
        <span>•</span>
        <span>{match.venue}</span>
        <span>•</span>
        <span>{match.date}</span>
      </div>

    </section>
  );
}

export default MatchHeader;