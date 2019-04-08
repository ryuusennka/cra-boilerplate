import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'home',
    };
  }
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link
            className={classnames(
              'nav-link',
              this.state.active === 'home' ? 'active' : ''
            )}
            to="/"
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
          >
            contact
          </Link>
        </li>
      </ul>
    );
  }
}
