import { useEffect, useState } from "react";
import { type Team, getTeams, createPlayer, type Player, updatePlayer } from "../../../services/TeamService";
import "./AddPlayer.css";
import AddRoleDialog from "./AddRoleDialog";
import { createSportRole, getSportRolesBySportId, getSports, type Sport, type SportRole } from "../../../services/SportService";
import { showSuccess, showError, showWarning } from "../../../services/common/AlertService";

interface AddPlayerProps {
    player?: Player | null;
    teams: Team[];
    isDialog?: boolean;
    onClose?: () => void;
    onSaved?: () => void;
    onSaveSuccess?: () => void;
    loadTeams: () => Promise<void>;
}

const AddPlayer: React.FC<AddPlayerProps> = ({
    player,
    teams,
    isDialog = false,
    onClose,
    onSaved,
    onSaveSuccess,
    loadTeams
}) => {
    const [playerName, setPlayerName] = useState("");
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    //const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [roles, setRoles] = useState<SportRole[]>([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [sports, setSports] = useState<Sport[]>([]);
    const initialize = async () => {

    //const loadedTeams = await loadTeams();

    if (!player)
        return;

    setPlayerName(player.playerName);

    setSelectedTeam(player.teamId);

    const loadedRoles = await loadRoles(
        player.teamId,
        teams
    );

    const roleExists = loadedRoles.some(
        x => x.roleId === player.roleId
    );

    if (roleExists) {
        setSelectedRole(player.roleId);
    }
};
useEffect(() => {
    initialize();
}, [player]);
    useEffect(() => {
        if (player) {
            setSelectedTeam(player.teamId);
            setPlayerName(player.playerName);
            setSelectedRole(player.roleId);

        } else {
            setSelectedTeam("");
            setPlayerName("");
            setSelectedRole("");
        }
        loadTeams();
        loadSports();
    }, [player]);

    const loadSports = async () => {
        try {
            const data = await getSports();
            setSports(data);

        } catch (err) {
            console.error(err);
        }
    };
const loadRoles = async (
    teamId: string,
    teamList: Team[]
): Promise<SportRole[]> => {

    const team = teamList.find(t => t.id === teamId);

    if (!team) {
        setRoles([]);
        return [];
    }
    return loadRolesBySportId(team.sportId, teamId);
};
const loadRolesBySportId = async (
    sportId: string,
    selectedTeamId: string
): Promise<SportRole[]> => {
    const sportRoles = await getSportRolesBySportId(sportId);
    const team = teams.find(t => t.id === selectedTeamId);
    if (team && team.sportId === sportId) {
        setRoles(sportRoles);
    }
    return sportRoles;
};

    const handleSubmit = async (
        roleName: string,
        sportId: string,
        description: string
    ) => {
        try {
            var response = await createSportRole({
                roleName,
                description,
                sportId: sportId
            });

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

            setShowRoleDialog(false);
            if(selectedTeam)
            loadRolesBySportId(sportId, selectedTeam);

        } catch (err) {
            console.error(err);
        }
    };
    const handleAddPlayer = async () => {
        if (!selectedTeam) {
             showWarning(
                "Error",
                "Please select a team."
              );
            return;
        }

        if (!playerName.trim()) {
            showWarning(
                "Error",
                "Please enter player name."
              );
            return;
        }

        if (!selectedRole) {
            showWarning(
                "Error",
                "Please select a role."
              );
            return;
        }

        try {
            if (player) {
                var response = await updatePlayer({
                    playerId: player.playerId,
                    playerName: playerName,
                    teamId: selectedTeam,
                    sportRoleId: selectedRole
                });

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

                onSaved?.();
                onSaveSuccess?.();  

                if (isDialog)
                    onClose?.();

            }
            else {
                var playerResponse = await createPlayer({
                    playerName: playerName,
                    teamId: selectedTeam,
                    sportRoleId: selectedRole,
                });

                if(playerResponse.success)
                   await showSuccess(
                     "Success",
                     playerResponse.message
                   );
                else
                   showError(
                     "Error",
                     playerResponse.message || playerResponse.error?.message
                   );

                // Clear form
                setPlayerName("");
                setSelectedRole("");
                setSelectedTeam("");
            }

            // Reload teams/players if required
            loadTeams();
        } catch (error) {
            console.error("Error adding player:", error);
            showError(
                     "Error",
                     "Failed to add player."
                   );
        }
    };

const handleTeamChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    setSelectedRole("");
    await loadRoles(teamId, teams);
};

useEffect(() => {
    if (!player) return;

    setPlayerName(player.playerName);
    setSelectedTeam(player.teamId);

   // loadRoles(player.teamId);
}, [player]);

useEffect(() => {
    if (player && roles.length > 0) {
        setSelectedRole(player.roleId);
    }
}, [roles, player]);

    return (
        <div className="add-player-card">
            <h3> {player ? "EDIT PLAYER" : "ADD PLAYER"}</h3>

            <p className="sub-title">
                {player ? "Add" : "Edit"} players to a team. Players inherit the team's sport.
            </p>

            <div className="form-group">
                <label>TEAM</label>

                <select
                    value={selectedTeam}
                    onChange={handleTeamChange}
                     disabled={player !== null}
                >
                    <option value="">Select Team</option>

                    {teams.map(team => (
                        <option
                            key={team.id}
                            value={team.id}
                        >
                            {team.sportName} - {team.teamName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="player-row">

                <div className="player-name">

                    <label>PLAYER NAME</label>

                    <input
                        type="text"
                        placeholder="e.g. Rohit Sharma"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />

                </div>
                <div className="role-container">
                    <div className="player-role">

                        <label>ROLE</label>

                        <select
                            className="role-select"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            <option value="" disabled>Select Role</option>

                            {roles.map((role) => (
                                <option key={role.roleId} value={role.roleId}>
                                    {role.roleName}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="add-role-btn-div">
                        {!player && (
                                <button
                                    type="button"
                                    className="add-role-btn"
                                    onClick={() => setShowRoleDialog(true)}
                                >
                                    +
                                </button>
                            )}
                    </div>
                </div>
            </div>

            <button
                className="add-player-btn"
                onClick={handleAddPlayer}
            >
                {player ? "Update Player" : "+ Add Player"}
            </button>
            <AddRoleDialog
                open={showRoleDialog}
                sports={sports}
                onClose={() => setShowRoleDialog(false)}
                onSave={handleSubmit}
            />
        </div>
    );
};

export default AddPlayer;

