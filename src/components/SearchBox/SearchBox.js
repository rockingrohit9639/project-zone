import React, { useState } from 'react';
import './SearchBox.css';
import SearchIcon from '@material-ui/icons/Search';
import { actions } from '../../reducer';
import { useDataLayerValues } from '../../datalayer';
import { useHistory } from 'react-router-dom';

function SearchBox() {
  const [{ query }, dispatch] = useDataLayerValues();
  const history = useHistory();
  const [isChange, setChange] = useState(true);

  const handleChange = (e) => {
    dispatch({
      type: actions.SET_QUERY,
      query: e.target.value,
      isQueryChange: isChange,
    });
    console.log(isChange);
    setChange(true);
    console.log(isChange);
  };
  return (
    <div className='searchBox'>
      <div className='input'>
        <input
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='e.g. reactjs'
        />
        <SearchIcon
          onClick={() => history.push('/projects')}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default SearchBox;
