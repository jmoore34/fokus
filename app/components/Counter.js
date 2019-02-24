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
  tick(){
    const state = remote.getGlobal("getCurrentStatus")();
    const startTime = state.startTime.valueOf();
    this.setState({remaining: (startTime + state.duration) - Date.now()});
    console.log(state.remaining, startTime, state.duration, ((startTime + state.duration) - Date.now()));

  }
  render() {

    const state = remote.getGlobal("getCurrentStatus")();

    return (
    <div>
      <div className = {styles.mockup}>Time Remaining: {format(this.state.remaining)}</div>
      <div className = {styles.mockup}> Task: {state.name} ({state.play ? "play" : "focus"})</div>
    </div>
    )
}
}
