import React, { useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import { useDataLayerValues } from "../../datalayer";

function SearchBox({ fetchProjects }) {
  const [{ query }, dispatch] = useDataLayerValues();

  const setQuery = (e) => {
    dispatch({
      type: "SET_QUERY",
      query: e.target.value,
    });
  };
  function handleSubmit(e) {
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
            placeholder="e.g. reactjs"
          />
        </form>
        <SearchIcon onClick={fetchProjects} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default SearchBox;
