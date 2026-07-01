import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import TopPerformers from "../components/TopPerformers/TopPerformers";
import LiveCommentary from "../components/Commentary/LiveCommentary";

function Dashboard() {

    return (

        <main className="container">

            <Header />

            <SportTabs />

            <MatchGrid />

            <section className="section">
                <LiveCommentary />
            </section>

            <TopPerformers />

        </main>

    );

}

export default Dashboard;