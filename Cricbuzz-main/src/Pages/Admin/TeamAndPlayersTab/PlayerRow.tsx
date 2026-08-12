import type { Player } from "../../../services/TeamService";
import "./TeamRoster.css";

interface Props {
  index: number;
  player: Player;
  onEdit?: (player: Player) => void;
  onDelete?: (playerId: string) => void;
}

const PlayerRow = ({
  index,
  player,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="roster-player-row">

             <div className="player-left">

                <div className="player-index">
                    {index}
                </div>

                <div className="player-name">
                    {player.playerName}
                </div>

            </div>
    <div className="player-right">
      <div className="roster-player-role">
        {player.role}
      </div>
<div className="player-actions">
      <button className="icon-btn" onClick={() => onEdit?.(player)} >
        ✎
      </button>

      <button className="icon-btn" onClick={() => onDelete?.(player.playerId)}>
        ✕
      </button>
      </div>
    </div>


    </div>
  );
};

export default PlayerRow;