import { useState } from "react";
import FixtureList from "../../components/FixtureList/FixtureList";
import FixtureForm from "../../components/FixtureForm/FixtureForm";

function Fixtures() {
    const [refreshKey, setRefreshKey] = useState(0);
    const handleFixtureSaved = () => setRefreshKey((prev) => prev + 1);

    return (
        <div className="fixtures-layout">
            <FixtureForm onSaved={handleFixtureSaved} />
            <FixtureList refreshKey={refreshKey} />
        </div>
    );
}

export default Fixtures;