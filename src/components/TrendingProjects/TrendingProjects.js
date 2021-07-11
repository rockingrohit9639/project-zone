import React from 'react';
import './TrendingProjects.css';
import star from './../../assets/star.svg';
import Project from '../Project/Project';
import ParticlesBg from 'particles-bg';

function TrendingProjects(props)
{
    return (
        <div className="conatiner" >
            <h1> These projects are not trending projects. This feature is under development. </h1>
            <img src={star}
                className="star-logo"
                alt="star-logo" />
            <ParticlesBg type="thick"
                bg={true}
            />

            <h2 className="best_project--title" > Trending Projects </h2>
            <div className="flex-box" >
                <Project className="project"
                    title="E-Commerce Website"
                    desc=""
                    skills={
                        ["mongodb", "express", "react", "nodejs"]}
                    level="Beginner"
                    rating={5}
                />
                <Project className="project"
                    title="Online Distance Education System"
                    desc=""
                    skills={
                        ["mongodb", "express", "react", "nodejs"]}
                    level="Advance"
                    rating={5}
                />
                <Project className="project"
                    title="E-Learning Portal"
                    desc=""
                    skills={
                        ["mongodb", "express", "react", "nodejs"]}
                    level="Advanced"
                    rating={4}
                />
                <Project className="project"
                    title="Virtual Queue Management System"
                    desc=""
                    skills={
                        ["mongodb", "express", "react", "nodejs"]}
                    level="Advanced"
                    rating={4}
                />
            </div>
        </div>
    );
}

export default TrendingProjects;