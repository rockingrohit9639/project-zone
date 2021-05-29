import React from "react";
import Project from "../Project/Project";
import "./Home.css";
import client from "../../client";
import SearchBox from "../SearchBox/SearchBox";

var options = {
  size: 3,
  search_fields: { skills: {}, description: {}, name: {} },
};


function Home()
{

  client.search("javascript", options)
    .then(results => console.log(results)).catch(error => console.log(error))

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
