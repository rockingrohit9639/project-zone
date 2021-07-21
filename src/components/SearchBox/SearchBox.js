import React, { useState, useEffect, useCallback } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import { useDataLayerValues } from "../../datalayer";

function SearchBox({ fetchProjects })
{
  const [{ query }, dispatch] = useDataLayerValues();
  const [placeholder, setPlaceholder] = useState("e.g. reactjs (press space to focus)");

  const handleSpaceKeyPress = useCallback( event => {  

    const { keyCode } = event;
    if (keyCode === 32) {
      document.getElementById('searchboxinput').focus();
      setPlaceholder("e.g. reactjs");
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleSpaceKeyPress);

    return () => {
      window.removeEventListener('keydown', handleSpaceKeyPress);
    };
  })

  const setQuery = (e) =>
  {
    dispatch({
      type: "SET_QUERY",
      query: e.target.value.trim(),
    });
  };
  function handleSubmit(e)
  {
    e.preventDefault();
    fetchProjects();
  }

  return (
    <div className="searchBox">
      <div className="input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={setQuery}
            id="searchboxinput"
            placeholder={placeholder}
          />
        </form>
        <SearchIcon onClick={fetchProjects} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default SearchBox;
