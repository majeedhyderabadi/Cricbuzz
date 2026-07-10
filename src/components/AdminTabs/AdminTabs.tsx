import "./AdminTabs.css";

function AdminTabs() {
    return (
        <div className="admin-tabs">
            <button>Commentary</button>
            <button>Teams & Players</button>
            <button className="active">Fixtures</button>
        </div>
    );
}

export default AdminTabs;