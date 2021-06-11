import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Showprojects from './components/ShowProjects/Showprojects';
import Login from './components/Login/Login';
import Callback from './components/Callback';
import AddNewProject from "./components/AddNewProject/AddNewProject";

function App()
{
  return (
    <div className="App">


      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Showprojects} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/callback" component={Callback} />
          <Route exact path="/addnew" component={AddNewProject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;