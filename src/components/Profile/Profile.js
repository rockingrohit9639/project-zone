import React, { useState } from 'react';
import profileavatar from './../../assets/profileavatar.jpg';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { usePalette } from "react-palette";
import "./Profile.css";

const projects = [
    'Whatsapp Clone',
    'E - commerce Website',
    'Online Code Editoe',
    'Slack Clone'
];

const badges = [
    {
        name: 'The Booster',
        for: 'Added 10+ projects'
    },
    {
        name: 'Helping Hand',
        for: 'Added 10+ enhancements'
    }
];

const Profile = () => {
    
    const { data } = usePalette(profileavatar);
    const [modalVisibility,setModalVisibility] = useState("false");
    const [fields,setFields] = useState({
        githublink:'',
        linkedinlink:'',
        fblink:'',
        name:'',
        profession:'',
        bio:''
    })
    const { githublink,linkedinlink,fblink,name,profession,bio } = fields;

    const toggleModalVisibility  = () => {
        setModalVisibility(!modalVisibility);
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            toast.error('Please enter your Name ');
          } else if (profession === '') {
            toast.error('Please enter your Profession ');
          } else if (bio === '') {
            toast.error('Please enter bio');
          } else {
            console.log(fields);
            clearFields();
          }
    }

    const clearFields = () => {
        setFields({
            githublink:'',
            linkedinlink:'',
            fblink:'',
            name:'',
            profession:'',
            bio:''
        });
    }


    return (
        <div className="profile_wrapper">
            <div className="person_card">
                <div className="card_top" style={{ backgroundColor: data?.vibrant }}>
                    <img src={profileavatar} alt="Your Profile Avatar" />
                </div>
                <div className="card_content">
                    <h1>Shwet Khatri</h1>
                    <h3>Software Engineer</h3>
                    <div className="social_icons">
                        <a href="https://github.com/" target="_blank" rel="noreferrer" className="githublink">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="linkedinlink">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="facebooklink">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                    <h2>Projectones : 800</h2>
                    <button className="editbtn" onClick={() => {toggleModalVisibility()}}>
                        Edit Profile
                    </button>
                    <RouterLink to="/addnew" className="addnewlink">
                        <button className="addnewbtn">Add New Project</button>
                    </RouterLink>
                </div>
            </div>
            <div className="content_right">
                <div className="email_descr">
                    <h3> testuser@projectzone.com </h3>
                    <p>This is the description.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className="projects_badges">
                    <h2>Projects Added</h2>
                    <ul className="projects_list">
                        {projects.map((project, i) =>
                        {
                            return (<li key={i}><i className="fa fa-circle"></i>{project}</li>)
                        })
                        }
                    </ul>
                    <h2>Badges</h2>
                    <div className="badges_list">
                        {badges.map((badge, i) =>
                        {
                            return (
                                <div className="badge_container" key={i}>
                                    <i className="fa fa-medal"></i>
                                    <h2>{badge.name}</h2>
                                    <p>{badge.for}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
            <div className={`overlay ${modalVisibility && 'overlay_hidden'}`} onClick={()=> toggleModalVisibility()}>
            </div>
            <form className={`editmodal ${modalVisibility && 'editmodal_hidden'}`} onSubmit={handleSubmit}>
                <ToastContainer position="bottom-center" />
                <div className="editmodal_left ">
                   <div className="img_container">
                    <img src={profileavatar} alt="Your Profile Avatar" />
                    <div className="img_overlay"><i className="fas fa-edit"></i></div>
                   </div>

                    <div className="social_info ">
                       <i className="fab fa-github"></i>
                       <input className="social_input" name="githublink" value={githublink} onChange={handleChange}></input>
                    </div>
                    <div className="social_info">
                       <i className="fab fa-linkedin"></i>
                       <input className="social_input" name="linkedinlink" value={linkedinlink} onChange={handleChange}></input>
                    </div>
                    <div className="social_info">
                       <i className="fab fa-facebook"></i>
                       <input className="social_input" name="fblink" value={fblink} onChange={handleChange}></input>
                    </div>

                    <button type="submit" className="left_submit">Submit</button>
                </div>
                  <div className="editmodal_right">
                    <div className="forminput">
                        <label htmlFor="email">Name<span>*</span></label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your Name"
                            name="name"
                            value={name}
                            className="edit_input"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="forminput">
                        <label htmlFor="email">Profession<span>*</span></label>
                        <input
                            type="text"
                            id="profession"
                            placeholder="Enter your Profession"
                            name="profession"
                            value={profession}
                            className="edit_input"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="forminput">
                        <label htmlFor="email">Bio<span>*</span></label>
                        <textarea
                            id="bio"
                            placeholder="Tell us something about yourself"
                            name="bio"
                            value={bio}
                            rows="6"
                            className="edit_input"
                            onChange={handleChange}
                        />
                    </div>
                     
                    <button type="submit" className="right_submit">Submit</button>
                  </div>
                  <div className="editmodal_closebar" onClick={() => toggleModalVisibility()}>
                     <i className="fa fa-times"></i>
                 </div>
                </form>
            </div>
    )

}

export default Profile;