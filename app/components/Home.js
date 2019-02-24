// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};



export default class Home extends Component<Props> {
  //<div className="centered">
  props: Props;

  render() {
    return (
      <div>
      <div className={styles.grad}>
        <div className={styles.split+" "+styles.left}>
          <div className={styles.centered}>
            <div className={styles.button+" "+styles.buttonBlue}>
              <h2>Work</h2>
            </div>
            <p>Click here to begin working</p>
          </div>
        </div>

        <div className={styles.split+" "+styles.right}>
          <div className={styles.centered}>
            <div className={styles.button+" "+styles.buttonOrange}>
              <h2>Play</h2>
            </div>
            <p>Click here to begin playing</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
