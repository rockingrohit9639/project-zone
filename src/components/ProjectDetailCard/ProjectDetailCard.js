import React from 'react';
import './ProjectDetailCard.css';
import { useDataLayerValues } from '../../datalayer';
import RatingCard from '../RatingCard/RatingCard';
import star_logo from './../../assets/star.svg'
function ProjectDetailCard(props) {
  const [{ ProjectDetails }] = useDataLayerValues();
  console.log(ProjectDetails);
  return (
    <div className="card">
      <h1 className="title_">{ProjectDetails.title}</h1>
      <p className="desc_">{ProjectDetails.descr}</p>
      <h4 className="level_">{ProjectDetails.level} Level Project</h4>
      <div className="skills_">
        <div className="skills">
          {ProjectDetails.skills &&
            ProjectDetails.skills.map((skill, ind) => (
              <div key={ind} style={skill.css} className="skill">
                {skill.text}
              </div>
            ))}
        </div>
      </div>
      <div className="rate">
        {Array(ProjectDetails.rating)
          .fill()
          .map((_, i) => {
            return (
              <img
                src={star_logo}
                key={i}
                className="star-img"
                alt="star_logo"
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProjectDetailCard;
