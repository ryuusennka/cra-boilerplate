import React, { Component } from 'react';
import { State, Toggle } from 'react-powerplug';

export default class Home extends Component {
  shouldComponentUpdate(state, nextState) {
    console.log('不会触发 shouldComponentUpdate');
  }
  componentDidUpdate() {
    console.log('1');
  }
  render() {
    var obj = {};
    obj.flag = true;
    return (
      <div>
        <State initial={{ counter: 0 }}>
          {({ state, setState }) => (
            <div>
              <h1>Counter: {state.counter}</h1>
              <button
                className="btn btn-danger"
                onClick={() => setState({ counter: state.counter - 1 })}
              >
                Decrement
              </button>
              <button
                className="btn btn-success"
                onClick={() => setState({ counter: state.counter + 1 })}
              >
                Increment
              </button>
            </div>
          )}
        </State>
        <Toggle initial={obj.flag}>
          {({ on, toggle }) => (
            <div>
              <input type="checkbox" onChange={toggle} checked={on} />
              {obj.flag}
            </div>
          )}
        </Toggle>
      </div>
    );
  }
}
