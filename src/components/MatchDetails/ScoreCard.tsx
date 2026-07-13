import "./ScoreCard.css";
import type { Scorecard } from "../types/Matches";

type ScoreCardProps = {
  scorecards: Scorecard[];
};

function ScoreCard({ scorecards }: ScoreCardProps) {
  return (
    <>
      {scorecards.map((scorecard, index) => (
        <section className="score-card" key={index}>

          <div className="score-card__header">
            <h2>Scorecard</h2>
            <span>{scorecard.inning}</span>
          </div>

          <table className="score-card__table">
            <thead>
              <tr>
                <th>Player</th>
                <th>R</th>
                <th>B</th>
                <th>4s</th>
                <th>6s</th>
                <th>SR</th>
              </tr>
            </thead>

            <tbody>
              {scorecard.batting.map((player) => (
                <tr key={player.batsman.id}>
                  <td>{player.batsman.name}</td>
                  <td>{player.r}</td>
                  <td>{player.b}</td>
                  <td>{player.fours}</td>
                  <td>{player.sixes}</td>
                  <td>{player.sr}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </section>
      ))}
    </>
  );
}

export default ScoreCard;