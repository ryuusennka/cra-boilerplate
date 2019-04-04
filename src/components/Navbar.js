import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
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
    );
  }
}
