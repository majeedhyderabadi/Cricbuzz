import './RecentEntries.css';
import { useEffect, useState } from 'react';
import { getCommentary, type CommentaryEntry } from '../../services/liveservice';

interface Entry {
    id: string;
    player: string;
    event: string;
    time: string;
    comment?: string;
}

interface RecentEntriesProps {
    fixtureId: string | null;
    refreshTrigger?: number;
}

function mapEntry(item: CommentaryEntry): Entry {
    return {
        id: item.id,
        player: item.playerName,
        event: item.action?.toUpperCase() ?? '',
        time: new Date(item.createdAtUtc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        comment: item.note || undefined,
    };
}

function RecentEntries({ fixtureId, refreshTrigger }: RecentEntriesProps) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Entry | null>(null);

    useEffect(() => {
        if (!fixtureId) {
            setEntries([]);
            return;
        }

        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCommentary(fixtureId);
                if (!cancelled) {
                    setEntries(data.map(mapEntry));
                }
            } catch (e) {
                console.error('RecentEntries: Error fetching commentary:', e);
                if (!cancelled) setError('Failed to load commentary.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [fixtureId, refreshTrigger]);

    const getBallColor = (event: string) => {
        switch (event.toUpperCase()) {
            case "SIX":
            case "WICKET":
                return "orange";
            case "FOUR":
            case "SINGLE":
            case "DOUBLE":
            case "WIDE":
            default:
                return "blue";
        }
    };

    const handleEditClick = (item: Entry) => {
        setEditingId(item.id);
        setEditData({ ...item });
    };

    const handleSaveEdit = () => {
        if (editData) {
            setEntries(entries.map(item =>
                item.id === editData.id ? editData : item
            ));
            setEditingId(null);
            setEditData(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData(null);
    };

    const handleInputChange = (field: keyof Entry, value: string) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };
return (
        <div className="mainComponent">
            <div className="mainHeader">
                <div className="mainHeaderTop">
                    <h3>RECENT ENTRIES</h3>
                    <p>{entries.length}</p>
                </div>
                <span className="mainHeaderSubtitle">Latest commentary for this fixture, most recent first.</span>
            </div>

            <div className="divider"></div>

            <div className="recentList">
                {!fixtureId && (
                    <div className="empty-state">Select a match to see commentary.</div>
                )}
                {loading && <div className="loading-state">Loading commentary...</div>}
                {error && <div className="error-state">{error}</div>}
                {fixtureId && !loading && !error && entries.length === 0 && (
                    <div className="empty-state">No commentary yet — post one from the left panel.</div>
                )}

                {entries.map((item) => (
                    <div className="entry" key={item.id}>
                        <div className="content">
                            {editingId === item.id && editData ? (
                                <div className="editModeContainer">
                                    <div className="editHeader">
                                        <div className="editPlayerInfo">
                                            <div className={`playerBall ${getBallColor(editData.event)}`}></div>
                                            <div className="editTextContainer">
                                                <div className="editPlayerInput">
                                                    <input
                                                        type="text"
                                                        value={editData.player}
                                                        onChange={(e) => handleInputChange('player', e.target.value)}
                                                        className="editPlayerNameInput"
                                                        placeholder="Player"
                                                    />
                                                    <span className="editSeparator">·</span>
                                                    <select
                                                        value={editData.event}
                                                        onChange={(e) => handleInputChange('event', e.target.value)}
                                                        className="editEventSelect"
                                                    >
                                                        <option value="SIX">SIX</option>
                                                        <option value="FOUR">FOUR</option>
                                                        <option value="SINGLE">Single</option>
                                                        <option value="DOUBLE">Double</option>
                                                        <option value="WICKET">Wicket</option>
                                                        <option value="WIDE">Wide</option>
                                                    </select>
                                                </div>
                                                <span className="editTime">{editData.time}</span>
                                            </div>
                                        </div>
                                        <button className="close-btn" onClick={handleCancelEdit}>×</button>
                                    </div>

                                    <div className="editCommentSection">
                                        <input
                                            type="text"
                                            value={editData.comment || ''}
                                            onChange={(e) => handleInputChange('comment', e.target.value)}
                                            className="editCommentInput"
                                            placeholder="Add a comment"
                                        />
                                    </div>

                                    <div className="editActionsRow">
                                        <div className="editButtons">
                                            <button className="cancelEditBtn" onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                            <button className="saveEditBtn" onClick={handleSaveEdit}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="subContent">
                                    <div className="contentHeader">
                                        <div className={`playerBall ${getBallColor(item.event)}`}></div>
                                        <div className="textContainer">
                                            <p className="playerText">
                                                <strong>{item.player}</strong> · {item.event}
                                                {item.comment && <span className="comment"> - {item.comment}</span>}
                                            </p>
                                            <span className="time">{item.time}</span>
                                        </div>
                                    </div>
                                    <div className="actionButtons">
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            ✎ Edit
                                        </button>
                                        <button className="close-btn">×</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentEntries;