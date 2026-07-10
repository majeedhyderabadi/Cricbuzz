import "./EditTeamDialog.css";
import CreateTeam from "./CreateTeam";
import type { Team } from "../../../services/TeamService";

interface Props {
    open: boolean;
    team: Team | null;
    onClose: () => void;
    onSaved: () => void;
}

const EditTeamDialog = ({
    open,
    team,
    onClose,
    onSaved
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
                    onSaved={onSaved}
                />

            </div>

        </div>
    );
};

export default EditTeamDialog;