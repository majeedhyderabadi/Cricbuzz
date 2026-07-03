import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import TopPerformers from "../components/TopPerformers/TopPerformers";
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
            <div className="Commentry_Performers">
               <LiveCommentary />
               <TopPerformers />
            </div>
        
            <RecentEntries />

        </main>

    );

}

export default Dashboard;