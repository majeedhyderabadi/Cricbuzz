import "./ScoreCard.css";

type ScoreCardProps = {

    innings: string;

};

function ScoreCard({

    innings

}: ScoreCardProps) {

    return (

        <section className="score-card">

            <div className="score-card__header">

                <h2>

                    Scorecard

                </h2>

                <span>

                    {innings}

                </span>

            </div>

            <table className="score-card__table">

                <thead>

                    <tr>

                        <th>Player</th>

                        <th>R</th>

                        <th>B</th>

                        <th>4s</th>

                        <th>6s</th>

                        <th>SR</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>Player Name</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0.00</td>

                    </tr>

                    <tr>

                        <td>Player Name</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0.00</td>

                    </tr>

                    <tr>

                        <td>Player Name</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0</td>

                        <td>0.00</td>

                    </tr>

                </tbody>

            </table>

        </section>

    );

}

export default ScoreCard;