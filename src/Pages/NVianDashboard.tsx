
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";
import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import {useState,useEffect} from "react";
import type { Fixture } from "../components/types/Fixture";
import  { mapFixtureToMatchCard } from "../components/MatchGrid/fixtureMatchCardMapper";
import { getLiveFixtures } from "../services/MatchDataService";

function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

     const [matches, setMatches] =useState<Fixture[]>([]);
       
    
         useEffect(() => {
             const loadMatches = async () => {
            try {
             const response = await getLiveFixtures();
           
                setMatches(response);
              } catch (error) {
              console.error("Failed to load matches", error);
               }
           };
    
      loadMatches();
    }, []);

    const matchCards = matches.map(mapFixtureToMatchCard);

    return (
        <main className="container">
            <Header />
            <SearchBar
                setSearchTerm={setSearchTerm}
            />
            <SportTabs />

            <MatchGrid searchTerm={searchTerm} matches={matchCards}/>
            <NVianCommentary />
        </main>
    );
}

export default NVianDashboard;