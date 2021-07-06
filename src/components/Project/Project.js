import React, { useState } from "react";
import "./Project.css";
import share_logo from "./../../assets/share.svg";
import cardimg from "./../../assets/cardtop.svg";
import ShareProject from "../ShareProject/ShareProject";
import RatingCard from "../RatingCard/RatingCard";
import { Link } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { AddLike } from "./../../axios/instance";
import { getSkillColor } from "../../utils";
import { toast } from "react-toastify";

function Project({
  title,
  desc,
  skills,
  level,
  style,
  rating,
  likes,
  id,
  comments,
}) {
  const [shareopen, setshareopen] = useState(false);
  const [likescount,setLikesCount] = useState(likes);
  const [liked,setLiked] = useState(false);
  const [{ ProjectDetails , isAuthenticated}, dispatch] = useDataLayerValues();
  const shareButtonHandler = () => {
    setshareopen(!shareopen);
  };

  const LikeBtnHandler = async () => {
    if (!isAuthenticated) {
      return toast.error(`You have to login first`);
    }
    
    if(!liked) {
      setLiked(true);setLikesCount(likescount + 1);

      try {
        const data = {
          project_id: id,
          likes: likescount + 1,
        };

        const res = await AddLike(data);
        if(!res.data.error)
        {
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
  
  return (
    <div className="project" style={style && style} onDoubleClick={LikeBtnHandler}>
      <div className="cardimg-box">
        <img src={cardimg} className="cardimg" alt="card-image" />
      </div>
      <div className="card-content">
        <div className="title-flexbox">
          <h3 className="title"> {title}</h3>
          <img
            src={share_logo}
            className="share-img"
            alt="share-logo"
            onClick={shareButtonHandler}
          />
          {shareopen ? <ShareProject title={title} description={desc} /> : null}
        </div>
        <div className="descr">
          {desc.trim() == "" ? null : (
            <p className="description">{desc.slice(0, 100) + "..."}</p>
          )}
          <Link to={`/projectdetails/${id}`}>
            <h5 className="read-more">Read more</h5>
          </Link>
        </div>

        <div className="level">
          <label>Level - </label>
          <p>{level}</p>
        </div>

        <div className="likebox">
          <i className={(!liked) ? `far fa-heart` : `far fa-heart liked-project`} aria-hidden="true" onClick={LikeBtnHandler}></i>
            {" "}
          <span className={(!liked) ?  `` :`liked-project`}>{likescount}</span>
        </div>
        <div className="skills">
          {skills &&
            skills.map((skill, ind) => (
              <div
                key={ind}
                style={{ backgroundColor: getSkillColor(skill) }}
                className="skill"
              >
                {skill}
              </div>
            ))}
        </div>
        <div>
          <RatingCard rating={rating} />
        </div>
      </div>
    </div>
  );
}

export default Project;
