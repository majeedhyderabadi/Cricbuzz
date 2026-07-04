import "./Admin.css";
import Header from "../components/Header/Header";
import FeedingMatch from "../components/FeedingMatch/FeedingMatch";

function Admin() {
    return (
        <main className="container">
            <Header />
            <br />
            <FeedingMatch />
            <section className="section admin-panel">
                <div className="admin-panel__header">
                    <h1 className="admin-panel__title">Admin Console</h1>
                    <p className="admin-panel__subtitle">Manage application settings and user data</p>
                </div>

                <div className="admin-panel__content">
                    <div className="admin-card card">
                        <h2 className="admin-card__title">Users Management</h2>
                        <p className="admin-card__description">Manage user accounts and permissions</p>
                        <button className="admin-card__button">Manage Users</button>
                    </div>

                    <div className="admin-card card">
                        <h2 className="admin-card__title">System Settings</h2>
                        <p className="admin-card__description">Configure application settings</p>
                        <button className="admin-card__button">Settings</button>
                    </div>

                    <div className="admin-card card">
                        <h2 className="admin-card__title">Reports</h2>
                        <p className="admin-card__description">View and generate reports</p>
                        <button className="admin-card__button">View Reports</button>
                    </div>

                    <div className="admin-card card">
                        <h2 className="admin-card__title">Audit Log</h2>
                        <p className="admin-card__description">View system activity and changes</p>
                        <button className="admin-card__button">View Logs</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Admin;
