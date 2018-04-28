import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Homepage = () => (<div>HOMEPAGE</div>);
const About = () => (<div>ABOUT</div>);

const SwitchDemo = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/" component={Homepage} />
  </Switch>
)

export default SwitchDemo;