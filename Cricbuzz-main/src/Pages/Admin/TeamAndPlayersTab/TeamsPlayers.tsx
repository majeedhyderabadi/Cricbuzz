import React, { useEffect, useState } from "react";
import "./TeamsPlayers.css";
import CreateTeam from "./CreateTeam";
import AddPlayer from "./AddPlayer";
import TeamRoster from "./TeamRoster";
import type { TabType } from "../Admin";
import { getTeams, type Team } from "../../../services/TeamService";
import { TeamSportPlayerDataProvider } from "../../../context/TeamSportPlayerContext";

const TeamsPlayers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("teams");

  return (
     <TeamSportPlayerDataProvider>
    <main>
      <section>
        <div className="teams-page">
          <div className="teams-left">
            <CreateTeam  team={null} isDialog={false} />
            <AddPlayer player={null} isDialog={false} />
          </div>
          <div className="teams-right">
            <TeamRoster />
          </div>
        </div>
      </section>
    </main>
    </TeamSportPlayerDataProvider>
  );
};

export default TeamsPlayers;