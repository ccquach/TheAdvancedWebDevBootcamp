import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <header>
        <h1><a>Recipe App</a></h1>
        <nav>
          <li><a>New Recipe</a></li>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Contact Us</a></li>
        </nav>
      </header>
    );
  }
}

export default NavBar;