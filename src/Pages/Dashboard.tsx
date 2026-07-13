import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import TopPerformers from "../components/TopPerformers/TopPerformers";
import LiveCommentary from "../components/Commentary/LiveCommentary";
import SearchBar from "../components/Search/SearchBar";
import {useState,useEffect} from "react";
import { getCurrentMatches } from "../services/MatchDataService";
import RecentEntries from "../components/RecentEntries/RecentEntries";
import LiveStatDetails from "../components/LiveStatDetails/LiveStatDetails";
import type { CurrentMatch } from "../components/types/Matches";


function Dashboard() {

    const [searchTerm, setSearchTerm] = useState("");
    const [matches, setMatches] = useState<CurrentMatch[]>([]);

     useEffect(() => {
         const loadMatches = async () => {
        try {
          const response = await getCurrentMatches(0);
         setMatches(response.data);
          } catch (error) {
          console.error("Failed to load matches", error);
           }
       };

  loadMatches();
}, []);


    return (

        <main className="container">

            <Header />

            <SearchBar
                setSearchTerm={setSearchTerm}
            />

            <SportTabs />

            <MatchGrid searchTerm={searchTerm} matches={matches}/>
            <div className="Commentry_Performers">
               <LiveCommentary />
               <TopPerformers />
            </div>

            <div className="live-stat-details-container">      
                <LiveStatDetails
                    matchStatus="LIVE"
                    venue="1st Innings - Over 11.2"
                    
                    homeTeam="Mumbai"
                    homeScore={106}
                    homeSubText="2 WKTS"
                    isHomeActive={true}
                    
                    awayTeam="Kolkata"
                    awayScore={0}
                    awaySubText="0 WKTS"
                    
                    stats={[
                        { label: "RUN RATE", homeValue: 8.4, awayValue: 7.1, maxValue: 15 },
                        { label: "BOUNDARIES", homeValue: 14, awayValue: 11, maxValue: 30 },
                        { label: "DOT BALLS", homeValue: 38, awayValue: 47, maxValue: 60 }
                    ]}
                    />
            </div>

        </main>

    );

}

export default Dashboard;