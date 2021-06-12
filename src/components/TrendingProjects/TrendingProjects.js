import React from 'react';
import './TrendingProjects.css';
import star from './../../assets/star.svg';
import Project from '../Project/Project';

function TrendingProjects(props) {
  return (
    <div className="conatiner">
      <img src={star} className="star-logo" />
      <h2 className="best_project--title">Trending Projects</h2>
      <div className="flex-box">
        <Project
          title="E-Commerce Website"
          desc="This is a ecommece website which has many facilities like order bucket, payemnt, product ratings any many more. Through this e-commerce we can easily purchase projects of differnt categories at reasonable price"
          skills={['MongoDB', 'Express', 'React', 'Node']}
          level="Beginner"
          rating={5}
        />
        <Project
          title="Online Distance Education System"
          desc="Online Distance Education System is amazing website idea for managing education system espicially distance based education. "
          skills={['MongoDB', 'Express', 'React', 'Node']}
          level="Advance"
          rating={5}
        />
        <Project
          title="E-Learning Portal"
          desc=""
          skills={['MongoDB', 'Express', 'React', 'Node']}
          level="Advanced"
          rating={4}
        />
      </div>
    </div>
  );
}

export default TrendingProjects;
