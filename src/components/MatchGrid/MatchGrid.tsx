
import "./MatchGrid.css";
import MatchCard from "./MatchCard";


import { useState,useEffect } from "react";
import { matches } from "../Data/MatchesData";
import type { CricbuzzMatchItem } from "../types/Matches";

type MatchGridProps = {
   matches: CricbuzzMatchItem[];
  searchTerm?: string;
};

function MatchGrid({ matches, searchTerm = "" }: MatchGridProps) {
  const term = searchTerm.toLowerCase().trim();

  const filteredMatches = matches.filter((item) => {
  const info = item.match.matchInfo;

  return (
    info.seriesName.toLowerCase().includes(term) ||
    info.matchDesc.toLowerCase().includes(term) ||
    info.team1.teamName.toLowerCase().includes(term) ||
    info.team2.teamName.toLowerCase().includes(term)
  );
});

  return (
    <section className="match-grid">
      {filteredMatches.map((item) => (
  <MatchCard
    key={item.match.matchInfo.matchId}
    match={item.match}
  />
))}
    </section>
  );
}

export default MatchGrid;

