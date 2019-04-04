import styles, { d1 } from './style.module.scss';
import React, { Component } from 'react';
import classnames from 'classnames';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className={d1}>asd</div>
        <h1 className={styles.foo}>hasd</h1>
        <div className={classnames(true && styles.d1)}>asd</div>
      </div>
    );
  }
}
