// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import styled from 'styled-components'
import Button from './Button'
import parseDuration from 'parse-duration'
import { remote } from 'electron';

type Props = {};
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;


const Input = styled.input.attrs({
  type: 'text',
  size: props => (props.small ? 5: undefined),})`
  border-radius: 3px;
  border: 1px solid blue;
  display: block;
  margin: 0 0 1em;
  padding: 15px 32px;
  font-size: 20px;
  ::placeholder {
    color: blue;
  }
  transition: all 0.3s;
`


export default class Home extends Component<Props> {

  constructor(props)
  {
    super(props);
    this.state = {
      working: null,
      duration: null,
      customDuration: false,
      name: ""
    };

    this.getCompletedStages = this.getCompletedStages.bind(this);
    this.submit = this.submit.bind(this);
  }

  getCompletedStages()
  {
    if(this.state.working == null)
      return 0;
    else if(this.state.duration == null || !(parseDuration(this.state.duration)>0) )
      return 1;
    else if(this.state.name == null)
      return 2;
    else 
      return 3;
  }

  submit()
  {
    const status = {
      play: !this.state.working,
      startTime: new Date(),
      taskName: this.state.name,
      //taskNotes: "",
      duration: parseDuration(this.state.duration),
      timerMode: true
    };

    remote.getGlobal("setCurrentStatus")(status);

    remote.getGlobal("goToTimerMode")();
    remote.getCurrentWindow().close();
  }


  render() {
    return (
      <div>
        <Col>
          <Row>
            <Button orange selected={this.state.working} onClick={()=>this.setState({working: true})}>Work</Button>
            <Button blue selected={this.state.working === false} onClick={()=>this.setState({working: false})}>Play</Button>
          </Row>
          <Row className={!(this.getCompletedStages() >= 1) && styles.dim}>
            <Button orange selected={this.state.duration === '10m' && this.state.customDuration === false} onClick={()=>this.setState({duration: '10m', customDuration: false})}>10</Button>
            <Button blue selected={this.state.duration === '15m' && this.state.customDuration === false} onClick={()=>this.setState({duration: '15m', customDuration: false})}>15</Button>
            <Button orange selected={this.state.duration === '30m' && this.state.customDuration === false} onClick={()=>this.setState({duration: '30m', customDuration: false})}>30</Button>
            <Input placeholder="Custom Time" className={!this.state.customDuration && styles.dimtext} value={this.props.duration} onChange={(event)=>{
              this.setState({duration: event.target.value, customDuration: true})
            }}/>
          </Row>
          <Row className={!(this.getCompletedStages() >= 2) && styles.dim}>
            <Input placeholder="Name" value={this.props.name} disabled={!(this.getCompletedStages() >= 2)} onChange={event => {
              this.setState({name: event.target.value})
            }}/>
          </Row>
          <Row className={!(this.getCompletedStages() >= 3) && styles.dim}>
            <Button orange disabled={!(this.getCompletedStages() >= 3) } onClick={this.submit}>Start</Button>
          </Row>
        </Col>
      </div>
    );
  }
}
