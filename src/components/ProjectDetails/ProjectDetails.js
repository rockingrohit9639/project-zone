import React from 'react';
import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';
import './ProjectDeatils.css';
import ParticlesBg from 'particles-bg';

function ProjectDetails(props) {

    return ( <
        div className = "conatiner_" >
        <
        ParticlesBg type = "color"
        bg = { true }
        />

        <
        ProjectDetailCard title = { props.title }
        descr = { props.descr }
        skills = { props.skills }
        level = { props.level }
        /> < /
        div >
    );

  return (
    <div className="conatiner_">
      <ProjectDetailCard
        title={props.title}
        descr={props.descr}
        skills={props.skills}
        level={props.level}
      />
      <div class="panel-header">
  <span id="panel-title"> Comments </span>
  <span class="counter"> 3 </span>
</div>

<div class="panel-collapse">
<form>
<p class="formtitle"> Leave a comment </p>
<textarea placeholder="Comment"></textarea>
<input class="commentButton" type='submit' value='Leave Comment' />  
</form>

  <div class="comment">
    <div class="comment-header">
      <img class="icon" src="https://i.imgur.com/JIt0euT.png"/>
      <span> You </span>
      <small>2 days ago </small>
   </div>
   <div class="comment-text">
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar molestie urna, mollis mattis nibh cursus vel.
   </div>
  </div>

  <div class="comment">
    <div class="comment-header">
      <img class="icon" src="https://i.imgur.com/JIt0euT.png"/>
      <span> Kanak </span>
      <small> 2 days ago </small>
    </div>
    <div class="comment-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar molestie urna, mollis mattis nibh cursus vel. Cras iaculis, augue convallis feugiat egestas, nibh lacus porta dolor, eget pulvinar augue leo quis neque. Duis euismod vestibulum nunc. Curabitur vitae fermentum ex. 
    </div>
  </div>

 
</div>
    </div>
  );

}

export default ProjectDetails;