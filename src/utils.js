import axios from 'axios';
import { server } from './axios/instance';

export const getSkillColor = (skill) =>
{
  switch (skill.toLowerCase())
  {
    case 'mongodb':
      return { backgroundColor: '#3FA037' };

    case 'mongo':
      return { backgroundColor: '#3FA037' };

    case 'express':
      return { backgroundColor: 'red' };

    case 'express js':
      return { backgroundColor: 'red' };

    case 'react':
      return { backgroundColor: 'blue' };

    case 'reactjs':
      return { backgroundColor: 'blue' };

    case 'react js':
      return { backgroundColor: 'blue' };

    case 'node':
      return { backgroundColor: 'green' };

    case 'node js':
      return { backgroundColor: 'green' };

    case 'python':
      return { backgroundColor: '#FFD43B' };

    case 'opencv':
      return { backgroundColor: 'brown' };

    case 'django':
      return { backgroundColor: '#1eae98' };

    case 'javascript':
      return { backgroundColor: '#f0db4f' };

    case 'js':
      return { backgroundColor: '#206a5d' };

    case 'html':
      return { backgroundColor: '#E44D26' };

    case 'css':
      return { backgroundColor: '#2565AE' };

    case 'java':
      return { backgroundColor: '#FB9820' };
    case 'android':
      return { backgroundColor: '#3DDC84' };

    case 'kotlin':
      return { backgroundColor: '#B75EA4' };
    case 'backend':
      return { backgroundColor: '#008190' };

    case 'blockchain':
      return { backgroundColor: '#11a7a8' };
    case 'cpp':
      return { backgroundColor: '#5e8dbd' };
    case 'flutter':
      return { backgroundColor: '#07489C' };

    default:
      return { backgroundColor: 'skyblue' };
  }
};

export const setAuthToken = (token) =>
{
  if (token)
  {
    server.defaults.headers.common['authorization'] = 'Bearer' + ' ' + token;
  } else
  {
    delete server.defaults.headers.common['authorization'];
  }
};
