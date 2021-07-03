import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './ShowProjects.css';
// import { client, options } from '../../client';
import { useDataLayerValues } from '../../datalayer';
import { useEffect } from 'react';
import Project from '../Project/Project';

import { server } from '../../axios/instance';

function Showprojects()
{
  const [projects, setProjects] = useState();
  const [{ query }] = useDataLayerValues();

  // const filters = ["beginner", "intermediate", "advanced"];
  // const [appliedFilters, setAppliedFilters] = useState([]);

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

  const handleRandomProject = () =>
  {
    setRandomProject(projects[Math.floor(Math.random() * projects.length)]);
  };

  return (
    <div className='showProjects'>
      <div className='mt'>
        <SearchBox fetchProjects={fetchProjects} />
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