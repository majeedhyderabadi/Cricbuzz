import "./MatchInfo.css";

type MatchInfoProps = {

    sport: string;

    venue: string;

    tournament: string;

    date: string;

    toss: string;

    officials: string;

};

function MatchInfo({

    sport,

    venue,

    tournament,

    date,

    toss,

    officials

}: MatchInfoProps) {

    return (

        <section className="match-info">

            <div className="match-info__header">

                <h2>

                    Match Information

                </h2>

            </div>

            <div className="match-info__body">

                <div className="match-info__row">

                    <span>Sport</span>

                    <span>{sport}</span>

                </div>

                <div className="match-info__row">

                    <span>Tournament</span>

                    <span>{tournament}</span>

                </div>

                <div className="match-info__row">

                    <span>Venue</span>

                    <span>{venue}</span>

                </div>

                <div className="match-info__row">

                    <span>Date</span>

                    <span>{date}</span>

                </div>

                <div className="match-info__row">

                    <span>Toss</span>

                    <span>{toss}</span>

                </div>

                <div className="match-info__row">

                    <span>Officials</span>

                    <span>{officials}</span>

                </div>

            </div>

        </section>

    );

}

export default MatchInfo;