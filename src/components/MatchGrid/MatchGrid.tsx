import "./MatchGrid.css";
import MatchCard from "./MatchCard";

import type { MatchCardModel } from "../types/MatchCardModel";

type MatchGridProps = {
  matches: MatchCardModel[];
};

function MatchGrid({ matches }: MatchGridProps) {
  return (
    <section className="match-grid">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
        />
      ))}
    </section>
  );
}

export default MatchGrid;