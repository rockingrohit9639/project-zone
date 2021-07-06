import "./App.css";
import { useEffect } from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Showprojects from "./components/ShowProjects/Showprojects";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Callback from "./components/Callback";
import AddNewProject from "./components/AddNewProject/AddNewProject";
import Profile from "./components/Profile/Profile";
import ProjectDetails from "./components/ProjectDetails/ProjectDetails";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme.js";
import { GlobalStyles } from "./theme.js";
import { Switch as ToggleSwitch } from "antd";
import ContactUs from "./components/ContactUs/contactus";
import AboutUs from "./components/About/about";
import TrendingProjects from "./components/TrendingProjects/TrendingProjects";
import { profile, GetHomeProjects } from "./axios/instance";
import { setAuthToken } from "./utils";
import { useDataLayerValues } from "./datalayer";
import ForgetPassword from "./components/ForgetPassword/Forget";
import SetPasword from "./components/SetPasswordPage/SetPasword";
import VerifyEmailPage from "./components/VerifyEmailPage/VerifyEmailPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [
    { user, isAuthenticated, dashboard, isemailverified, HomePageProjects },
    dispatch,
  ] = useDataLayerValues();
  useEffect(() => {
    const loader = document.getElementById("pre-loader");

    if (loader) {
      loader.remove();
    }
    HomePageProjectsData();
    if (localStorage.getItem("tokken")) {
      setAuthToken(localStorage.getItem("tokken"));
      const userdata = getUser();
    } else {
      dispatch({
        type: "SET_AUTH",
        isAuthenticated: false,
      });
    }
  }, [localStorage.getItem("tokken")]);

  const getUser = async () => {
    try {
      const user = await profile();
      console.log(user);
      const data = {
        ...user,
        fname: user.data.firstname,
        lname: user.data.lastname,
        email: user.data.email,
      };
      const dashboard_ = {
        ...dashboard,
        bio: user.data.profile.bio ? user.data.profile.bio : "",
        description: user.data.profile.description
          ? user.data.profile.description
          : "",
        profile_pic: user.data.profile.profile_pic
          ? user.data.profile.profile_pic
          : "",
        project_stones: user.data.profile.project_stone,
        projects_added: user.data.profile.projects_added,
        badges: user.data.profile.badges,
        social_links: user.data.profile.social_links,
        created_at: user.data.created_at,
      };
      const email = user.data.email_acctivation.email_activated;

      dispatch({
        type: "SET_AUTH",
        isAuthenticated: true,
      });
      dispatch({
        type: "SET_USER",
        user: data,
      });
      dispatch({
        type: "SET_USER_DASHBOARD_DATA",
        dashboard: dashboard_,
      });
      dispatch({
        type: "SET_EMAIL_VERIFIED",
        isemailverified: email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const HomePageProjectsData = async () => {
    try {
      const Homepageprojects = await GetHomeProjects();
      console.log(Homepageprojects.data);
      dispatch({
        type: "SET_HOMEPAGE_PROJECTS",
        HomePageProjects: Homepageprojects.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(HomePageProjects);

  //Logic for Theme toggler to get dark mode
  const [theme, settheme] = useState("light");
  const styledApp = styled.div;

  const themeToggler = () => {
    theme === "light" ? settheme("dark") : settheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {/* <GlobalStyles /> */}
      <styledApp className="App">
        <Router>
          <Navbar themeToggler={themeToggler} />
          <Switch>
            {/* Project realted routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Showprojects} />
            <Route exact path="/trendings" component={TrendingProjects} />
            <Route
              exact
              path="/projectdetails/:projectid"
              component={ProjectDetails}
            />

            {/* Auth related routes  */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/forgetpassword" component={ForgetPassword} />

            {/* Add new project route */}
            <Route exact path="/addnew" component={AddNewProject} />

            {/* Other routes  */}
            <Route exact path="/about" component={AboutUs} />
            <Route exact path="/contact" component={ContactUs} />

            {/* Set New Password */}
            <Route
              exact
              path="/project-zone/forget-password/:token"
              component={SetPasword}
            />
            {/* Verify Email Route */}
            <Route
              exact
              path="/project-zone/verify-email/:tokenemail"
              component={VerifyEmailPage}
            />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </Router>
      </styledApp>
    </ThemeProvider>
  );
}

export default App;
