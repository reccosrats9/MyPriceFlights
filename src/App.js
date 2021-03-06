import React, { Component } from 'react';
import './reset.css'
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router-dom'

class App extends Component {
 

  render() {
    return (
      <div className= 'App'>
      <div id='backgroundImg'/>
        <Nav />
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
