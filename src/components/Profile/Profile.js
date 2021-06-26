import React from 'react';
import profileavatar from './../../assets/profileavatar.jpg';
import { Link as RouterLink } from 'react-router-dom';
import "./Profile.css";

const projects = [
    'Whatsapp Clone',
    'E - commerce Website',
    'Online Code Editoe',
    'Slack Clone'
];

const badges = [
   {
       name:'The Booster',
       for:'Added 10+ projects'
   },
   {
       name:'Helping Hand',
       for:'Added 10+ enhancements'
    }
];

const Profile = () => {
   return(
         <div className="profile_wrapper">
             <div className="person_card">
                 <div className="card_top">
                   <img src={profileavatar} alt="Your Profile Photo"/>
                 </div>
                 <div className="card_content">
                     <h1>Shwet Khatri</h1>
                     <h3>Software Engineer</h3>
                     <div className="social_icons">
                        <a href="https://github.com/" target="_blank" className="githublink">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/" target="_blank" className="linkedinlink">
                           <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://facebook.com/" target="_blank" className="facebooklink">
                          <i className="fab fa-facebook"></i>
                        </a>
                     </div>
                     <h2>Projectones : 800</h2>
                    <button  className="editbtn">
                        Edit Profile
                    </button>
                    <RouterLink to="/addnew" className="addnewlink">
                        <button className="addnewbtn">Add New Project</button>
                    </RouterLink>
                 </div>
             </div>
             <div className="content_right">
                  <div className="email_descr">
                     <h3>Software Engineer</h3>
                     <p>This is the description.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  <div className="projects_badges">
                  <h2>Projects Added</h2>
                  <ul className="projects_list">
                       {projects.map((project,i) => {
                           return (<li key={i}><i className="fa fa-circle"></i>{project}</li>)
                       })
                       }
                  </ul>
                  <h2>Badges</h2>
                  <div className="badges_list">
                       {badges.map((badge,i) => {
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
         </div>
   )

}

export default Profile;