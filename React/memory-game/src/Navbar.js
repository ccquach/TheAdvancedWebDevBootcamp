import React from 'react';
import './Navbar.css';

const Navbar = ({onNewGame}) => (
  <header>
    <h1><a>Memory Game</a></h1>
    <nav>
      <li><a onClick={onNewGame}>New Game</a></li>
    </nav>
  </header>
);

export default Navbar;