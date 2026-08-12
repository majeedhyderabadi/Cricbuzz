import Header from "../components/Header/Header";
import AdminApproval from "../components/AdminTabs/AdminApproval";

function SuperAdmin() {
    return (
        <main className="container">
            <Header />

            <section className="admin-page">
                <AdminApproval />
            </section>
        </main>
    );
}

export default SuperAdmin;