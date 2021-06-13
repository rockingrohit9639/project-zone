import React from "react";
import Project from "../Project/Project";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";
import StartsIcon from "@material-ui/icons/Stars";
import TrendingProjects from "../TrendingProjects/TrendingProjects";

function Home()
{
  return (
    <div className="home">
      <SearchBox />
      <div className="trending_projects">
        <TrendingProjects />
      </div>
      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best MERN Projects
        </h1>
        <div className="projects">
          <Project
            title="E-Commerce Website"
            desc="This is a ecommece website which has many facilities like order bucket, payemnt, product ratings any many more."
            skills={["mongodb", "express", "react", "node"]}
            level="Beginner"
            rating={4}
          />
          <Project
            title="Online Distance Education System"
            desc=""
            skills={["mongodb", "express", "react", "node"]}
            level="Advance"
            rating={5}
          />
          <Project
            title="E-Learning Portal"
            desc=""
            skills={["mongodb", "express", "react", "node"]}
            level="Advanced"
            rating={3}
          />
          <Project
            title="Virtual Queue Management System"
            desc=""
            skills={["mongodb", "express", "react", "node"]}
            level="Advanced"
            rating={2}
          />
        </div>
      </div>

      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best Python Projects{" "}
        </h1>
        <div className="projects">
          <Project
            title="Facial recognition using Python OpenCV library"
            desc=""
            skills={["python", "opencv"]}
            level="Beginner"
            rating={5}
          />
          <Project
            title="Sudoku Solver"
            desc=""
            skills={["python"]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Virtual Assistant"
            desc=""
            skills={["python"]}
            level="Advanced"
            rating={5}
          />
          <Project
            title="Automatic Birthdays Mailer"
            desc=""
            skills={["python", "django"]}
            level="Intermediate"
            rating={4}
          />
        </div>
      </div>

      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best JavaScript Projects{" "}
        </h1>
        <div className="projects">
          <Project
            title="Movie Seat Booking App"
            desc=""
            skills={["javascript"]}
            level="intermediate"
            rating={4}
          />
          <Project
            title="Covid CheckUp Test"
            desc=""
            skills={["javascript"]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Music App"
            desc=""
            skills={["javascript"]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="ID Card Generator"
            desc=""
            skills={["javascript"]}
            level="Intermediate"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
