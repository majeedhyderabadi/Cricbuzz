import React, { useState } from 'react'
import FixtureList from '../../components/FixtureList/FixtureList'
import FixtureForm from '../../components/FixtureForm/FixtureForm'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import AdminTabs from '../../components/AdminTabs/AdminTabs'
import './Admin.css'
import type { TabType } from './Admin'

function Fixtures() {
    const [activeTab, setActiveTab] = useState<TabType>("fixtures");
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

                 <AdminTabs activeTab={activeTab} onTabChange={setActiveTab}/>


                <div className="fixtures-layout">

                    <FixtureForm />

                    <FixtureList />
                </div>
            </section>
        </main>
    )
}

export default Fixtures