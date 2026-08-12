import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./FixtureForm.css";

import { getTeams, type Team } from "../../services/TeamService";
import { sportService, type Sport } from "../../services/fixturesservice";
import { showError, showSuccess } from "../../services/common/AlertService";


interface Fixture {
    sport: string;
    home: string;
    away: string;
    scheduledAtUtc: string;
}
interface FixtureFormProps {
    onSaved: () => void;
}
function FixtureForm({ onSaved }: FixtureFormProps) {
    const [sports, setSports] = useState<Sport[]>([]);
    const [loading, setLoading] = useState(true);
    const [sportswiseteams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const loadSports = async () => {
            try {
                const data = await sportService.getSports();
                setSports(data);
                if (data.length > 0) {
                    setFixture((prev) => ({
                        ...prev,
                        sport: data[0].name,
                    }));
                }

            } catch (error) {
                showError(
                    "Error", "Failed to fetch sports:"
                );
            } finally {
                setLoading(false);
            }
        };
        loadSports();
        loadTeams();
    }, []);
    
   
    const [fixture, setFixture] = useState<Fixture>({
        sport: "",
        home: "",
        away: "",
        scheduledAtUtc: "",
    });
    
    const selectedSport = sports.find(
        (item) => item.name === fixture.sport
    );

    //const teams = selectedSport?.sportRoles ?? [];
    const filteredTeams = sportswiseteams.filter(
        (team) => team.sportId === selectedSport?.id
    );
    const handleChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        if (name === "sport") {
            setFixture({
                sport: value,
                home: "",
                away: "",
                scheduledAtUtc: "",
            });
            return;
        }

        setFixture((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const loadTeams = async (): Promise<Team[]> => {
        try {
            const data = await getTeams();

            setTeams(data);

            return data;
        } catch (err:any) {
            showError(
                "Error", err
            );
            return [];
        }
        
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            homeTeamId: fixture.home,
            awayTeamId: fixture.away,
            scheduledAtUtc: new Date(fixture.scheduledAtUtc).toISOString(),
        };
      
        try {
            const response = await fetch("https://localhost:62965/api/fixtures", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                showError(
                    "Error", error.detail || "Failed to create fixture"
                );

                return;
            }

            await showSuccess(
                "Success",
                "Fixture scheduled successfully!"
            );
            onSaved(); // refresh FixtureList
            setFixture({
                sport: sports.length > 0 ? sports[0].name : "",
                home: "",
                away: "",
                scheduledAtUtc: "",
            });
        } catch (error) {
            showError(
                "Error", "Something went wrong."
            );
        }
    };

    return (
        <div className="card fixture-form">
            <h2>Create Fixture</h2>

            <p>
                Match two NVian teams against each other. Both must play the same sport.
            </p>

            <form onSubmit={handleSubmit}>
                <label>Sport</label>

                <select
                    name="sport"
                    value={fixture.sport}
                    onChange={handleChange}
                >
                    {sports.map((sport) => (
                        <option key={sport.id} value={sport.name}>
                            {sport.name}
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

                            {filteredTeams
                                .filter(team => team.id !== fixture.away)
                                .map(team => (
                                    <option key={team.id} value={team.id}>
                                        {team.teamName}
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

                            {filteredTeams
                                .filter(team => team.id !== fixture.home)
                                .map(team => (
                                    <option key={team.id} value={team.id}>
                                        {team.teamName}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <label>Scheduled Date & Time</label>

                <input
                    type="datetime-local"
                    name="scheduledAtUtc"
                    value={fixture.scheduledAtUtc}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={
                        !fixture.home ||
                        !fixture.away ||
                        !fixture.scheduledAtUtc
                    }
                >
                    + Schedule Fixture
                </button>
            </form>
        </div>
    );
}

export default FixtureForm;