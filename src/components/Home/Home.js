import React from 'react';
import Project from '../Project/Project';
import './Home.css';
import SearchBox from '../SearchBox/SearchBox';
import StartsIcon from '@material-ui/icons/Stars';
import TrendingProjects from '../TrendingProjects/TrendingProjects';

function Home()
{
  return (
    <div className="home">
      <SearchBox />
      <div className="trending_projects"><TrendingProjects /></div>
      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best MERN Projects
        </h1>
        <div className="projects">
          <Project
            title="E-Commerce Website"
            desc="This is a ecommece website which has many facilities like order bucket, payemnt, product ratings any many more."
            skills={[{
              text: 'MongoDB', 
              css: {backgroundColor: "#02475e"}
            },
            {
              text: 'Express', 
              css: {backgroundColor: "red"}
            },
            {
              text: 'React', 
              css: {backgroundColor: "blue"}
            },
            {
              text: 'Node', 
              css: {backgroundColor: "green"}
            }]}
            level="Beginner"
            rating={4}
          />
          <Project
            title="Online Distance Education System"
            desc=""
            skills={[{
              text: 'MongoDB', 
              css: {backgroundColor: "#02475e"}
            },
            {
              text: 'Express', 
              css: {backgroundColor: "red"}
            },
            {
              text: 'React', 
              css: {backgroundColor: "blue"}
            },
            {
              text: 'Node', 
              css: {backgroundColor: "green"}
            }]}
            level="Advance"
            rating={5}
          />
          <Project
            title="E-Learning Portal"
            desc=""
            skills={[{
              text: 'MongoDB', 
              css: {backgroundColor: "#02475e"}
            },
            {
              text: 'Express', 
              css: {backgroundColor: "red"}
            },
            {
              text: 'React', 
              css: {backgroundColor: "blue"}
            },
            {
              text: 'Node', 
              css: {backgroundColor: "green"}
            }]}
            level="Advanced"
            rating={3}
          />
          <Project
            title="Virtual Queue Management System"
            desc=""
            skills={[{
              text: 'MongoDB', 
              css: {backgroundColor: "#02475e"}
            },
            {
              text: 'Express', 
              css: {backgroundColor: "red"}
            },
            {
              text: 'React', 
              css: {backgroundColor: "blue"}
            },
            {
              text: 'Node', 
              css: {backgroundColor: "green"}
            }]}
            level="Advanced"
            rating={2}
          />
        </div>
      </div>

      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best Python Projects{' '}
        </h1>
        <div className="projects">
          <Project
            title="Facial recognition using Python OpenCV library"
            desc=""
            skills={[
              {
              text: 'Python', 
              css: {backgroundColor: "#ffc93c"}
            },
            {
              text: 'OpenCV', 
              css: {backgroundColor: "brown"}
            }]}
            level="Beginner"
            rating={5}
          />
          <Project
            title="Sudoku Solver"
            desc=""
            skills={[{
              text: 'Python', 
              css: {backgroundColor: "#ffc93c"}
            }]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Virtual Assistant"
            desc=""
            skills={[{
              text: 'Python', 
              css: {backgroundColor: "#ffc93c"}
            }]}
            level="Advanced"
            rating={5}
          />
          <Project
            title="Automatic Birthdays Mailer"
            desc=""
            skills={[{
              text: 'Python', 
              css: {backgroundColor: "#ffc93c"}
            },
            {
              text: 'Django', 
              css: {backgroundColor: "#1eae98"}
            }]}
            level="Intermediate"
            rating={4}
          />
        </div>
        </div>
      

      <div className="best_project">
        <h1 className="best_project--title">
          <StartsIcon /> Best JavaScript Projects{' '}
        </h1>
        <div className="projects">
          <Project
            title="Movie Seat Booking App"
            desc=""
            skills={[{
              text: 'Javascript', 
              css: {backgroundColor: "#206a5d"}
            }]}
            level="intermediate"
            rating={4}
          />
          <Project
            title="Covid CheckUp Test"
            desc=""
            skills={[{
              text: 'Javascript', 
              css: {backgroundColor: "#206a5d"}
            }]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Music App"
            desc=""
            skills={[{
              text: 'Javascript', 
              css: {backgroundColor: "#206a5d"}
            }]}
            level="Advanced"
            rating={4}
          />
          <Project
            title="ID Card Generator"
            desc=""
            skills={[{
              text: 'Javascript', 
              css: {backgroundColor: "#206a5d"}
            }]}
            level="Intermediate"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
