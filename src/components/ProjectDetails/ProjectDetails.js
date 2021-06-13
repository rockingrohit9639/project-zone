import React from 'react';
import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';
import './ProjectDeatils.css';

function ProjectDetails(props) {
  return (
    <div className="conatiner_">
      <ProjectDetailCard
        title={props.title}
        descr={props.descr}
        skills={props.skills}
        level={props.level}
      />
    </div>
  );
}

export default ProjectDetails;
