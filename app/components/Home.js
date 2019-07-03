// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import styled from 'styled-components'
import Button from './Button'
import buttonStyle from './Button.css' // I apologize
import parseDuration from 'parse-duration'
import { remote } from 'electron';
import Countdown from 'react-countdown-now'
import  Clock from 'react-live-clock'
type Props = {};
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: stretch;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const Header = styled.div`
  display: block;
  font-size: 60px;
  text-align: center;
`;

const InfoBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
  text-align: left;
  padding-bottom: 8px;
`;

const HideDiv = props => <div style={props.hidden || "display: none"}>{props.children}</div>

const Input = styled.input.attrs({
  type: 'text',
  className: buttonStyle.button,
  size: props => (props.small ? 5 : undefined)
})`
  background-color: white;
  color: black;
  font-size: 25px;
  transition: all 0.3s;
`;


export default class Home extends Component<Props> {
  constructor(props) {
    super(props);

    this.getCompletedStages = this.getCompletedStages.bind(this);
    this.submit = this.submit.bind(this);
    this.getBreakCooldownEnd = this.getBreakCooldownEnd.bind(this);
    this.check = this.check.bind(this);

    // Status of most recent break/play used to see if in cooldown
    const breakCooldownEnd = this.getBreakCooldownEnd();

    this.state = {
      working: null,
      duration: null,
      customDuration: false,
      name: "",
      breakCooldown: Date.now() < breakCooldownEnd.valueOf(), // Break cooldown has not yet finished
      strictMode: true, //whether the UI should be simplified when in cooldown mode
    };

  }



  componentDidMount(){
    this.interval = setInterval(
      ()=> this.check(), 1000
    )
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  // Check whether the break cooldown is over. Called by interval
  check() {
    if (this.getBreakCooldownEnd() <= Date.now()) { //if cooldown has ended
      clearInterval(this.interval); // no need for further checks
      this.setState({breakCooldown: false})
    }
  }


  getBreakCooldownEnd() {
    const {startTime, duration, breakCooldownDuration} = remote.getGlobal("getCurrentStatus")();
    return startTime.valueOf() + duration + breakCooldownDuration;
  }

  getCompletedStages()
  {
    if(this.state.working == null)
      return 0;
    else if(this.state.duration == null || !(parseDuration(this.state.duration)>0) || !this.state.duration.match(/([\d\.]+[hms])+/) )
      return 1;
    else if(this.state.name.length < 8 && this.state.working)
      return 2;
    else
      return 3;
  }

  submit() {
    const currentStatus = remote.getGlobal("getCurrentStatus")();
    const statusChange = {
      play: !this.state.working,
      startTime: new Date(),
      taskName: this.state.name,
      //taskNotes: "",
      duration: parseDuration(this.state.duration),
      timerMode: true
    };

    remote.getGlobal("setCurrentStatus")({...currentStatus, ...statusChange});

    remote.getGlobal("goToTimerMode")();
    remote.getCurrentWindow().close();
  }


  render() {
    return (
      <div>
        <Col>
          <Header>
            <Clock format="h:mm a" ticking/>
          </Header>
          <div className={this.state.breakCooldown && styles.hide}>
            <Row>
              <Button orange
                      selected={this.state.working}
                      onClick={() => this.setState({ working: true })}
                      desc=""
              >Work</Button>
              <Button blue
                      selected={this.state.working === false}
                      onClick={() => this.setState({ working: false })}
                      disabled={this.state.breakCooldown}
                      className={this.state.breakCooldown && styles.dim} //this is so hacky and needs to be refactored
                      desc={this.state.breakCooldown ?
                        <Countdown
                          date={this.getBreakCooldownEnd()}
                          /*onComplete={() => {
                            this.setState({ breakCooldown: false });
                          }}*/
                        />
                        : ''
                      }
              >Play</Button>
            </Row>
            <Row className={!(this.getCompletedStages() >= 1) && styles.dim}>
              {
                ['10m', '15m', '30m'].map((dur, i) => {
                  return <Button orange={i % 2 === 0}
                                 blue={i % 2 === 1}
                                 selected={this.state.duration === dur && this.state.customDuration === false}
                                 disabled={!(this.getCompletedStages() >= 1)}
                                 onClick={() => {
                                   if (this.getCompletedStages() >= 1) {
                                     this.setState({ duration: dur, customDuration: false });
                                   }
                                 }}>{dur}
                  </Button>;
                })
              }
              <Input placeholder="Custom Time" className={!this.state.customDuration && styles.dimtext}
                     value={this.props.duration} onChange={(event) => {
                this.setState({ duration: event.target.value, customDuration: true });
              }}/>
            </Row>
            <Row className={!(this.getCompletedStages() >= 2) && styles.dim}>
              <Input placeholder="Name" value={this.props.name} disabled={!(this.getCompletedStages() >= 2)}
                     onChange={event => {
                       this.setState({ name: event.target.value });
                     }}/>
            </Row>
            <Row className={!(this.getCompletedStages() >= 3) && styles.dim}>
              <Button orange disabled={!(this.getCompletedStages() >= 3)} onClick={this.submit}>Start</Button>
            </Row>
          </div>
        </Col>
        <InfoBox>
          {this.state.infoText}
        </InfoBox>
      </div>
    );
  }
}
