import { useOutletContext } from 'react-router-dom';
import RecentEntries from '../../components/RecentEntries/RecentEntries';
import AddCommentary from '../../components/Commentary/AddCommentary';
import type { AdminOutletContext } from './Admin';
import './Admin.css';

function Commentary() {
    const { selectedMatch, selectedFixtureId, setSelectedFixtureId, refreshTick, triggerRefresh, onScoreUpdated  } =
        useOutletContext<AdminOutletContext>();

    return (
        <div className="fixtures-layout">
            <AddCommentary
                selectedMatch={selectedMatch}
                onFixtureIdChange={setSelectedFixtureId}
                onCommentaryPosted={triggerRefresh}
                onScoreUpdated={onScoreUpdated}
            />
            <RecentEntries fixtureId={selectedFixtureId} refreshTrigger={refreshTick} />
        </div>
    );
}

export default Commentary;