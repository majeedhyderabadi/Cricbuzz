import "./MatchGrid.css";
import { Link } from "react-router-dom";

type MatchProps = {
    match: {
        id: number;
        sport: string;
        team1: string;
        team2: string;
        score1: string;
        score2: string;
        innings: string;
        over: string;
    };
};


function MatchCard({match}: MatchProps) {

    return (
<Link
    to={`/match/${match.id}`}
    style={{ textDecoration: "none", color: "inherit" }}
>
<article className="match-card">

            <div className="match-card__header">

                <span className="match-card__sport">

                    {match.sport}

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

                        <span>{match.team1}</span>

                    </div>

                    <span className="match-card__score">

                        {match.score1}

                    </span>

                </div>

                <div className="match-card__team">

                    <div className="match-card__team-info">

                        <span className="blue-dot"></span>

                        <span>{match.team2}</span>

                    </div>

                    <span className="match-card__score">

                        {match.score2}

                    </span>

                </div>

            </div>

            <div className="match-card__footer">

                <span>

                    {match.innings}

                </span>

                <span>

                    {match.over}

                </span>

            </div>

        </article>
</Link>
        

    );

}

export default MatchCard;