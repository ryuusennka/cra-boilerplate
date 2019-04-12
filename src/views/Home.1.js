import React from 'react';
// 对传入的 Component 进行 withMouse 功能增强
const withMouse = Component => {
  return class extends React.Component {
    state = { x: 0, y: 0 };
    handleMouseMove = event => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };
    render() {
      return (
        <div
          style={{ position: 'fixed', top: 40, left: 0, right: 0, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
        >
          {/* 这里的 this.props 是因为高阶组件还可以接收其它的属性 */}
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  };
};

const App = props => {
  const { x, y } = props.mouse;
  return (
    <h1>
      The mouse position is ({x}, {y}), {props.name}
    </h1>
  );
};

// export default withMouse(App); // 正确的  不能传数据
// 但是如果这样的话，高阶组件也是可以嵌套的，如果嵌套太多，比如：
// const AppWithMouse = withRouter(connect(withMouse(App))); 就会看起来不知道内容来自
// 哪一个组件的 如果你去 props.route 的时候, connect 提供了一个 props.route,而 withRouter
// 也提供了一个 props.router,你很不明确应该取哪一个 props
const WithMouseComponent = withMouse(App);

// export default <WithMouseComponent />; // 错误的

// 下面也是正确的，并且可以传数据，相比上面的写法也变了
export default class extends React.Component {
  render() {
    return <WithMouseComponent name="foobar" />;
  }
}
