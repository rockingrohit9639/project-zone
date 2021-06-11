import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Showprojects from './components/ShowProjects/Showprojects';
import Login from './components/Login/Login';
import Callback from './components/Callback';
import AddNewProject from "./components/AddNewProject/AddNewProject";
import {useState} from 'react';
import styled,{ThemeProvider} from 'styled-components';
import { lightTheme, darkTheme } from "./theme.js";
import { GlobalStyles } from './theme.js';
import {Switch as ToggleSwitch} from "antd";
function App()
{

  //Logic for Theme toggler to get dark mode
  const [theme, settheme] = useState("light");
  const styledApp = styled.div;

  const themeToggler = ()=>{
    theme === 'light' ? settheme("dark"): settheme("light");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <styledApp className="App">
        {/* All APP CONTENTS GOES HERE --> USING "StyledApp" insted of "div" to enable dark mode */}
        <Router>
          <div className="NavWithToggleSwitch">
            <Navbar />
            <ToggleSwitch onClick={() => themeToggler()} className="toggleBtn"/>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Showprojects} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/addnew" component={AddNewProject} />
          </Switch>
        </Router>
      </styledApp>
    </ThemeProvider>
  );
}

export default App;
