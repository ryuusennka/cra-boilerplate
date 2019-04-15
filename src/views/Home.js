import React, { Component } from 'react';

class Wrapper extends Component {
  componentDidMount() {
    console.log(React.Children);
  }
  render() {
    return (
      <ol>
        {React.Children.map(this.props.children, child => {
          return <li>{child}</li>;
        })}
      </ol>
    );
  }
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <span>a</span>
          <span>b</span>
          <span>c</span>
        </Wrapper>
      </div>
    );
  }
}
