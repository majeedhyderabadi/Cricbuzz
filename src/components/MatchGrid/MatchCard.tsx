import "./MatchGrid.css";
import type { Match } from "../types/Match";

function MatchCard({ Match }: { Match: Match | null }) {

    return (

        <article className="match-card">

            <div className="match-card__header">

                <span className="match-card__sport">

                    CRICKET

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

                        <span>{Match?.teamInfo[0].name}</span>

                    </div>

                    <span className="match-card__score">

                      {Match?.score[0].r}/{Match?.score[0].w}

                    </span>

                </div>

                <div className="match-card__team">

                    <div className="match-card__team-info">

                        <span className="blue-dot"></span>

                        <span>{Match?.teamInfo[1].name}</span>

                    </div>

                    <span className="match-card__score">

                       {Match?.score[1].r}/{Match?.score[1].w}

                    </span>

                </div>

            </div>

            <div className="match-card__footer">

                <span>

                    {Match?.score[1].inning}

                </span>

                <span>

               Over: {Match?.score[1].o}

                </span>

            </div>

        </article>

    );

}

export default MatchCard;