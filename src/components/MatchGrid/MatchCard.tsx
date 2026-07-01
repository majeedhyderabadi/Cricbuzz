import "./MatchGrid.css";

function MatchCard() {

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

                        <span>Mumbai</span>

                    </div>

                    <span className="match-card__score">

                        185/4

                    </span>

                </div>

                <div className="match-card__team">

                    <div className="match-card__team-info">

                        <span className="blue-dot"></span>

                        <span>Chennai</span>

                    </div>

                    <span className="match-card__score">

                        174/8

                    </span>

                </div>

            </div>

            <div className="match-card__footer">

                <span>

                    2nd Innings

                </span>

                <span>

                    Over 18.4

                </span>

            </div>

        </article>

    );

}

export default MatchCard;