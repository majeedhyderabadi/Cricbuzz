import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";

function Dashboard() {

    return (

        <main className="container">

            <Header />

            <SportTabs />

            <MatchGrid />

        </main>

    );

}

export default Dashboard;