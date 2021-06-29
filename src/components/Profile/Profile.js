import React, { useState } from "react";
import profileavatar from "./../../assets/user.png";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { usePalette } from "react-palette";
import "./Profile.css";
import { useDataLayerValues } from "../../datalayer";
import { UpdateUserData } from "../../axios/instance";
import { setAuthToken } from "../../utils";

const Profile = () => {
  const history = useHistory();
  const [{ dashboard, user }, dispatch] = useDataLayerValues();
  console.log(dashboard);
  const { data } = usePalette(profileavatar);
  const [modalVisibility, setModalVisibility] = useState("false");
  const [fields, setFields] = useState({
    fname: user.fname,
    lname: user.lname,
    profileimg: "",
    githublink: "",
    linkedinlink: "",
    fblink: "",
    bio: "",
    descr: "",
  });
  const { fname, lname, githublink, linkedinlink, bio, descr, fblink } = fields;

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlechnageInput = async (e) => {
    console.log(e.target.files);
    const basse64 = await convertBase64(e.target.files[0]);
    setFields((prevState) => {
      return {
        ...prevState,
        profileimg: basse64,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bio === "") {
      toast.error("Please enter your bio   ");
    } else if (descr === "") {
      toast.error("Please enter description");
    } else if (fname === "") {
      toast.error("Please enter valid firstname");
    } else if (lname === "") {
      toast.error("Please enter valid lastname");
    } else {
      const data = {
        firstname: fields.fname,
        lastname: fields.lname,
        email: user.email,
        profile: {
          bio: fields.bio,
          description: fields.descr,
          profile_pic: fields.profileimg,
          project_stones: dashboard.project_stones,
          projects_added: dashboard.projects_added,
          badges: dashboard.badges,
          social_links: {
            github: fields.githublink,
            linkdin: fields.linkedinlink,
            facebook: fields.fblink,
          },
        },
        created_at: dashboard.created_at,
      };
      clearFields();
      updatedata(data);
    }
  };

  const clearFields = () => {
    setFields({
      profileimg: "",
      githublink: "",
      linkedinlink: "",
      fblink: "",
      bio: "",
      descr: "",
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const updatedata = async (data) => {
    const userdata = {
      ...user,
      fname: data.firstname,
      lname: data.lastname,
    };
    const dashboarddata = {
      ...dashboard,
      bio: data.profile.bio,
      description: data.profile.description,
      profile_pic: data.profile.profile_pic,
      social_links: data.profile.social_links,
    };

    const maindata = {
      data: data,
    };
    try {
      const user = await UpdateUserData(maindata);
      console.log("1st");
      dispatch({
        type: "SET_USER",
        user: userdata,
      });
      console.log("2st");
      dispatch({
        type: "SET_USER_DASHBOARD_DATA",
        dashboard: dashboarddata,
      });
      console.log("end");
      toggleModalVisibility();
    } catch (err) {
      if (err.response) {
        toast.error(`${err.response.data.error}`);
      }
    }
  };

  console.log(dashboard.social_links);

  return (
    <div className="profile_wrapper">
      <div className="person_card">
        <div className="card_top">
          {dashboard.profile_pic === "" ? (
            <img src={profileavatar} alt="user_profile_img" />
          ) : (
            <img src={dashboard.profile_pic} alt="user_profile_img" />
          )}
        </div>
        <div className="card_content">
          <h1>{user.fname + " " + user.lname}</h1>
          <h3>{dashboard.bio === "" ? <i>No bio set</i> : dashboard.bio}</h3>
          <div className="social_icons">
            {dashboard.social_links ? (
              <>
                {" "}
                {!dashboard.social_links.github == "" ? (
                  <a
                    href={dashboard.social_links.github}
                    target="_blank"
                    className="githublink"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                ) : null}
                {!dashboard.social_links.linkdin == "" ? (
                  <a
                    href={dashboard.social_links.linkdin}
                    target="_blank"
                    className="linkedinlink"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                ) : null}
                {!dashboard.social_links.facebook == "" ? (
                  <a
                    href={dashboard.social_links.facebook}
                    target="_blank"
                    className="facebooklink"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                ) : null}
              </>
            ) : null}
          </div>
          <h2>{dashboard.project_stones}</h2>
          <button
            className="editbtn"
            onClick={() => {
              toggleModalVisibility();
            }}
          >
            Edit Profile
          </button>
          <RouterLink to="/addnew" className="addnewlink">
            <button className="addnewbtn">Add New Project</button>
          </RouterLink>
        </div>
      </div>
      <div className="content_right">
        <div className="email_descr">
          <h3> {user.email} </h3>
          <p>
            {dashboard.description === "" ? (
              <i>No Description Added</i>
            ) : (
              dashboard.description
            )}
          </p>
        </div>
        <div className="projects_badges">
          <h2>Projects Added</h2>
          {dashboard.projects_added.length > 0 ? (
            <ul className="projects_list">
              {dashboard.projects_added.map((project, i) => {
                return (
                  <li key={i}>
                    <i className="fa fa-circle"></i>
                    {project}
                  </li>
                );
              })}
            </ul>
          ) : (
            <i>No Projects added by You</i>
          )}
          <h2>Badges</h2>
          {dashboard.badges.length > 0 ? (
            <div className="badges_list">
              {dashboard.badges.map((badge, i) => {
                return (
                  <div className="badge_container" key={i}>
                    <i className="fa fa-medal"></i>
                    <h2>{badge.title}</h2>
                    <p>{badge.badge_description}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <i>No Badges Won By You</i>
          )}
        </div>
      </div>
      <div
        className={`overlay ${modalVisibility && "overlay_hidden"}`}
        onClick={() => toggleModalVisibility()}
      ></div>
      <form
        className={`editmodal ${modalVisibility && "editmodal_hidden"}`}
        onSubmit={handleSubmit}
      >
        <ToastContainer position="bottom-center" />
        <div className="editmodal_left ">
          <div className="img_container">
            {fields.profileimg === "" ? (
              <img src={profileavatar} alt="user_profile_img" />
            ) : (
              <img src={fields.profileimg} alt="user_profile_img" />
            )}
            <div className="img_overlay">
              <i className="fas fa-edit">
                <input
                  name="profileimg"
                  class="image-upload"
                  type="file"
                  onChange={handlechnageInput}
                />
              </i>
            </div>
          </div>

          <div className="social_info ">
            <i className="fab fa-github"></i>
            <input
              className="social_input"
              name="githublink"
              value={githublink}
              onChange={handleChange}
              placeholder="github link"
            ></input>
          </div>
          <div className="social_info">
            <i className="fab fa-linkedin"></i>
            <input
              className="social_input"
              name="linkedinlink"
              value={linkedinlink}
              onChange={handleChange}
              placeholder="linkdin link"
            ></input>
          </div>
          <div className="social_info">
            <i className="fab fa-facebook"></i>
            <input
              className="social_input"
              name="fblink"
              value={fblink}
              onChange={handleChange}
              placeholder="facebook link"
            ></input>
          </div>
          <button type="submit" className="left_submit">
            Submit
          </button>
        </div>
        <div className="editmodal_right">
          <div className="forminput">
            <label htmlFor="email">
              Firstname<span>*</span>
            </label>
            <input
              type="text"
              id="fname"
              placeholder="Enter your firstname"
              name="fname"
              value={fname}
              className="edit_input"
              onChange={handleChange}
            />
          </div>
          <div className="forminput">
            <label htmlFor="email">
              Lastname<span>*</span>
            </label>
            <input
              type="lname"
              id="lname"
              placeholder="Enter your Lastname"
              name="lname"
              value={lname}
              className="edit_input"
              onChange={handleChange}
            />
          </div>
          <div className="forminput">
            <label htmlFor="email">
              Bio<span>*</span>
            </label>
            <input
              type="text"
              id="profession"
              placeholder="Enter your Bio"
              name="bio"
              value={bio}
              className="edit_input"
              onChange={handleChange}
            />
          </div>
          <div className="forminput">
            <label htmlFor="email">
              Description<span>*</span>
            </label>
            <textarea
              id="descr"
              placeholder="Tell us something about yourself"
              name="descr"
              value={descr}
              rows="6"
              className="edit_input"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="right_submit">
            Submit
          </button>
        </div>
        <div
          className="editmodal_closebar"
          onClick={() => toggleModalVisibility()}
        >
          <i className="fa fa-times"></i>
        </div>
      </form>
    </div>
  );
};

export default Profile;
