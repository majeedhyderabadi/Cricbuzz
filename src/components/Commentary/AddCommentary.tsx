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
    homeWickets: number | null;
    awayScore: number;
    awayWickets: number | null;
}

interface AddCommentaryProps {
    selectedMatch?: FeedingMatchs | null;
    onFixtureIdChange?: (fixtureId: string | null) => void;
    onCommentaryPosted?: () => void;
    onScoreUpdated?: (updatedMatch: FeedingMatchs) => void;
}

// Cricket Action Map
const CRICKET_ACTION_MAP: Record<string, number> = {
    six: 0,
    four: 1,
    single: 2,
    wicket: 3,
    wide: 4,
    two: 5,
    three: 6,
};

// Football Action Map
const FOOTBALL_ACTION_MAP: Record<string, number> = {
    goal: 7,
    assist: 8,
    yellow_card: 9,
    red_card: 10,
    substitution: 11,
    penalty: 12,
    free_kick: 13,
    corner: 14,
    offside: 15,
    save: 16,
};

const cricketQuickActions = [
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
    {
        label: 'Two',
        runs: 2,
        type: 'two',
        icon: '✌🏻',
        color: '#eff0e7',
        bgColor: '#ace05e',
        borderColor: '#deeb25',
        selectedBg: '#d3cd97',
        selectedColor: '#FFFFFF',
    },
    {
        label: 'Three',
        runs: 3,
        type: 'three',
        icon: '👌🏻',
        color: '#eff0e7',
        bgColor: '#b66565',
        borderColor: '#ed4426',
        selectedBg: '#9a3725',
        selectedColor: '#FFFFFF',
    },
];

const footballQuickActions = [
    {
        label: '⚽ Goal',
        type: 'goal',
        icon: '⚽',
        color: '#059669',
        bgColor: '#D1FAE5',
        borderColor: '#059669',
        selectedBg: '#059669',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🅰️ Assist',
        type: 'assist',
        icon: '🅰️',
        color: '#2563EB',
        bgColor: '#DBEAFE',
        borderColor: '#2563EB',
        selectedBg: '#2563EB',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🟨 Yellow Card',
        type: 'yellow_card',
        icon: '🟨',
        color: '#D97706',
        bgColor: '#FEF3C7',
        borderColor: '#D97706',
        selectedBg: '#D97706',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🟥 Red Card',
        type: 'red_card',
        icon: '🟥',
        color: '#DC2626',
        bgColor: '#FEE2E2',
        borderColor: '#DC2626',
        selectedBg: '#DC2626',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🔄 Substitution',
        type: 'substitution',
        icon: '🔄',
        color: '#8B5CF6',
        bgColor: '#EDE9FE',
        borderColor: '#8B5CF6',
        selectedBg: '#8B5CF6',
        selectedColor: '#FFFFFF',
    },
    {
        label: '⚡ Penalty',
        type: 'penalty',
        icon: '⚡',
        color: '#EF4444',
        bgColor: '#FEE2E2',
        borderColor: '#EF4444',
        selectedBg: '#EF4444',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🎯 Free Kick',
        type: 'free_kick',
        icon: '🎯',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        borderColor: '#F59E0B',
        selectedBg: '#F59E0B',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🚩 Corner',
        type: 'corner',
        icon: '🚩',
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        borderColor: '#3B82F6',
        selectedBg: '#3B82F6',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🚫 Offside',
        type: 'offside',
        icon: '🚫',
        color: '#6B7280',
        bgColor: '#E5E7EB',
        borderColor: '#6B7280',
        selectedBg: '#6B7280',
        selectedColor: '#FFFFFF',
    },
    {
        label: '🧤 Save',
        type: 'save',
        icon: '🧤',
        color: '#10B981',
        bgColor: '#D1FAE5',
        borderColor: '#10B981',
        selectedBg: '#10B981',
        selectedColor: '#FFFFFF',
    },
];

function AddCommentary({ selectedMatch, onFixtureIdChange, onCommentaryPosted, onScoreUpdated }: AddCommentaryProps) {
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
    const [matchStatus, setMatchStatus] = useState<string>('');

    const [scores, setScores] = useState<Record<string, { runs: number; wkts: number }>>({});

    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [postStatus, setPostStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Determine sport type from selected match
    const getSportType = (): 'cricket' | 'football' => {
        if (selectedMatch?.sport?.toLowerCase().includes('football') || 
            selectedMatch?.sport?.toLowerCase().includes('soccer')) {
            return 'football';
        }
        return 'cricket';
    };

    const sportType = getSportType();
    const isFootball = sportType === 'football';
    const quickActions = isFootball ? footballQuickActions : cricketQuickActions;
    const ACTION_MAP = isFootball ? FOOTBALL_ACTION_MAP : CRICKET_ACTION_MAP;

    // Check if match is live
    const isMatchLive = matchStatus?.toLowerCase() === 'live';

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

    // Helper to update the parent with new score
    const updateParentScore = (team1Score: string, team2Score: string) => {
        if (!selectedMatch || !onScoreUpdated) return;
        
        const updatedMatch: FeedingMatchs = {
            ...selectedMatch,
            score: isFootball 
                ? `${team1Score} - ${team2Score}`
                : `${team1Score}/${scores[matchTeams[0]?.teamName]?.wkts || 0} - ${team2Score}/${scores[matchTeams[1]?.teamName]?.wkts || 0}`
        };
        
        onScoreUpdated(updatedMatch);
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
                setMatchStatus(fixture.status);
                onFixtureIdChange?.(fixture.id);
            } else {
                console.warn('AddCommentary: No matching fixture found for the selected match');
                setSelectedFixtureId(null);
                setMatchStatus('');
                onFixtureIdChange?.(null);
            }

            if (foundTeams.length === 2) {
                // Initialize scores from the fixture data if available
                if (fixture) {
                    const homeTeam = foundTeams.find(t => t.teamName === fixture.homeTeamName);
                    const awayTeam = foundTeams.find(t => t.teamName === fixture.awayTeamName);
                    
                    if (homeTeam && awayTeam) {
                        if (isFootball) {
                            setScores({
                                [homeTeam.teamName]: {
                                    runs: fixture.homeScore || 0,
                                    wkts: 0,
                                },
                                [awayTeam.teamName]: {
                                    runs: fixture.awayScore || 0,
                                    wkts: 0,
                                },
                            });
                        } else {
                            setScores({
                                [homeTeam.teamName]: {
                                    runs: fixture.homeScore || 0,
                                    wkts: fixture.homeWickets || 0,
                                },
                                [awayTeam.teamName]: {
                                    runs: fixture.awayScore || 0,
                                    wkts: fixture.awayWickets || 0,
                                },
                            });
                        }
                        setSelectedTeamName(foundTeams[0].teamName);
                        setSelectedActionType(null);
                    }
                } else {
                    // Fallback to parsing from selectedMatch.score
                    if (isFootball) {
                        const scoreParts = selectedMatch.score.split(' - ');
                        const homeScore = parseInt(scoreParts[0]) || 0;
                        const awayScore = parseInt(scoreParts[1]) || 0;
                        setScores({
                            [foundTeams[0].teamName]: {
                                runs: homeScore,
                                wkts: 0,
                            },
                            [foundTeams[1].teamName]: {
                                runs: awayScore,
                                wkts: 0,
                            },
                        });
                    } else {
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
                    }
                    setSelectedTeamName(foundTeams[0].teamName);
                    setSelectedActionType(null);
                }
            }
        } else {
            setMatchTeams([]);
            setSelectedTeamName('');
            setSelectedFixtureId(null);
            setMatchStatus('');
            onFixtureIdChange?.(null);
            setSelectedActionType(null);
        }
    }, [selectedMatch, allTeams, liveFixturesList, isFootball]);

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
        if (!isMatchLive) {
            showError('Error', 'Cannot update score for a match that is not live');
            return;
        }
        
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
        if (!isMatchLive) {
            showError('Error', 'Cannot update score for a match that is not live');
            return;
        }

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
        if (delta.runs !== 0) {
            if (isFootball) {
                changeParts.push(`${delta.runs > 0 ? '+' : ''}${delta.runs} goal${Math.abs(delta.runs) !== 1 ? 's' : ''}`);
            } else {
                changeParts.push(`${delta.runs > 0 ? '+' : ''}${delta.runs} run${Math.abs(delta.runs) !== 1 ? 's' : ''}`);
            }
        }
        if (delta.wkts !== 0) changeParts.push(`${delta.wkts > 0 ? '+' : ''}${delta.wkts} wkt${Math.abs(delta.wkts) !== 1 ? 's' : ''}`);
        const changeSummary = changeParts.join(', ');

        setUpdatingTeam(teamName);
        try {
            await updateScoreFixtures(selectedFixtureId, payload);
            setPendingDeltas((prev) => ({
                ...prev,
                [teamName]: { runs: 0, wkts: 0 },
            }));
            
            // Update the parent component with the new score
            if (matchTeams.length === 2) {
                const team1Score = scores[matchTeams[0].teamName]?.runs || 0;
                const team2Score = scores[matchTeams[1].teamName]?.runs || 0;
                updateParentScore(String(team1Score), String(team2Score));
            }
            
            showSuccess('Success', `${teamName} updated (${changeSummary})`);
        } catch (error) {
            console.error('AddCommentary: Error updating score:', error);
            showError('Error', 'Failed to update score, please try again.');
        } finally {
            setUpdatingTeam(null);
        }
    };

    const handleActionSelect = (actionType: string) => {
        if (!isMatchLive) {
            showError('Error', 'Cannot post commentary for a match that is not live');
            return;
        }
        
        console.log(`AddCommentary: Action selected: ${actionType}`);

        if (selectedActionType === actionType) {
            setSelectedActionType(null);
        } else {
            setSelectedActionType(actionType);
        }

        setPostStatus('idle');
    };

    const handlePostCommentary = async () => {
        if (!isMatchLive) {
            showError('Error', 'Cannot post commentary for a match that is not live');
            return;
        }

        if (!selectedActionType) {
            alert('Please select an action');
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
            onCommentaryPosted?.();
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
                    <span className="match-info-score">
                        {isFootball 
                            ? `${scores[matchTeams[0]?.teamName]?.runs || 0} - ${scores[matchTeams[1]?.teamName]?.runs || 0}`
                            : `${scores[matchTeams[0]?.teamName]?.runs || 0}/${scores[matchTeams[0]?.teamName]?.wkts || 0} - ${scores[matchTeams[1]?.teamName]?.runs || 0}/${scores[matchTeams[1]?.teamName]?.wkts || 0}`
                        }
                    </span>
                    <span className="match-status-badge" style={{
                        background: isMatchLive ? '#10B981' : '#F59E0B',
                        padding: '2px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: '8px'
                    }}>
                        {isMatchLive ? '🔴 LIVE' : matchStatus?.toUpperCase() || 'SCHEDULED'}
                    </span>
                    <span className="match-sport-badge" style={{
                        background: isFootball ? '#10B981' : '#8B5CF6',
                        padding: '2px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: '8px'
                    }}>
                        {isFootball ? '⚽ Football' : '🏏 Cricket'}
                    </span>
                </div>
            ) : (
                <div className="match-info-banner" style={{ background: '#666' }}>
                    <span className="match-info">No match selected or teams not loaded</span>
                </div>
            )}

            {/* Disabled overlay for scheduled matches */}
            {!isMatchLive && selectedMatch && (
                <div className="match-disabled-overlay">
                    <div className="disabled-message">
                        <span className="disabled-icon">⏳</span>
                        <h3>Match is {matchStatus?.toUpperCase() || 'SCHEDULED'}</h3>
                        <p>Commentary and score updates are only available when the match is LIVE</p>
                    </div>
                </div>
            )}

            <div className={`score-control ${!isMatchLive ? 'disabled-section' : ''}`}>
                <div className="score-header">
                    <h3>SCORE CONTROL</h3>
                    <span className="feed-score">Feed the score directly</span>
                </div>
                <p className="score-subtitle">
                    {isFootball 
                        ? 'Set GOALS for each side. Also logs a commentary entry.' 
                        : 'Set RUNS / WKTS for each side. Also logs a commentary entry.'}
                </p>

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
                                    <span className="score-label">{isFootball ? 'GOALS' : 'RUNS'}</span>
                                    <div className="score-stepper">
                                        <button
                                            className="stepper-btn"
                                            onClick={() => adjustScore(team.name, 'runs', -1)}
                                            disabled={!isMatchLive}
                                            aria-label={`Decrease ${team.name} ${isFootball ? 'goals' : 'runs'}`}
                                        >
                                            −
                                        </button>
                                        <span className="score-value">{scores[team.name]?.runs || 0}</span>
                                        <button
                                            className="stepper-btn"
                                            onClick={() => adjustScore(team.name, 'runs', 1)}
                                            disabled={!isMatchLive}
                                            aria-label={`Increase ${team.name} ${isFootball ? 'goals' : 'runs'}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {!isFootball && (
                                    <div className="score-detail">
                                        <span className="score-label">WKTS</span>
                                        <div className="score-stepper">
                                            <button
                                                className="stepper-btn"
                                                onClick={() => adjustScore(team.name, 'wkts', -1)}
                                                disabled={!isMatchLive}
                                                aria-label={`Decrease ${team.name} wickets`}
                                            >
                                                −
                                            </button>
                                            <span className="score-value">{scores[team.name]?.wkts || 0}</span>
                                            <button
                                                className="stepper-btn"
                                                onClick={() => adjustScore(team.name, 'wkts', 1)}
                                                disabled={!isMatchLive}
                                                aria-label={`Increase ${team.name} wickets`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="update-score-btn"
                                    onClick={() => handleUpdateScore(team.name)}
                                    disabled={updatingTeam === team.name || !hasPendingChange || !isMatchLive}
                                >
                                    {!isMatchLive 
                                        ? 'Match Not Live'
                                        : updatingTeam === team.name
                                            ? 'Updating...'
                                            : hasPendingChange
                                                ? `Update Score (${delta.runs >= 0 ? '+' : ''}${delta.runs} ${isFootball ? 'goal' : 'run'}${Math.abs(delta.runs) !== 1 ? 's' : ''}${!isFootball && delta.wkts !== 0 ? `, ${delta.wkts >= 0 ? '+' : ''}${delta.wkts} wkt${Math.abs(delta.wkts) !== 1 ? 's' : ''}` : ''})`
                                                : 'Update Score'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <hr className="divider" />

            <div className={`commentary-section ${!isMatchLive ? 'disabled-section' : ''}`}>
                <div className="commentary-header">
                    <h3>ADD COMMENTARY</h3>
                    <span className="sport-tag">{selectedMatch?.sport || (isFootball ? 'Football' : 'Cricket')}</span>
                </div>
                <p className="commentary-subtitle">
                    {isMatchLive 
                        ? 'Pick a team and player, then tap an action — it pushes straight to the live feed.'
                        : `Commentary is disabled while match is ${matchStatus?.toLowerCase() || 'scheduled'}`}
                </p>

                <div className="control-group">
                    <label>TEAM</label>
                    <div className="team-selector">
                        {teams.map((team) => (
                            <button
                                key={team.name}
                                className={`team-btn ${selectedTeamName === team.name ? 'active' : ''}`}
                                onClick={() => setSelectedTeamName(team.name)}
                                disabled={!isMatchLive}
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
                                value={selectedPlayerId}
                                onChange={(e) => setSelectedPlayerId(e.target.value)}
                                className="player-dropdown"
                                disabled={currentPlayers.length === 0 || !isMatchLive}
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

                    <div className="control-group">
                        <label>NOTE (optional)</label>
                        <div className="note-input-group">
                            <input
                                type="text"
                                placeholder={isFootball ? "e.g. powerful strike from outside the box" : "e.g. drives it through the covers"}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="note-input"
                                disabled={!isMatchLive}
                            />
                        </div>
                    </div>
                </div>

                <div className="quick-actions">
                    <p className="quick-actions-title">
                        ⚡ Select an action, then click "Post Commentary"
                        {selectedActionType && (
                            <span className="selected-action-indicator">
                                &nbsp;• Selected: <strong>{selectedActionType.toUpperCase().replace('_', ' ')}</strong>
                            </span>
                        )}
                    </p>
                    <div className="action-buttons" style={{
                        display: 'grid',
                        gridTemplateColumns: isFootball ? 'repeat(5, 1fr)' : 'repeat(7, 1fr)',
                        gap: '8px',
                        opacity: isMatchLive ? 1 : 0.5,
                        pointerEvents: isMatchLive ? 'auto' : 'none'
                    }}>
                        {quickActions.map((action) => {
                            const isSelected = selectedActionType === action.type;
                            return (
                                <button
                                    key={action.type}
                                    className={`action-btn ${action.type} ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleActionSelect(action.type)}
                                    disabled={!isMatchLive}
                                    style={{
                                        backgroundColor: isSelected ? action.selectedBg : action.bgColor,
                                        borderColor: isSelected ? action.selectedBg : action.borderColor,
                                        color: isSelected ? action.selectedColor : action.color,
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: isSelected ? `0 4px 16px ${action.borderColor}66` : 'none',
                                        padding: isFootball ? '8px 4px' : '8px 6px',
                                        fontSize: isFootball ? '11px' : '12px',
                                        opacity: !isMatchLive ? 0.5 : 1,
                                        cursor: !isMatchLive ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <span className="action-icon">{action.icon}</span>
                                    <span className="action-label" style={{ fontSize: isFootball ? '9px' : '10px' }}>
                                        {action.label}
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
                        disabled={isPosting || !selectedActionType || !isMatchLive}
                    >
                        {!isMatchLive 
                            ? 'Match Not Live' 
                            : isPosting 
                                ? 'Posting...'
                                : postStatus === 'success' 
                                    ? '✅ Posted!'
                                    : postStatus === 'error' 
                                        ? '❌ Failed'
                                        : <>
                                            Post Commentary
                                            <span className="arrow">→</span>
                                        </>
                        }
                    </button>
                </div>
                {selectedActionType && isMatchLive && (
                    <div style={{
                        fontSize: '12px',
                        color: '#8d96aa',
                        marginTop: '8px',
                        textAlign: 'right'
                    }}>
                        Ready to post: <strong style={{ color: '#ffffff' }}>{selectedActionType.toUpperCase().replace('_', ' ')}</strong>
                        {note && ` with note: "${note}"`}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddCommentary;