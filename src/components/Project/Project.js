import React from 'react';
import "./Project.css";

function Project({ title, desc, skills, level, style })
{

    return (
        <div className="project" style={style && style}>
            <h3 className="title"> {title}</h3>
            <p className="description">{desc}</p>

            <div className="level">
                <label>Level:- </label>
                <p>{level}</p>
            </div>

            <div className="skills">
                {
                    skills && skills.map((skill, ind) => (<div key={ind} style={skill.css} className="skill">{ skill.text } </div>))
                }

            </div>
        </div>
    )
}

export default Project
