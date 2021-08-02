import React, { useState, useEffect } from "react";
import ProjectDetailCard from "../ProjectDetailCard/ProjectDetailCard";
import "./ProjectDeatils.css";
import ParticlesBg from "particles-bg";
import Rating from "@material-ui/lab/Rating";
import { useDataLayerValues } from "./../../datalayer";
import { AddComment, UpvoteComment, GetSingleProject } from "./../../axios/instance";
import { ToastContainer, toast } from "react-toastify";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { BallTriangle } from "react-loading-icons";

function ProjectDetails(props)
{
  const [{ user, ProjectDetails, dashboard, isAuthenticated }, dispatch] =
    useDataLayerValues();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setcomment] = useState("");
  const history = useHistory();
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
          rating: project.data.rating,
          likes: project.data.likes,
          comments: project.data.comments,
          github: project.data.github,
          adder_id: project.data.adder_id,
          adder_fname: project.data.adder_fname
        },
      });
    }
    catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
        history.push('/project-not-found');
      }
    }

    setIsLoading(false);
  };
  
  console.log(ProjectDetails.descr);

  const CommentBtnHandler = async () =>
  {
    if (!isAuthenticated)
    {
      return toast.error(`You have to login first`);
    }

    if (comment?.trim() === "")
    {
      return toast.error(`Type a valid comment`);
    }

    const data = {
      project_id: ProjectDetails.id,
      fname: user.fname,
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
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  };

  const UpvoteHandler = async (comment_id, upvotes) =>
  {

    if (!isAuthenticated)
    {
      return toast.error(`You have to login first`);
    }

    try
    {
      const data = {
        project_id: projectid,
        comment_id: comment_id,
        upvotes: upvotes + 1,
      };

      const res = await UpvoteComment(data);
      if (!res.data.error)
      {
        const comments_upvoted = res.data.data;
        const projectdata = {
          ...ProjectDetails,
          comments: comments_upvoted,
        };

        const userdata = {
          ...dashboard,
          comments_upvoted: [...dashboard.comments_upvoted, comment_id],
        };

        dispatch({
          type: "SET_PROJECT_DETAILS",
          ProjectDetails: projectdata,
        });

        dispatch({
          type: "SET_USER_DASHBOARD_DATA",
          dashboard: userdata,
        });

        toast.success(`${ res.data.msg }`);
      }

    } catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }

  }

  return (
    <div className="project_details_container">

      <ToastContainer position="bottom-left" />
      <ParticlesBg type="coweb" bg={true} />

      {isLoading ? (
        <div className="loading__details">
          {" "}
          <BallTriangle color="#6f6ee1" stroke="#6f6ee1" />
        </div>
      ) : (
        <ProjectDetailCard/>
      )}

      <div className="comment_section">
        <div className="comment_user_data">
          <h1> Add Your Suggestion </h1>
          <div className="comment_user">
            <h2>{user.fname ? user.fname : "Guest"}</h2>
          </div>

          <div className="comment_inputbox">
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
            ></textarea>
          </div>
          <h4 className="comment_btn" onClick={CommentBtnHandler}>
            Comment
          </h4>
        </div>

        <div className="comment_header">
          <p> Comments : {ProjectDetails.comments?.length}</p>
        </div>

        <div className="comment_content">
          {ProjectDetails.comments && ProjectDetails.comments.map((comment) => (
            <div className="user_comment" key={comment._id}>
              <div className="comment_info">
                <div className="comment_user">
                  <RouterLink to={`/profile/${ comment.commenter_id }`}>
                    <h2>{comment.fname}</h2>
                  </RouterLink>
                </div>
                <p className="comment_timestamp">{comment.createdat}</p>
              </div>
              <p className="comment_desc">{comment.data}</p>
              <div>
                {comment.upvotes && dashboard.comments_upvoted.indexOf(comment._id) !== -1
                  ?
                  <>
                    <ThumbUpIcon className="thumb_upvote"></ThumbUpIcon>
                    <span className="upvotes upvotes_num">{comment.upvotes}</span>
                  </>
                  :
                  <>
                    <ThumbUpIcon className="thumb"
                      onClick={() => UpvoteHandler(comment._id, comment.upvotes)}>
                    </ThumbUpIcon>
                    <span className="upvotes">{comment.upvotes ? comment.upvotes : " "}</span>
                  </>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
