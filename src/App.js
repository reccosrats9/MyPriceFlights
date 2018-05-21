import React, { Component } from 'react';
import './App.css';
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'
import Price from './Components/Price/Price'
import Delete from './Components/Delete/Delete'
import Add from './Components/Add/Add'
import Pro from './Components/Pro/Pro'
import Found from './Components/Found/Found'

class App extends Component {
  render() {
    return (
      <div>
          <Landing />
          <Home />
          <Price />
          <Delete />
          <Add />
          <Pro />
          <Found />
      </div>
    );
  }
}

export default App;
