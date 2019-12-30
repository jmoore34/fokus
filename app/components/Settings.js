import React, { Component } from 'react';
import styles from './Settings.css';

export default class Settings extends Component {
  render() {
    return (
      <div
        className={`${styles.button} ${this.props.selected &&
        styles.buttonSelected}`}
        onClick={() => {
          if (!this.props.disabled) {
            this.props.onClick();
          }
        }}
      >
        <IoMdSettings />
        <div> {this.props.children} </div>
        <div className={styles.desc}> {this.props.desc} </div>
      </div>
    );
  }
}
