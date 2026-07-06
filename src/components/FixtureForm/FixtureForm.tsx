import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./FixtureForm.css";

interface Sport {
    id: number;
    sport: string;
    teams: string[];
}

interface Fixture {
    sport: string;
    home: string;
    away: string;
    status: string;
}

const sportsData: Sport[] = [
    {
        id: 1,
        sport: "Cricket",
        teams: [
            "NVian Strikers",
            "NVian Warriors",
            "NVian Titans",
        ],
    },
    {
        id: 2,
        sport: "Football",
        teams: [
            "NVian United",
            "NVian Rangers",
            "NVian Eagles",
        ],
    },
    {
        id: 3,
        sport: "Badminton",
        teams: [
            "NVian Smashers",
            "NVian Aces",
            "NVian Racquets",
        ],
    },
];

function FixtureForm() {
    const [fixture, setFixture] = useState<Fixture>({
        sport: sportsData[0].sport,
        home: "",
        away: "",
        status: "",
    });

    // Get teams based on selected sport
    const selectedSport = sportsData.find(
        (item) => item.sport === fixture.sport
    );

    const teams = selectedSport?.teams ?? [];

    const handleChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        // Reset team selections whenever sport changes
        if (name === "sport") {
            setFixture((prev) => ({
                ...prev,
                sport: value,
                home: "",
                away: "",
            }));
            return;
        }

        setFixture((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Fixture Details:", fixture);
    };

    return (
        <div className="card fixture-form">
            <h2>Create Fixture</h2>

            <p>
                Match two NVian teams against each other.
                Both must play the same sport.
            </p>

            <form onSubmit={handleSubmit}>
                <label>Sport</label>

                <select
                    name="sport"
                    value={fixture.sport}
                    onChange={handleChange}
                >
                    {sportsData.map((sport) => (
                        <option key={sport.id} value={sport.sport}>
                            {sport.sport}
                        </option>
                    ))}
                </select>

                <div className="teams-row">
                    <div>
                        <label>Team A (Home)</label>

                        <select
                            name="home"
                            value={fixture.home}
                            onChange={handleChange}
                        >
                            <option value="">Select Team A</option>

                            {teams
                                .filter((team) => team !== fixture.away)
                                .map((team) => (
                                    <option key={team} value={team}>
                                        {team}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label>Team B (Away)</label>

                        <select
                            name="away"
                            value={fixture.away}
                            onChange={handleChange}
                        >
                            <option value="">Select Team B</option>

                            {teams
                                .filter((team) => team !== fixture.home)
                                .map((team) => (
                                    <option key={team} value={team}>
                                        {team}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <label>Status</label>

                <input
                    type="text"
                    name="status"
                    placeholder="e.g. 1st Innings - Over 2.1"
                    value={fixture.status}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={!fixture.home || !fixture.away}
                >
                    + Schedule Fixture
                </button>
            </form>
        </div>
    );
}

export default FixtureForm;
