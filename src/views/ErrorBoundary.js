import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };
  /**
   * 类似于 try / catch
   * 它会捕获一些错误，接收的两个参数是生命周期函数所规定好的
   * 如果有错误就把 error, errorInfo 放进 state 中去
   * 也就是说当这个子组件发生错误之后，就会触发 componentDidCatch 事件
   *
   * @param {*} error
   * @param {*} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }
  render() {
    return this.state.hasError ? (
      <React.Fragment>
        <div>Oops, error occurred.</div>
        <div>{this.state.error && this.state.error.toString()}</div>
        <div>{this.state.errorInfo && this.state.errorInfo.componentStack}</div>
      </React.Fragment>
    ) : (
      // 等于说这是一个父组件，它接收子组件
      this.props.children
    );
  }
}
