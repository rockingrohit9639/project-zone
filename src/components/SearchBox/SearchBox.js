import React, { useState } from 'react';
import "./SearchBox.css";
import SearchIcon from '@material-ui/icons/Search';
function SearchBox()
{
    const [query, setQuery] = useState("");

    const handleSearch = () =>
    {
        console.log(query);
    }
    return (
        <div className="searchBox">
            <div className="input">
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. reactjs" />
                <SearchIcon onClick={handleSearch} style={{ cursor: "pointer" }} />
            </div>
        </div>
    )
}

export default SearchBox;
