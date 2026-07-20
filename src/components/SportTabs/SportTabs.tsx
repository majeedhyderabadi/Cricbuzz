import { useEffect, useState } from "react";
import "../SportTabs/SportTabs.css";


interface Sport {
    id: string;
    name: string;
}

const SportTabs = () => {

    const [sportsCategories, setSportsCategories] = useState<Sport[]>([]);
    const [selectedSportId, setSelectedSportId] = useState<string>("all");

    useEffect(() => {
        loadSports();
    }, []);

    const loadSports = async () => {
        try {
            const response = await fetch("https://localhost:62965/api/sports");

            if (!response.ok) {
                throw new Error("Unable to fetch sports.");
            }

            const data: Sport[] = await response.json();

            

            setSportsCategories([
                {
                    id: "all",
                    name: "All Sports"
                },
                ...data
            ]);
        }
        catch (error) {
            console.error("Error loading sports:", error);
        }
    };

    return (
        <section className="sports-tabs">

            {sportsCategories.map((sport) => (

                <button
                    key={sport.id}
                    className={`sports-tabs__button ${
                        selectedSportId === sport.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedSportId(sport.id)}
                >
                    {sport.name}
                </button>

            ))}

        </section>
    );
};

export default SportTabs;