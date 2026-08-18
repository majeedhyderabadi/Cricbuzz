import "./MatchSummary.css";

import useScoreUpdateFeed from "../../hooks/useScoreUpdateFeed";
import type {
  MatchHeaderModel,
  MatchLiveModel,
} from "../types/MatchDetailsModel";

type MatchSummaryProps = {
  header: MatchHeaderModel;
  live: MatchLiveModel;
};

function MatchSummary({ header, live }: MatchSummaryProps) {
  const fixtureId = header.matchId || "";
  const { scoreByMatch } = useScoreUpdateFeed(String(fixtureId));
  const realtime = fixtureId ? scoreByMatch[String(fixtureId)] : undefined;

  const innings = live.matchScoreDetails.inningsScoreList;

  const team1Scores = innings.filter(
    (inning) => inning.batTeamId === header.team1.id,
  );

  const team2Scores = innings.filter(
    (inning) => inning.batTeamId === header.team2.id,
  );

  const formatScore = (teamInnings: typeof innings, teamId: string) => {
    const liveScoreForTeam =
      teamId === header.team1.id
        ? realtime
          ? `${realtime.homeScore}/${realtime.homeWickets ?? 0}`
          : undefined
        : teamId === header.team2.id
          ? realtime
            ? `${realtime.awayScore}/${realtime.awayWickets ?? 0}`
            : undefined
          : undefined;

    if (teamInnings.length === 0) {
      const battingTeamId = live?.batTeam?.teamId;

      if (battingTeamId === teamId && liveScoreForTeam) {
        return `${liveScoreForTeam} (${live?.overs ?? 0})`;
      }

      if (battingTeamId === teamId) {
        return `${live?.batTeam?.teamScore ?? 0}/${live?.batTeam?.teamWkts ?? 0} (${live?.overs ?? 0})`;
      }

      return "Yet to bat";
    }

    if (liveScoreForTeam) {
      return `${liveScoreForTeam} (${live?.overs ?? 0})`;
    }

    return teamInnings
      .map((inning) => `${inning.score}/${inning.wickets} (${inning.overs})`)
      .join(" & ");
  };

  return (
    <section className="match-summary">
      <div className="match-summary__teams">
        <div className="match-summary__team">
          <span className="match-summary__team-name">{header.team1.name}</span>

          <span className="match-summary__score">
            {formatScore(team1Scores, header.team1.id)}
          </span>
        </div>

        <div className="match-summary__team">
          <span className="match-summary__team-name">{header.team2.name}</span>

          <span className="match-summary__score">
            {formatScore(team2Scores, header.team2.id)}
          </span>
        </div>
      </div>

      <div className="match-summary__footer">
        <span>{header.status}</span>
      </div>

      <div className="match-summary__result">
        {header.result.winningTeam
          ? `Winner: ${header.result.winningTeam}`
          : header.status}
      </div>
    </section>
  );
}

export default MatchSummary;
