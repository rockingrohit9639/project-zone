import React from 'react';
import './ProjectCategories.css';
import Button from '@material-ui/core/Button';
import python from './../../assets/python.svg';
import react from './../../assets/react.svg';
import javascript from './../../assets/js.svg';
import appdev from './../../assets/android.svg';
import webdev from './../../assets/web.svg';
function ProjectCategories() {
  return (
    <>
      <div className='warpper'>
        <div className='title_categories'>
          <h2>Explore Categories</h2>
        </div>
        <div className='categories-card'>
          <div className='React-card allcard'>
            <Button variant='contained' className='expbtn'>
              Explore
            </Button>
            <div className='allcard-title'>
              React
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={react} alt='react' />
          </div>
          <div className='App-dev-card allcard'>
            <Button variant='contained' className='expbtn'>
              Explore
            </Button>
            <div className='allcard-title'>
              App Dev
              <br />
              <span> Projects </span>
            </div>
            <img src={appdev} className='android' alt='android' />
          </div>
          <div className='Python-card allcard'>
            <Button variant='contained' className='expbtn'>
              Explore
            </Button>
            <div className='allcard-title'>
              Python
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={python} alt='python' />
          </div>
          <div className='JavaScript-card allcard'>
            <Button variant='contained' className='expbtn'>
              Explore
            </Button>
            <div className='allcard-title'>
              JavaScript
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={javascript} alt='javascript' />
          </div>
          <div className='Webdev-card allcard'>
            <Button variant='contained' className='expbtn'>
              Explore
            </Button>
            <div className='allcard-title'>
              Web Dev
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={webdev} alt='webdev' />
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectCategories;
