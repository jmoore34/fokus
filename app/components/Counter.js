// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';
import {remote} from 'electron';
import format from "format-duration";


type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class Counter extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);
    this.state = {remaining: 0}
  }

  componentDidMount(){
    this.interval = setInterval(
      ()=> this.tick(), 1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
  tick(){
    const status = remote.getGlobal("getCurrentStatus")();
    const startTime = status.startTime.valueOf();
    this.setState({remaining: (startTime + status.duration) - Date.now()});
    console.log(status.remaining, startTime, status.duration, ((startTime + status.duration) - Date.now()));
if(this.state.remaining <= 0){
  remote.getGlobal("goToMainMode")();
  remote.getCurrentWindow().close();
}
  }
  render() {

    const status = remote.getGlobal("getCurrentStatus")();

    return (
    <div>
      <div className = {styles.mockup}>Time Remaining: {format(this.state.remaining)}</div>
      <div className = {styles.mockup}> Task: {status.name} ({status.play ? "play" : "focus"})</div>
    </div>
    )
}
}
