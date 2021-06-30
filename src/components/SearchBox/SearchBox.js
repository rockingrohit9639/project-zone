import React, { useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import { actions } from "../../reducer";
import { useDataLayerValues } from "../../datalayer";
import { useHistory } from "react-router-dom";

function SearchBox({ setChangedata }) {
  const [{ query }, dispatch] = useDataLayerValues();
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({
      type: actions.SET_QUERY,
      query: e.target.value,
    });
    setChangedata();
  };
  return (
    <div className="searchBox">
      <div className="input">
        <form onSubmit={() => history.push("/projects")}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="e.g. reactjs"
          />
        </form>
        <SearchIcon
          onClick={() => history.push("/projects")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default SearchBox;
