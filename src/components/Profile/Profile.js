import React, { useState, useEffect } from "react";
import profileavatar from "./../../assets/user.png";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { usePalette } from "react-palette";
import { useDataLayerValues } from "../../datalayer";
import { GetUserProfile, UpdateUserData, sendverifyemail } from "../../axios/instance";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Puff, Oval } from "react-loading-icons";
import { getSkillColor } from "../../utils";
import "./Profile.css";

const Profile = () =>
{
  const [{ dashboard, user, isemailverified }, dispatch] = useDataLayerValues();
  const [ modalVisibility, setModalVisibility ] = useState("false");
  const [ isLoading, setIsLoading ] = useState(true);
  const { data } = usePalette(dashboard.profile_pic);
  const history = useHistory();
  const { profileid } = useParams();

  useEffect(() =>
  {
    window.scroll(0, 0);
    fetchProfile(profileid);
  }, [profileid]);

  const [fields, setFields] = useState({
    fname: "",
    lname: "",
    profileimg: "",
    githublink:  "",
    linkedinlink: "",
    fblink: "",
    bio: "",
    descr: "",
  });
  const { fname, lname, githublink, linkedinlink, fblink, bio, descr } = fields;

  const fetchProfile = async (id) =>
  {
    setIsLoading(true);

    const body = {
      id: id,
    };

    try
    {
      const user = await GetUserProfile(body);

      const dashboard_data = {
        ...dashboard,
        id: user.data._id,
        fname: user.data.firstname,
        lname: user.data.lastname,
        email: user.data.email,
        bio: user.data.profile.bio,
        description: user.data.profile.description,
        profile_pic: user?.data?.profile?.profile_pic && user.data.profile.profile_pic,
        projectones: user.data.profile.projectones,
        projects_added: user.data.profile.projects_added,
        projects_liked: user.data.profile.projects_liked,
        projects_rated: user.data.profile.projects_rated,
        badges: user.data.profile.badges,
        social_links: user.data.profile.social_links,
        created_at: user.data.created_at,
      };
      
      dispatch({
        type: "SET_USER_DASHBOARD_DATA",
        dashboard: dashboard_data,
      });

      if(profileid === user.data._id)
        {
          setFields({
            fname: user.data.firstname,
            lname: user.data.lastname,
            profileimg: user?.data?.profile?.profile_pic && user.data.profile.profile_pic,
            githublink: user.data.profile.social_links.github,
            linkedinlink: user.data.profile.social_links.linkdin,
            fblink: user.data.profile.social_links.facebook,
            bio: user.data.profile.bio,
            descr:  user.data.profile.description,
          })
        }
       
    } 
    catch (err) {
      if (err.response) {
        toast.error(`${err.response.data.error}`);
        history.push('/user-not-found');   
      }
    }
  
    setIsLoading(false);
    
  };


  const toggleModalVisibility = () =>
  {
    setModalVisibility(!modalVisibility);
  };

  const handleChange = (e) =>
  {
    const { name, value } = e.target;
    setFields((prevState) =>
    {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlechnageInput = async (e) =>
  {
    console.log(e.target.files);
    const basse64 = await convertBase64(e.target.files[0]);
    setFields((prevState) =>
    {
      return {
        ...prevState,
        profileimg: basse64,
      };
    });
  };

  const handleSubmit = (e) =>
  {
    setIsLoading(true);

    e.preventDefault();
    if (bio === "")
    {
      toast.error("Please enter your bio   ");
      setIsLoading(false);
    } else if (descr === "")
    {
      toast.error("Please enter description");
      setIsLoading(false);
    } else if (fname === "")
    {
      toast.error("Please enter valid firstname");
      setIsLoading(false);
    } else if (lname === "")
    {
      toast.error("Please enter valid lastname");
      setIsLoading(false);
    } else
    {
      const data = {
        firstname: fields.fname,
        lastname: fields.lname,
        email: user.email,
        profile: {
          bio: fields.bio,
          description: fields.descr,
          profile_pic: fields.profileimg,
          projectones: dashboard.projectones,
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

      updatedata(data);
      toast.success("Profile updated");
      setIsLoading(false);
    }
  };

  const convertBase64 = (file) =>
  {
    return new Promise((resolve, reject) =>
    {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () =>
      {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) =>
      {
        reject(error);
      };
    });
  };

  const updatedata = async (data) =>
  {
    const userdata = {
      ...user,
      fname: data.firstname,
      lname: data.lastname,
    };
    const dashboard_data = {
      ...dashboard,
      bio: data.profile.bio,
      description: data.profile.description,
      profile_pic: data.profile.profile_pic,
      social_links: data.profile.social_links,
    };

    const maindata = {
      data: data,
    };
    
    try
    {
      await UpdateUserData(maindata);

      dispatch({
        type: "SET_USER",
        user: userdata,
      });
      dispatch({
        type: "SET_USER_DASHBOARD_DATA",
        dashboard: dashboard_data,
      });

      toggleModalVisibility();

    } catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
        setIsLoading(false);
      }
    }
  };

  const emailVerifyBtn = async () =>
  {
    try
    {
      const res = await sendverifyemail();
      if (res.status === 200)
      {
        window.alert(res.data.msg);
        toast.success(res.data.msg);
      }
    } catch (err)
    {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  };

  return (
  <>
    <ToastContainer position="bottom-center" />
    {isLoading ? 
      <div className="loading_indicator profile_loading">
        <Oval stroke={"#6f6ee1"} className="profile_oval"/>
        <p> Fetching Profile Details </p>
      </div> 
    :
    <>
    <div className="profile_wrapper">
      <div className="person_card">
        <div className="card_top" style={{ backgroundColor: data?.vibrant }}>
          {dashboard.profile_pic === "" ? (
            <img src={profileavatar} alt="user_profile_img" />
          ) : (
            <img src={dashboard.profile_pic} alt="user_profile_img" />
          )}
        </div>
        <div className="card_content">
          <h1>{dashboard.fname + " " + dashboard.lname}</h1>
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
          <h3>Projectones : {dashboard.projectones}</h3>
          {(dashboard.id === user.userid) ?
          <>
            <button
              className="editbtn"
              onClick={() =>
              {
                toggleModalVisibility();
              }}
            >
              Edit Profile
            </button>
            <RouterLink to="/addnew" className="addnewlink">
              <button className="addnewbtn">Add New Project</button>
            </RouterLink>
            {isemailverified ? (
              <div className="email_verified_msg">
                <strong>Email Verified</strong> <CheckCircleIcon />
              </div>
            ) : (
              <button className="editbtn" onClick={emailVerifyBtn}>
                Verify Email
              </button>
            )}
          </>
          : null
          }
        </div>
      </div>
      <div className="content_right">
        <div className="email_descr">
          <h3> {dashboard.email} </h3>
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
              {dashboard.projects_added.map((project, i) =>
              {
                return (
                  <li key={i}>
                    <i className="fa fa-circle"></i>
                    {project}
                  </li>
                );
              })}
            </ul>
          ) : (
            <i>No Projects added </i>
          )}
          <h2>Badges</h2>
          {(dashboard.badges && dashboard.badges.length > 0) ? (
            <div className="badges_list">
              {dashboard.badges.map((badge, i) =>
              {
                return (
                  <div className="badge_container" key={i}>
                    <i 
                      className={badge.badge_description.split(' ').slice(0,1).includes('Liked') ? `fa fa-heart` 
                                : badge.badge_description.split(' ').slice(0,1).includes('Rated') ? `fa fa-star`
                                : `fa fa-certificate` }
                      style={{color: getSkillColor(badge.title.split(' ').slice(0,1).join(' '))}}>
                    </i>
                    <h2>{badge.title}</h2>
                    <p>{badge.badge_description}</p>
                    <span>Earned on {badge.earnedat.split(' ').slice(0,2).join(' ')}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <i>No Badges Won </i>
          )}
        </div>
      </div>
      {(dashboard.id === user.userid) ? <> 
      <div
        className={`overlay ${ modalVisibility && "overlay_hidden" }`}
        onClick={() => toggleModalVisibility()}
      ></div>
      <form
        className={`editmodal ${ modalVisibility && "editmodal_hidden" }`}
        onSubmit={handleSubmit}
      >
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
                  className="image-upload"
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

          <div className="btn_loader">
            <button type="submit" className="left_submit">
              Submit
            </button>

            {isLoading ? <Puff stroke="#6f6ee1" fill="#6f6ee1" width="30" height="90" /> : null}
          </div>

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
      </> : null
      }
    </div>
    </> 
    }
    </>
  );
};

export default Profile;
