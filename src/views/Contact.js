import React, { Component } from 'react';
import qs from 'querystring';
export default class Contact extends Component {
  constructor(props) {
    super(props);
    console.table(this.props);
    console.log(qs.parse(this.props.location.search.substr(1)));
    var obj = { foobar: '我是谁' };
    console.log(qs.stringify(obj));
    console.log(JSON.stringify(obj));
  }
  redirectTo() {
    this.props.history.push('/home');
  }
  render() {
    return (
      <div>
        <div>Hello Contact!</div>
        <button
          className="btn btn-link"
          onClick={() => this.redirectTo('/home')}
        >
          Go Home
        </button>
      </div>
    );
  }
}
