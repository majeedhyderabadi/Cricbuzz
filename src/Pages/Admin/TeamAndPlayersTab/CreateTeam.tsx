import { useEffect, useState } from "react";
import { createTeam, type Team, updateTeam} from "../../../services/TeamService";
import AddSportDialog from "./AddSportDialog";
import "./CreateTeam.css";
import { type Sport, getSports, createSport } from "../../../services/SportService";

interface CreateTeamProps {
    team?: Team | null;
    isDialog?: boolean;
    onClose?: () => void;
    onSaved?: () => void;
}

const CreateTeam: React.FC<CreateTeamProps> = ({
    team,
    isDialog = false,
    onClose,
    onSaved
}) => {
const [teamName, setTeamName] = useState("");
const [selectedColor, setSelectedColor] = useState("#9B5DE5");
const [showSportDialog, setShowSportDialog] = useState(false);
const [sports, setSports] = useState<Sport[]>([]);
const [selectedSport, setSelectedSport] = useState("");

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

const loadSports = async () => {
  try {
    const data = await getSports();
    setSports(data);

  } catch (err) {
    console.error(err);
  }
};

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

        await createSport({
            name,
            description
        });

        alert("Sport added successfully.");

        // Reload dropdown
        await loadSports();

        setShowSportDialog(false);

    } catch (error) {

        alert("Unable to add sport.");

        console.error(error);
    }
};
const handleCreateTeam = async () => {

    if (!teamName.trim()) {
        alert("Please enter team name.");
        return;
    }

    if (!selectedSport) {
        alert("Please select a sport.");
        return;
    }

    if (!selectedColor) {
        alert("Please select a team color.");
        return;
    }
    try {
        if (team) {
            await updateTeam({
                id: team.id,
                name: teamName,
                sportId: selectedSport,
                colorHex: selectedColor
            });

            alert("Team updated successfully");

        } else {

            await createTeam({
                name: teamName,
                sportId: selectedSport,
                colorHex: selectedColor
            });

            alert("Team created successfully");

            // Clear form
            setTeamName("");
            setSelectedSport("");
            setSelectedColor("");
        }
        onSaved?.();

        if (isDialog)
            onClose?.();

    } catch (error) {
        alert("Unable to create team.");
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

   <button
      type="button"
      className="add-sport-btn"
      onClick={() => setShowSportDialog(true)}
      title="Add Sport"
    >
      + 
    </button>
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