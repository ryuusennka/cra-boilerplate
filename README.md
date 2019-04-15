- [react 基础](#react-%E5%9F%BA%E7%A1%80)
  - [上下文](#%E4%B8%8A%E4%B8%8B%E6%96%87)
  - [高阶组件 higher-order components(HOC)](#%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6-higher-order-componentshoc)
  - [defaultProps 和类型检查 PropTypes](#defaultprops-%E5%92%8C%E7%B1%BB%E5%9E%8B%E6%A3%80%E6%9F%A5-proptypes)
  - [使用 React render prop components 替代 HOC 高阶组件](#%E4%BD%BF%E7%94%A8-react-render-prop-components-%E6%9B%BF%E4%BB%A3-hoc-%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
  - [React State without a Constructor](#react-state-without-a-constructor)
  - [错误边界](#%E9%94%99%E8%AF%AF%E8%BE%B9%E7%95%8C)
  - [react 生命周期](#react-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [一切都可以做成组件](#%E4%B8%80%E5%88%87%E9%83%BD%E5%8F%AF%E4%BB%A5%E5%81%9A%E6%88%90%E7%BB%84%E4%BB%B6)
    - [alert 组件](#alert-%E7%BB%84%E4%BB%B6)
- [react-router-dom](#react-router-dom)
  - [获取参数路由：](#%E8%8E%B7%E5%8F%96%E5%8F%82%E6%95%B0%E8%B7%AF%E7%94%B1)
  - [获取页面传参](#%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E4%BC%A0%E5%8F%82)
  - [页面跳转](#%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC)
- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
  - [componentWillUnmount](#componentwillunmount)
  - [使用 shouldComponentUpdate](#%E4%BD%BF%E7%94%A8-shouldcomponentupdate)
  - [PureComponent](#purecomponent)
  - [使用 React.Fragment 像 Vue 使用 template 那样输出](#%E4%BD%BF%E7%94%A8-reactfragment-%E5%83%8F-vue-%E4%BD%BF%E7%94%A8-template-%E9%82%A3%E6%A0%B7%E8%BE%93%E5%87%BA)
  - [想要返回多个元素而不添加顶级元素的三种方法：](#%E6%83%B3%E8%A6%81%E8%BF%94%E5%9B%9E%E5%A4%9A%E4%B8%AA%E5%85%83%E7%B4%A0%E8%80%8C%E4%B8%8D%E6%B7%BB%E5%8A%A0%E9%A1%B6%E7%BA%A7%E5%85%83%E7%B4%A0%E7%9A%84%E4%B8%89%E7%A7%8D%E6%96%B9%E6%B3%95)
    - [第一种： 使用数组](#%E7%AC%AC%E4%B8%80%E7%A7%8D-%E4%BD%BF%E7%94%A8%E6%95%B0%E7%BB%84)
    - [第二种： 使用 Fragment](#%E7%AC%AC%E4%BA%8C%E7%A7%8D-%E4%BD%BF%E7%94%A8-fragment)
    - [第三种： 使用高阶组件](#%E7%AC%AC%E4%B8%89%E7%A7%8D-%E4%BD%BF%E7%94%A8%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
- [技巧](#%E6%8A%80%E5%B7%A7)
  - [使用 react-powerplug 简化代码](#%E4%BD%BF%E7%94%A8-react-powerplug-%E7%AE%80%E5%8C%96%E4%BB%A3%E7%A0%81)
  - [显示或隐藏，少写一个 return](#%E6%98%BE%E7%A4%BA%E6%88%96%E9%9A%90%E8%97%8F%E5%B0%91%E5%86%99%E4%B8%80%E4%B8%AA-return)
- [其它资料](#%E5%85%B6%E5%AE%83%E8%B5%84%E6%96%99)

# react 基础

## 上下文

下面的例子是实现一个层层传递的例子：

```js
import React, { Component } from 'react';

const Topic = props => {
  return (
    <div>
      <Comment color={props.color} />
    </div>
  );
};

const Comment = props => {
  return <div>{props.color}</div>;
};
export default class Home extends Component {
  render() {
    return (
      <div>
        <Topic color="red" />
      </div>
    );
  }
}
```

我实际需要从 App -> Comment, 但是这确是一层一层的传下去的。

这个时候就可以使用上下文：

```js
---
+++
@@ -1,22 +1,35 @@
 import React, { Component } from 'react';
+import PropTypes from 'prop-types';

 const Topic = props => {
   return (
     <div>
-      <Comment color={props.color} />
+      <Comment />
     </div>
   );
 };

-const Comment = props => {
-  return <div>{props.color}</div>;
+const Comment = (props, context) => {
+  return <div>{context.color}</div>;
 };
 export default class Home extends Component {
+  getChildContext() {
+    // return 一个对象，里面的内容是我们想要传递的数据
+    return {
+      color: 'red',
+    };
+  }
   render() {
     return (
       <div>
-        <Topic color="red" />
+        <Topic />
       </div>
     );
   }
 }
\ No newline at end of file
+Home.childContextTypes = {
+  color: PropTypes.string,
+};
+Comment.contextTypes = {
+  color: PropTypes.string,
+};

```

简化一下也就是

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Comment = (props, context) => {
  return <div>{context.word}</div>;
};

export default class Home extends Component {
  getChildContext() {
    return {
      word: 'hello world!',
    };
  }
  render() {
    return (
      <div>
        <Comment />
      </div>
    );
  }
}

Home.childContextTypes = {
  word: PropTypes.string,
};

Comment.contextTypes = {
  word: PropTypes.string,
};
```

## 高阶组件 higher-order components(HOC)

什么是高阶组件？

> 高阶组件（HOC）是 react 中的高级技术，用来重用组件逻辑。 但高阶组件本身并不是 React API。
> 它只是一种模式，这种模式是由 react 自身的组合性质必然产生的。
>
> 具体而言，**高阶组件**就是一个**函数**，且该函数**接受一个组件作为参数，并返回一个新的组件。**

```js
import React, { Component } from 'react';
const PropsLogger = WrapperComponent => {
  return class extends Component {
    render() {
      return <WrapperComponent {...this.props} />;
    }
  };
};

const Hello = PropsLogger(props => {
  return <p>Hello, {props.name}</p>;
});

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello name="rails365" />
      </div>
    );
  }
}
```

实例： loading

```js
import React, { Component } from 'react';
const PropsLogger = WrapperComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        jokes: null,
      };
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    }

    render() {
      if (this.state.loading) {
        return <div>loading...</div>;
      } else {
        return <WrapperComponent {...this.props} />;
      }
    }
  };
};

const Hello = PropsLogger(props => {
  return <p>Hello, {props.name}</p>;
});

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello name="rails365" />
      </div>
    );
  }
}
```

## defaultProps 和类型检查 PropTypes

在下面这个例子中，父组件调用子组件由于某些原因，没有传递 `name` 属性，Hello 组件输出`Hello,`

```js
import React, { Component } from 'react';

// 一个无状态组件
const Hello = props => {
  return <h1>Hello , {props.name}</h1>;
};

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello />
      </div>
    );
  }
}
```

添加默认值——方法一：

```js
import React, { Component } from 'react';

// 一个无状态组件
const Hello = props => {
  return <h1>Hello , {props.name}</h1>;
};

+ // 添加默认值
+ Hello.defaultProps = {
+   name: 'React',
+ };

+ 或者


export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello name="react" />
      </div>
    );
  }
}

```

添加默认值——方法 2：

```js
---
+++
@@ -1,22 +1,29 @@
 import React, { Component } from 'react';
 import PropTypes from 'prop-types';

 // 一个无状态组件
-const Hello = props => {
-  return <h1>Hello , {props.name}</h1>;
-};
+// const Hello = props => {
+// 改成有状态组件
+class Hello extends Component {
+  static defaultProps = {
+    name: 'React',
+  };
+  render() {
+    return <h1>Hello , {this.props.name}</h1>;
+  }
+}

 // 添加默认值
-Hello.defaultProps = {
-  name: 'React',
-};
+// Hello.defaultProps = {
+//   name: 'React',
+// };

 export default class Home extends Component {
   render() {
     return (
       <div>
-        <Hello name="react" />
+        <Hello name="foobar" />
       </div>
     );
   }
 }

```

静态类型检查：

```js
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Hello extends Component {
  static propTypes = {
    money: propTypes.number,
  };
  render() {
    return <div>Hello, {this.props.money.toFixed(2)}</div>;
  }
}

// 或者
// Hello.propTypes = {
//   name: propTypes.number
// }

export default class Home extends Component {
  render() {
    return (
      <div>
        <Hello money={'99'} />
      </div>
    );
  }
}
```

静态类型检查还可以加 `isRequired` 作为必传项：

```js
---
+++
@@ -1,13 +1,13 @@
 import React, { Component } from 'react';
 import propTypes from 'prop-types';

 class Hello extends Component {
   static propTypes = {
     money: propTypes.number,
-    name: propTypes.string,
+    name: propTypes.string.isRequired,
   };
   render() {
     return (
       <div>
         Hello, {this.props.name}, you got money: {this.props.money.toFixed(2)}
       </div>
@@ -16,11 +16,11 @@
 }

 export default class Home extends Component {
   render() {
     return (
       <div>
-        <Hello name={'100'} money={99} />
+        <Hello name="sennka" money={99} />
       </div>
     );
   }
 }

```

例子： 可以传入的是多种

```js
static propTypes = {
  children: propTypes.oneOfType([ // 下面两种类型其中之一
    PropTypes.node, // 单个的是组件节点
    PropTypes.arrayOf(PropTypes.node) // 或者是数组的
  ]).isRequired
}

```

## 使用 React render prop components 替代 HOC 高阶组件

能够用高阶组件实现的东西，也能用 Render Props 实现，而且`Render Props`比高阶组件还有更多的好处。

```js
import React from 'react';
import propTypes from 'prop-types';
// 对传入的 Component 进行 withMouse 功能增强
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  static propTypes = {
    render: propTypes.func.isRequired,
  };

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
        {/* <Component {...this.props} mouse={this.state} /> */}
        {/* 这里就没有传进来的组件了,这里取参数的方法很明确，就是this.state */}
        {this.props.render(this.state, this.props, 'foobar')}
      </div>
    );
  }
}

const Position = ({ x, y }) => (
  <h1>
    The mouse position is {x}, {y}
  </h1>
);

const App = props => {
  return (
    <React.Fragment>
      <Mouse render={props => <Position {...props} />} />
    </React.Fragment>
  );
};

export default App;
```

## React State without a Constructor

比较下面代码有什么区别：

```js
export default class Home extends Component {
  state = {
    x: 0,
    y: 0,
  };
  render() {
    return <div />;
  }
}
```

和

```js
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }
  render() {
    return <div />;
  }
}
```

## 错误边界

有时候，由于一个组件的错误(或说崩溃)，会导致整个页面一个空白。但是我们希望如果组件出错了，就不显示
这个组件，其它的还是应该显示。

## react 生命周期

[http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![image](https://wx2.sinaimg.cn/large/006vbNRogy1g231ft2w9ej30zj0i5af8.jpg)

![lifecycle](docs/assets/images/README-20190415141657.png)

## 一切都可以做成组件

### alert 组件

```js
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
```

# react-router-dom

## 获取参数路由：

```jsx
<Route path="/news/:id" component={News} />
<Link to="/news/100">
```

```js
import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return <div>Hello World!</div>;
  }
}
```

## 获取页面传参

```js
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
  render() {
    return <div>Hello Contact!</div>;
  }
}
```

## 页面跳转

函数式页面跳转

```js
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
+  redirectTo() {
+    this.props.history.push('/home');
+  }
  render() {
-     return <div>Hello Contact!</div>;
+    return (
+      <div>
+        <div>Hello Contact!</div>
+        <button
+          className="btn btn-link"
+          onClick={() => this.redirectTo('/home')}
+        >
+          Go Home
+        </button>
+      </div>
    );
  }
}

```

# 性能优化

## componentWillUnmount

在组件从 DOM 中移除的时候立刻被调用。

在该方法中执行任何必要的清理，比如无效的定时器，或者清除在 componentDidMount 中创建的 DOM 元素，
或者取消耗时长的请求。

```js
componentWillUnmount() {
  axios({
    url: 'http://jsonplaceholder.typicode.com/comments',
    method: 'GET',
    cancelToken: new axios.CancelToken(c => {
      // 这个参数 c 就是 CancelToken 构造函数里面自带的取消请求的函数，这里把该函数当参数用
      this.cancle = c;
    }),
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  setTimeout(() => {
    this.cancle('主动取消');
  }, 100);
}
```

## 使用 shouldComponentUpdate

如果你要重写这个方法，你需要返回一个 true 或 false。

使用 `shouldComponentUpdate` 的时候， 可以返回一个 boolean ，

如果是 false， 则不会重新渲染页面，如果是 true 则重新渲染页面。

当配合无状态组件的时候， 我们希望如果每次(setInterval)传入的值跟之前的值没有变化，则不渲染
页面，以便优化新能。

```js
const Temp = props => {
  console.log('render Temp');
  return <div>{props.val}</div>;
};
```

```js
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        val: this.state.val, // 即是 val 的值保持不变，但是 render, render Temp 一直在渲染变化
      });
    }, 1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(`nextState is: `, nextState);
    return this.state.val === nextState.val ? false : true;
  }
  render() {
    console.log('render');
    return (
      <div>
        <div>Hello World!</div>
        <Temp val={this.state.val} />
      </div>
    );
  }
}
```

会只循环地输出 `nextState is: {val: 1}`

## PureComponent

```js
import React, { Component, PureComponent } from 'react';
class Temp extends PureComponent {
  render() {
    console.log('render Temp');
    return <div>{this.props.val}</div>;
  }
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        val: this.state.val, // 即是 val 的值保持不变，但是 render, render Temp 一直在渲染变化
      });
    }, 1000);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(`nextState is: `, nextState);
  //   return this.state.val === nextState.val ? false : true;
  // }
  render() {
    console.log('render app');
    return (
      <div>
        <div>Hello World!</div>
        <Temp val={this.state.val} />
      </div>
    );
  }
}
```

这个 `render app` 会一直输出着，但是 `render Temp` 却不会重新渲染。

## 使用 React.Fragment 像 Vue 使用 template 那样输出

```js
import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['复读机1', '复读机2'],
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <li>{item}</li>
                <li>{item}</li>
                <li>{item}</li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
}
```

这个链接可以：[https://pawelgrzybek.com/return-multiple-elements-from-a-component-with-react-16/](https://pawelgrzybek.com/return-multiple-elements-from-a-component-with-react-16/)可以看更多的这种用法

## 想要返回多个元素而不添加顶级元素的三种方法：

我们想要组件返回一个 `<h1>`和`<p>` ，一般来说需要把用一个顶级的 `<div>` 把它们包裹起来：

```js
const SomeComponent = ({ name }) => {
  return (
    <div>
      <h1>Hello React</h1>
      <p>Hello, {name}</p>
    </div>
  );
};
```

不过这样就多出来了一个不期望的 `<div>`元素，下面将介绍三种不用多出这个 `<div>` 元素的方法：

### 第一种： 使用数组

```js
const SomeComponent = ({ name }) => {
  return [<h1 key="h1">Hello React</h1>, <p key="p">Hello, {name}</p>];
};
```

### 第二种： 使用 Fragment

```js
const SomeComponent = ({ name }) => {
  return (
    <React.Fragment>
      <h1>Hello React</h1>
      <p>Hello, {name}</p>
    </React.Fragment>
  );
};
```

### 第三种： 使用高阶组件

```js
// const Wrapper = ({ children }) => {
//   console.log(children);
//   return children;
// };
// output:  [{…}, {…}]
const Wrapper = ({ children }) => children;

const SomeComponent = ({ name }) => {
  return (
    <Wrapper>
      <h1>Hello React</h1>
      <p>Hello, {name}</p>
    </Wrapper>
  );
};
```

**注意**:

```js
const Wrapper = ({ children }) => children;
// 这个相关于
const Wrapper = props => props.children;
```

这样更容易理解些吧？

以上。第二种、第三种都不用传入 key， 简单一些。

不过第三种也有人说：

> 我觉得这里不应该称之为高阶组件，Wrapper 是一个函数，但是并没有把组件作为参数，也并没有把组件作为返回值。 Wrapper 就是一个无状态组件，算不上高阶组件
>
> [@Muyu](https://www.rails365.net/users/2920)

# 技巧

## 使用 react-powerplug 简化代码

这是一个 counter 的例子

```js
import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }
  increment = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };
  decrement = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button className="btn btn-danger" onClick={this.decrement}>
          Decrement
        </button>
        <button className="btn btn-success" onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}
```

使用了 `react-powerplug` 以后可以简化成下面的样子：

```js
---
+++
@@ -1,33 +1,31 @@
 import React, { Component } from 'react';
+import { State } from 'react-powerplug';

 export default class Home extends Component {
-  constructor(props) {
-    super(props);
-
-    this.state = {
-      counter: 0,
-    };
+  shouldComponentUpdate(state, nextState) {
+    console.log('不会触发 shouldComponentUpdate');
   }
-  increment = () => {
-    this.setState({
-      counter: this.state.counter + 1,
-    });
-  };
-  decrement = () => {
-    this.setState({
-      counter: this.state.counter - 1,
-    });
-  };
-
   render() {
     return (
       <div>
-        <h1>Counter: {this.state.counter}</h1>
-        <button className="btn btn-danger" onClick={this.decrement}>
-          Decrement
-        </button>
-        <button className="btn btn-success" onClick={this.increment}>
-          Increment
-        </button>
+        <State initial={{ counter: 0 }}>
+          {({ state, setState }) => (
+            <div>
+              <h1>Counter: {state.counter}</h1>
+              <button
+                className="btn btn-danger"
+                onClick={() => setState({ counter: state.counter - 1 })}
+              >
+                Decrement
+              </button>
+              <button
+                className="btn btn-success"
+                onClick={() => setState({ counter: state.counter + 1 })}
+              >
+                Increment
+              </button>
+            </div>
+          )}
+        </State>
-      </div>
-    );
\ No newline at end of file
+      </div>
+    );

```

简单的例子：

```js
import React, { Component } from 'react';
import { State } from 'react-powerplug';

export default class Home extends Component {
  shouldComponentUpdate(state, nextState) {
    console.log('不会触发 shouldComponentUpdate');
  }
  render() {
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
      </div>
    );
  }
}
```

## 显示或隐藏，少写一个 return

如果 toggle 为真，显示 List 组件

```js
{
  this.state.toggle && <List list={list} />;
}
```

例子

```js
import React, { Component } from 'react';

const list = ['a', 'b', 'c'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
    };
  }

  onToggleList = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  };

  render() {
    return (
      <div>
        <Toggle toggle={this.state.toggle} onToggleList={this.onToggleList} />
        {this.state.toggle && <List list={list} />}
      </div>
    );
  }
}

const Toggle = ({ toggle, onToggleList }) => (
  <button type="button" onClick={onToggleList}>
    {toggle ? 'Hide' : 'Show'}
  </button>
);

const List = ({ list }) => (
  <ul>
    {list.map(item => (
      <Item key={item} item={item} />
    ))}
  </ul>
);

const Item = ({ item }) => <li>{item}</li>;

export default App;
```

# 其它资料

- [ReactJS 中文文档](https://react.docschina.org/docs/higher-order-components.html)
- [ReactJS 官方文档](https://reactjs.org/)
