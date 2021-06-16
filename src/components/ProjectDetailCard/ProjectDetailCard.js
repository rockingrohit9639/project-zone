import React from "react";
import "./ProjectDetailCard.css";
import { useDataLayerValues } from "../../datalayer";
import RatingCard from "../RatingCard/RatingCard";
import star_logo from "./../../assets/star.svg";
function ProjectDetailCard(props) {
  const [{ ProjectDetails }] = useDataLayerValues();
  console.log(ProjectDetails);
  return (
    <div className="card">
      <h1 className="title_">{ProjectDetails.title}</h1>
      <h4 className="level_">{ProjectDetails.level} Level</h4>
      {/* <p className="desc_">{ProjectDetails.desc}</p> */}
      <p className="desc_">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="card-footer_">
        <div className="skills_">
          <div className="skills">
            {ProjectDetails.skills &&
              ProjectDetails.skills.map((skill, ind) => (
                <div key={ind} style={skill.css} className="skill">
                  {skill.text}
                </div>
              ))}
          </div>
        </div>
        <div className="rate">
          {Array(ProjectDetails.rating)
            .fill()
            .map((_, i) => {
              return (
                <img
                  src={star_logo}
                  key={i}
                  className="star-img"
                  alt="star_logo"
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailCard;
