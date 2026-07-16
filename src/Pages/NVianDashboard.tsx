
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";
import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import {useState,useEffect} from "react";
import type { Fixture } from "../components/types/Fixture";
import  { mapFixtureToMatchCard } from "../components/MatchGrid/fixtureMatchCardMapper";
import { getLiveFixtures,  searchLiveFixtures, } from "../services/MatchDataService";

function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

     const [matches, setMatches] =useState<Fixture[]>([]);
       
    
         useEffect(() => {
             const loadMatches = async () => {
            try {
             const response = await getLiveFixtures();
           console.log(response)
                setMatches(response);
              } catch (error) {
              console.error("Failed to load matches", error);
               }
           };
    
      loadMatches();
    }, []);

    
useEffect(() => {
    const loadMatches = async () => {
        try {
            let response;

            if (searchTerm.trim() === "") {
                response = await getLiveFixtures();
            } else {
                response = await searchLiveFixtures(searchTerm);
            }

            setMatches(response);
        } catch (error) {
            console.error("Failed to load matches", error);
        }
    };

    const timer = setTimeout(loadMatches, 500);

    return () => clearTimeout(timer);
}, [searchTerm]);

    const matchCards = matches.map(mapFixtureToMatchCard);

    return (
        <main className="container">
            <Header />
            <SearchBar
                setSearchTerm={setSearchTerm}
            />
            <SportTabs />

            <MatchGrid matches={matchCards}/>
            <NVianCommentary />
        </main>
    );
}

export default NVianDashboard;