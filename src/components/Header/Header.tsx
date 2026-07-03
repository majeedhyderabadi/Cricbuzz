import "./Header.css";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {

    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (

        <header className="header card">

            <div className="header__left">

                <div className="header__logo">

                    <span className="header__live-dot"></span>

                    <span className="header__live-text">
                        LIVE
                    </span>

                    <h2 className="header__title">
                        MATCHCAST
                    </h2>

                </div>

                <div className="header__time">

                    <span className="header__time-dot"></span>

                    <span>
                        19:29
                    </span>

                </div>

            </div>

            <nav className="header__nav">

                <button
                    className={`header__nav-btn ${location.pathname === "/nvian" ? "active" : ""
                        }`}
                    onClick={() => navigate("/nvian")}
                >
                    NVian Dashboard
                </button>
                <button
                    className={`header__nav-btn ${location.pathname === "/" ? "active" : ""
                        }`}
                    onClick={() => navigate("/")}
                >
                    Live Dashboard
                </button>

                {isAdmin && (
                    <button
                        className={`header__nav-btn ${location.pathname === "/admin" ? "active" : ""
                            }`}
                        onClick={() => navigate("/admin")}
                    >
                        Admin Console
                    </button>
                )}

                {isAuthenticated && (
                    <div className="header__auth">
                        <span className="header__role">
                            {isAdmin ? ' Admin' : ' User'}
                        </span>
                        <button
                            className="header__logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}

            </nav>

        </header>

    );

}

export default Header;