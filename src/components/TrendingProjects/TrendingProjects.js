import React from 'react';
import './TrendingProjects.css';
import star from './../../assets/star.svg';
import Project from '../Project/Project';

function TrendingProjects(props) {
  return (
    <div className="conatiner">
      <img src={star} className="star-logo" alt="star-logo" />
      <h2 className="best_project--title">Trending Projects</h2>
      <div className="flex-box">
        <Project
          className="project"
          title="E-Commerce Website"
          desc=""
          skills={["mongodb", "express", "react", "nodejs"]}
          level="Beginner"
          rating={5}
        />
        <Project
          className="project"
          title="Online Distance Education System"
          desc=""
          skills={["mongodb", "express", "react", "nodejs"]}
          level="Advance"
          rating={5}
        />
        <Project
          className="project"
          title="E-Learning Portal"
          desc=""
          skills={["mongodb", "express", "react", "nodejs"]}
          level="Advanced"
          rating={4}
        />
        <Project
          className="project"
          title="Virtual Queue Management System"
          desc=""
          skills={["mongodb", "express", "react", "nodejs"]}
          level="Advanced"
          rating={4}
        />
      </div>
    </div>
  );
}

export default TrendingProjects;
