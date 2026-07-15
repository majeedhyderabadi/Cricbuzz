import { useState } from 'react';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import Header from '../../components/Header/Header';
import RecentEntries from '../../components/RecentEntries/RecentEntries';
import AddCommentary from '../../components/Commentary/AddCommentary';
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch';
import type { FeedingMatchs as FeedingMatchType } from '../../services/match.types';
import type { TabType } from './Admin';
import './Admin.css';

function Commentary() {
    const [selectedMatch, setSelectedMatch] = useState<FeedingMatchType | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("commentary");

    const handleMatchSelect = (match: FeedingMatchType) => {
        console.log("Commentary: Match selected:", match);
        setSelectedMatch(match);
    };

    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch onMatchSelect={handleMatchSelect} />
            <section className="admin-page">
                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="fixtures-layout">
                    <AddCommentary selectedMatch={selectedMatch} />
                    <RecentEntries />
                </div>
            </section>
        </main>
    );
}

export default Commentary;