import {useState} from "react";

import Header from "../components/Header/Header";
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";
import SportTabs from "../components/SportTabs/SportTabs";

function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <main className="container">
            <Header />
            <SearchBar
                setSearchTerm={setSearchTerm}
            />
            <SportTabs/>
            <NVianCommentary />
        </main>
    );
}

export default NVianDashboard;