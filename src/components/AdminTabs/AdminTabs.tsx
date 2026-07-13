import type { TabType } from "../../Pages/Admin/Admin";
import "./AdminTabs.css";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}


export default function AdminTabs({
  activeTab,
  onTabChange,
}: Props) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabClick = (path: string) => {
        navigate(path);
    };

    const isActivePath = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className="admin-tabs">
            <button 
              onClick={() => {
                 handleTabClick("/admin/commentary")
                 onTabChange("commentary");
                }}
                className={activeTab === "commentary" ? "active" : ""}
            >
                Commentary
            </button>
            <button 
                onClick={() => {
                     handleTabClick("/admin/teams-players")
                     onTabChange("teams");
                    }}
                className={activeTab === "teams" ? "active" : ""}
            >
                Teams & Players
            </button>
            <button 
                 onClick={() => {
                 handleTabClick("/admin/fixtures")
                 onTabChange("fixtures");
                }}
                className={activeTab === "fixtures" ? "active" : ""}
            >
                Fixtures
            </button>
        </div>
    );
}
