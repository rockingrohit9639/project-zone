import React from "react";
import Project from "../Project/Project";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";

function Home() {
  return (
    <div className="home">
      <SearchBox />
      <div className="best_project">
        <h1>Best MERN Projects</h1>
        <div className="projects">
          <Project
            title="E-Commerce Website"
            desc=""
            skills={[
              {
                text: "MongoDB",
                css: { backgroundColor: "#f54748" },
              },
              {
                text: "Express",
                css: { backgroundColor: "#7952b3" },
              },
              {
                text: "React",
                css: { backgroundColor: "blue" },
              },
              {
                text: "Node",
                css: { backgroundColor: "green" },
              },
            ]}
            level="Beginner"
          />
          <Project
            title="Online Distance Education System"
            desc=""
            skills={[
              {
                text: "MongoDB",
                css: { backgroundColor: "#f54748" },
              },
              {
                text: "Express",
                css: { backgroundColor: "#7952b3" },
              },
              {
                text: "React",
                css: { backgroundColor: "blue" },
              },
              {
                text: "Node",
                css: { backgroundColor: "green" },
              }]}
            level="Advanced"
          />
          <Project
            title="E-Learning Portal"
            desc=""
            skills={[{
                text: "MongoDB",
                css: { backgroundColor: "#f54748" },
              },
              {
                text: "Express",
                css: { backgroundColor: "#7952b3" },
              },
              {
                text: "React",
                css: { backgroundColor: "blue" },
              },
              {
                text: "Node",
                css: { backgroundColor: "green" },
              }]}
            level="Advanced"
          />
          <Project
            title="Virtual Queue Management System"
            desc=""
            skills={[{
                text: "MongoDB",
                css: { backgroundColor: "#f54748" },
              },
              {
                text: "Express",
                css: { backgroundColor: "#7952b3" },
              },
              {
                text: "React",
                css: { backgroundColor: "blue" },
              },
              {
                text: "Node",
                css: { backgroundColor: "green" },
              }]}
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
            skills={[
              {
                text: "Python",
                css: { backgroundColor: "#eba83a" },
              },
              {
                text: "OpenCV",
                css: { backgroundColor: "brown" },
              }]}
            level="Beginner"
          />
          <Project
            title="Sudoku Solver"
            desc=""
            skills={[{
                text: "Python",
                css: { backgroundColor: "#eba83a" },
              }]}
            level="Advanced"
          />
          <Project
            title="Virtual Assistant"
            desc=""
            skills={[{
                text: "Python",
                css: { backgroundColor: "#eba83a" },
              }]}
            level="Advanced"
          />
          <Project
            title="Automatic Birthdays Mailer"
            desc=""
            skills={[{
                text: "Python",
                css: { backgroundColor: "#eba83a" },
              },
              {
                text: "Django",
                css: { backgroundColor: "#e1701a" },
              }]}
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
            skills={[{
                text: "Javascript",
                css: { backgroundColor: "#022e57" },
              }]}
            level="intermediate"
          />
          <Project
            title="Covid CheckUp Test"
            desc=""
            skills={[{
                text: "Javascript",
                css: { backgroundColor: "#022e57" },
              }]}
            level="Advanced"
          />
          <Project
            title="Music App"
            desc=""
            skills={[{
                text: "Javascript",
                css: { backgroundColor: "#022e57" },
              }]}
            level="Advanced"
          />
          <Project
            title="ID Card Generator"
            desc=""
            skills={[{
                text: "Javascript",
                css: { backgroundColor: "#022e57" },
              }]}
            level="Intermediate"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
