import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './ShowProjects.css';
import { useDataLayerValues } from '../../datalayer';
import { useEffect } from 'react';
import Project from '../Project/Project';
import  styled  from "styled-components";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import { server } from '../../axios/instance';
import { getSkillColor } from '../../utils';

const Option = styled.button`
  color: ${props => props.optionColor ? props.optionColor : "#FFF"};
  min-width:${props => props.option ? `${(props.option.split(' ').length * 90)}px`  : "100px"};
  font-family: "Poppins";
  background-color: #FFF;
  border: 2px solid #000;
  border-color: ${props => props.optionColor ? props.optionColor : "#FFF"};
  border-radius:20px;
  margin:0 10px;
  padding: 5px 10px;
  white-space: nowrap;
  cursor:pointer;
  transition: all 0.3s ease-out;
  &:hover{
    color: #FFF;
    background-color:${props => props.optionColor ? props.optionColor : "#FFF"};
    transform: scale(0.95);
  }
`;

const useStyles = makeStyles(theme => ({
  paginator: {
    justifyContent: "center",
    marginTop: theme.spacing(5),
    marginBottom:theme.spacing(3)
  }
}));

function Showprojects()
{
  const muitheme = useTheme();
  const isMobile = useMediaQuery(muitheme.breakpoints.down("sm"));
  const itemsPerPage = isMobile ? 6 : 12 ;
  const [page, setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const classes = useStyles();

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scroll(0,420);
  };

  const [projects, setProjects] = useState();
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
  const [randomProject, setRandomProject] = useState('');

  const fetchProjects = async () =>
  {
    try
    {
      setRandomProject('');

      if (query !== "")
      {
        const results = await server.get(`/getprojects?q=${ query }`);
        setProjects(results.data);
        setTotalPages(Math.ceil(results.data.length / itemsPerPage));
      }
    } catch (error)
    {
      console.log(error);
    }

  };

  const setDefaultQuery = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_QUERY",
      query: e.target.innerText,
    });
    fetchProjects();
  }

  const handleRandomProject = () =>
  {
    setRandomProject(projects[Math.floor(Math.random() * projects.length)]);
  };

  return (
    <div className='showProjects'>
      <div className='mt'>
        <SearchBox fetchProjects={fetchProjects} />
        <div className="default_options">
           {
             defaultOptionsRow1.map((option,index) => {
               return(
                 <Option type="submit" onClick={setDefaultQuery} value={query} key={index} option={option}  optionColor={getSkillColor(option)}>
                   {option}
                 </Option>
               )
             })
           }
        </div>
        <div className="default_options">
           {
             defaultOptionsRow2.map((option,index) => {
               return(
                 <Option type="submit" onClick={setDefaultQuery} value={query} key={index} option={option} optionColor={getSkillColor(option)}>
                  {option}
                </Option>
               )
             })
           }
        </div>
      </div>

      <div className="random_btn-box">
        {
          projects ?
            <Option onClick={handleRandomProject} optionColor={'#6f6ee1'} option={'Let decide project'}>
              Let us decide a project for you.
            </Option>
            :
            null
        }
      </div>

      {randomProject ? (
        <div className='randomProject'>
          <Project
            title={randomProject.name}
            desc={randomProject.description}
            skills={randomProject.skills}
            level={randomProject.level}
            style={{ backgroundColor: '#6f6ee1', color: '#FFF' }}
          />
        </div>
      ) : null}

      {
        query ?
          <h2 className='query'> Searching projects for "{query}" </h2>
          :
          <h2 className='query'> Enter query to search for projects. </h2>
      }

      <div className='projectsList'>
        {projects &&
          projects.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((project, ind) =>
          {
            return (
              <Project
                key={ind}
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
         }
      </div>
      {
        projects &&
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          defaultPage={1}
          color='primary'
          size={(isMobile) ? "small" : "large"}
          showFirstButton={!isMobile}
          showLastButton={!isMobile}
          classes={{ ul: classes.paginator }}
        />
        }
    </div>
  );
}

export default Showprojects;