import { useEffect, useState } from "react";
import "./SearchBar.css";

type SearchBarProps = {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};


function SearchBar({ setSearchTerm }: SearchBarProps ) {

    const [input, setInput] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(input);
        }, 300);

        return () => clearTimeout(timer);
    }, [input, setSearchTerm]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search team, sport..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;