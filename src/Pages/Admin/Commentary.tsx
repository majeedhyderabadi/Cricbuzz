import { useOutletContext } from 'react-router-dom';
import RecentEntries from '../../components/RecentEntries/RecentEntries';
import AddCommentary from '../../components/Commentary/AddCommentary';
import type { AdminOutletContext } from './Admin';
import './Admin.css';

function Commentary() {
    const { selectedMatch, selectedFixtureId, setSelectedFixtureId, refreshTick, triggerRefresh } =
        useOutletContext<AdminOutletContext>();

    return (
        <div className="fixtures-layout">
            <AddCommentary
                selectedMatch={selectedMatch}
                onFixtureIdChange={setSelectedFixtureId}
                onCommentaryPosted={triggerRefresh}
            />
            <RecentEntries fixtureId={selectedFixtureId} refreshTrigger={refreshTick} />
        </div>
    );
}

export default Commentary;