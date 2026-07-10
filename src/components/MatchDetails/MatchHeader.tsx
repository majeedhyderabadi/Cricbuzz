import "./MatchHeader.css";

type MatchHeaderProps = {

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
function MatchHeader({match}: MatchHeaderProps) {

    return (

        <section className="match-header">

            <div className="match-header__top">

                <span className="match-header__sport">

                    {match.score1}

                </span>

                <span className="match-header__status">

                    {status}

                </span>

            </div>

            <h1 className="match-header__title">

                {match.team1} vs {match.team2}

            </h1>

            <div className="match-header__meta">

                <span>tournament</span>

                <span>•</span>

                <span>venue</span>

                <span>•</span>

                <span>date</span>

            </div>

        </section>

    );

}

export default MatchHeader;