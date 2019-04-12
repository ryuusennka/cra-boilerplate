import React, { Component } from 'react';
import Broken from './Broken';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  state = {
    counter: 0,
  };

  increment = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  decrement = () => {
    this.setState(prevState => ({ counter: prevState.counter - 1 }));
  };

  render() {
    return (
      <div className="App">
        <h1>Hello React</h1>
        <hr />
        <div>Counter: {this.state.counter}</div>
        <button className="btn btn-success" onClick={this.increment}>
          Increment
        </button>
        <button className="btn btn-danger" onClick={this.decrement}>
          Decrement
        </button>
        <hr />
        <ErrorBoundary>
          <Broken />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
