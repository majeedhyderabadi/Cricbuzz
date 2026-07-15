import FeedingMatch from "../../components/FeedingMatch/FeedingMatch";
import Header from "../../components/Header/Header";
import "./Admin.css";
import { useState } from "react";
import Commentary from "./Commentary";
import Fixtures from "./Fixtures";
import TeamsPlayers from "./TeamsPlayers";
import AdminTabs from "../../components/AdminTabs/AdminTabs";
import type { FeedingMatchs as FeedingMatchType } from "../../services/match.types";

export type TabType = "commentary" | "teams" | "fixtures";

function Admin() {
    const [activeTab, setActiveTab] = useState<TabType>("fixtures");
    const [selectedMatch, setSelectedMatch] = useState<FeedingMatchType | null>(null);

    const handleMatchSelect = (match: FeedingMatchType) => {
        console.log("Admin: Match selected:", match);
        setSelectedMatch(match);
    };

    console.log("Admin: Current selectedMatch:", selectedMatch);

    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch onMatchSelect={handleMatchSelect} />

            <section className="admin-page">
                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="admin-content">
                    {activeTab === "commentary" && <Commentary />}
                    {activeTab === "teams" && <TeamsPlayers />}
                    {activeTab === "fixtures" && <Fixtures />}
                </div>
            </section>
        </main>
    );
}

export default Admin;