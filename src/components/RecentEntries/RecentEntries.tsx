import './RecentEntries.css';
import recentEntries from "./RecentMockData";

function RecentEntries() {



    const getBallColor = (event: string) => {
        switch (event.toUpperCase()) {
            case "SIX":
            case "WICKET":
                return "orange";

            case "FOUR":
            case "SINGLE":
            case "DOUBLE":
            case "WIDE":
            default:
                return "blue";
        }
    };

    return (
        <div className="mainComponent">
            <div className="mainHeader">
                <h3>RECENT ENTRIES</h3>
                <p>{recentEntries.length}</p>
            </div>

            <div className="divider"></div>

            <div className="recentList">
                {recentEntries.map((item) => (
                    <div className="entry" key={item.id}>
                        <div className="content">
                            <div className="subContent">
                                <div className="contentHeader">
                                    <div className={`playerBall ${getBallColor(item.event)}`}></div>

                                    <div className="textContainer">
                                        <p className="playerText">
                                            <strong>{item.player}</strong> · {item.event}
                                        </p>
                                        <span className="time">{item.time}</span>
                                    </div>
                                </div>

                                <button className="close-btn">×</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentEntries
