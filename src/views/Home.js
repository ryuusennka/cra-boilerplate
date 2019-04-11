import React, { Component } from 'react';
import propTypes from 'prop-types';

class Hello extends Component {
  static propTypes = {
    money: propTypes.number,
    name: propTypes.string.isRequired,
  };
  render() {
    return (
      <div>
        Hello, {this.props.name}, you got money: {this.props.money.toFixed(2)}
      </div>
    );
  }
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello name="sennka" money={99} />
      </div>
    );
  }
}
