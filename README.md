<!-- TOC -->

- [react 基础](#react-基础)
  - [上下文](#上下文)
  - [高阶组件](#高阶组件)
  - [defaultProps 和类型检查 PropTypes](#defaultprops-和类型检查-proptypes)
- [react-router-dom](#react-router-dom)
  - [获取参数路由：](#获取参数路由)
  - [获取页面传参](#获取页面传参)
  - [页面跳转](#页面跳转)
- [性能优化](#性能优化)
  - [使用 shouldComponentUpdate](#使用-shouldcomponentupdate)
  - [PureComponent](#purecomponent)
  - [使用 React.Fragment 像 Vue 使用 template 那样输出](#使用-reactfragment-像-vue-使用-template-那样输出)
  - [想要返回多个元素而不添加顶级元素的三种方法：](#想要返回多个元素而不添加顶级元素的三种方法)
    - [第一种： 使用数组](#第一种-使用数组)
    - [第二种： 使用 Fragment](#第二种-使用-fragment)
    - [第三种： 使用高阶组件](#第三种-使用高阶组件)
- [技巧](#技巧)
  - [使用 react-powerplug 简化代码](#使用-react-powerplug-简化代码)
- [其它资料](#其它资料)

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

# 其它资料

- [ReactJS 中文文档](https://react.docschina.org/docs/higher-order-components.html)
- [ReactJS 官方文档](https://reactjs.org/)
