import type { ReactElement } from "react";
import "./FixtureList.css";

interface Fixture {
  home: string;
  away: string;
}

function FixtureList(): ReactElement {
  const fixtures: Fixture[] = [];

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
            {fixture.home} vs {fixture.away}
          </div>
        ))
      )}
    </div>
  );
}

export default FixtureList;