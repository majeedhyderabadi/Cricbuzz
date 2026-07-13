
import "./MatchGrid.css";
import MatchCard from "./MatchCard";


import { useState,useEffect } from "react";
import { matches } from "../Data/MatchesData";
import type { CurrentMatch } from "../types/Matches";

type MatchGridProps = {
  matches: CurrentMatch[];
  searchTerm?: string;
};

function MatchGrid({ matches, searchTerm = "" }: MatchGridProps) {

  const term = searchTerm.toLowerCase().trim();

  const filteredMatches = matches.filter(match =>
    match.name.toLowerCase().includes(term) ||
    match.teams.some(team => team.toLowerCase().includes(term))
  );

  return (
    <section className="match-grid">
      {filteredMatches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </section>
  );
}


export default MatchGrid;