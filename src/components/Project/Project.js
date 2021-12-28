import React, { useState } from "react";
import "./Project.css";
import share_logo from "./../../assets/share.svg";
import cardimg from "./../../assets/cardtop.svg";
import ShareProject from "../ShareProject/ShareProject";
import RatingCard from "../RatingCard/RatingCard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { GitHub } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDataLayerValues } from "../../datalayer";
import { AddLike, AddBadge } from "./../../axios/instance";
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
  github,
}) {
  const [{ dashboard, ProjectDetails, isAuthenticated }, dispatch] =
    useDataLayerValues();
  const [shareopen, setshareopen] = useState(false);
  const [likescount, setLikesCount] = useState(likes);
  const [liked, setLiked] = useState(
    dashboard.projects_liked?.indexOf(id) !== -1
  );

  const shareButtonHandler = () => {
    setshareopen(!shareopen);
  };

  const LikeBtnHandler = async () => {
    if (!isAuthenticated) {
      return toast.error(`You have to login first`);
    }

    if (!liked) {
      setLiked(true);
      setLikesCount(likescount + 1);

      try {
        const data = {
          project_id: id,
          likes: likescount + 1,
        };

        const res = await AddLike(data);
        if (!res.data.error) {
          const userdata = {
            ...dashboard,
            projects_rated: [...dashboard.projects_rated, id],
          };

          dispatch({
            type: "SET_USER_DASHBOARD_DATA",
            dashboard: userdata,
          });

          toast.success(`${res.data.msg}`);
        }

        let badgedata = {};
        switch (dashboard.projects_liked.length + 1) {
          case 10:
            badgedata = {
              title: "Bronze in liking",
              badge_description: "Liked 10+ projects",
            };
            break;
          case 50:
            badgedata = {
              title: "Silver in liking",
              badge_description: "Liked 50+ projects",
            };
            break;
          case 100:
            badgedata = {
              title: "Gold in liking",
              badge_description: "Liked 100+ projects",
            };
            break;
        }

        if (Object.keys(badgedata).length !== 0) {
          const res = await AddBadge(badgedata);
          if (!res.data.error) {
            const userdata = {
              ...dashboard,
              badges: [...dashboard.badges, res.data.data],
            };

            dispatch({
              type: "SET_USER_DASHBOARD_DATA",
              dashboard: userdata,
            });

            toast.success(`${res.data.msg}`);
          }
        }
      } catch (err) {
        if (err.response) {
          toast.error(`${err.response.data.error}`);
        }
      }
    }
  };

  return (
    <div
      className="project"
      style={style && style}
      onDoubleClick={LikeBtnHandler}
    >
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
          {shareopen ? (
            <ShareProject id={id} title={title} description={desc} />
          ) : null}
        </div>
        <div className="descr">
          {desc.trim() == "" ? null : (
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: desc.slice(0, 100) + "..." }}
            ></div>
          )}

          <Link to={`/projectdetails/${id}`}>
            <h5 className="read-more">Read more</h5>
          </Link>
        </div>

        <div className="level">
          <label>Level - </label>
          <p>{level}</p>
        </div>

        <div className="rating_div">
          <div className="like-share like-box">
            <FavoriteIcon
              className={!liked ? "heart" : "liked-heart"}
              onClick={LikeBtnHandler}
            ></FavoriteIcon>{" "}
            <span className={!liked ? "" : "liked-heart"}>{likescount}</span>
          </div>
          {github ? (
            <a style={{ color: "black" }} href={github}>
              <GitHub />{" "}
            </a>
          ) : null}
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
