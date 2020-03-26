import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';
//import Home from './Home';
import Trainings from './components/Traininglist';
import Customers from './components/Customerlist';




function App() {





  return (
    <BrowserRouter>
    <div className="App">
          <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
            Personal Trainer
          </Typography>
          <Link className="nav-link"to="/">Customers</Link>
          <Link className="nav-link"to="/trainings">Trainings</Link>
          <Link className="nav-link"to="/contact">Calendar</Link>  
        </Toolbar>
      </AppBar>
      <Switch>
          <Route exact path="/" component={Customers} />
          <Route path="/trainings" component={Trainings} />
          <Route render={() => <h1>Page not found</h1>}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
