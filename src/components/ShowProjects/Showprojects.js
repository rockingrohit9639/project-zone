import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './ShowProjects.css';
// import { client, options } from '../../client';
import { useDataLayerValues } from '../../datalayer';
import { useEffect } from 'react';
import Project from '../Project/Project';
import  styled  from "styled-components";
import { server } from '../../axios/instance';
import { getSkillColor } from '../../utils';

const Option = styled.button`
  color: ${props => props.optionColor ? props.optionColor : "#FFF"};
  min-width:100px;
  background-color: #FFF;
  border: 2px solid #000;
  border-color: ${props => props.optionColor ? props.optionColor : "#FFF"};
  border-radius:20px;
  margin:0 10px;
  padding:10px;
  white-space: nowrap;
  cursor:pointer;
  transition: all 0.3s ease-out;
  &:hover{
    color: #FFF;
    background-color:${props => props.optionColor ? props.optionColor : "#FFF"};
    transform: scale(0.95);
  }
  
`;

function Showprojects()
{
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
    "MongoDB",
    "Express",
    "NextJS",
    "C++",
    "C"
  ];

  const defaultOptionsRow2 = [
    "FullStack",
    "Flutter",
    "Android",
    "MERN",
    "Backend",
    "Frontend",
    "OpenCV",
    "Artificial Intillegence",
    "Machine Learning",
    "AR",
    "VR"
  ];

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
                 <Option type="submit" onClick={setDefaultQuery} value={query} key={index}  optionColor={getSkillColor(option)}>{option}</Option>
               )
             })
           }
        </div>
        <div className="default_options">
           {
             defaultOptionsRow2.map((option,index) => {
               return(
                 <Option type="submit" onClick={setDefaultQuery} value={query} key={index} optionColor={getSkillColor(option)}>{option}</Option>
               )
             })
           }
        </div>
      </div>

      <div className="random_btn-box">
        {
          projects ?
            <button className='random' onClick={handleRandomProject}>
              Let us decide a project for you.
            </button>
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
          <h2 className='query'> Entery query to search for projects. </h2>
      }



      <div className='projectsList'>
        {projects &&
          projects.map((project, ind) =>
          {
            return (
              <Project
                key={ind}
                title={project.name}
                desc={project.description}
                skills={project.skills}
                level={project.level}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Showprojects;