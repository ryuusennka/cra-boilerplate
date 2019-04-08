<!-- TOC -->

- [react 基础](#react-%E5%9F%BA%E7%A1%80)
  - [上下文](#%E4%B8%8A%E4%B8%8B%E6%96%87)
  - [高阶组件](#%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
- [react-router-dom](#react-router-dom)
  - [获取参数路由：](#%E8%8E%B7%E5%8F%96%E5%8F%82%E6%95%B0%E8%B7%AF%E7%94%B1)
  - [获取页面传参](#%E8%8E%B7%E5%8F%96%E9%A1%B5%E9%9D%A2%E4%BC%A0%E5%8F%82)
  - [页面跳转](#%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC)
- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
  - [使用 shouldComponentUpdate](#%E4%BD%BF%E7%94%A8-shouldcomponentupdate)
  - [PureComponent](#purecomponent)
  - [使用 React.Fragment 像 Vue 使用 template 那样输出](#%E4%BD%BF%E7%94%A8-reactfragment-%E5%83%8F-vue-%E4%BD%BF%E7%94%A8-template-%E9%82%A3%E6%A0%B7%E8%BE%93%E5%87%BA)
- [技巧](#%E6%8A%80%E5%B7%A7)
  - [使用 react-powerplug 简化代码](#%E4%BD%BF%E7%94%A8-react-powerplug-%E7%AE%80%E5%8C%96%E4%BB%A3%E7%A0%81)

<!-- /TOC -->

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

## 高阶组件

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

## 使用 shouldComponentUpdate

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