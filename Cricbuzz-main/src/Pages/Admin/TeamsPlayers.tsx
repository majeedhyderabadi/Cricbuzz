import React from 'react'
import AdminTabs from '../../components/AdminTabs/AdminTabs'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import './Admin.css'

function TeamsPlayers() {
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

                {/* <AdminTabs /> */}
            </section>
        </main>
    )
}

export default TeamsPlayers
