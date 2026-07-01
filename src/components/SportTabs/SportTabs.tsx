import "./SportTabs.css";

function SportTabs() {

    return (

        <section className="sports-tabs">

            <button className="sports-tabs__button active">
                All Sports
            </button>

            <button className="sports-tabs__button">
                Cricket
            </button>

            <button className="sports-tabs__button">
                Football
            </button>

            <button className="sports-tabs__button">
                Cycling
            </button>

            <button className="sports-tabs__button">
                Chess
            </button>

            <button className="sports-tabs__button">
                Carrom
            </button>

        </section>

    );

}

export default SportTabs;