import { useEffect, useState } from "react";
import { createTeam, type Team, updateTeam} from "../../../services/TeamService";
import AddSportDialog from "./AddSportDialog";
import "./CreateTeam.css";
import { type Sport, getSports, createSport } from "../../../services/SportService";
import { showError, showSuccess, showWarning } from "../../../services/common/AlertService";
import { useTeamSportPlayerData } from "../../../context/TeamSportPlayerContext";

interface CreateTeamProps {
    team?: Team | null;
    isDialog?: boolean;
    onClose?: () => void;
    onSaveSuccess?: () => void;
}

const CreateTeam: React.FC<CreateTeamProps> = ({
    team,
    isDialog = false,
    onClose,
    onSaveSuccess
}) => {
const [teamName, setTeamName] = useState("");
const [selectedColor, setSelectedColor] = useState("#9B5DE5");
const [showSportDialog, setShowSportDialog] = useState(false);
const [selectedSport, setSelectedSport] = useState("");
const { loadTeams, sports, loadSports, } = useTeamSportPlayerData();

  useEffect(() => {
  loadSports();
      if (team) {
        setTeamName(team.teamName);
        setSelectedSport(team.sportId);
        setSelectedColor(team.color);
    }
    else {
        setTeamName("");
        setSelectedSport("");
        setSelectedColor("#9B5DE5");
    }
}, [team]);

  const colors = [
    "#9B5DE5",
    "#F9A826",
    "#3B82F6",
    "#22C55E",
    "#FF3B5C",
  ];
const handleAddSport = async (
    name: string,
    description: string
) => {

    try {

        var response = await createSport({
            name,
            description
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

        // Reload dropdown
        await loadSports();

        setShowSportDialog(false);

    } catch (err) {
    if (err instanceof Error) {
        showError(
           "Error",
           err.message
        );
    } else {
        showError(
           "Error",
           "Something went wrong."
        );
    }
  }
};
const handleCreateTeam = async () => {

    if (!teamName.trim()) {
        showWarning(
           "Error",
           "Please enter team name."
        );
        return;
    }

    if (!selectedSport) {
        showWarning(
           "Error",
           "Please select a sport."
        );
        return;
    }

    if (!selectedColor) {
        showWarning(
           "Error",
           "Please select a team color."
        );
        return;
    }
    try {
        if (team) {
            var response = await updateTeam({
                id: team.id,
                name: teamName,
                sportId: selectedSport,
                colorHex: selectedColor
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

        } else {
            var teamResponse = await createTeam({
                name: teamName,
                sportId: selectedSport,
                colorHex: selectedColor
            });

           if(teamResponse.success)
              await showSuccess(
                "Success",
                teamResponse.message
              );
           else
              showError(
                "Error",
                teamResponse.message || teamResponse.error?.message
              );

              onSaveSuccess?.();  

            // Clear form
            setTeamName("");
            setSelectedSport("");
            setSelectedColor("");
        }
      await loadTeams();

        if (isDialog)
            onClose?.();

    } catch (error) {
        showError(
          "Error",
          "Unable to create team."
        );
        console.error(error);
    }
};

  return (
    <div className="create-team-card">
      <h3>{team ? "EDIT TEAM" : "CREATE TEAM"}</h3>

      <p className="sub-title">
        Register a team under the sport it competes in.
      </p>

      <div className="form-group">
        <label>TEAM NAME</label>

        <input
          type="text"
          placeholder="e.g. NVian Strikers"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <div className="form-group">
<div className="sport-color-header">
  <label>SPORT</label>
  <label>COLOR</label>
</div>

        <div className="sport-color-row">
            <div className="sport-container">
    <select
        value={selectedSport}
        onChange={(e) => setSelectedSport(e.target.value)}
        disabled={team !== null}
    >
        <option value="" disabled>
            Select Sport
        </option>
    
        {sports.map((sport) => (
            <option key={sport.id} value={sport.id}>
                {sport.name}
            </option>
        ))}
    </select>
       {!team && (
         <button
            type="button"
            className="add-sport-btn"
            onClick={() => setShowSportDialog(true)}
            title="Add Sport"
          >
            + 
          </button>
        )}
    </div>
          <div className="color-section">
            

            <div className="color-list">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-circle ${
                    selectedColor === color ? "active" : ""
                  }`}
                  style={{ background: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="create-btn"
        onClick={handleCreateTeam}
      >
        {team ? "Update Team" : "+ Create Team"}
      </button>
<AddSportDialog
    open={showSportDialog}
    onClose={() => setShowSportDialog(false)}
    onSave={handleAddSport}
/>
    </div>
  );
};

export default CreateTeam;