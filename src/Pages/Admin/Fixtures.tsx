import React from 'react'
import FixtureList from '../../components/FixtureList/FixtureList'
import FixtureForm from '../../components/FixtureForm/FixtureForm'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import AdminTabs from '../../components/AdminTabs/AdminTabs'
import './Admin.css'

function Fixtures() {
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

                <AdminTabs />


                <div className="fixtures-layout">

                    <FixtureForm />

                    <FixtureList />
                </div>
            </section>
        </main>
    )
}

export default Fixtures