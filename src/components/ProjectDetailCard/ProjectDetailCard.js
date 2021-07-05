import React, { useState } from "react";
import "./ProjectDetailCard.css";
import { useDataLayerValues } from "../../datalayer";
import star_logo from "./../../assets/star.svg";
import share_logo from "./../../assets/share.svg";
import ShareProject from "../ShareProject/ShareProject";
import { AddLike } from "./../../axios/instance";
import { toast } from "react-toastify";

import { getSkillColor } from "../../utils";

function ProjectDetailCard()
{
  const [{ ProjectDetails, isAuthenticated }, dispatch] = useDataLayerValues();
  const [shareopen, setshareopen] = useState(false);
  const [likescount,setLikesCount] = useState(ProjectDetails.likes);
  const [liked,setLiked] = useState(false);

  const LikeBtnHandler = async () => {
    if (!isAuthenticated) {
      return toast.error(`You have to login first`);
    }
    
    if(!liked) {
      setLiked(true);setLikesCount(likescount + 1);

      try {
        const data = {
          project_id: ProjectDetails.id,
          likes: likescount + 1,
        };

        const res = await AddLike(data);
        if(!res.data.error)
        {
          const projectdata = {
            ...ProjectDetails,
            likes:likescount + 1,
          };
          dispatch({
            type: "SET_PROJECT_DETAILS",
            ProjectDetails: projectdata,
          });
          toast.success(`${res.data.msg}`);
        }
      } catch (err) {
        if (err.response) {
          toast.error(`${err.response.data.error}`);
          console.log(err.response.data.error);
        }
      }
    }
  };

  const shareButtonHandler = () =>
  {
    setshareopen(!shareopen);
  };

  

  return (
    <div className="details_card">
      <div className="titleBox">
        <h1 className="title_">{ProjectDetails.title}</h1>
        <div className="like-share">
          <i className={(!liked) ? `far fa-heart` : `far fa-heart liked-project`} aria-hidden="true" onClick={LikeBtnHandler}></i>
            {" "}
          <span className={(!liked) ?  `` :`liked-project`}>{likescount}</span>
          <img
          src={share_logo}
          className='share-icon'
          alt='share-logo'
          onClick={shareButtonHandler}
         />
        </div>
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
              <div key={ind} style={{ backgroundColor: getSkillColor(skill) }} className="skill">
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
