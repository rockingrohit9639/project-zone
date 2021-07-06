export const initialState = {
  user: {
    fname: "",
    lname: "",
    email: "",
    password: "",
    picture: "",
  },
  dashboard: {
    bio: "",
    description: "",
    profile_pic: "",
    project_stones: "",
    projects_added: "",
    badges: [],
    social_links: {
      github: "",
      linkdin: "",
      facebook: "",
    },
    created_at: "",
  },
  ProjectDetails: {
    id: null,
    title: null,
    descr: null,
    level: null,
    skills: null,
    rating: 0,
    likes:0,
    comments: [],
  },
  isemailverified: false,
  isAuthenticated: false,
  HomePageProjects: {
    AI_ML_Projects: [],
    Javascript_Projects: [],
    Python_Projects: [],
    HTML_CSS_Projects: [],
    Android_Projects: [],
    Blockchain_Projects: [],
  },
  query: "",
};

export const actions = {
  SET_USER: "SET_USER",
  LOAD_USER: "LOAD_USER",
  SET_USER_DASHBOARD_DATA: "SET_USER_DASHBOARD_DATA",
  SET_AUTH: "SET_AUTH",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  SET_QUERY: "SET_QUERY",
  SET_PROJECT_DETAILS: "SET_PROJECT_DETAILS",
  SET_EMAIL_VERIFIED: "SET_EMAIL_VERIFIED",
  SET_HOMEPAGE_PROJECTS: "SET_HOMEPAGE_PROJECTS",
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

    case actions.SET_USER_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.dashboard,
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

    case actions.SET_EMAIL_VERIFIED:
      return {
        ...state,
        isemailverified: action.isemailverified,
      };

    case actions.SET_HOMEPAGE_PROJECTS:
      return {
        ...state,
        HomePageProjects: action.HomePageProjects,
      };

    default:
      return state;
  }
};

export default reducer;
