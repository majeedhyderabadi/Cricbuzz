import "./MatchHeader.css";
import { useNavigate } from "react-router-dom";
import type { MatchHeaderModel } from "../types/MatchDetailsModel";

type MatchHeaderProps = {
  header: MatchHeaderModel;
};

function MatchHeader({ header }: MatchHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <section className="match-header">
      <div className="match-header__top">
        <button
          type="button"
          className="match-header__back"
          aria-label="Go back to dashboard"
          onClick={handleBack}
        >
          ←
        </button>

        <div className="match-header__badges">
          <span className="match-header__sport">
            {header.matchFormat.toUpperCase()}
          </span>

          <span className="match-header__status">
            {header.complete ? "ENDED" : "LIVE"}
          </span>
        </div>
      </div>

      <h1 className="match-header__title">
        {header.team1.name} vs {header.team2.name}
      </h1>

      <div className="match-header__meta">
        <span>{header.matchDescription}</span>

        <span>•</span>

        <span>{header.seriesName}</span>

        <span>•</span>

        <span>{new Date(header.matchStartTimestamp).toLocaleDateString()}</span>
      </div>
    </section>
  );
}

export default MatchHeader;
