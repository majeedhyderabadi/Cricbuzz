import React, { useState } from 'react';
import './AddCommentary.css';

function AddCommentary() {
    const [selectedTeam, setSelectedTeam] = useState('Mumbai');
    const [selectedPlayer, setSelectedPlayer] = useState('Rohit');
    const [note, setNote] = useState('');

    const [scores, setScores] = useState({
        Mumbai: { runs: 330, wkts: 21 },
        Chennai: { runs: 295, wkts: 18 },
    });

    const teams = [
        { name: 'Mumbai', color: '#ffb400' },
        { name: 'Chennai', color: '#2f80ff' },
    ];

    const players = ['Rohit', 'Virat', 'Dhoni', 'Surya', 'Jadeja', 'Tilak V.', 'Conway', 'Gaikwad'];

    const quickActions = [
        { label: 'SIX', runs: 6, type: 'six' },
        { label: 'FOUR', runs: 4, type: 'four' },
        { label: 'Single', runs: 1, type: 'single' },
        { label: 'Wicket', runs: 0, type: 'wicket' },
        { label: 'Wide', runs: 1, type: 'wide' },
    ];

    const adjustScore = (team, field, delta) => {
        setScores((prev) => ({
            ...prev,
            [team]: {
                ...prev[team],
                [field]: Math.max(0, prev[team][field] + delta),
            },
        }));
    };

    const handleQuickAction = (action) => {
        console.log(`${selectedTeam} - ${selectedPlayer}: ${action.label}`);
        setNote('');
    };

    const handleAddCommentary = () => {
        if (note.trim()) {
            console.log(`${selectedTeam} - ${selectedPlayer}: ${note}`);
            setNote('');
        }
    };

    return (
        <div className="add-commentary-container">
            {/* Score Control Section */}
            <div className="score-control">
                <div className="score-header">
                    <h3>SCORE CONTROL</h3>
                    <span className="feed-score">Feed the score directly</span>
                </div>
                <p className="score-subtitle">Set RUNS / WKTS for each side. Also logs a commentary entry.</p>

                <div className="score-cards">
                    {teams.map((team) => (
                        <div className="team-score-card" key={team.name}>
                            <h4>
                                <span className="team-dot" style={{ background: team.color }} />
                                {team.name}
                            </h4>

                            <div className="score-detail">
                                <span className="score-label">RUNS</span>
                                <div className="score-stepper">
                                    <button
                                        className="stepper-btn"
                                        onClick={() => adjustScore(team.name, 'runs', -1)}
                                        aria-label={`Decrease ${team.name} runs`}
                                    >
                                        −
                                    </button>
                                    <span className="score-value">{scores[team.name].runs}</span>
                                    <button
                                        className="stepper-btn"
                                        onClick={() => adjustScore(team.name, 'runs', 1)}
                                        aria-label={`Increase ${team.name} runs`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="score-detail">
                                <span className="score-label">WKTS</span>
                                <div className="score-stepper">
                                    <button
                                        className="stepper-btn"
                                        onClick={() => adjustScore(team.name, 'wkts', -1)}
                                        aria-label={`Decrease ${team.name} wickets`}
                                    >
                                        −
                                    </button>
                                    <span className="score-value">{scores[team.name].wkts}</span>
                                    <button
                                        className="stepper-btn"
                                        onClick={() => adjustScore(team.name, 'wkts', 1)}
                                        aria-label={`Increase ${team.name} wickets`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="divider" />

            {/* Add Commentary Section */}
            <div className="commentary-section">
                <div className="commentary-header">
                    <h3>ADD COMMENTARY</h3>
                    <span className="sport-tag">Cricket</span>
                </div>
                <p className="commentary-subtitle">Pick a team and player, then tap an action — it pushes straight to the live feed.</p>

                <div className="control-group">
                    <label>TEAM</label>
                    <div className="team-selector">
                        {teams.map((team) => (
                            <button
                                key={team.name}
                                className={`team-btn ${selectedTeam === team.name ? 'active' : ''}`}
                                onClick={() => setSelectedTeam(team.name)}
                            >
                                {team.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="commentary-controls">
                    <div className="control-group">
                        <label>PLAYER</label>
                        <div className="player-selector">
                            <select
                                value={selectedPlayer}
                                onChange={(e) => setSelectedPlayer(e.target.value)}
                                className="player-dropdown"
                            >
                                {players.map((player) => (
                                    <option key={player} value={player}>
                                        {player}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>NOTE (optional)</label>
                        <div className="note-input-group">
                            <input
                                type="text"
                                placeholder="e.g. drives it through the covers"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="note-input"
                            />
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button className="add-note-btn" onClick={handleAddCommentary}>
                        Post Commentary <span className="arrow">→</span>
                    </button>
                </div>
            </div>

            <hr className="divider" />

            {/* Quick Actions Section */}
            <div className="quick-actions">
                <p className="quick-actions-title">OR — tap a quick action to publish instantly</p>

                <div className="action-buttons">
                    {quickActions.map((action) => (
                        <button
                            key={action.type}
                            className={`action-btn ${action.type}`}
                            onClick={() => handleQuickAction(action)}
                        >
                            <span className="action-label">{action.label}</span>
                            <span className="action-runs">
                                {action.type === 'wicket' ? '+1 wkt' : `+${action.runs} run${action.runs > 1 ? 's' : ''}`}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddCommentary;