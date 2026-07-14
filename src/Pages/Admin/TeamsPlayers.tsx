import React, { useState } from 'react'
import AdminTabs from '../../components/AdminTabs/AdminTabs'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import './Admin.css'
import type { TabType } from './Admin'

function TeamsPlayers() {
    const [activeTab, setActiveTab] = useState<TabType>("fixtures");
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

                <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </section>
        </main>
    )
}

export default TeamsPlayers
