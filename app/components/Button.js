import React, { Component } from 'react';
import styles from './Button.css';

export default class Button extends Component {
  render() {
    return (
      <div
        className={`${this.props.orange && styles.buttonOrange} ${this.props
          .blue && styles.buttonBlue} ${styles.button} ${this.props.selected &&
          !this.props.disabled &&
          styles.buttonSelected}`}
        onClick={() => {
          this.props.onClick();
        }
        }
      >
        <div> {this.props.children} </div>
        <div className={styles.desc}> {this.props.desc} </div>
      </div>
    );
  }
}
