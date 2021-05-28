import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      
      <Router>
        <Switch>
            <Navbar />
            <Route exact path="/"> <Home /> </Route>
        </Switch>
      </Router>
      

    </div>
  );
}

export default App;
