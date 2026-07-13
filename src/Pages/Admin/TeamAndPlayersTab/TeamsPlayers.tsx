import React, { useState } from "react";
import "./TeamsPlayers.css";

import CreateTeam from "./CreateTeam";
import AddPlayer from "./AddPlayer";
import TeamRoster from "./TeamRoster";
import AdminTabs from "../../../components/AdminTabs/AdminTabs";
import FeedingMatch from "../../../components/FeedingMatch/FeedingMatch";
import Header from "../../../components/Header/Header";
import type { TabType } from "../Admin";

const TeamsPlayers: React.FC = () => {
const [activeTab, setActiveTab] = useState<TabType>("teams");
  return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

            <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}/>
              

                <div className="teams-page">

      {/* Left Side */}

      <div className="teams-left">

        <CreateTeam
          team={null}
          isDialog={false}
        />

        <AddPlayer
          player={null}
          isDialog={false}
        />

      </div>

      {/* Right Side */}

      <div className="teams-right">

        <TeamRoster />

      </div>

    </div>
            </section>
        </main>




    
  );
};

export default TeamsPlayers;