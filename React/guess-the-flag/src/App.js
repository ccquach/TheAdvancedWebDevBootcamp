import React, { Component } from 'react';
import './App.css';
import FlagGame from './FlagGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Guess The Flag!</h1>
        </header>
        <FlagGame />
      </div>
    );
  }
}

export default App;
