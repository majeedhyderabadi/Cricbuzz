import React, { useState, useEffect } from 'react';
import type { FeedingMatchs } from '../../services/match.types';
import { fetchLiveTeams, liveFixtures, postCommentary, updateScoreFixtures } from '../../services/liveservice';
import './AddCommentary.css';
import { showError, showSuccess } from '../../services/common/AlertService';

interface Player {
    playerId: string;
    playerName: string;
    role: string;
    roleId: string;
}

interface Team {
    id: string;
    teamName: string;
    sportId: string;
    color: string;
    sport: { name: string; description: string };
    players: Player[];
}

interface LiveFixture {
    id: string;
    homeTeamId: string;
    homeTeamName: string;
    awayTeamId: string;
    awayTeamName: string;
    sport: string;
    status: string;
    homeScore: number;
    homeWickets: number;
    awayScore: number;
    awayWickets: number;
}

interface AddCommentaryProps {
    selectedMatch?: FeedingMatchs | null;
}

const ACTION_MAP: Record<string, number> = {
    six: 0,
    four: 1,
    single: 2,
    wicket: 3,
    wide: 4,
};

const quickActions = [
    {
        label: 'SIX',
        runs: 6,
        type: 'six',
        icon: '🚀',
        color: '#8B5CF6',
        bgColor: '#EDE9FE',
        borderColor: '#8B5CF6',
        selectedBg: '#8B5CF6',
        selectedColor: '#FFFFFF',
    },
    {
        label: 'FOUR',
        runs: 4,
        type: 'four',
        icon: '🏏',
        color: '#059669',
        bgColor: '#D1FAE5',
        borderColor: '#059669',
        selectedBg: '#059669',
        selectedColor: '#FFFFFF',
    },
    {
        label: 'Single',
        runs: 1,
        type: 'single',
        icon: '➡️',
        color: '#D97706',
        bgColor: '#FEF3C7',
        borderColor: '#D97706',
        selectedBg: '#D97706',
        selectedColor: '#FFFFFF',
    },
    {
        label: 'Wicket',
        runs: 0,
        type: 'wicket',
        icon: '🔴',
        color: '#DC2626',
        bgColor: '#FEE2E2',
        borderColor: '#DC2626',
        selectedBg: '#DC2626',
        selectedColor: '#FFFFFF',
    },
    {
        label: 'Wide',
        runs: 1,
        type: 'wide',
        icon: '↗️',
        color: '#2563EB',
        bgColor: '#DBEAFE',
        borderColor: '#2563EB',
        selectedBg: '#2563EB',
        selectedColor: '#FFFFFF',
    },
];

function AddCommentary({ selectedMatch }: AddCommentaryProps) {
    const [selectedTeamName, setSelectedTeamName] = useState<string>('');
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
    const [note, setNote] = useState('');
    const [selectedActionType, setSelectedActionType] = useState<string | null>(null);

    const [pendingDeltas, setPendingDeltas] = useState<Record<string, { runs: number; wkts: number }>>({});
    const [updatingTeam, setUpdatingTeam] = useState<string | null>(null);


    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [liveFixturesList, setLiveFixturesList] = useState<LiveFixture[]>([]);
    const [matchTeams, setMatchTeams] = useState<Team[]>([]);
    const [selectedFixtureId, setSelectedFixtureId] = useState<string | null>(null);


    const [scores, setScores] = useState<Record<string, { runs: number; wkts: number }>>({});


    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [postStatus, setPostStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchTeams();
        getFixtures();
    }, []);

    const fetchTeams = async () => {
        try {
            const res = await fetchLiveTeams();
            console.log('AddCommentary: Fetched all teams:', res);
            setAllTeams(res);
        } catch (e) {
            console.error('AddCommentary: Error fetching teams:', e);
        }
    };

    const getFixtures = async () => {
        try {
            const res = await liveFixtures();
            console.log('AddCommentary: Fetched live fixtures:', res);
            setLiveFixturesList(res);
        } catch (e) {
            console.error('AddCommentary: Error fetching live fixtures:', e);
        }
    };

    useEffect(() => {
        if (selectedMatch && allTeams.length > 0 && liveFixturesList.length > 0) {

            const team1 = allTeams.find(
                (t) => t.teamName.toLowerCase() === selectedMatch.team1.toLowerCase()
            );
            const team2 = allTeams.find(
                (t) => t.teamName.toLowerCase() === selectedMatch.team2.toLowerCase()
            );
            const foundTeams = [team1, team2].filter(Boolean) as Team[];
            console.log('AddCommentary: Match teams found:', foundTeams);
            setMatchTeams(foundTeams);


            const fixture = liveFixturesList.find(
                (f) =>
                    (f.homeTeamName.toLowerCase() === selectedMatch.team1.toLowerCase() &&
                        f.awayTeamName.toLowerCase() === selectedMatch.team2.toLowerCase()) ||
                    (f.homeTeamName.toLowerCase() === selectedMatch.team2.toLowerCase() &&
                        f.awayTeamName.toLowerCase() === selectedMatch.team1.toLowerCase())
            );
            if (fixture) {
                console.log('AddCommentary: Matching fixture found:', fixture);
                setSelectedFixtureId(fixture.id);
            } else {
                console.warn('AddCommentary: No matching fixture found for the selected match');
                setSelectedFixtureId(null);
            }

            if (foundTeams.length === 2) {
                const scoreParts = selectedMatch.score.split(' - ');
                const homeScore = scoreParts[0]?.split('/') || ['0', '0'];
                const awayScore = scoreParts[1]?.split('/') || ['0', '0'];
                setScores({
                    [foundTeams[0].teamName]: {
                        runs: parseInt(homeScore[0]) || 0,
                        wkts: parseInt(homeScore[1]) || 0,
                    },
                    [foundTeams[1].teamName]: {
                        runs: parseInt(awayScore[0]) || 0,
                        wkts: parseInt(awayScore[1]) || 0,
                    },
                });

                setSelectedTeamName(foundTeams[0].teamName);

                setSelectedActionType(null);
            }
        } else {
            setMatchTeams([]);
            setSelectedTeamName('');
            setSelectedFixtureId(null);
            setSelectedActionType(null);
        }
    }, [selectedMatch, allTeams, liveFixturesList]);


    useEffect(() => {
        if (selectedTeamName) {
            const team = matchTeams.find((t) => t.teamName === selectedTeamName);
            if (team && team.players.length > 0) {
                const first = team.players[0];
                console.log(
                    `AddCommentary: Team "${selectedTeamName}" selected, default player: ${first.playerName} (${first.playerId})`
                );
                setSelectedPlayerId(first.playerId);
            } else {
                setSelectedPlayerId('');
            }
        }
    }, [selectedTeamName, matchTeams]);

    const currentPlayers = (() => {
        const team = matchTeams.find((t) => t.teamName === selectedTeamName);
        return team ? team.players : [];
    })();


    const teams = matchTeams.map((team) => ({
        name: team.teamName,
        color: team.color || '#ccc',
    }));


    const getSide = (teamName: string): 0 | 1 | null => {
        if (!selectedFixtureId || !liveFixturesList.length) return null;
        const fixture = liveFixturesList.find((f) => f.id === selectedFixtureId);
        if (!fixture) return null;
        if (fixture.homeTeamName.toLowerCase() === teamName.toLowerCase()) return 0;
        if (fixture.awayTeamName.toLowerCase() === teamName.toLowerCase()) return 1;
        return null;
    };


    const adjustScore = (team: string, field: 'runs' | 'wkts', delta: number) => {
        setScores((prev) => ({
            ...prev,
            [team]: {
                ...prev[team],
                [field]: Math.max(0, (prev[team]?.[field] || 0) + delta),
            },
        }));

        setPendingDeltas((prev) => ({
            ...prev,
            [team]: {
                runs: (prev[team]?.runs || 0) + (field === 'runs' ? delta : 0),
                wkts: (prev[team]?.wkts || 0) + (field === 'wkts' ? delta : 0),
            },
        }));
    };


    const handleUpdateScore = async (teamName: string) => {
        const delta = pendingDeltas[teamName];
        if (!delta || (delta.runs === 0 && delta.wkts === 0)) return;

        if (!selectedFixtureId) {
            alert('No fixture selected. Please select a match first.');
            return;
        }

        const side = getSide(teamName);
        if (side === null) {
            alert('Could not determine side for the selected team.');
            return;
        }

        const payload: { side: 0 | 1; runsDelta?: number; wicketsDelta?: number } = { side };
        if (delta.runs !== 0) payload.runsDelta = delta.runs;
        if (delta.wkts !== 0) payload.wicketsDelta = delta.wkts;

        const changeParts: string[] = [];
        if (delta.runs !== 0) changeParts.push(`${delta.runs > 0 ? '+' : ''}${delta.runs} run${Math.abs(delta.runs) !== 1 ? 's' : ''}`);
        if (delta.wkts !== 0) changeParts.push(`${delta.wkts > 0 ? '+' : ''}${delta.wkts} wkt${Math.abs(delta.wkts) !== 1 ? 's' : ''}`);
        const changeSummary = changeParts.join(', ');

        setUpdatingTeam(teamName);
        try {
            await updateScoreFixtures(selectedFixtureId, payload);
            setPendingDeltas((prev) => ({
                ...prev,
                [teamName]: { runs: 0, wkts: 0 },
            }));
            showSuccess('Success', `${teamName} updated (${changeSummary})`);
        } catch (error) {
            console.error('AddCommentary: Error updating score:', error);
            showError('Error', 'Failed to update score, please try again.');
        } finally {
            setUpdatingTeam(null);
        }
    };

    const handleActionSelect = (actionType: string) => {
        console.log(`AddCommentary: Action selected: ${actionType}`);

        if (selectedActionType === actionType) {
            setSelectedActionType(null);
        } else {
            setSelectedActionType(actionType);
        }

        setPostStatus('idle');
    };

    const handlePostCommentary = async () => {
        if (!selectedActionType) {
            alert('Please select an action (SIX, FOUR, Single, Wicket, or Wide)');
            return;
        }

        if (!selectedFixtureId) {
            alert('No fixture selected. Please select a match first.');
            return;
        }
        if (!selectedPlayerId) {
            alert('Please select a player.');
            return;
        }
        if (!selectedTeamName) {
            alert('Please select a team.');
            return;
        }

        const side = getSide(selectedTeamName);
        if (side === null) {
            alert('Could not determine side for the selected team.');
            return;
        }

        const actionValue = ACTION_MAP[selectedActionType];
        if (actionValue === undefined) {
            alert(`Unknown action type: ${selectedActionType}`);
            return;
        }

        const payload = {
            side,
            playerId: selectedPlayerId,
            action: actionValue,
            note: note || '',
        };

        console.log('AddCommentary: Sending commentary payload:', payload);
        console.log(`Fixture ID: ${selectedFixtureId}`);
        console.log(`Selected Action: ${selectedActionType}`);

        setIsPosting(true);
        setPostStatus('idle');

        try {
            const result = await postCommentary(selectedFixtureId, payload);
            console.log('AddCommentary: Commentary posted successfully:', result);
            setNote('');
            setPostStatus('success');
            alert(`Commentary posted successfully! (${selectedActionType})`);
            setSelectedActionType(null);
            setTimeout(() => setPostStatus('idle'), 3000);
        } catch (error) {
            console.error('AddCommentary: Error posting commentary:', error);
            setPostStatus('error');
            alert('Failed to post commentary. Please try again.');
            setTimeout(() => setPostStatus('idle'), 3000);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="add-commentary-container">
            {/* Match Info Banner */}
            {selectedMatch && matchTeams.length === 2 ? (
                <div className="match-info-banner">
                    <span className="match-info">
                        {selectedMatch.sport}: {matchTeams[0].teamName} vs {matchTeams[1].teamName}
                    </span>
                    <span className="match-info-score">{selectedMatch.score}</span>

                </div>
            ) : (
                <div className="match-info-banner" style={{ background: '#666' }}>
                    <span className="match-info">No match selected or teams not loaded</span>
                </div>
            )}

            <div className="score-control">
                <div className="score-header">
                    <h3>SCORE CONTROL</h3>
                    <span className="feed-score">Feed the score directly</span>
                </div>
                <p className="score-subtitle">Set RUNS / WKTS for each side. Also logs a commentary entry.</p>

                <div className="score-cards">
                    {teams.map((team) => {
                        const delta = pendingDeltas[team.name];
                        const hasPendingChange = !!delta && (delta.runs !== 0 || delta.wkts !== 0);

                        return (
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
                                        <span className="score-value">{scores[team.name]?.runs || 0}</span>
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
                                        <span className="score-value">{scores[team.name]?.wkts || 0}</span>
                                        <button
                                            className="stepper-btn"
                                            onClick={() => adjustScore(team.name, 'wkts', 1)}
                                            aria-label={`Increase ${team.name} wickets`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className="update-score-btn"
                                    onClick={() => handleUpdateScore(team.name)}
                                    disabled={updatingTeam === team.name || !hasPendingChange}
                                >
                                    {updatingTeam === team.name
                                        ? 'Updating...'
                                        : hasPendingChange
                                            ? `Update Score (${delta.runs >= 0 ? '+' : ''}${delta.runs} runs, ${delta.wkts >= 0 ? '+' : ''
                                            }${delta.wkts} wkts)`
                                            : 'Update Score'}
                                </button>
                            </div>
                        );
                    })}
                </div>


            </div>

            <hr className="divider" />

            {/* Add Commentary Section */}
            <div className="commentary-section">
                <div className="commentary-header">
                    <h3>ADD COMMENTARY</h3>
                    <span className="sport-tag">{selectedMatch?.sport || 'Cricket'}</span>
                </div>
                <p className="commentary-subtitle">Pick a team and player, then tap an action — it pushes straight to the live feed.</p>

                {/* Team Selector Buttons */}
                <div className="control-group">
                    <label>TEAM</label>
                    <div className="team-selector">
                        {teams.map((team) => (
                            <button
                                key={team.name}
                                className={`team-btn ${selectedTeamName === team.name ? 'active' : ''}`}
                                onClick={() => setSelectedTeamName(team.name)}
                            >
                                {team.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="commentary-controls">
                    {/* Player Dropdown */}
                    <div className="control-group">
                        <label>PLAYER</label>
                        <div className="player-selector">
                            <select
                                value={selectedPlayerId}
                                onChange={(e) => setSelectedPlayerId(e.target.value)}
                                className="player-dropdown"
                                disabled={currentPlayers.length === 0}
                            >
                                {currentPlayers.length === 0 ? (
                                    <option value="">No players available</option>
                                ) : (
                                    currentPlayers.map((player) => (
                                        <option key={player.playerId} value={player.playerId}>
                                            {player.playerName} ({player.role})
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Note Input */}
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

                {/* Quick Actions - Selection Mode */}
                <div className="quick-actions">
                    <p className="quick-actions-title">
                        ⚡ Select an action, then click "Post Commentary"
                        {selectedActionType && (
                            <span className="selected-action-indicator">
                                &nbsp;• Selected: <strong>{selectedActionType.toUpperCase()}</strong>
                            </span>
                        )}
                    </p>
                    <div className="action-buttons">
                        {quickActions.map((action) => {
                            const isSelected = selectedActionType === action.type;
                            return (
                                <button
                                    key={action.type}
                                    className={`action-btn ${action.type} ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleActionSelect(action.type)}
                                    style={{
                                        backgroundColor: isSelected ? action.selectedBg : action.bgColor,
                                        borderColor: isSelected ? action.selectedBg : action.borderColor,
                                        color: isSelected ? action.selectedColor : action.color,
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: isSelected ? `0 4px 16px ${action.borderColor}66` : 'none',
                                    }}
                                >
                                    <span className="action-icon">{action.icon}</span>
                                    <span className="action-label">{action.label}</span>
                                    <span className="action-runs">
                                        {action.type === 'wicket'
                                            ? '🪓 +1 wkt'
                                            : `+${action.runs} run${action.runs > 1 ? 's' : ''}`}
                                    </span>
                                    {isSelected && <span className="check-mark">✓</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                        className={`add-note-btn ${postStatus === 'success' ? 'success' : ''} ${postStatus === 'error' ? 'error' : ''}`}
                        onClick={handlePostCommentary}
                        disabled={isPosting || !selectedActionType}
                    >
                        {isPosting ? (
                            'Posting...'
                        ) : postStatus === 'success' ? (
                            '✅ Posted!'
                        ) : postStatus === 'error' ? (
                            '❌ Failed'
                        ) : (
                            <>
                                Post Commentary
                                <span className="arrow">→</span>
                            </>
                        )}
                    </button>
                </div>
                {selectedActionType && (
                    <div style={{
                        fontSize: '12px',
                        color: '#8d96aa',
                        marginTop: '8px',
                        textAlign: 'right'
                    }}>
                        Ready to post: <strong style={{ color: '#ffffff' }}>{selectedActionType.toUpperCase()}</strong>
                        {note && ` with note: "${note}"`}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddCommentary;