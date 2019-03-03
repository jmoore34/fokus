// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import {remote} from 'electron';
import format from "format-duration";




export default class Counter extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);
    this.getRemainingTime = this.getRemainingTime.bind(this);
    this.close = this.close.bind(this);
    this.state = { remaining: this.getRemainingTime() };
  }

  componentDidMount(){
    this.interval = setInterval(
      ()=> this.tick(), 1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  getRemainingTime() {
    const status = remote.getGlobal("getCurrentStatus")();
    const startTime = status.startTime.valueOf();
    return (startTime + status.duration) - Date.now();
  }

  tick(){
    this.setState({remaining: this.getRemainingTime()});
    if(this.state.remaining <= 0){
      this.close();
    }
  }

  close() {
    remote.getGlobal("goToMainMode")();
    remote.getCurrentWindow().close();
  }


  render() {

    const status = remote.getGlobal("getCurrentStatus")();

    return (
    <div>
      <div className = {`${styles.mockup} ${styles.draggable}`}>Time Remaining: {format(this.state.remaining)}</div>
      <div className = {`${styles.mockup} ${styles.draggable}`}> Task: {status.taskName} ({status.play ? "play" : "focus"})</div>
      <div className = {`${styles.mockup} ${styles.close}`} onClick={this.close}>[x]</div>
    </div>
    )
}
}
