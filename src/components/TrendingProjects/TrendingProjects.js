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
          level="Beginner"
          rating={5}
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
          rating={4}
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
          rating={4}
        />
      </div>
    </div>
  );
}

export default TrendingProjects;
