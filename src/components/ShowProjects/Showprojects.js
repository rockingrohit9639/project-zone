import React,{ useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import "./ShowProjects.css";
import { client, options } from "../../client";
import { useDataLayerValues } from '../../datalayer';
import { useEffect } from 'react';
import Project from '../Project/Project';

function Showprojects()
{
    
    const [projects, setProjects] = useState();
    const [{ query }] = useDataLayerValues();

    const fetchProjects = async () =>
    {
        try
        {
            const results = await client.search(query, options);
            
            setProjects(results.rawResults);
        }
        catch (error)
        {
            console.log(error)
        }


    }

    useEffect(() =>
    {
        fetchProjects();
    }, [query]);



    return (
        <div className="showProjects">
            
            <div className="mt">

            <SearchBox />
            </div>

            <h2 className="query"> Searching projects for "{query}" </h2>

            <div className="projectsList">
                
                {
                    projects && projects.map((project, ind) =>
                    {
                        return <Project
                            key={ind}
                            title={project.name.raw}
                            desc={project.description.raw}
                            skills={project.skills.raw}
                            level={project.level.raw}
                        />
                    })
                }

            </div>

        </div>
    )
}

export default Showprojects;
