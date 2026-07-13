import "./MatchGrid.css";
import { Link } from "react-router-dom";
import type { CurrentMatch } from "../types/Matches";

type MatchCardProps = {
  match: CurrentMatch;
};

function MatchCard({ match }: MatchCardProps) {

    return (
<Link
    to={`/match/${match.id}`}
    style={{ textDecoration: "none", color: "inherit" }}
>
<article className="match-card">

            <div className="match-card__header">

                <span className="match-card__sport">

                    {match.matchType}

                </span>

                <span className="match-card__live">

                    <span className="match-card__live-dot"></span>

                    LIVE

                </span>

            </div>

            <div className="match-card__teams">

                <div className="match-card__team">

                    <div className="match-card__team-info">

                        <span className="orange-dot"></span>

                        <span>{match.teams[0]}</span>

                    </div>

                    <span className="match-card__score">

                        {match.score[0]?.r}

                    </span>

                </div>

                <div className="match-card__team">

                    <div className="match-card__team-info">

                        <span className="blue-dot"></span>

                        <span>{match.teams[1]}</span>

                    </div>

                    <span className="match-card__score">

                        {match.score[1]?.r}

                    </span>

                </div>

            </div>

            <div className="match-card__footer">

                <span>

                {match.score.at(-1)?.inning}

                </span>

                <span>

                   {match.score.at(-1)?.o} Overs

                </span>

            </div>

        </article>
</Link>
        

    );

}

export default MatchCard;