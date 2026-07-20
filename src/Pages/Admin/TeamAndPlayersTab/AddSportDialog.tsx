import React, { useState } from "react";
import "./AddSportDialog.css";
import { showWarning } from "../../../services/common/AlertService";

interface AddSportDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

function AddSportDialog({
  open,
  onClose,
  onSave,
}: AddSportDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) {
        showWarning(
          "Error",
          "Sport name is required."
        );
      return;
    }

    onSave(name, description);

    setName("");
    setDescription("");

    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">

        <div className="dialog-header">
          <h2>Add Sport</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="dialog-body">

          <div className="form-group">
            <label>Sport Name</label>

            <input
              type="text"
              placeholder="Enter sport name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            Save Sport
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddSportDialog;
