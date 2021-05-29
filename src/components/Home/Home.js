import React, { useEffect } from "react";
import Project from "../Project/Project";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";
import { useDataLayerValues } from "../../datalayer";
import { actions } from "../../reducer";

function Home()
{
  
  const [{ }, dispatch] = useDataLayerValues();

  useEffect(() => {
    
    dispatch({
      type: actions.SET_AUTH,
      isAuthenticated: true
    });

  }, [])

  return (
    <div className="home">
      <div className="best_mern">
        
        <SearchBox />
        
        <h1>Best MERN projects</h1>

        <div className="projects">
          <Project
            title="Pattern Variation App"
            desc=""
            skills={["android", "java", "kotlin"]}
            level="beginner"
          />
          <Project
            title="Smart Education App"
            desc=""
            skills={["android", "java", "kotlin"]}
            level="advanced"
          />
          <Project
            title="Fitness Tracker"
            desc=""
            skills={["android", "java", "kotlin"]}
            level="advanced"
          />
          <Project
            title="Class Notes Sharing App"
            desc=""
            skills={["android", "java", "kotlin"]}
            level="advanced"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
