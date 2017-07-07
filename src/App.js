import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Snake from './Snake/Snake';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/snake" component={Snake}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
