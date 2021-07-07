import React, { useState, useEffect } from "react";
import ProjectDetailCard from "../ProjectDetailCard/ProjectDetailCard";
import "./ProjectDeatils.css";
import ParticlesBg from "particles-bg";
import userImg from "../../assets/user.png";
import moment from "moment";
import { useDataLayerValues } from "./../../datalayer";
import { AddComment, GetSingleProject } from "./../../axios/instance";
import { ToastContainer, toast } from "react-toastify";
import { Link as RouterLink, useParams } from "react-router-dom";
import { BallTriangle } from "react-loading-icons";

function ProjectDetails(props)
{
  const [{ user, ProjectDetails, dashboard, isAuthenticated }, dispatch] =
    useDataLayerValues();
  const [isLoading, setIsLoading] = useState(false);

  const [comment, setcomment] = useState("");
  const { projectid } = useParams();

  useEffect(() =>
  {
    window.scroll(0, 0);
    fetchProject(projectid);
  }, []);

  const fetchProject = async (id) =>
  {
    setIsLoading(true);

    const body = {
      id: id,
    };

    try
    {
      const project = await GetSingleProject(body);

      dispatch({
        type: "SET_PROJECT_DETAILS",
        ProjectDetails: {
          id: project.data._id,
          title: project.data.name,
          descr: project.data.description,
          level: project.data.level,
          skills: project.data.skills,
          rating: project.data.ratings,
          comments: project.data.comments,
        }
      });


    } catch (err)
    {
      console.log(err);
    }

    setIsLoading(false);
  };

  const CommentBtnHandler = async () =>
  {
    if (!isAuthenticated)
    {
      return toast.error(`You have to login first`);
    }

    if (comment.trim() === "")
    {
      return toast.error(`Type a valid comment`);
    }

    const data = {
      project_id: ProjectDetails.id,
      fname: user.fname,
      userimg: dashboard.profile_pic,
      data: comment,
    };

    try
    {
      const comment_add = await AddComment(data);
      const comments_new = comment_add.data.data;
      const projectdata = {
        ...ProjectDetails,
        comments: comments_new,
      };

      setcomment("");
      dispatch({
        type: "SET_PROJECT_DETAILS",
        ProjectDetails: projectdata,
      });

      toast.success(`${ comment_add.data.msg }`);
    } catch (err)
    {
      console.log(err);
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  };

  return (
    <div className="project_details_container">
      <ToastContainer position="bottom-left" />
      <ParticlesBg type="coweb" bg={true} />



      {isLoading ? <div className="loading__details"> <BallTriangle color="#6f6ee1" stroke="#6f6ee1" /></div>
        :
        <ProjectDetailCard
          title={props.title}
          descr={props.descr}
          skills={props.skills}
          level={props.level}
        />}

      <div className="comment_section">
        <div className="comment_user_data">
          <h1> Add Your Suggestion </h1>
          <div className="comment_user">
            <img
              src={dashboard.profile_pic ? dashboard.profile_pic : userImg}
              alt="user_image"
            />

            <h2>{user.fname ? user.fname : "Guest"}</h2>
          </div>

          <div className="comment_inputbox">
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            ></textarea>
          </div>
          <h4 class="comment_btn" onClick={CommentBtnHandler}>
            Comment
          </h4>
        </div>

        <div className="comment_header">
          <p> Comments : {ProjectDetails.comments.length}</p>
        </div>

        <div className="comment_content">
          {ProjectDetails.comments.map((item) => (
            <div className="user_comment">
              <div className="comment_info">
                <div className="comment_user">
                  <img
                    src={
                      dashboard.profile_pic ? dashboard.profile_pic : userImg
                    }
                    alt="user_image"
                  />
                  <h2>{item.fname}</h2>
                </div>
                <p className="comment_timestamp">{item.createdat}</p>
              </div>

              <p className="comment_desc">{item.data}</p>
            </div>
          ))}
          {/* <div className="user_comment">
            <div className="comment_info">
              <div className="comment_user">
                <img src={userImg} alt="user_image" />
                <h2>You</h2>
              </div>
              <p className="comment_timestamp">2days ago</p>
            </div>

            <p className="comment_desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec
              pulvinar molestie urna, mollis mattis nibh cursus vel.
            </p>
          </div>

          <div className="user_comment">
            <div className="comment_info">
              <div className="comment_user">
                <img src={userImg} alt="user_image" />
                <h2>Kanak</h2>
              </div>
              <p className="comment_timestamp">2days ago</p>
            </div>

            <p className="comment_desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec
              pulvinar molestie urna, mollis mattis nibh cursus vel.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
