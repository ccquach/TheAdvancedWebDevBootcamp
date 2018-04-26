import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import FlagGame from './FlagGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <FlagGame />
      </div>
    );
  }
}

export default App;
