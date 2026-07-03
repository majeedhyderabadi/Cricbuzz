import {useState} from "react";

import Header from "../components/Header/Header";
import NVianCommentary from "../components/Commentary/NVianCommentary";
import SearchBar from "../components/Search/SearchBar";


function NVianDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <main className="container">
            <Header />
            <SearchBar
                setSearchTerm={setSearchTerm}
            />
            <NVianCommentary />
        </main>
    );
}

export default NVianDashboard;