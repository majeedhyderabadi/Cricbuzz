import { useState } from "react";
import PlayerRow from "./PlayerRow";
import "./TeamRoster.css";
import { type Team, type Player } from "../../../services/TeamService";

interface Props {
  team: Team;
  onEditTeam?: (team: Team) => void;
  onDeleteTeam?: (teamId: string) => void;
  onEditPlayer?: (player: Player) => void;
  onDeletePlayer?: (playerId: string) => void;
  expanded: boolean;
  onToggle: () => void;
}

const TeamCard = ({
  team,
  onEditTeam,
  onDeleteTeam,
  onEditPlayer,
  onDeletePlayer,
  expanded,
  onToggle
}: Props) => {
  return (
    <div className="team-card" style={{ "--team-color": team.color } as React.CSSProperties}>

    <div className="team-header" onClick={onToggle}>

        <div className="team-header-left">

            <span className="expand-icon">
                {expanded ? "▼" : "▶"}
            </span>

            <span
                className="team-dot"
                style={{ background: team.color }}
            />

            <span className="team-name">
                {team.teamName}
            </span>

        </div>

        <div className="team-header-right">

            <span className="sport-badge">
                {team.sportName}
            </span>

            <span className="player-count">
                {team.players.length} players
            </span>

            <div className="header-actions">

                <button className="icon-btn" onClick={() => onEditTeam?.(team)}>
                    ✎
                </button>

                <button className="icon-btn" onClick={() => onDeleteTeam?.(team.id)}>
                    ✕
                </button>

            </div>

        </div>

    </div>

    {expanded && (

        <div className="players-list">

            {team.players.length > 0 ? (

                team.players.map((player, index) => (
                    <PlayerRow
                        key={player.playerId}
                        player={player}
                        index={index + 1}
                        onEdit={onEditPlayer}
                        onDelete={onDeletePlayer}
                    />
                ))
            ) : (

                <div className="empty-roster">
                    No players added.
                </div>
            )}
        </div>
    )}
</div>
  );
};

export default TeamCard;