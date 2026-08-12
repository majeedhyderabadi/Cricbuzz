import "./MatchCommentary.css";

import type {
  MatchCommentaryModel
} from "../types/MatchDetailsModel";

type MatchCommentaryProps = {
  commentary: Record<string, MatchCommentaryModel>;
};

function MatchCommentary({
  commentary
}: MatchCommentaryProps) {

  const commentaryList = Object.values(commentary)
    .sort((a, b) => b.timestamp - a.timestamp);

  if (commentaryList.length === 0) {
    return (
      <section className="match-commentary">
        <div className="match-commentary__empty">
          No commentary available.
        </div>
      </section>
    );
  }

  return (
    <section className="match-commentary">

      <div className="match-commentary__header">
        <h2>Commentary</h2>

        <span className="match-commentary__live">
          LIVE
        </span>
      </div>

      <div className="match-commentary__list">

        {commentaryList.map((item, index) => {

          const isWicket = item.event?.includes("wicket");
          const isFour = item.event?.includes("four");
          const isSix = item.event?.includes("six");

          const separator = item.overSeparator;

          const isOverComplete =
            separator != null &&
            item.event?.includes("over-break");

          return (
            <div
              className="match-commentary__entry"
              key={`${item.timestamp}-${index}`}
            >

              {/* OVER SUMMARY CARD */}
              {isOverComplete && separator && (

                <div className="match-commentary__over-card">

                  <div className="match-commentary__over-top">

                    <div className="match-commentary__over-title">

                      <strong>
                        Over {separator.overNumber}
                      </strong>

                      <span className="match-commentary__over-divider" />

                      <strong>
                        {separator.batTeamObj.teamScore}
                      </strong>

                    </div>

                    <div className="match-commentary__over-summary">

                      <div className="match-commentary__over-balls">

                        {separator.overSummary
                          .trim()
                          .split(/\s+/)
                          .map((ball, ballIndex) => (

                            <span
                              key={ballIndex}
                              className={
                                ball === "W"
                                  ? "match-commentary__over-ball match-commentary__over-ball--wicket"
                                  : ball === "4" ||
                                    ball === "6" ||
                                    ball === "B4"
                                  ? "match-commentary__over-ball match-commentary__over-ball--boundary"
                                  : "match-commentary__over-ball"
                              }
                            >
                              {ball}
                            </span>

                          ))}

                      </div>

                      <span className="match-commentary__over-runs">
                        ({separator.overRuns} runs)
                      </span>

                    </div>

                  </div>

                  <div className="match-commentary__over-body">

                    <div className="match-commentary__batters">

                      <div className="match-commentary__player-row">

                        <span>
                          {separator.batStrikerObj.playerName}
                        </span>

                        <strong>
                          {separator.batStrikerObj.playerScore}
                        </strong>

                      </div>

                      <div className="match-commentary__player-row">

                        <span>
                          {separator.batNonStrikerObj.playerName}
                        </span>

                        <strong>
                          {separator.batNonStrikerObj.playerScore}
                        </strong>

                      </div>

                    </div>

                    <div className="match-commentary__bowler">

                      <span>
                        {separator.bowlerObj.playerName}
                      </span>

                      <strong>
                        {separator.bowlerObj.playerScore}
                      </strong>

                    </div>

                  </div>

                </div>

              )}


              {/* NORMAL BALL COMMENTARY */}
              {item.ballMetric != null ? (

                <article className="match-commentary__ball-row">

                  <div className="match-commentary__ball-column">

                    <strong className="match-commentary__ball-number">
                      {item.ballMetric}
                    </strong>

                    {isWicket && (
                      <span className="match-commentary__event match-commentary__event--wicket">
                        W
                      </span>
                    )}

                    {isFour && (
                      <span className="match-commentary__event match-commentary__event--boundary">
                        4
                      </span>
                    )}

                    {isSix && (
                      <span className="match-commentary__event match-commentary__event--boundary">
                        6
                      </span>
                    )}

                  </div>

                  <div
                    className="match-commentary__text"
                    dangerouslySetInnerHTML={{
                      __html: item.commText ?? ""
                    }}
                  />

                </article>

              ) : (

                <article className="match-commentary__note">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.commText ?? ""
                    }}
                  />
                </article>

              )}

            </div>
          );

        })}

      </div>

    </section>
  );
}

export default MatchCommentary;