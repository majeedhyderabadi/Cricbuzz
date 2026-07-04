import React, { type ChangeEvent, useMemo, useState } from "react";
import "./FeedingMatch.css";

export interface FeedingMatch {
    id: number,
    sport: string,
    team1: string,
    team2: string,
    score: string,
    stage: string,
    progress: string
}

export default function FeedingMatch() {
const feedingMatches: FeedingMatch[] = [
    {
    id: 1,
    sport: "Cricket",
    team1: "Mumbai",
    team2: "Chennai",
    score: "186/5",
    stage: "2nd Innings",
    progress: "Over 18.3"
  },
  {
    id: 2,
    sport: "Cricket",
    team1: "India",
    team2: "Australia",
    score: "245/7",
    stage: "1st Innings",
    progress: "Over 44.2"
  },
  {
    id: 3,
    sport: "Football",
    team1: "Barcelona",
    team2: "Real Madrid",
    score: "2 - 1",
    stage: "Second Half",
    progress: "73'"
  },
  {
    id: 4,
    sport: "Football",
    team1: "Liverpool",
    team2: "Chelsea",
    score: "0 - 0",
    stage: "First Half",
    progress: "31'"
  }];

    const [selectedMatchId, setSelectedMatchId] = useState<number>(feedingMatches[0].id);

  const selectedMatch: FeedingMatch = useMemo(() => {
    return (
      feedingMatches.find((match) => match.id === selectedMatchId) ?? feedingMatches[0]
    );
  }, [selectedMatchId]);

  const handleMatchChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMatchId(Number(e.target.value));
  };

  return (
   <div className="feeding-match-container">
      <div className="feeding-label">
        <span>FEEDING MATCH</span>
      </div>

      <div className="match-select-container">
        <select
          className="match-select"
          value={selectedMatchId}
          onChange={handleMatchChange}
        >
          {feedingMatches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.sport}: {match.team1} vs {match.team2}
            </option>
          ))}
        </select>
      </div>

      <div className="match-status">
        <span className="stage">{selectedMatch.stage}</span>

        <span className="separator">•</span>

        <span className="progress">{selectedMatch.progress}</span>

        <span className="score">{selectedMatch.score}</span>
      </div>
    </div>
  );
}