import { useState, useEffect } from "react";
import { type Team, getTeams, type Player, deleteTeam, deletePlayer } from "../../../services/TeamService";
import "./TeamRoster.css";
import TeamCard from "./TeamCard";
import EditTeamDialog from "./EditTeamDialog";
import EditPlayerDialog from "./EditPlayerDialog"

const TeamRoster = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<number>(1);
  const [showEditTeamDialog, setShowEditTeamDialog] = useState(false);
  const [selectedEditTeam, setSelectedEditTeam] = useState<Team | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showEditPlayer, setShowEditPlayer] = useState(false);

  const toggleTeam = (id: number) => {
    setExpandedTeam(expandedTeam === id ? 0 : id);
  };
  useEffect(() => {
    loadTeams();
}, []);

const loadTeams = async () => {
    const data = await getTeams();
    setTeams(data);
};
const handleEditTeam = async (team: Team) => {
      setSelectedEditTeam(team);
      setShowEditTeamDialog(true);
};

const handleDeleteTeam = async (teamId: string) => {
        const confirmed = window.confirm(
        "Are you sure you want to delete this team?"
    );

    if (!confirmed) return;

    try {
        await deleteTeam(teamId);

        // reload teams
        await loadTeams();
    } catch (error) {
        console.error("Failed to delete team", error);
        alert("Unable to delete team.");
    }
};

const handleEditPlayer = async (player: Player) => {
  await loadTeams(); 
       setEditingPlayer(player);

    setShowEditPlayer(true);
};

const handleDeletePlayer = async (playerId: string) => {
    if (!window.confirm("Delete this player?"))
        return;

    try {
        await deletePlayer(playerId);

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
/>

))}
<EditTeamDialog
    open={showEditTeamDialog}
    team={selectedEditTeam}
    onClose={() => setShowEditTeamDialog(false)}
    onSaved={loadTeams}
/>
<EditPlayerDialog
    open={showEditPlayer}
    player={editingPlayer}
    onClose={() => setShowEditPlayer(false)}
    onSaved={loadTeams}
/>
    </div>
  );
};

export default TeamRoster;