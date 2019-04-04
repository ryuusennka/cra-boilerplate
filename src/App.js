// import styles, { d1 } from './style.module.scss';
import React, { Component } from 'react';
// import classnames from 'classnames';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
    );
  }
}
