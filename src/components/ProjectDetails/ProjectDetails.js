import React from 'react';
import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';
import './ProjectDeatils.css';
import ParticlesBg from 'particles-bg';

function ProjectDetails(props) {
    return ( <
        div className = "conatiner_" >
        <
        ParticlesBg type = "color"
        bg = { true }
        />

        <
        ProjectDetailCard title = { props.title }
        descr = { props.descr }
        skills = { props.skills }
        level = { props.level }
        /> < /
        div >
    );
}

export default ProjectDetails;