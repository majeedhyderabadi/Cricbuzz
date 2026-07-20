import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import FeedingMatch from "../../components/FeedingMatch/FeedingMatch";
import Header from "../../components/Header/Header";
import AdminTabs from "../../components/AdminTabs/AdminTabs";
import type { FeedingMatchs as FeedingMatchType } from "../../services/match.types";
import "./Admin.css";

export type TabType = "commentary" | "teams" | "fixtures";

export interface AdminOutletContext {
    selectedMatch: FeedingMatchType | null;
    selectedFixtureId: string | null;
    setSelectedFixtureId: (id: string | null) => void;
    refreshTick: number;
    triggerRefresh: () => void;
}

function pathToTab(pathname: string): TabType {
    if (pathname.startsWith("/admin/teams-players")) return "teams";
    if (pathname.startsWith("/admin/fixtures")) return "fixtures";
    return "commentary";
}

function Admin() {
    const location = useLocation();
    const navigate = useNavigate();
    const activeTab = pathToTab(location.pathname);

    const [selectedMatch, setSelectedMatch] = useState<FeedingMatchType | null>(null);
    const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);
    const [refreshTick, setRefreshTick] = useState(0);

    const handleMatchSelect = (match: FeedingMatchType) => {
        setSelectedMatch(match);
    };

    const handleTabChange = (tab: TabType) => {
        const path =
            tab === "commentary" ? "/admin/commentary" :
            tab === "teams" ? "/admin/teams-players" :
            "/admin/fixtures";
        navigate(path);
    };

    const context: AdminOutletContext = {
        selectedMatch,
        selectedFixtureId,
        setSelectedFixtureId,
        refreshTick,
        triggerRefresh: () => setRefreshTick((t) => t + 1),
    };

    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch onMatchSelect={handleMatchSelect} />

            <section className="admin-page">
                <AdminTabs activeTab={activeTab} onTabChange={handleTabChange} />
                <div className="admin-content">
                    <Outlet context={context} />
                </div>
            </section>
        </main>
    );
}

export default Admin;