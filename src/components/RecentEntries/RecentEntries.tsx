import './RecentEntries.css';
import recentEntries from "./RecentMockData";
import { useState } from 'react';

interface Entry {
    id: number;
    player: string;
    event: string;
    time: string;
    comment?: string;
}

function RecentEntries() {
    const [entries, setEntries] = useState<Entry[]>(recentEntries);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Entry | null>(null);

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

    const quickActions = [
        { label: 'SIX', value: 'SIX', color: 'orange' },
        { label: 'FOUR', value: 'FOUR', color: 'blue' },
        { label: 'Single', value: 'SINGLE', color: 'green' },
        { label: 'Wicket', value: 'WICKET', color: 'red' },
        { label: 'Wide', value: 'WIDE', color: 'purple' },
    ];

    return (
        <div className="mainComponent">
            <div className="mainHeader">
                <h3>RECENT ENTRIES</h3>
                <p>{entries.length}</p>
            </div>

            <div className="divider"></div>

            <div className="recentList">
                {entries.map((item) => (
                    <div className="entry" key={item.id}>
                        <div className="content">
                            {editingId === item.id && editData ? (
                                // Edit Mode
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
                                                        <option value="FOCUS">FOCUS</option>
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
                                            placeholder="Add a comment (e.g., tucks it to leg, comfortable single)"
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
                                // View Mode
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