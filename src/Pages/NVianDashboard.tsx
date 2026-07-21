
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";
import Header from "../components/Header/Header";
import SportTabs from "../components/SportTabs/SportTabs";
import MatchGrid from "../components/MatchGrid/MatchGrid";
import { useState, useEffect } from "react";
import type { Fixture } from "../components/types/Fixture";
import { mapFixtureToMatchCard } from "../components/MatchGrid/fixtureMatchCardMapper";
import { getLiveFixtures, searchLiveFixtures } from "../services/MatchDataService";

function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSportId, setSelectedSportId] = useState("all");

    const [matches, setMatches] = useState<Fixture[]>([]);

    const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);


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


    const filteredMatches =
        selectedSportId === "all"
            ? matches
            : matches.filter(
                (m) => m.sportId === selectedSportId
            );

    const matchCards = filteredMatches.map(mapFixtureToMatchCard);

    
    const selectedFixture = matchCards.find(x => x.id === selectedFixtureId);

    useEffect(() => {
        if (
            !matchCards.some((m) => m.id === selectedFixtureId)
        ) {
            setSelectedFixtureId(
                matchCards.length > 0 ? matchCards[0].id : null
            );
        }
    }, [matchCards, selectedFixtureId]);



    return (
        <main className="container">
            <Header />
            <SearchBar
                setSearchTerm={setSearchTerm}
            />
            <SportTabs
                selectedSportId={selectedSportId}
                onSportChange={setSelectedSportId}
            />
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