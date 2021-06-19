import React, { useState } from 'react';
import './Project.css';
import share_logo from './../../assets/share.svg';
import ShareProject from '../ShareProject/ShareProject';
import RatingCard from '../RatingCard/RatingCard';
import { Link } from 'react-router-dom';
import { useDataLayerValues } from '../../datalayer';
import { getSkillColor } from '../../utils';

function Project({ title, desc, skills, level, style, rating }) {
  const [shareopen, setshareopen] = useState(false);
  const [{ ProjectDetails }, dispatch] = useDataLayerValues();

  const shareButtonHandler = () => {
    setshareopen(!shareopen);
  };

  const ReadMeHandler = () => {
    dispatch({
      type: 'SET_PROJECT_DETAILS',
      ProjectDetails: {
        title: title,
        descr: desc,
        level: level,
        skills: skills,
        rating: rating,
      },
    });
  };
  return (
    <div className='project' style={style && style}>
      <div className='title-flexbox'>
        <h3 className='title'> {title}</h3>
        <img
          src={share_logo}
          className='share-img'
          alt='share-logo'
          onClick={shareButtonHandler}
        />
      </div>
      {shareopen ? <ShareProject title={title} description={desc} /> : null}
      <div className='descr'>
        {desc.trim() == '' ? null : (
          <p className='description'>{desc.slice(0, 60) + '...'}</p>
        )}
        <Link to='/projectdetails'>
          <h5 className='read-more' onClick={ReadMeHandler}>
            Read more
          </h5>
        </Link>
      </div>
      <div className='level'>
        <label>Level:- </label>
        <p>{level}</p>
      </div>

      <div className='skills'>
        {skills &&
          skills.map((skill, ind) => (
            <div key={ind} style={getSkillColor(skill)} className='skill'>
              {skill}
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
