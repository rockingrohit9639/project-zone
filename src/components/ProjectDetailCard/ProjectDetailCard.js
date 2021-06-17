import React, { useState } from "react";
import "./ProjectDetailCard.css";
import { useDataLayerValues } from "../../datalayer";
import star_logo from "./../../assets/star.svg";
import share_logo from "./../../assets/share.svg";

import ShareProject from "../ShareProject/ShareProject";

import { getSkillColor } from "../../utils";

function ProjectDetailCard()
{
  const [{ ProjectDetails }] = useDataLayerValues();
  const [shareopen, setshareopen] = useState(false);

  const shareButtonHandler = () =>
  {
    setshareopen(!shareopen);
  };

  return (
    <div className="card">
      <div className="titleBox">
      <h1 className="title_">{ProjectDetails.title}</h1>
      <img
          src={share_logo}
          className='share-icon'
          alt='share-logo'
          onClick={shareButtonHandler}
        />
      </div>
      {shareopen ? <ShareProject title={ProjectDetails.title} description={ProjectDetails.descr} /> : null}
      <h4 className="level_">{ProjectDetails.level} Level</h4>
      <p className="desc_">
        {ProjectDetails.descr}
      </p>
      <div className="card-footer_">
        <div className="skills_">
          {ProjectDetails.skills &&
            ProjectDetails.skills.map((skill, ind) => (
              <div key={ind} style={getSkillColor(skill)} className="skill">
                {skill}
              </div>
            ))}
        </div>
        <div className="rate">
          {Array(ProjectDetails.rating)
            .fill()
            .map((_, i) =>
            {
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
    </div>
  );
}

export default ProjectDetailCard;
