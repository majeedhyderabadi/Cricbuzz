import '../SportTabs/SportTabs.css';

const SportTabs = () => {

    // Store all sports in a constant array
    const sportsCategories = [
        "All Sports",
        "Cricket",
        "Football",
        "Cycling",
        "Chess",
        "Carrom",
    ];

    return (
        <section className='sports-tabs'>

            
            {sportsCategories.map((sport, index) => (
                <button
                    key={index}
                    className={`sports-tabs__button ${index === 0 ? "active" : ""}`}
                >
                    {sport}
                </button>
            ))}

        </section>
    );
}

export default SportTabs;

