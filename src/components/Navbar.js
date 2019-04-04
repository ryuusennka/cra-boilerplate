import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const Nav = props => {
  return (
    <li
      className="nav-item"
      onClick={() => props.handleChange('active', props.text)}
    >
      <Link className={props.classes} to={props.to}>
        {props.text}
      </Link>
    </li>
  );
};

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navlist: [
        { to: '/', text: 'home', classes: 'nav-link' },
        { to: '/about', text: 'about', classes: 'nav-link' },
        { to: '/contact', text: 'contact', classes: 'nav-link' },
      ],
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
        {this.state.navlist.map((item, index) => {
          if (item.text === this.state.active) {
            item.classes = `nav-link active`;
          } else {
            item.classes = `nav-link`;
          }
          return <Nav {...item} key={index} handleChange={this.handleChange} />;
        })}
        {/* <li className="nav-item">
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
        </li> */}
      </ul>
    );
  }
}
