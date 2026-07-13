import FeedingMatch from "../../components/FeedingMatch/FeedingMatch";
import Header from "../../components/Header/Header";
import "./Admin.css";
import { useState } from "react";
import Commentary from "./Commentary";
import Fixtures from "./Fixtures";
import TeamsPlayers from "./TeamsPlayers";
import AdminTabs from "../../components/AdminTabs/AdminTabs";
export type TabType = "commentary" | "teams" | "fixtures";

function Admin() {
    const [activeTab, setActiveTab] = useState<TabType>("fixtures");
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />

            <section className="admin-page">

                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}/>

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