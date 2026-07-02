import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import LiveCommentary from "../components/Commentary/LiveCommentary";
import SearchBar from "../components/Search/SearchBar";
import {useState} from "react";
import RecentEntries from "../components/RecentEntries/RecentEntries";


function Dashboard() {

    const [searchTerm, setSearchTerm] = useState("");

   


    return (

        <main className="container">

            <Header />

            <SearchBar
                setSearchTerm={setSearchTerm}
            />

            <SportTabs />

            <MatchGrid searchTerm={searchTerm}/>

             <section className="section">
                <LiveCommentary />
            </section>

            <RecentEntries />

        </main>

    );

}

export default Dashboard;