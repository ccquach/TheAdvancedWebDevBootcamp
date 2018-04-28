import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SwitchDemo from './SwitchDemo';
import './App.css';

class App extends Component {
  render() {
    const active = { textDecoration: 'none', cursor: 'default', color: 'grey' };
    const defaultStyle = { margin: '5px' };
    return (
      <div className="App">
        <NavLink exact style={defaultStyle} activeStyle={active} to="/">
          HOME
        </NavLink>
        <NavLink exact style={defaultStyle} activeStyle={active} to="/about">
          ABOUT
        </NavLink>
        <div style={{ fontSize: '3em', margin: '25px' }}>
          <SwitchDemo />
        </div>
      </div>
    );
  }
}

export default App;
