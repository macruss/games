import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Games</h1>
        <ol className="list">
          <li>
             <Link to='/snake'>Snake</Link>
          </li>
        </ol>
      </div>
    );
  }
}

export default Home;