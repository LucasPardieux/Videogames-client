import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
//components
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';
import Details from './components/Details/Details';
import CreateGame from './components/CreateGame/CreateGame';
import Favorite from './components/Favorite/Favorite';


function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={Landing} />
      <>
      <Route path='/' component={Nav} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/details/:idGame' component={Details} />
      <Route exact path='/createVideogame' component={CreateGame} />
      <Route exact path='/favorites' component={Favorite} />
      </>
      
      </Switch>
    </BrowserRouter>
  );
}

export default App;
