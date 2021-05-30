import React from "react";
import Project from "../Project/Project";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";


function Home()
{

  return (
    <div className="home">
    <SearchBox />
      <div className="best_project">
        <h1>Best MERN Projects</h1>
        <div className="projects">
          <Project
            title="E-Commerce Website"
            desc=""
            skills={["MongoDB", "Express", "React", "Node"]}
            level="Beginner"
          />
          <Project
            title="Online Distance Education System"
            desc=""
            skills={["MongoDB", "Express", "React", "Node"]}
            level="Advanced"
          />
          <Project
            title="E-Learning Portal"
            desc=""
            skills={["MongoDB", "Express", "React", "Node"]}
            level="Advanced"
          />
          <Project
            title="Virtual Queue Management System"
            desc=""
            skills={["MongoDB", "Express", "React", "Node"]}
            level="Advanced"
          />
        </div>
      </div>

      <div className="best_project">
        <h1>Best Python Projects </h1>
        <div className="projects">
          <Project
            title="Facial recognition using Python OpenCV library"
            desc=""
            skills={["Python", "OpenCV"]}
            level="Beginner"
          />
          <Project
            title="Sudoku Solver"
            desc=""
            skills={["Python"]}
            level="Advanced"
          />
          <Project
            title="Virtual Assistant"
            desc=""
            skills={["Python"]}
            level="Advanced"
          />
          <Project
            title="Automatic Birthdays Mailer"
            desc=""
            skills={["Python","Django"]}
            level="Intermediate"
          />
        </div>
      </div>

        <div className="best_project">
          <h1>Best JavaScript Projects </h1>
          <div className="projects">
            <Project
              title="Movie Seat Booking App"
              desc=""
              skills={["javaScript"]}
              level="intermediate"
            />
            <Project
              title="Covid CheckUp Test"
              desc=""
              skills={["javaScript"]}
              level="Advanced"
            />
            <Project
              title="Music App"
              desc=""
              skills={["javaScript"]}
              level="Advanced"
            />
            <Project
              title="ID Card Generator"
              desc=""
              skills={["javaScript"]}
              level="Intermediate"
            />
          </div>
      </div>
    </div>
  );
}

export default Home;
