import { useEffect, useState } from "react";

import "./ScoreCard.css";

/* ============================================================

   TYPES — CricbuzzScorecardInnings shape (unchanged contract)

   ============================================================ */

export type CricbuzzScorecardBatsman = {
  batId: string;

  batName: string;

  runs: number;

  balls: number;

  fours: number;

  sixes: number;

  strikeRate: string;

  outDesc: string;

  isCaptain?: boolean;

  isKeeper?: boolean;
};

export type CricbuzzScorecardBowler = {
  bowlerId: string;

  bowlName: string;

  overs: string;

  maidens: number;

  runs: number;

  wickets: number;

  no_Balls: number;

  wides: number;

  economy: string;
};

export type CricbuzzScorecardInnings = {
  matchId: string;

  inningsId: number;

  batTeamDetails?: {
    batTeamName: string;

    batsmenData: Record<string, CricbuzzScorecardBatsman>;
  };

  bowlTeamDetails?: {
    bowlTeamName: string;

    bowlersData: Record<string, CricbuzzScorecardBowler>;
  };

  scoreDetails?: {
    runs: number;

    wickets: number;

    overs: string;

    runRate: string;
  };

  extrasData?: {
    total: number;

    byes: number;

    legByes: number;

    noBalls: number;

    wides: number;

    penalty: number;
  };

  ppData?: Record<
    string,
    {
      ppId: string;
      ppType: string;
      ppOversFrom: string;
      ppOversTo: string;
      runsScored: number;
    }
  >;

  wicketsData?: Record<
    string,
    {
      batId: string;
      batName: string;
      wktRuns: number;
      wktNbr: number;
      wktOver: string;
    }
  >;

  partnershipsData?: Record<
    string,
    {
      bat1Name: string;
      bat1Runs: number;
      bat2Name: string;
      bat2Runs: number;
      totalRuns: number;
      totalBalls: number;
    }
  >;
};

/* ============================================================

   FIXTURE LOG TYPES — the shape your API actually returns

   ============================================================ */

type FixtureCommentaryEntry = {
  id: string;

  side: "Home" | "Away";

  playerId: string;

  playerName: string;

  action: string;

  note: string;

  createdAtUtc: string;
};

export type FixtureLog = {
  id: string;

  homeTeamId: string;

  homeTeamName: string;

  awayTeamId: string;

  awayTeamName: string;

  homeScore: number;

  homeWickets: number;

  homeOvers: string;

  awayScore: number;

  awayWickets: number;

  awayOvers: string;

  commentary: FixtureCommentaryEntry[];
};

/* ============================================================

   ADAPTER — fixture log -> CricbuzzScorecardInnings[]

   ============================================================ */

const RUNS_BY_ACTION: Record<string, number> = {
  Single: 1,

  Two: 2,

  Three: 3,

  Four: 4,

  Six: 6,
};

const BALL_CONSUMING_ACTIONS = new Set([
  "Single",
  "Two",
  "Three",
  "Four",
  "Six",
  "Wicket",
]);

function oversToDecimal(overs: string): number {
  if (!overs) return 0;

  const [whole, balls] = overs.split(".").map((n) => parseInt(n, 10) || 0);

  return whole + balls / 6;
}

function buildBatsmenData(
  entries: FixtureCommentaryEntry[],
): Record<string, CricbuzzScorecardBatsman> {
  const byPlayer: Record<string, CricbuzzScorecardBatsman> = {};

  for (const entry of entries) {
    if (!byPlayer[entry.playerId]) {
      byPlayer[entry.playerId] = {
        batId: entry.playerId,

        batName: entry.playerName,

        runs: 0,

        balls: 0,

        fours: 0,

        sixes: 0,

        strikeRate: "0.00",

        outDesc: "not out",
      };
    }

    const b = byPlayer[entry.playerId];

    if (entry.action in RUNS_BY_ACTION) {
      b.runs += RUNS_BY_ACTION[entry.action];
    }

    if (entry.action === "Four") b.fours += 1;

    if (entry.action === "Six") b.sixes += 1;

    if (BALL_CONSUMING_ACTIONS.has(entry.action)) b.balls += 1;

    if (entry.action === "Wicket") b.outDesc = entry.note?.trim() || "out";
  }

  for (const b of Object.values(byPlayer)) {
    b.strikeRate = b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(2) : "0.00";
  }

  return byPlayer;
}

function buildExtrasData(entries: FixtureCommentaryEntry[]) {
  const wides = entries.filter((e) => e.action === "Wide").length;

  return {
    total: wides,

    byes: 0,

    legByes: 0,

    noBalls: 0,

    wides,

    penalty: 0,
  };
}

export function mapFixtureLogToScorecards(
  fixture: FixtureLog,
): CricbuzzScorecardInnings[] {
  const homeEntries = fixture.commentary.filter((e) => e.side === "Home");

  const awayEntries = fixture.commentary.filter((e) => e.side === "Away");

  const homeOversDecimal = oversToDecimal(fixture.homeOvers);

  const awayOversDecimal = oversToDecimal(fixture.awayOvers);

  const homeInnings: CricbuzzScorecardInnings = {
    matchId: fixture.id,

    inningsId: 1,

    batTeamDetails: {
      batTeamName: fixture.homeTeamName,

      batsmenData: buildBatsmenData(homeEntries),
    },

    bowlTeamDetails: {
      bowlTeamName: fixture.awayTeamName,

      bowlersData: {},
    },

    scoreDetails: {
      runs: fixture.homeScore,

      wickets: fixture.homeWickets,

      overs: fixture.homeOvers,

      runRate:
        homeOversDecimal > 0
          ? (fixture.homeScore / homeOversDecimal).toFixed(2)
          : "0.00",
    },

    extrasData: buildExtrasData(homeEntries),

    ppData: {},

    wicketsData: {},

    partnershipsData: {},
  };

  const awayInnings: CricbuzzScorecardInnings = {
    matchId: fixture.id,

    inningsId: 2,

    batTeamDetails: {
      batTeamName: fixture.awayTeamName,

      batsmenData: buildBatsmenData(awayEntries),
    },

    bowlTeamDetails: {
      bowlTeamName: fixture.homeTeamName,

      bowlersData: {},
    },

    scoreDetails: {
      runs: fixture.awayScore,

      wickets: fixture.awayWickets,

      overs: fixture.awayOvers,

      runRate:
        awayOversDecimal > 0
          ? (fixture.awayScore / awayOversDecimal).toFixed(2)
          : "0.00",
    },

    extrasData: buildExtrasData(awayEntries),

    ppData: {},

    wicketsData: {},

    partnershipsData: {},
  };

  return [homeInnings, awayInnings];
}

/* ============================================================

   SCORECARD COMPONENT — business logic unchanged

   Styling now comes from the imported "./ScoreCard.css"

   ============================================================ */

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
        <div className="score-card__empty">Scorecard is not available yet.</div>
      </section>
    );
  }

  const innings = scorecards[selectedInnings];

  const batsmen: CricbuzzScorecardBatsman[] = Object.values(
    innings.batTeamDetails?.batsmenData ?? {},
  );

  const bowlers: CricbuzzScorecardBowler[] = Object.values(
    innings.bowlTeamDetails?.bowlersData ?? {},
  );

  const powerplays = Object.values(innings.ppData ?? {});

  const wickets = Object.values(innings.wicketsData ?? {});

  const partnerships = Object.values(innings.partnershipsData ?? {});

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
            <h2>{innings.batTeamDetails?.batTeamName ?? "Team"} Innings</h2>
            <span className="score-card__innings-label">
              Innings {innings.inningsId}
            </span>
          </div>

          <div className="score-card__total">
            <strong>
              {innings.scoreDetails?.runs ?? 0}/
              {innings.scoreDetails?.wickets ?? 0}
            </strong>
            <span>({innings.scoreDetails?.overs ?? 0} Overs)</span>
          </div>
        </div>

        {/* BATTING */}
        <div className="score-card__section">
          <h3>Batting</h3>

          <div className="score-card__table-wrapper">
            <table className="score-card__table">
              <thead>
                <tr>
                  <th className="score-card__player-column">Batter</th>
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
                          <span className="score-card__badge">C</span>
                        )}

                        {batsman.isKeeper && (
                          <span className="score-card__badge">WK</span>
                        )}
                      </div>
                      <span className="score-card__dismissal">
                        {batsman.outDesc || "not out"}
                      </span>
                    </td>

                    <td className="score-card__highlight">{batsman.runs}</td>
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
            <strong>{innings.extrasData.total}</strong>
            <span className="score-card__summary-detail">
              (B {innings.extrasData.byes}, LB {innings.extrasData.legByes}, NB{" "}
              {innings.extrasData.noBalls}, W {innings.extrasData.wides}, P{" "}
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
                  <th className="score-card__player-column">Bowler</th>
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
                    <td className="score-card__highlight">{bowler.wickets}</td>
                    <td>{bowler.no_Balls}</td>
                    <td>{bowler.wides}</td>
                    <td>{bowler.economy}</td>
                  </tr>
                ))}

                {bowlers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="score-card__summary-detail">
                      Bowling figures aren't available from the fixture log.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* POWERPLAY */}

        {powerplays.length > 0 && (
          <div className="score-card__details-block">
            <h3>Powerplay</h3>

            {powerplays.map((powerplay) => (
              <div className="score-card__detail-item" key={powerplay.ppId}>
                <span>{powerplay.ppType || "Powerplay"}</span>
                <span>
                  {powerplay.ppOversFrom} - {powerplay.ppOversTo} Overs
                </span>
                <strong>{powerplay.runsScored} Runs</strong>
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
                <div className="score-card__partnership" key={index}>
                  <div>
                    <span>{partnership.bat1Name}</span>
                    <strong>{partnership.bat1Runs}</strong>
                  </div>
                  <div className="score-card__partnership-total">
                    <strong>{partnership.totalRuns}</strong>
                    <span>{partnership.totalBalls} balls</span>
                  </div>
                  <div>
                    <span>{partnership.bat2Name}</span>
                    <strong>{partnership.bat2Runs}</strong>
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
