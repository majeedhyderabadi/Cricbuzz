import type {
  CricbuzzMatchCommentary
} from "../types/CricbuzzLiveMatchInfo";

type MatchCommentaryProps = {
  commentary: Record<string, CricbuzzMatchCommentary>;
};

function MatchCommentary({
  commentary
}: MatchCommentaryProps) {

  const commentaryList = Object.values(commentary)
    .sort((a, b) => b.timestamp - a.timestamp);

  if (commentaryList.length === 0) {
    return <div>No commentary available.</div>;
  }

  return (
    <section className="match-commentary">

      <h2>Commentary</h2>

      {commentaryList.map((item, index) => (

        <div
          className="match-commentary__item"
          key={`${item.timestamp}-${index}`}
        >

          <div className="match-commentary__meta">
            <strong>
              {item.commType}
            </strong>

            <span>
              {item.teamName}
            </span>
          </div>

          <p>
            {item.commText}
          </p>

        </div>

      ))}

    </section>
  );
}

export default MatchCommentary;