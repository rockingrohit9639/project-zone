import React from "react";
import ProjectDetailCard from "../ProjectDetailCard/ProjectDetailCard";
import "./ProjectDeatils.css";
import ParticlesBg from "particles-bg";
import userImg from "../../assets/user.png";

function ProjectDetails(props)
{
    return (
        <div className="project_details_container">
            <ParticlesBg type="coweb" bg={true} />

            <ProjectDetailCard
                title={props.title}
                descr={props.descr}
                skills={props.skills}
                level={props.level}
            />

            <div className="comment_section">
                <div className="comment_user_data">
                    <h1> Add Your Suggestion </h1>
                    <div className="comment_user">
                        <img src={userImg} alt="user_image" />

                        <h2>Rohit Saini</h2>
                    </div>

                    <div className="comment_inputbox">
                        <textarea placeholder="Enter your comment"> </textarea>
                    </div>
                </div>

                <div className="comment_header">
                    <p> Comments : 2</p>
                </div>

                <div className="comment_content">
                    <div className="user_comment">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
