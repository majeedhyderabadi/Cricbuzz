import "./MatchSummary.css";

type MatchSummaryProps = {

    match: Match;

};
 interface Match {

    id: number;

    sport: string;

    team1: string;

    team2: string;

    score1: string;

    score2: string;

    innings: string;

    over: string;

}
function MatchSummary({match}: MatchSummaryProps) {

    return (

        <section className="match-summary">

            <div className="match-summary__teams">

                <div className="match-summary__team">

                    <span className="match-summary__team-name">

                        {match.team1}

                    </span>

                    <span className="match-summary__score">

                        {match.score1}

                    </span>

                </div>

                <div className="match-summary__team">

                    <span className="match-summary__team-name">

                        {match.team2}

                    </span>

                    <span className="match-summary__score">

                        {match.score2}

                    </span>

                </div>

            </div>

            <div className="match-summary__footer">

                <span>

                    matchState

                </span>

                <span>

                    {match.over}

                </span>

            </div>

            <div className="match-summary__result">

               result

            </div>

        </section>

    );

}

export default MatchSummary;