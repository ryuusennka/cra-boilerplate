import React, { Component } from 'react';

class AlertComponent extends Component {
  showAlert(message) {
    alert(`Debug: ${message}`);
  }
  render() {
    return null;
  }
}

export default class Home extends Component {
  handleClick = () => {
    this.refs.alert.showAlert('MyTitle');
  };
  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.handleClick}>
          click me
        </button>
        <AlertComponent ref="alert" />
      </div>
    );
  }
}
