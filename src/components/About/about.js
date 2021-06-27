import React, { useState, useEffect } from "react";
import axios from "axios";
import img from "./icon.png";
import "./about.css";

const AboutUs = () => {
  const [users, setUsers] = useState([]);

  const apiURL =
    "https://api.github.com/repos/rockingrohit9639/project-zone/contributors";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiURL);
      console.log(response.data);
      setUsers(response.data);

    };
    fetchData();
  }, []);

  return (
    <div className="about">
      <h1 className=" heading text-center">ABOUT US</h1>
      <div className="section1">
        <img className="about-img" src={img} alt="project-logo" />

        <p className="about-text">
          Project-Zone web-app suggests the user about the projects they can
          create based on their skills. Like if we learn some new tech, We
          always search for beginner level projects in node, intermediate level
          projects in ReactJs, and so on. For this, We have to explore a lot on
          Google and YouTube to get the projects. So, if we have all these
          projects in one place it will be very much easier for a beginner to
          find project ideas! We have the categories from beginner to startup
          level project ideas and we also have an option to add new projects.
          Our app is in its initial stage, We will improve it a lot. 🔥
        </p>
      </div>

      <div className="section2">
        <h1 className="text-center">OUR CONTRIBUTORS</h1>

        <div className="contributors-list">
          {users.map((user) => {
            return(
            <div className="contributor">
              <div className="contributorImage">
                <img src={user.avatar_url} alt="contributor-image" />
              </div>
              <div className="username">
                <a href={user.html_url} target="_blank"><h3>{user.login}</h3></a>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
