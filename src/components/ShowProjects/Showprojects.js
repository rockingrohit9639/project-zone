import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import './ShowProjects.css';
import { client, options } from '../../client';
import { useDataLayerValues } from '../../datalayer';
import { useEffect } from 'react';
import Project from '../Project/Project';

function Showprojects() {
  const [projects, setProjects] = useState();
  const [{ query }] = useDataLayerValues();

  const filters = ['beginner', 'intermediate', 'advanced'];
  const [appliedFilters, setAppliedFilters] = useState([]);

  const [randomProject, setRandomProject] = useState('');
  const [isChange, setChange] = useState(false);

  const fetchProjects = async () => {
    try {
      const results = await client.search(query, options);

      setProjects(results.rawResults);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('HH ' + isChange);
  useEffect(() => {
    fetchProjects();
  }, [query, options]);

  const handleRandomProject = () => {
    setRandomProject(projects[Math.floor(Math.random() * projects.length)]);
  };

  const handleFilter = (e, filter) => {
    var newFil = appliedFilters;

    if (appliedFilters.includes(filter)) {
      e.target.style.backgroundColor = '#ccc';
      e.target.style.color = '#000';

      newFil.splice(newFil.indexOf(filter), 1);
      setAppliedFilters(newFil);
    } else {
      e.target.style.backgroundColor = '#ff5959';
      e.target.style.color = '#FFF';
      newFil.push(filter);
      setAppliedFilters(newFil);
    }

    if (appliedFilters.length === 0) {
      options['filters'] = {
        level: filters,
      };
    } else {
      options['filters'] = {
        level: appliedFilters,
      };
    }

    fetchProjects();
  };

  return (
    <div className='showProjects'>
      <div className='mt'>
        <SearchBox isChange={isChange} />
      </div>

      <div className='filtersBox'>
        <div className='filters'>
          {filters.map((filter, ind) => {
            return (
              <div
                className='filter'
                key={ind}
                onClick={(e) => handleFilter(e, filter)}>
                {filter}
              </div>
            );
          })}
        </div>

        <button className='random' onClick={handleRandomProject}>
          Let us decide a project for you.
        </button>
      </div>

      {randomProject ? (
        <div className='randomProject'>
          <Project
            title={randomProject.name.raw}
            desc={randomProject.description.raw}
            skills={randomProject.skills.raw}
            level={randomProject.level.raw}
            style={{ backgroundColor: '#ff5959', color: '#FFF' }}
          />
        </div>
      ) : null}

      <h2 className='query'> Searching projects for "{query}" </h2>

      <div className='projectsList'>
        {projects &&
          projects.map((project, ind) => {
            return (
              <Project
                key={ind}
                title={project.name.raw}
                desc={project.description.raw}
                skills={project.skills.raw}
                level={project.level.raw}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Showprojects;
