import { server } from './axios/instance';

export const getSkillColor = (skill) =>
{
  switch (skill.toLowerCase())
  {
    case 'mongodb':
      return '#3FA037';

    case 'mongo':
      return '#3FA037';

    case 'express':
      return 'red';

    case 'express js':
      return 'red';

    case 'react':
      return 'blue';

    case 'reactjs':
      return 'blue';

    case 'react js':
      return 'blue';

    case 'node':
      return 'green';

    case 'node js':
      return 'green';

    case 'python':
      return '#FFD43B';

    case 'opencv':
      return 'brown';

    case 'django':
      return '#1eae98';

    case 'javascript':
      return '#f0db4f';

    case 'js':
      return '#206a5d';

    case 'html':
      return '#E44D26';

    case 'css':
      return '#2565AE';

    case 'java':
      return '#FB9820';

    case 'android':
      return '#3DDC84';

    case 'kotlin':
      return '#B75EA4';

    case 'backend':
      return '#008190';

    case 'blockchain':
      return '#11a7a8';

    case 'cpp':
      return '#5e8dbd';

    case 'flutter':
      return '#07489C';

    case 'bronze':
      return '#ff9933';

    case 'silver':
      return '#d9d9d9';

    case 'gold':
      return '#ffd700';

    default:
      return 'skyblue';
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
