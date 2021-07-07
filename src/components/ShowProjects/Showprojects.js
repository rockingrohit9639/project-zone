import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import "./ShowProjects.css";
import { useDataLayerValues } from "../../datalayer";
import Project from "../Project/Project";
import styled from "styled-components";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { server } from "../../axios/instance";
import { getSkillColor } from "../../utils";
import { Bars } from "react-loading-icons";
import { toast, ToastContainer } from "react-toastify";

const Option = styled.button`
  color: ${(props) => (props.optionColor ? props.optionColor : "#FFF")};
  min-width: ${(props) =>
    props.option ? `${props.option.split(" ").length * 90}px` : "100px"};
  font-family: "Poppins";
  background-color: #fff;
  border: 2px solid #000;
  border-color: ${(props) => (props.optionColor ? props.optionColor : "#FFF")};
  border-radius: 20px;
  margin: 0 10px;
  padding: 5px 10px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    color: #fff;
    background-color: ${(props) =>
      props.optionColor ? props.optionColor : "#FFF"};
    transform: scale(0.95);
  }
`;

const useStyles = makeStyles((theme) => ({
  paginator: {
    justifyContent: "center",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
}));

function Showprojects() {
  const muitheme = useTheme();
  const isMobile = useMediaQuery(muitheme.breakpoints.down("sm"));
  const itemsPerPage = isMobile ? 6 : 12;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setfilter] = useState({
    beginner: true,
    intermediate: true,
    advanced: true,
  });
  const classes = useStyles();

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scroll(0, 420);
  };

  const [projects, setProjects] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [{ query }, dispatch] = useDataLayerValues();

  const defaultOptionsRow1 = [
    "JavaScript",
    "Node",
    "Python",
    "HTML",
    "CSS",
    "React",
    "Java",
    "Express",
    "C++",
  ];

  // nextjs
  // C
  const defaultOptionsRow2 = [
    "FullStack",
    "Flutter",
    "Android",
    "MERN",
    "Backend",
    "Frontend",
    "OpenCV",
    "ML",
  ];

  // "AR",
  // "VR"
  const [randomProject, setRandomProject] = useState("");

  const fetchProjects = async () => {
    setIsLoading(true);

    try {
      setRandomProject("");

      console.log(query);

      if (query !== "") {
        console.log("came here fine");
        const results = await server.get(`/getprojects?q=${query}`);
        setIsLoading(false);
        setProjects(results.data);
        setTotalPages(Math.ceil(results.data.length / itemsPerPage));
      } else {
        console.log("enter query");
        toast.error("Please enter a query first");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
    }
  };

  const setDefaultQuery = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_QUERY",
      query: e.target.innerText,
    });

    fetchProjects();
  };

  const handleRandomProject = () => {
    setRandomProject(projects[Math.floor(Math.random() * projects.length)]);
  };

  const checkboxHandler = (e) => {
    const name = e.target.name;
    if (name === "beginner") {
      setfilter({ ...filter, beginner: !filter.beginner });
    } else if (name === "intermediate") {
      setfilter({ ...filter, intermediate: !filter.intermediate });
    } else if (name === "advanced") {
      setfilter({ ...filter, advanced: !filter.advanced });
    }
  };

  return (
    <div className="showProjects">
      <ToastContainer />
      <div className="mt">
        <SearchBox fetchProjects={fetchProjects} />
        <div className="filtre-div">
          <label>
            <input
              defaultChecked={true}
              name="beginner"
              type="checkbox"
              onChange={checkboxHandler}
            />{" "}
            Beginner Level
          </label>
          <label>
            <input
              defaultChecked={true}
              name="intermediate"
              type="checkbox"
              onChange={checkboxHandler}
            />{" "}
            Intermediate Level
          </label>
          <label>
            <input
              defaultChecked={true}
              name="advanced"
              type="checkbox"
              onChange={checkboxHandler}
            />{" "}
            Advance Level
          </label>
        </div>
        <div className="default_options">
          {defaultOptionsRow1.map((option, index) => {
            return (
              <Option
                type="submit"
                onClick={setDefaultQuery}
                value={query}
                key={index}
                option={option}
                optionColor={getSkillColor(option)}
              >
                {option}
              </Option>
            );
          })}
        </div>
        <div className="default_options">
          {defaultOptionsRow2.map((option, index) => {
            return (
              <Option
                type="submit"
                onClick={setDefaultQuery}
                value={query}
                key={index}
                option={option}
                optionColor={getSkillColor(option)}
              >
                {option}
              </Option>
            );
          })}
        </div>
      </div>

      <div className="random_btn-box">
        {projects ? (
          <Option
            onClick={handleRandomProject}
            optionColor={"#6f6ee1"}
            option={"Let decide project"}
          >
            Let us decide a project for you.
          </Option>
        ) : null}
      </div>

      {randomProject ? (
        <div className="randomProject">
          <Project
            title={randomProject.name}
            desc={randomProject.description}
            skills={randomProject.skills}
            level={randomProject.level}
            style={{ backgroundColor: "#6f6ee1", color: "#FFF" }}
          />
        </div>
      ) : null}

      {query ? (
        <h2 className="query"> Searching projects for "{query}" </h2>
      ) : (
        <h2 className="query"> Enter query to search for projects. </h2>
      )}

      {isLoading ? (
        <div className="loading_indicator">
          <Bars stroke={"#6f6ee1"} fill="#6f6ee1" width="60" height="90" />
          <p> Fetching {query} projects </p>
        </div>
      ) : null}

      <div className="projectsList">
        {projects &&
          projects
            .filter((project) => filter[`${project.level}`])
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((project, ind) => {
              return (
                <Project
                  key={ind}
                  id={project._id}
                  title={project.name}
                  desc={project.description}
                  skills={project.skills}
                  level={project.level}
                  likes={project.likes}
                  rating={project.rating}
                  comments={project.comments}
                />
              );
            })}
      </div>
      {projects && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          defaultPage={1}
          color="primary"
          size={isMobile ? "small" : "large"}
          showFirstButton={!isMobile}
          showLastButton={!isMobile}
          classes={{ ul: classes.paginator }}
        />
      )}
    </div>
  );
}

export default Showprojects;
