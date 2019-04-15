import React, { Component } from 'react';
import axios from 'axios';

class AlertComponent extends Component {
  showAlert(message) {
    alert(`Debug: ${message}`);
  }
  render() {
    return null;
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cancle: null,
    };
  }

  handleClick = () => {
    this.refs.alert.showAlert('MyTitle');
  };
  componentDidMount() {
    axios({
      url: 'http://jsonplaceholder.typicode.com/comments',
      method: 'GET',
      cancelToken: new axios.CancelToken(c => {
        // 这个参数 c 就是 CancelToken 构造函数里面自带的取消请求的函数，这里把该函数当参数用
        this.cancle = c;
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      this.cancle('主动取消');
    }, 100);
  }
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
