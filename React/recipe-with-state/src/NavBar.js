import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

class NavBar extends Component {
  static defaultProps = {
    onNewRecipe() {}
  }

  static propTypes = {
    onNewRecipe: PropTypes.func
  }

  render() {
    return (
      <header>
        <h1><a>Recipe App</a></h1>
        <nav>
          <li><a onClick={this.props.onNewRecipe}>New Recipe</a></li>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Contact Us</a></li>
        </nav>
      </header>
    );
  }
}

export default NavBar;