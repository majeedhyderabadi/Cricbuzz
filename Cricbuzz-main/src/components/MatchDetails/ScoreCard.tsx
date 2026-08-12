import "./ScoreCard.css";
import type {
  CricbuzzScorecardInnings,
  CricbuzzScorecardBatsman,
  CricbuzzScorecardBowler,
} from "../types/CricbuzzScorecard";
import { useEffect, useState } from "react";

type ScoreCardProps = {
  scorecards: CricbuzzScorecardInnings[];
};

function ScoreCard({ scorecards }: ScoreCardProps) {
  const [selectedInnings, setSelectedInnings] = useState(0);

useEffect(() => {
  setSelectedInnings(0);
}, [scorecards]);


  if (!scorecards || scorecards.length === 0) {
    return (
      <section className="score-card">
        <div className="score-card__empty">
          Scorecard is not available yet.
        </div>
      </section>
    );
  }


  const innings = scorecards[selectedInnings];

const batsmen: CricbuzzScorecardBatsman[] = Object.values(
  innings.batTeamDetails?.batsmenData ?? {}
);

const bowlers: CricbuzzScorecardBowler[] = Object.values(
  innings.bowlTeamDetails?.bowlersData ?? {}
);

const powerplays = Object.values(innings.ppData ?? {});
const wickets = Object.values(innings.wicketsData ?? {});
const partnerships = Object.values(
  innings.partnershipsData ?? {}
);




return (
  <div className="score-card-list">
    <div className="score-card-tabs">
      {scorecards.map((item, index) => (
        <button
          key={item.inningsId}
          className={
            selectedInnings === index
              ? "score-card-tab active"
              : "score-card-tab"
          }
          onClick={() => setSelectedInnings(index)}
        >
          {item.batTeamDetails?.batTeamName}
        </button>
      ))}
    </div>

    <section
      className="score-card"
      key={`${innings.matchId}-${innings.inningsId}`}
    >
      {/* INNINGS HEADER */}
      <div className="score-card__header">
        <div>
          <h2>
            {innings.batTeamDetails?.batTeamName ?? "Team"} Innings
          </h2>

          <span className="score-card__innings-label">
            Innings {innings.inningsId}
          </span>
        </div>

        <div className="score-card__total">
          <strong>
            {innings.scoreDetails?.runs ?? 0}/
            {innings.scoreDetails?.wickets ?? 0}
          </strong>

          <span>
            ({innings.scoreDetails?.overs ?? 0} Overs)
          </span>
        </div>
      </div>

 {/* BATTING */}
<div className="score-card__section">
  <h3>Batting</h3>

  <div className="score-card__table-wrapper">
    <table className="score-card__table">
      <thead>
        <tr>
          <th className="score-card__player-column">
            Batter
          </th>
          <th>R</th>
          <th>B</th>
          <th>4s</th>
          <th>6s</th>
          <th>SR</th>
        </tr>
      </thead>

      <tbody>
        {batsmen.map((batsman) => (
          <tr key={batsman.batId}>
            <td className="score-card__player">
              <div className="score-card__player-name">
                {batsman.batName}

                {batsman.isCaptain && (
                  <span className="score-card__badge">
                    C
                  </span>
                )}

                {batsman.isKeeper && (
                  <span className="score-card__badge">
                    WK
                  </span>
                )}
              </div>

              <span className="score-card__dismissal">
                {batsman.outDesc || "not out"}
              </span>
            </td>

            <td className="score-card__highlight">
              {batsman.runs}
            </td>

            <td>{batsman.balls}</td>
            <td>{batsman.fours}</td>
            <td>{batsman.sixes}</td>
            <td>{batsman.strikeRate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* EXTRAS */}
{innings.extrasData && (
  <div className="score-card__summary-row">
    <span>Extras</span>

    <strong>
      {innings.extrasData.total}
    </strong>

    <span className="score-card__summary-detail">
      (B {innings.extrasData.byes}, LB{" "}
      {innings.extrasData.legByes}, NB{" "}
      {innings.extrasData.noBalls}, W{" "}
      {innings.extrasData.wides}, P{" "}
      {innings.extrasData.penalty})
    </span>
  </div>
)}

{/* TOTAL */}
<div className="score-card__summary-row score-card__summary-row--total">
  <span>Total</span>

  <strong>
    {innings.scoreDetails?.runs ?? 0}/
    {innings.scoreDetails?.wickets ?? 0}
  </strong>

  <span className="score-card__summary-detail">
    ({innings.scoreDetails?.overs ?? 0} Overs, RR:{" "}
    {innings.scoreDetails?.runRate ?? 0})
  </span>
</div>

{/* BOWLING */}
<div className="score-card__section">
  <h3>Bowling</h3>

  <div className="score-card__table-wrapper">
    <table className="score-card__table">
      <thead>
        <tr>
          <th className="score-card__player-column">
            Bowler
          </th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>W</th>
          <th>NB</th>
          <th>WD</th>
          <th>ECO</th>
        </tr>
      </thead>

      <tbody>
        {bowlers.map((bowler) => (
          <tr key={bowler.bowlerId}>
            <td className="score-card__player">
              <div className="score-card__player-name">
                {bowler.bowlName}
              </div>
            </td>

            <td>{bowler.overs}</td>
            <td>{bowler.maidens}</td>
            <td>{bowler.runs}</td>

            <td className="score-card__highlight">
              {bowler.wickets}
            </td>

            <td>{bowler.no_Balls}</td>
            <td>{bowler.wides}</td>
            <td>{bowler.economy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* POWERPLAY */}
{powerplays.length > 0 && (
  <div className="score-card__details-block">
    <h3>Powerplay</h3>

    {powerplays.map((powerplay) => (
      <div
        className="score-card__detail-item"
        key={powerplay.ppId}
      >
        <span>
          {powerplay.ppType || "Powerplay"}
        </span>

        <span>
          {powerplay.ppOversFrom} -{" "}
          {powerplay.ppOversTo} Overs
        </span>

        <strong>
          {powerplay.runsScored} Runs
        </strong>
      </div>
    ))}
  </div>
)}

{/* FALL OF WICKETS */}
{wickets.length > 0 && (
  <div className="score-card__details-block">
    <h3>Fall of Wickets</h3>

    <div className="score-card__chips">
      {wickets.map((wicket, index) => (
        <span
          className="score-card__chip"
          key={`${wicket.batId}-${index}`}
        >
          {wicket.wktRuns}-{wicket.wktNbr} ({wicket.batName},{" "}
          {wicket.wktOver})
        </span>
      ))}
    </div>
  </div>
)}

{/* PARTNERSHIPS */}
{partnerships.length > 0 && (
  <div className="score-card__details-block">
    <h3>Partnerships</h3>

    <div className="score-card__partnerships">
      {partnerships.map((partnership, index) => (
        <div
          className="score-card__partnership"
          key={index}
        >
          <div>
            <span>{partnership.bat1Name}</span>

            <strong>
              {partnership.bat1Runs}
            </strong>
          </div>

          <div className="score-card__partnership-total">
            <strong>
              {partnership.totalRuns}
            </strong>

            <span>
              {partnership.totalBalls} balls
            </span>
          </div>

          <div>
            <span>{partnership.bat2Name}</span>

            <strong>
              {partnership.bat2Runs}
            </strong>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

    </section>
  </div>
);
}

export default ScoreCard;