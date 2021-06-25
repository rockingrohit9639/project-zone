export const initialState = {
  user: {
    fname: '',
    lname: '',
    email: '',
    password: '',
    picture: '',
  },
  ProjectDetails: {
    title: null,
    descr: null,
    level: null,
    skills: null,
    rating: 0,
  },
  isAuthenticated: false,
  query: '',
};

export const actions = {
  SET_USER: 'SET_USER',
  LOAD_USER: 'LOAD_USER',
  SET_AUTH: 'SET_AUTH',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SET_QUERY: 'SET_QUERY',
  SET_PROJECT_DETAILS: 'SET_PROJECT_DETAILS',
};

const reducer = (state, action) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actions.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };

    case actions.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case actions.SET_PROJECT_DETAILS:
      return {
        ...state,
        ProjectDetails: action.ProjectDetails,
      };

    default:
      return state;
  }
};

export default reducer;
