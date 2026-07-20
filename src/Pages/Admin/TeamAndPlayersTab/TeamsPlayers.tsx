import CreateTeam from "./CreateTeam";
import AddPlayer from "./AddPlayer";
import TeamRoster from "./TeamRoster";
import "./TeamsPlayers.css";

function TeamsPlayers() {
    return (
        <div className="teams-page">
            <div className="teams-left">
                <CreateTeam team={null} isDialog={false} />
                <AddPlayer player={null} isDialog={false} />
            </div>
            <div className="teams-right">
                <TeamRoster />
            </div>
        </div>
    );
}

export default TeamsPlayers;