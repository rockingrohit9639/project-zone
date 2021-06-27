import React, { useState } from 'react';
import './SearchBox.css';
import SearchIcon from '@material-ui/icons/Search';
import { actions } from '../../reducer';
import { useDataLayerValues } from '../../datalayer';
import { useHistory } from 'react-router-dom';

function SearchBox({ setChangedata }) {
  const [{ query }, dispatch] = useDataLayerValues();
  const [searchTerm, setSearchterm] = useState(' ');
  const history = useHistory();
  const handleChange = (e) => {
    dispatch({
      type: actions.SET_QUERY,
      query: e.target.value,
    });
    setChangedata();
  };
  return (
    <div className='searchBox'>
      <div className='input'>
        <input
          type='text'
          value={query}
          onChange={event => {setSearchterm(event.target.value)}}
          placeholder='e.g. reactjs'
        />
        <SearchIcon
          onClick={() => history.push('/projects')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      ======>
      <dl className="dictionary">
                {emojipedia.filter((val) => {
                    if(searchTerm === "") {
                        return val
                    }else if (val.mane.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                    }
                }).map((val) => {
                    return (
                        <div className="user">
                            <p>{val.mane}</p>
                            <p>{val.meaning}</p>
                        </div>
                    )
                })}
          </dl>
          <======= 
    </div>
  );
}

export default SearchBox;
