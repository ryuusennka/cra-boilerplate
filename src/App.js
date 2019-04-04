import './style.scss';
import React, { Component } from 'react';
import classnames from 'classnames';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'home',
    };
  }
  handleChange = (k, v) => {
    this.setState({
      [k]: v,
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul className="nav">
            <li className="nav-item">
              <Link
                className={classnames(
                  'nav-link',
                  this.state.active === 'home' ? 'active' : ''
                )}
                to="/"
                onClick={() => this.handleChange('active', 'home')}
              >
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classnames(
                  'nav-link',
                  this.state.active === 'about' ? 'active' : ''
                )}
                to="/about"
                onClick={() => this.handleChange('active', 'about')}
              >
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classnames(
                  'nav-link',
                  this.state.active === 'contact' ? 'active' : ''
                )}
                to="/contact"
                onClick={() => this.handleChange('active', 'contact')}
              >
                contact
              </Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
