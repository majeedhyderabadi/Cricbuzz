
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";
import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import {useState,useEffect} from "react";
import type { Fixture } from "../components/types/Fixture";
import  { mapFixtureToMatchCard } from "../components/MatchGrid/fixtureMatchCardMapper";
import { getLiveFixtures, searchLiveFixtures} from "../services/MatchDataService";

import type { MatchCardModel } from "../components/types/MatchCardModel";

function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

     const [matches, setMatches] =useState<Fixture[]>([]);
       
const [selectedFixtureId, setSelectedFixtureId] =useState<string | null>(null);
  

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
            <NVianCommentary
  fixtureId={selectedFixture?.id}
  title={
    selectedFixture
      ? `${selectedFixture.team1Name} vs ${selectedFixture.team2Name}`
      : "NVian Commentary"
  }
/>
        </main>
    );
}

export default NVianDashboard;