import AdminTabs from '../../components/AdminTabs/AdminTabs'
import CommentaryBox from '../../components/Commentary/CommentaryBox'
import LiveCommentary from '../../components/Commentary/LiveCommentary'
import { nvianComments } from '../../components/Data/NVianComments'
import FeedingMatch from '../../components/FeedingMatch/FeedingMatch'
import Header from '../../components/Header/Header'
import RecentEntries from '../../components/RecentEntries/RecentEntries'
import './Admin.css'

function Commentary() {
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="admin-page">

                <AdminTabs />
               <div className="fixtures-layout">
                    
                    <LiveCommentary />
                    <RecentEntries />
                </div>
            </section>
        </main>
    )
}

export default Commentary