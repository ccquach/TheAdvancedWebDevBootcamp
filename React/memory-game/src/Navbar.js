import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <header>
        <h1><a>Memory Game</a></h1>
        <h3><a onClick={this.props.onNewGame}>New Game</a></h3>
      </header>
    );  
  }
}

export default Navbar;