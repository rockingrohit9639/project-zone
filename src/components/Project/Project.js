import React, { useState } from 'react';
import './Project.css';
import share_logo from './../../assets/share.svg';
import ShareProject from '../ShareProject/ShareProject';
import RatingCard from '../RatingCard/RatingCard';

function Project({ title, desc, skills, level, style, rating }) {
  const [shareopen, setshareopen] = useState(false);
  const [showdescr, setshowdesc] = useState(false);
  const shareButtonHandler = () => {
    setshareopen(!shareopen);
  };
  const ReadMoreHandler = () => {
    setshowdesc(!showdescr);
  };
  return (
    <div className="project" style={style && style}>
      <div className="title-flexbox">
        <h3 className="title"> {title}</h3>
        <img
          src={share_logo}
          className="share-img"
          alt="share-logo"
          onClick={shareButtonHandler}
        />
      </div>
      {shareopen ? <ShareProject title={title} description={desc} /> : null}
      {desc.trim() == '' ? null : (
        <div className="descr">
          <p className="description">{showdescr ? desc : desc.slice(0,60)+"..."}</p>
          <h5 className="read-more" onClick={ReadMoreHandler}>
            Read more
          </h5>
        </div>
      )}

      <div className="level">
        <label>Level:- </label>
        <p>{level}</p>
      </div>
      <div className="skills">
        {skills &&
          skills.map((skill, ind) => (
            <div key={ind} style={skill.css} className="skill">
              {skill.text}
            </div>
          ))}
      </div>
      <div>
        <RatingCard rating={rating} />
      </div>
    </div>
  );
}

export default Project;
