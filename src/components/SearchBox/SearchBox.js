import React, { useState, useEffect, useCallback } from "react";
import "./SearchBox.css";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useDataLayerValues } from "../../datalayer";

const useStyles = makeStyles((theme) => ({
  input: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "1rem",
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
  const [{ query }, dispatch] = useDataLayerValues();
  const [querySearch, setQuerySearch] = useState(query);
  const [placeholder, setPlaceholder] = useState("e.g. reactjs (press space to focus then type and select)");
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
    "nodejs",
    "html",
    "css",
    "opencv",
    "c++",
    "c",
    "mern",
    "ml",
    "ai",
    "machine learning",
    "artificial intellegence"
  ] 

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
    fetchProjects(querySearch);
  }

  return (
    <div className="searchBox">
      <div className="input">
        <SearchIcon onClick={fetchProjects} style={{ cursor: "pointer" }} />
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="searchboxinput"
            noOptionsText={'try again and select option from dropdown'}
            options={searchOptions}
            value={querySearch}
            onChange={(event, value) => setQuerySearch(value)}
            freeSolo={false}
            classes={{ option: classes.option }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  placeholder={placeholder}
                  className={classes.input}
                  {...params.inputProps}
                />
              </div>
              )}
            />
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
