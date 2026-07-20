import "./MatchGrid.css";
import MatchCard from "./MatchCard";

import type { MatchCardModel } from "../types/MatchCardModel";

type MatchGridProps = {
  matches: MatchCardModel[];
  selectedFixtureId?: string | null;

onMatchSelect: (match: MatchCardModel) => void;
};

function MatchGrid({
  matches,
  selectedFixtureId,
  onMatchSelect
}: MatchGridProps) {
  return (
    <section className="match-grid">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
           isSelected={match.id === selectedFixtureId}
   onClick={() => onMatchSelect(match)}
        />
      ))}
    </section>
  );
}

export default MatchGrid;