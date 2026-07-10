import "./AdminTabs.css";
import { useNavigate, useLocation } from "react-router-dom";



function AdminTabs() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabClick = (path: string) => {
        navigate(path);
    };

    const isActivePath = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className="admin-tabs">
            <button onClick={() => handleTabClick("/admin/commentary")} className={isActivePath("/admin/commentary") ? "active" : ""}>
                Commentary
            </button>
            <button onClick={() => handleTabClick("/admin/teams-players")} className={isActivePath("/admin/teams-players") ? "active" : ""}>
                Teams & Players
            </button>
            <button onClick={() => handleTabClick("/admin/fixtures")} className={isActivePath("/admin/fixtures") ? "active" : ""}>
                Fixtures
            </button>
        </div>
    );
}

export default AdminTabs;