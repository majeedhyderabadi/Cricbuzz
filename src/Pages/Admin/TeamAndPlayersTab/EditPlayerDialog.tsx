import type { Player, Team } from "../../../services/TeamService";
import AddPlayer from "./AddPlayer";
import "./EditPlayerDialog.css";

interface Props {
    open: boolean;
    player: Player | null;
    onClose: () => void;
    onSaved: () => void;
    onSaveSuccess: () => void;
    teams: Team[];
    loadTeams: () => Promise<void>;
}

const EditPlayerDialog = ({
    open,
    player,
    onClose,
    onSaved,
    onSaveSuccess,
    teams,
    loadTeams
}: Props) => {

    if (!open)
        return null;

    return (
        <div className="edit-player-dialog-overlay">

            <div className="edit-player-dialog">

                <button
                    className="edit-player-dialog-close"
                    onClick={onClose}
                >
                    ✕
                </button>

                <AddPlayer
                    player={player}
                    isDialog
                    onClose={onClose}
                    onSaved={onSaved}
                    onSaveSuccess={onSaveSuccess}
                    teams={teams}
                    loadTeams={loadTeams}
                />

            </div>

        </div>
    );
};

export default EditPlayerDialog;