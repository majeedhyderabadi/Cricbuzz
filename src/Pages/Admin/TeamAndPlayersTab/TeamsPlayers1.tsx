import React from "react";
import "./TeamsPlayers.css";

import CreateTeam from "./CreateTeam";
import AddPlayer from "./AddPlayer";
import TeamRoster from "./TeamRoster";

const TeamsPlayers: React.FC = () => {
  return (
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
  );
};

export default TeamsPlayers;