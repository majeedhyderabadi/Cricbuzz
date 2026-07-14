import { useState } from 'react'
import AdminTabs from '../../components/AdminTabs/AdminTabs'
import LiveCommentary from '../../components/Commentary/LiveCommentary'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import RecentEntries from '../../components/RecentEntries/RecentEntries'
import './Admin.css'
import type { TabType } from './Admin'
import AddCommentary from '../../components/Commentary/AddCommentary'

function Commentary() {
    const [activeTab, setActiveTab] = useState<TabType>("commentary");
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">
                 <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}/>
               <div className="fixtures-layout">
                    
                    <AddCommentary />
                    <RecentEntries />
                </div>
            </section>
        </main>
    )
}

export default Commentary