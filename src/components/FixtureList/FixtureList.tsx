import { useEffect, useState, type ReactElement } from "react";
import "./FixtureList.css";
import { fixtureService, type Fixture } from "../../services/fixturesservice";


function FixtureList(): ReactElement {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const data = await fixtureService.getLiveFixtures();
                setFixtures(data);
            } catch (error) {
                console.error("Failed to load fixtures:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFixtures();
    }, []);


  return (
    <div className="card fixture-list">
      <div className="fixture-header">
        <h2>NVian Fixtures</h2>
        <span>{fixtures.length}</span>
      </div>

      {fixtures.length === 0 ? (
        <div className="empty">
          No NVian fixtures scheduled yet.
        </div>
      ) : (
        fixtures.map((fixture: Fixture, index: number) => (
          <div key={index}>
            {fixture.homeTeamName} vs {fixture.awayTeamName}
          </div>
        ))
      )}
    </div>
  );
}

export default FixtureList;