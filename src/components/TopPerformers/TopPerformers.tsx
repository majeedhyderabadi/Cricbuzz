import React from "react";
import "./TopPerformers.css";

export interface Performer {
  rank: number;
  name: string;
  team: string;
  score: number;
  color: string;
}


const TopPerformers: React.FC = () => {
    const performers: Performer[] = [
    {
      rank: 1,
      name: "Dhoni",
      team: "Chennai",
      score: 9,
      color: "#d1d984",
    },
    {
      rank: 2,
      name: "Kohli",
      team: "Mumbai",
      score: 7,
      color: "#2F80ED",
    },
    {
      rank: 3,
      name: "Rohit",
      team: "Mumbai",
      score: 7,
      color: "#F5A623",
    },
    {
      rank: 4,
      name: "Conway",
      team: "Chennai",
      score: 6,
      color: "#6eed2f",
    },
    {
      rank: 5,
      name: "Jadeja",
      team: "Chennai",
      score: 5,
      color: "#933e78",
    },
  ];
  return (
    <div className="top-performers-card">
      <div className="tp-header">
        <h4>TOP PERFORMERS</h4>
      </div>

      <div className="tp-body">
        {performers.map((player) => (
          <div className="tp-row" key={player.rank}>
            <div
              className="tp-rank"
              style={{ backgroundColor: player.color }}
            >
              {player.rank}
            </div>

            <div className="tp-player">
              <div className="tp-name">{player.name}</div>
              <div
                className="tp-team"
                style={{ color: player.color }}
              >
                {player.team}
              </div>
            </div>

            <div className="tp-score">
              {player.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers;