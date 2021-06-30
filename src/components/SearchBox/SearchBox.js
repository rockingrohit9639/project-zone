import React, { useState } from 'react';
import './SearchBox.css';
import SearchIcon from '@material-ui/icons/Search';
import { useDataLayerValues } from "../../datalayer";

function SearchBox({ fetchProjects })
{

  const [ {query}, dispatch ] = useDataLayerValues();

  const setQuery = (e) => {
    dispatch({
      type: "SET_QUERY",
      query: e.target.value,
    });
  }

  return (
    <div className='searchBox'>
      <div className='input'>
        <input
          type='text'
          value={query}
          onChange={setQuery}
          placeholder='e.g. reactjs'
        />
        <SearchIcon
          onClick={fetchProjects}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default SearchBox;
