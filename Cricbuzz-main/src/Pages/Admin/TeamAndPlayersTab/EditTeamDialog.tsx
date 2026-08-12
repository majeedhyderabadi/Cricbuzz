import "./EditTeamDialog.css";
import CreateTeam from "./CreateTeam";
import type { Team } from "../../../services/TeamService";

interface Props {
    open: boolean;
    team: Team | null;
    onClose: () => void;
    onSaveSuccess: () => void;
}

const EditTeamDialog = ({
    team,
    open,
    onClose,
    onSaveSuccess
}: Props) => {

    if (!open) return null;

    return (
        <div className="edit-team-dialog-overlay">

            <div className="edit-team-dialog">

                <button
                    className="edit-team-dialog-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <CreateTeam
                    team={team}
                    isDialog
                    onClose={onClose}
                    onSaveSuccess={onSaveSuccess}
                />

            </div>

        </div>
    );
};

export default EditTeamDialog;