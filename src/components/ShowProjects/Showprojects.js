import React, { useState, useEffect } from "react";
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
import { Helmet } from "react-helmet";

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
  margin-top: 0.5rem;
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
    added: false,
  });

  const [projects, setProjects] = useState([]);
  const [filteredprojects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [{ dashboard, query }, dispatch] = useDataLayerValues();

  const classes = useStyles();
  const [dataCheck, setDatacheck] = useState("init");

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scroll(0, 420);
  };

  const defaultOptionsRow1 = [
    "JavaScript",
    "Python",
    "HTML",
    "CSS",
    "ReactJS",
    "Java",
    "Express",
  ];

  // nextjs
  // "C++",
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

  const fetchProjects = async (queryoption = "", querytype = "Skill") => {
    setIsLoading(true);
    const type = querytype.toLowerCase();

    try {
      setRandomProject("");

      if (queryoption !== "") {
        const results = await server.get(
          `/getprojectsby${type}?q=${queryoption}`
        );
        setProjects(results.data);
        setFilteredProjects(results.data);
        if (results?.data?.length > 0) {
          setDatacheck("some data");
        } else {
          setDatacheck("no data");
        }
        setTotalPages(Math.ceil(results.data.length / itemsPerPage));
        setIsLoading(false);
      } else if (query !== "") {
        const results = await server.get(`/getprojectsby${type}?q=${query}`);
        setProjects(results.data);
        setFilteredProjects(results.data);
        if (results?.data?.length > 0) {
          setDatacheck("some data");
        } else {
          setDatacheck("no data");
        }
        setTotalPages(Math.ceil(results.data.length / itemsPerPage));
        setIsLoading(false);
      } else {
        toast.error("Please enter or select a query first");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const setDefaultQuery = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_QUERY",
      query: e.target.innerText,
    });

    fetchProjects(e.target.innerText);
  };

  const handleRandomProject = () => {
    setRandomProject(
      filteredprojects[Math.floor(Math.random() * filteredprojects.length)]
    );
  };

  const checkboxHandler = (e) => {
    const name = e.target.name;

    switch (name) {
      case "beginner":
        setfilter({ ...filter, beginner: !filter.beginner });
        break;
      case "intermediate":
        setfilter({ ...filter, intermediate: !filter.intermediate });
        break;
      case "advanced":
        setfilter({ ...filter, advanced: !filter.advanced });
        break;
      case "added":
        setfilter({ ...filter, added: !filter.added });
        break;
    }
  };

  const filterByCheck = (project) => {
    if (filter[`${project.level}`]) return project;
    else if (
      filter["added"] &&
      dashboard.projects_added.indexOf(project.name) !== -1
    )
      return project;
  };

  useEffect(() => {
    let filtered = projects.filter((project) => filterByCheck(project));
    setFilteredProjects(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setPage(1);
  }, [projects, filter]);

  return (
    <div className="showProjects">
      <Helmet title="Project Zone | Find Projects" />
      <ToastContainer />
      <div className="mt">
        <SearchBox fetchProjects={fetchProjects} />

        <div className=" default_options filtre-div">
          <label className="container">
            Beginner Level
            <input
              defaultChecked={true}
              name="beginner"
              type="checkbox"
              onChange={checkboxHandler}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Intermediate Level
            <input
              defaultChecked={true}
              name="intermediate"
              type="checkbox"
              onChange={checkboxHandler}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Advanced Level
            <input
              defaultChecked={true}
              name="advanced"
              type="checkbox"
              onChange={checkboxHandler}
            />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Added Projects
            <input
              defaultChecked={false}
              name="added"
              type="checkbox"
              onChange={checkboxHandler}
            />
            <span className="checkmark"></span>
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
        {query && filteredprojects ? (
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
            likes={randomProject.likes}
            rating={randomProject.rating}
            comments={randomProject.comments}
            id={randomProject._id}
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
        {filteredprojects && dataCheck === "some data" ? (
          filteredprojects
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
            })
        ) : dataCheck === "no data" ? (
          <div style={{ textAlign: "center" }}>
            <h3>Oopps !! No projects found.</h3>
            <p>Login to add your projects on Project Zone</p>
          </div>
        ) : null}
      </div>
      {filteredprojects && filteredprojects.length > 0 && (
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
