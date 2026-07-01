import "./Header.css";

function Header() {

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

                <button className="header__nav-btn active">
                    Live Dashboard
                </button>

                <button className="header__nav-btn">
                    NVian
                </button>

                <button className="header__nav-btn">
                    Admin Console
                </button>

            </nav>

        </header>

    );

}

export default Header;