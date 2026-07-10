import "./MatchDetailsPage.css";
import MatchHeader from "../../components/MatchDetails/MatchHeader";
import MatchSummary from "../../components/MatchDetails/MatchSummary";
import MatchTabs from "../../components/MatchDetails/MatchTabs";
import ScoreCard from "../../components/MatchDetails/ScoreCard";
import MatchInfo from "../../components/MatchDetails/MatchInfo";
import { matches } from "../../components/Data/MatchesData";
import { useParams } from "react-router-dom";

function MatchDetailsPage() {

 


const { id } = useParams();

console.log("URL Id:", id);
console.log("Matches:", matches);

const match = matches.find((m) => m.id === Number(id));

console.log("Found Match:", match);

 if (!match) {
        return <h2>Match Not Found</h2>;
    }

    return (
        
        <main className="match-details-page">

            <MatchHeader match={match} />

            <MatchSummary match={match} />

            <MatchTabs activeTab={""} />

            <section className="match-details-page__content">

                <div className="match-details-page__left">

                    <ScoreCard innings={""} />

                  

                </div>

                <aside className="match-details-page__right">

                    <MatchInfo sport={""} venue={""} tournament={""} date={""} toss={""} officials={""} />

                </aside>

            </section>

        </main>

    );

}

export default MatchDetailsPage;