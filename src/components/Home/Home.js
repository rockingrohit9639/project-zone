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
            desc=""
            skills={['MongoDB', 'Express', 'React', 'Node']}
            level="Beginner"
            rating={4}
          />
          <Project
            title="Online Distance Education System"
            desc=""
            skills={['MongoDB', 'Express', 'React', 'Node']}
            level="Advance"
            rating={5}
          />
          <Project
            title="E-Learning Portal"
            desc=""
            skills={['MongoDB', 'Express', 'React', 'Node']}
            level="Advanced"
            rating={3}
          />
          <Project
            title="Virtual Queue Management System"
            desc=""
            skills={['MongoDB', 'Express', 'React', 'Node']}
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
            skills={['Python', 'OpenCV']}
            level="Beginner"
            rating={5}
          />
          <Project
            title="Sudoku Solver"
            desc=""
            skills={['Python']}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Virtual Assistant"
            desc=""
            skills={['Python']}
            level="Advanced"
            rating={5}
          />
          <Project
            title="Automatic Birthdays Mailer"
            desc=""
            skills={['Python', 'Django']}
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
            skills={['javaScript']}
            level="intermediate"
            rating={4}
          />
          <Project
            title="Covid CheckUp Test"
            desc=""
            skills={['javaScript']}
            level="Advanced"
            rating={4}
          />
          <Project
            title="Music App"
            desc=""
            skills={['javaScript']}
            level="Advanced"
            rating={4}
          />
          <Project
            title="ID Card Generator"
            desc=""
            skills={['javaScript']}
            level="Intermediate"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
