import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import TopPerformers from "../components/TopPerformers/TopPerformers";
import LiveCommentary from "../components/Commentary/LiveCommentary";
import SearchBar from "../components/Search/SearchBar";
import {useState,useEffect} from "react";
import { getCurrentMatches, searchCurrentMatches } from "../services/MatchDataService";
import RecentEntries from "../components/RecentEntries/RecentEntries";
import LiveStatDetails from "../components/LiveStatDetails/LiveStatDetails";

import type { CricbuzzMatchItem } from "../components/types/Matches";
import { useCommentaryFeed } from "../hooks/useCommentaryFeed";
import { mapCricbuzzMatchToCard } from "../components/MatchGrid/cricbuzzMatchCardMapper";

function Dashboard() {
    const [searchTerm, setSearchTerm] = useState("");

 const [matches, setMatches] =useState<CricbuzzMatchItem[]>([]);
    const { commentaryByMatch } = useCommentaryFeed(
        "5A89597A-817B-4B38-B22C-75DCDA108BE8"
    );
    const [selectedFixtureId, setSelectedFixtureId] =useState<string | null>(null);

     useEffect(() => {
    const loadMatches = async () => {
        try {
            let response;

            if (searchTerm.trim() === "") {
                response = await getCurrentMatches();
                setMatches(response.matches);
            } else {
                response = await searchCurrentMatches(searchTerm);

                
                setMatches(response.matches);

               
            }
        } catch (error) {
            console.error("Failed to load matches", error);
        }
    };

    const timer = setTimeout(loadMatches, 500);

    return () => clearTimeout(timer);
}, [searchTerm]);

const matchCards = matches.map(mapCricbuzzMatchToCard);
 const selectedFixture = matchCards.find(x => x.id === selectedFixtureId);

 useEffect(() => {
  if (!selectedFixtureId && matchCards.length > 0) {
    setSelectedFixtureId(matchCards[0].id);
  }
  
}, [matchCards, selectedFixtureId]);




    return (

        <main className="container">

            <Header />

            <SearchBar
                setSearchTerm={setSearchTerm}
            />

            <SportTabs />

   <MatchGrid
  matches={matchCards}
  selectedFixtureId={selectedFixtureId}
  onMatchSelect={(match) =>
    setSelectedFixtureId(match.id)
  }
/>
            <div className="Commentry_Performers">
              <LiveCommentary
    matchId={selectedFixture?.id}
/>
               <TopPerformers fixtureId={selectedFixture?.id ?? ""} />
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