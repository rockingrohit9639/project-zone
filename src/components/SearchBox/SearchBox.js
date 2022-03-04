import React, { useState, useEffect, useCallback } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from "@material-ui/core/styles";
import { useDataLayerValues } from "../../datalayer";

const useStyles = makeStyles((theme) => ({
  input: {
    textAlign: "center",
    fontWeight: "bold",
  },
  option: {
    color: "#000",
    backgroundColor: "#FFF",
    marginTop: 0,
    padding:"5px 20px",
    '&[data-focus="true"]': {
      backgroundColor: "#5253ED",
      color: "#FFF",
    },
  },
}));

function SearchBox({ fetchProjects })
{
  const classes = useStyles();
  const [querytype, setQueryType] = useState("Skill");
  const [typesSeen ,setTypesSeen ] = useState(false);
  const [{ query }, dispatch] = useDataLayerValues();
  const [querySearch, setQuerySearch] = useState(query);
  const [placeholder, setPlaceholder] = useState("e.g. reactjs (press space to focus)");
  const searchOptions = [ 
    "reactjs",
    "javascript",
    "java",
    "python",
    "frontend",
    "backend",
    "fullstack",
    "flutter",
    "ar",
    "vr",
    "html",
    "css",
    "opencv",
    "c++",
    "c",
    "mern",
    "ml",
    "ai",
    "machine learning",
    "php",
    "django",
    "arduino",
    "iot"
  ] 
  
  // "nodejs",

  const handleTypesSeen = (event) => {
    setTypesSeen(!typesSeen);
  }

  const handleSelect = (event) => {
    setQueryType(event.target.innerText);
    setTypesSeen(!typesSeen);
  }

  const handleSpaceKeyPress = useCallback(event =>
  {
    const { keyCode } = event;
    if (keyCode === 32)
    {
      event.preventDefault();
      document.getElementById('searchboxinput').focus();
      setPlaceholder("e.g. reactjs");
    }
  }, []);

  useEffect(() =>
  {
    window.addEventListener('keydown', handleSpaceKeyPress);

    return () =>
    {
      window.removeEventListener('keydown', handleSpaceKeyPress);
    };
  })

  function handleSubmit(e)
  {
    e.preventDefault();
    dispatch({
      type: "SET_QUERY",
      query: querySearch,
    });
    fetchProjects(querySearch, querytype);
  }

  return (
    <div className="searchBox">
      <div className="input">
        <SearchIcon onClick={fetchProjects} style={{ cursor: "pointer" }} />
        <form onSubmit={handleSubmit} className="search_form">
          <Autocomplete
            id="searchboxinput"
            noOptionsText={'try again and select option from dropdown'}
            options={querytype === 'Skill' ? searchOptions : []}
            value={querySearch}
            onChange={(event, value) => setQuerySearch(value)}
            freeSolo={querytype === 'Name'}
            classes={{ option: classes.option }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={classes.input}
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                  {...params.inputProps}
                />
              </div>
              )}
            />
            <div className="types_dropdown">
              <div className="currtype">
                Search By <p onClick={handleTypesSeen}>{querytype}<ArrowDropDownIcon className="typearrow"/></p>
              </div> 
              {
                typesSeen && 
                <div className="types_overlay">
                  <div className="qtype" value="Skill" onClick={handleSelect}>Skill</div>
                  <div className="qtype" value="Name" onClick={handleSelect}>Name</div>
                </div>
              }
            </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
