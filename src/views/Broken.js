import React, { Component } from 'react';

export default class Broken extends Component {
  render() {
    return (
      <div>
        {null.map(item => (
          <div>{item}</div>
        ))}
      </div>
    );
  }
}
