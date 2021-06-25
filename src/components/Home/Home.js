import React from 'react';
import Project from '../Project/Project';
import './Home.css';
import landing_bg from './../../assets/landing_bg.svg';
import avatar from './../../assets/avatar.svg';
import ProjectCategories from '../ProjectCategories/ProjectCategories';
import SearchBox from '../SearchBox/SearchBox';
import TrendingProjects from '../TrendingProjects/TrendingProjects';
import { Link } from 'react-router-dom';

function Home() {
  const [isChange, setChange] = React.useState(false);

  const setChangedata = () => {
    setChange(true);
  };
  return (
    <div className='home'>
      <section
        className='landing'
        id='landing'
        style={{ background: `url(${landing_bg}) 75% 100%` }}>
        <div className='content'>
          <h3>Having Difficulties in</h3>
          <h1>finding projects ?</h1>
          <p>We are here to help you.</p>

          <Link to='/findprojects'> Find Projects </Link>
        </div>
        <div className='image'>
          <img src={avatar} alt='Welcome to ProjectZone' />
        </div>
      </section>

      <SearchBox setChangedata={setChangedata} />
      <ProjectCategories />
      <div className="home_projects">

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best MERN Projects
        </h1>
        <div className='projects'>
          <Project
            title='E-Commerce Website like amazon'
            desc='This is a ecommerce website which has many facilities like order bucket, payment, product ratings any many more. so its a complete full stack project.'
            skills={['mongodb', 'express', 'react', 'node']}
            level='Beginner'
            rating={4}
          />
          <Project
            title='Online Distance Education System'
            desc=''
            skills={['mongodb', 'express', 'react', 'node']}
            level='Advance'
            rating={5}
          />
          <Project
            title='E-Learning Portal'
            desc=''
            skills={['mongodb', 'express', 'react', 'node']}
            level='Advanced'
            rating={3}
          />
        </div>
      </div>

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best Python Projects
        </h1>
        <div className='projects'>
          <Project
            title='Facial recognition using Python OpenCV library'
            desc=''
            skills={['python', 'opencv']}
            level='Beginner'
            rating={5}
          />
          <Project
            title='Sudoku Solver'
            desc=''
            skills={['python']}
            level='Advanced'
            rating={4}
          />
          <Project
            title='Virtual Assistant'
            desc=''
            skills={['python']}
            level='Advanced'
            rating={5}
          />

        </div>
      </div>

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best JavaScript Projects
        </h1>
        <div className='projects'>
          <Project
            title='Movie Seat Booking App'
            desc=''
            skills={['javascript']}
            level='intermediate'
            rating={4}
          />
          <Project
            title='Covid CheckUp Test'
            desc=''
            skills={['javascript']}
            level='Advanced'
            rating={4}
          />
          <Project
            title='Music App'
            desc=''
            skills={['javascript']}
            level='Advanced'
            rating={4}
          />

         </div>
       </div>
      </div>
    </div>
  );
}

export default Home;
