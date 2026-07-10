import "./MatchTabs.css";

type MatchTabsProps = {

    activeTab: string;

};

function MatchTabs({

    activeTab

}: MatchTabsProps) {

    return (

        <nav className="match-tabs">

            <button
                className={`match-tabs__item ${activeTab === "Live" ? "match-tabs__item--active" : ""}`}
            >
                Live
            </button>

            <button
                className={`match-tabs__item ${activeTab === "Scorecard" ? "match-tabs__item--active" : ""}`}
            >
                Scorecard
            </button>

            <button
                className={`match-tabs__item ${activeTab === "Commentary" ? "match-tabs__item--active" : ""}`}
            >
                Commentary
            </button>

            <button
                className={`match-tabs__item ${activeTab === "Stats" ? "match-tabs__item--active" : ""}`}
            >
                Stats
            </button>

            <button
                className={`match-tabs__item ${activeTab === "Squads" ? "match-tabs__item--active" : ""}`}
            >
                Squads
            </button>

        </nav>

    );

}

export default MatchTabs;