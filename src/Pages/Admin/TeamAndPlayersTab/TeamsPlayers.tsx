import React, { useEffect, useState } from "react";
import "./TeamsPlayers.css";

import CreateTeam from "./CreateTeam";
import AddPlayer from "./AddPlayer";
import TeamRoster from "./TeamRoster";
import AdminTabs from "../../../components/AdminTabs/AdminTabs";
import FeedingMatch from "../../../components/FeedingMatch/FeedingMatch";
import Header from "../../../components/Header/Header";
import type { TabType } from "../Admin";
import { getTeams, type Team } from "../../../services/TeamService";

const TeamsPlayers: React.FC = () => {
const [activeTab, setActiveTab] = useState<TabType>("teams");
const [teams, setTeams] = useState<Team[]>([]);
const loadTeams = async () => {
    const teams = await getTeams();
    setTeams(teams);
};
  useEffect(() => {
    loadTeams();
}, []);
  return (
    
        <main className="container">
            {/* <Header /> */}
            {/* <br /> */}
            {/* <FeedingMatch /> */}
            <section className="admin-page">

            {/* <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}/> */}
              

                <div className="teams-page">

      {/* Left Side */}

      <div className="teams-left">

        <CreateTeam
          team={null}
          isDialog={false}
          onSaved={loadTeams}
        />

        <AddPlayer
          player={null}
          isDialog={false}
          teams={teams}
          loadTeams={loadTeams}
        />

      </div>

      {/* Right Side */}

      <div className="teams-right">

        <TeamRoster 
        teams={teams}
        setTeams={setTeams}
        loadTeams={loadTeams}
        />

      </div>

    </div>
            </section>
        </main>

  );

};

export default TeamsPlayers;