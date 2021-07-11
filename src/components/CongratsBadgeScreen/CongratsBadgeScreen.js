import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ParticlesBg from 'particles-bg';
import { getSkillColor } from "../../utils";
import "./CongratsBadgeScreen.css";

function CongratsBadgeScreen(
  { 
    newbadge,
    modalVisibility,
     toggleModalVisibility,
  }) 
  {  
    return(
      <>
        <div
          className={` badge_overlay ${ modalVisibility && "badge_overlay_hidden" }`}
          onClick={() => toggleModalVisibility()}
        >
        <ParticlesBg type = "fountain" bg = { true } />
        </div>
        <div
           className={`badgemodal ${ modalVisibility && "badgemodal_hidden" }`}
        >
            <h1>🌟 Congrats 🌟</h1>
            <h2> You Have Got a New Badge 😃</h2>
            <h2> Keep It Up 👍 </h2>
            <div className="badge_container">
                <i 
                className={newbadge.badge_description.split(' ').slice(0,1).includes('Liked') ? `fa fa-heart newfa` 
                        : newbadge.badge_description.split(' ').slice(0,1).includes('Rated') ? `fa fa-star newfa`
                        : `fa fa-certificate newfa` }
                style={{color: getSkillColor(newbadge.title.split(' ').slice(0,1).join(' '))}}>
                </i>
                <h2>{newbadge.title}</h2>
                <p>{newbadge.badge_description}</p>
            </div>
            <RouterLink to="/profile" className="addnewlink profilelink">
                <button className="addnewbtn"> Go to Profile </button>
            </RouterLink>
            <div
              className="badgemodal_closebar"
              onClick={() => toggleModalVisibility()}
            >
                <i className="fa fa-times"></i>
            </div>
        </div>
      </>
    )
}

export default CongratsBadgeScreen;

