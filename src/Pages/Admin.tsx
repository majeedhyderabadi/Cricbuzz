import Header from "../components/Header/Header";
import AdminTabs from "../components/AdminTabs/AdminTabs";
import FixtureForm from "../components/FixtureForm/FixtureForm";
import FixtureList from "../components/FixtureList/FixtureList";
import "./Admin.css";

function Admin() {
    return (
        <main className="container">
            <Header />

            <section className="admin-page">

                <AdminTabs />

                <div className="fixtures-layout">

                    <FixtureForm />

                    <FixtureList />

                </div>

            </section>
        </main>
    );
}

export default Admin;