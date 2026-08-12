import { useState } from "react";
import "./AddRoleDialog.css";
import { showWarning } from "../../../services/common/AlertService";
import { useTeamSportPlayerData } from "../../../context/TeamSportPlayerContext";

interface Sport {
  id: string;
  name: string;
}

interface AddRoleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (roleName: string, sportId: string, description: string) => void;
}

function AddRoleDialog({
  open,
  onClose,
  onSave,
}: AddRoleDialogProps) {
  const [roleName, setRoleName] = useState("");
  const [sportId, setSportId] = useState("");
  const [description, setDescription] = useState("");
  const { sports, loadSports } = useTeamSportPlayerData();
  if (!open) return null;

  const handleSave = () => {
    if (!roleName.trim()) {
        showWarning(
          "Error",
          "Role Name is required"
        );
      return;
    }

    if (!sportId) {
        showWarning(
          "Error",
          "Please select a sport"
        );
      return;
    }

    onSave(roleName, sportId, description);

    setRoleName("");
    setSportId("");
    setDescription("");

    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">

        <div className="dialog-header">
          <h2>Add Role</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="dialog-body">

          <div className="form-group">
            <label>Role Name</label>

            <input
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Sport</label>

            <select
              value={sportId}
              onChange={(e) => setSportId(e.target.value)}
            >
              <option value="">Select Sport</option>

              {sports.map((sport) => (
                <option
                  key={sport.id}
                  value={sport.id}
                >
                  {sport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows={4}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

        </div>

        <div className="dialog-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Role
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddRoleDialog;