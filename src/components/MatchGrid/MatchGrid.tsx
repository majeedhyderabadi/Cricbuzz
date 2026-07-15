import "./MatchGrid.css";
import MatchCard from "./MatchCard";

import type {
  MatchCardModel
} from "../types/MatchCardModel";

type MatchGridProps = {
  matches: MatchCardModel[];
  searchTerm?: string;
};

function MatchGrid({
  matches,
  searchTerm = ""
}: MatchGridProps) {

  const term =
    searchTerm.toLowerCase().trim();

  const filteredMatches =
    matches.filter((match) => {

      return (
        match.team1Name
          .toLowerCase()
          .includes(term) ||

        match.team2Name
          .toLowerCase()
          .includes(term) ||

        match.sport
          .toLowerCase()
          .includes(term) ||

        match.shortStatus
          .toLowerCase()
          .includes(term)
      );

    });

  return (
    <section className="match-grid">

      {filteredMatches.map((match) => (

        <MatchCard
          key={match.id}
          match={match}
        />

      ))}

    </section>
  );
}

export default MatchGrid;