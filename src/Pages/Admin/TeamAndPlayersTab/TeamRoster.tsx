import { useState, useEffect } from "react";
import { type Team, getTeams, type Player, deleteTeam, deletePlayer, getPlayers } from "../../../services/TeamService";
import "./TeamRoster.css";
import TeamCard from "./TeamCard";
import EditTeamDialog from "./EditTeamDialog";
import EditPlayerDialog from "./EditPlayerDialog"
import { showSuccess, showError, showConfirm } from "../../../services/common/AlertService";
import { useTeamSportPlayerData } from "../../../context/TeamSportPlayerContext";

const TeamRoster : React.FC = () => {
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);
  const [showEditTeamDialog, setShowEditTeamDialog] = useState(false);
  const [selectedEditTeam, setSelectedEditTeam] = useState<Team | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showEditPlayer, setShowEditPlayer] = useState(false);
  const {teams,setTeams,loadTeams, loadPlayers }=useTeamSportPlayerData();
  const toggleTeam = (teamId: string) => {
      setExpandedTeams(prev =>
          prev.includes(teamId)
              ? prev.filter(id => id !== teamId)
              : [...prev, teamId]
      );
  };

const handleTeamSaved = () => {
    setShowEditTeamDialog(false);

    // Reload teams if needed
    loadTeams();
};
const handlePlayerSaved = (teamId?:string) => {
    setShowEditPlayer(false);

    // Reload players if needed
    loadPlayers(teamId);
};

const handleEditTeam = async (team: Team) => {
      setSelectedEditTeam(team);
      setShowEditTeamDialog(true);
};

const handleDeleteTeam = async (teamId: string) => {
    const result = await showConfirm(
        "Delete Team?",
        "Are you sure you want to delete this team?"
    );
       if (!result) {
        return;
    }

    try {
        var response = await deleteTeam(teamId);
        if(response.success)
           await showSuccess(
             "Success",
             response.message
           );
        else
           showError(
             "Error",
             response.message || response.error?.message
           );
            // reload teams
            await loadTeams();
    } catch (error) {
        console.error("Failed to delete team", error);
                   showError(
             "Error",
            "Unable to delete team."
           );
    }
};

const handleEditPlayer = async (player: Player) => {
       setEditingPlayer(player);

    setShowEditPlayer(true);
};

const handleDeletePlayer = async (playerId: string) => {
    const result = await showConfirm(
        "Delete Player?",
        "Are you sure you want to delete this player?"
    );
       if (!result) {
        return;
    }

    try {
            var response = await deletePlayer(playerId);
            if(response.success)
               await showSuccess(
                 "Success",
                 response.message
               );
            else
               showError(
                 "Error",
                 response.message || response.error?.message
               );

            loadTeams(); // refresh roster
            
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="roster-container">
      <div className="roster-title">
        <h3>TEAMS & ROSTERS</h3>
        <span>
          {teams.length} teams ·{" "}
          {teams.reduce((t, team) => t + team.players.length, 0)} players
        </span>
      </div>
      {teams.map(team => (
  <TeamCard
    key={team.id}
    team={team}
    onEditTeam={handleEditTeam}
    onDeleteTeam={handleDeleteTeam}
    onEditPlayer={handleEditPlayer}
    onDeletePlayer={handleDeletePlayer}
    expanded={expandedTeams.includes(team.id)}
    onToggle={() => toggleTeam(team.id)}
/>
))}
<EditTeamDialog
    team={selectedEditTeam}
    open={showEditTeamDialog}
    onClose={() => setShowEditTeamDialog(false)}
    onSaveSuccess={handleTeamSaved}
/>
<EditPlayerDialog
    open={showEditPlayer}
    player={editingPlayer}
    onClose={() => setShowEditPlayer(false)}
    onSaved={loadTeams}
    onSaveSuccess={() => handlePlayerSaved(editingPlayer?.teamId)}
/>
    </div>
  );
};

export default TeamRoster;

