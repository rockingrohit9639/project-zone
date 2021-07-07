import React, { useEffect, useState } from "react";
import Project from "../Project/Project";
import "./Home.css";
import landing_bg from "./../../assets/landing_bg.svg";
import avatar from "./../../assets/avatar.svg";
import ProjectCategories from "../ProjectCategories/ProjectCategories";   
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useDataLayerValues } from "./../../datalayer";
import { Oval } from "react-loading-icons";
import { GetHomeProjects } from "../../axios/instance";

function Home() {
  const [{ HomePageProjects }, dispatch] = useDataLayerValues();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    HomePageProjectsData();
  }, []);


  const HomePageProjectsData = async () =>
  {
    setIsLoading(true);
    try
    {
      const Homepageprojects = await GetHomeProjects();

      dispatch({
        type: "SET_HOMEPAGE_PROJECTS",
        HomePageProjects: Homepageprojects.data,
      });
    } catch (err)
    {
      console.log(err);
    }

    setIsLoading(false);
  };


  return (
    <div className="home">
      <section
        className="landing"
        id="landing"
        style={{ background: `url(${landing_bg}) 75% 100%` }}
      >
        <div className="home_content">
          <h3>Having Difficulties in</h3>
          <h1>finding projects ?</h1>
          <p>We are here to help you.</p>

          <Link to="/projects"> Find Projects </Link>
        </div>
        <div className="image">
          <img src={avatar} alt="Welcome to ProjectZone" />
        </div>
      </section>
      <ToastContainer position="bottom-left" />

      <ProjectCategories />

      <div className="home_projects">
        <div className="best_project">
          <h1 className="best_project--title">Best ML /AI Projects</h1>
          {isLoading ? <div className="loading_indicator">
          <Oval stroke={"#6f6ee1"} />
          <p> Fetching Projects </p>
        </div> : null}

          <div className="projects">
            {HomePageProjects.AI_ML_Projects.map((item) => (
              <Project
                key={item._id}
                id={item._id}
                title={item.name}
                desc={item.description}
                skills={item.skills}
                level={item.level}
                rating={item.rating}
                likes={item.likes}
                comments={item.comments}
              />
            ))}
          </div>
        </div>

        <div className="best_project">
          <h1 className="best_project--title">Best JavaScript Projects</h1>

          {isLoading ? <div className="loading_indicator">
          <Oval stroke={"#6f6ee1"} />
          <p> Fetching Projects </p>
        </div> : null}
          <div className="projects">
            {HomePageProjects.Javascript_Projects.map((item) => (
              <Project
                key={item._id}
                id={item._id}
                title={item.name}
                desc={item.description}
                skills={item.skills}
                level={item.level}
                rating={item.ratings}
                likes={item.likes}
                comments={item.comments}
              />
            ))}
          </div>
        </div>
        <div className="best_project">
          <h1 className="best_project--title">Best HTML & CSS Projects</h1>
          {isLoading ? <div className="loading_indicator">
          <Oval stroke={"#6f6ee1"} />
          <p> Fetching Projects </p>
        </div> : null}
          <div className="projects">
            {HomePageProjects.HTML_CSS_Projects.map((item) => (
              <Project
                key={item._id}
                id={item._id}
                title={item.name}
                desc={item.description}
                skills={item.skills}
                level={item.level}
                rating={item.ratings}
                likes={item.likes}
                comments={item.comments}
              />
            ))}
          </div>
        </div>
        <div className="best_project">
          <h1 className="best_project--title">Best Blockchain Projects</h1>
          {isLoading ? <div className="loading_indicator">
          <Oval stroke={"#6f6ee1"} />
          <p> Fetching Projects </p>
        </div> : null}
          <div className="projects">
            {HomePageProjects.Blockchain_Projects.map((item) => (
              <Project
                key={item._id}
                id={item._id}
                title={item.name}
                desc={item.description}
                skills={item.skills}
                level={item.level}
                rating={item.ratings}
                likes={item.likes}
                comments={item.comments}
              />
            ))}
          </div>
        </div>
        <div className="best_project">
          <h1 className="best_project--title">Best Android Projects</h1>
          {isLoading ? <div className="loading_indicator">
          <Oval stroke={"#6f6ee1"} />
          <p> Fetching Projects </p>
        </div> : null}
          <div className="projects">
            {HomePageProjects.Android_Projects.map((item) => (
              <Project
                key={item._id}
                id={item._id}
                title={item.name}
                desc={item.description}
                skills={item.skills}
                level={item.level}
                rating={item.ratings}
                likes={item.likes}
                comments={item.comments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
