import React from 'react';
import './ProjectCategories.css';
import python from './../../assets/python.svg';
import react from './../../assets/react.svg';
import javascript from './../../assets/js.svg';
import appdev from './../../assets/android.svg';
import webdev from './../../assets/web.svg';
import { useHistory } from 'react-router-dom';
import { useDataLayerValues } from '../../datalayer';
import { actions } from '../../reducer';
function ProjectCategories() {
  const [{ query }, dispatch] = useDataLayerValues();
  const history = useHistory();
  const handleOnclick = (e) => {
    dispatch({
      type: actions.SET_QUERY,
      query: e.target.value,
    });
    history.push('/projects');
  };
  return (
    <>
      <div className='warpper'>
        <div className='title_categories'>
          <h2>Explore Categories</h2>
        </div>
        <div className='categories-card'>
          <div className='React-card allcard'>
            <button className='expbtn' value='react' onClick={handleOnclick}>
              Explore
            </button>
            <div className='allcard-title'>
              React
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={react} alt='react' />
          </div>
          <div className='App-dev-card allcard'>
            <button className='expbtn' value='android' onClick={handleOnclick}>
              Explore
            </button>
            <div className='allcard-title'>
              App Dev
              <br />
              <span> Projects </span>
            </div>
            <img src={appdev} className='android' alt='android' />
          </div>
          <div className='Python-card allcard'>
            <button className='expbtn' value='python' onClick={handleOnclick}>
              Explore
            </button>
            <div className='allcard-title'>
              Python
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={python} alt='python' />
          </div>
          <div className='JavaScript-card allcard'>
            <button
              className='expbtn'
              value='javascript'
              onClick={handleOnclick}>
              Explore
            </button>
            <div className='allcard-title'>
              JavaScript
              <br />
              <span> Projects </span>
            </div>
            <img className='img' src={javascript} alt='javascript' />
          </div>
          <div className='Webdev-card allcard'>
            <button className='expbtn' value='mern' onClick={handleOnclick}>
              Explore
            </button>
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
