// @flow
import React, { Component } from 'react';
import parseDuration from 'parse-duration';
import styled from 'styled-components';
import { remote } from 'electron';
import Countdown from 'react-countdown-now';
import styles from './Home.css';
import Button from './Button';
import SettingsButton from './SettingsButton';
import buttonStyle from './Button.css'; // I apologize

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

    // Status of most recent break/play used to see if in cooldown
    const breakCooldownEnd = this.getBreakCooldownEnd();

    this.state = {
      working: null,
      duration: null,
      customDuration: false,
      name: '',
      breakCooldown: Date.now() < breakCooldownEnd.valueOf() // Break cooldown has not yet finished
    };
  }

  getBreakCooldownEnd() {
    const status = remote.getGlobal('getCurrentStatus')();
    return (
      status.startTime.valueOf() +
      status.duration +
      status.breakCooldownDuration
    );
  }

  getCompletedStages() {
    if (this.state.working == null) return 0;
    if (
      this.state.duration == null ||
      !(parseDuration(this.state.duration) > 0) ||
      !this.state.duration.match(/([\d\.]+[hms])+/)
    )
      return 1;
    if (this.state.name == null) return 2;
    return 3;
  }

  submit() {
    const currentStatus = remote.getGlobal('getCurrentStatus')();
    const statusChange = {
      play: !this.state.working,
      startTime: new Date(),
      taskName: this.state.name,
      // taskNotes: "",
      duration: parseDuration(this.state.duration),
      timerMode: true
    };

    remote.getGlobal('setCurrentStatus')({ ...currentStatus, ...statusChange });

    remote.getGlobal('goToTimerMode')();
    remote.getCurrentWindow().close();
  }

  render() {
    return (
      <div>
        <Col>
          <Row>
            <Button
              orange
              selected={this.state.working}
              onClick={() => this.setState({ working: true })}
              desc=""
            >
              Work
            </Button>
            <Button
              blue
              selected={this.state.working === false}
              onClick={() => this.setState({ working: false })}
              disabled={this.state.breakCooldown}
              className={this.state.breakCooldown && styles.dim} // this is so hacky and needs to be refactored
              desc={
                this.state.breakCooldown ? (
                  <Countdown
                    date={this.getBreakCooldownEnd()}
                    onComplete={() => {
                      this.setState({ breakCooldown: false });
                    }}
                  />
                ) : (
                  ''
                )
              }
            >
              Play
            </Button>
          </Row>
          <Row className={!(this.getCompletedStages() >= 1) && styles.dim}>
            {['10m', '15m', '30m'].map((dur, i) => (
              <Button
                orange={i % 2 === 0}
                blue={i % 2 === 1}
                selected={
                  this.state.duration === dur &&
                  this.state.customDuration === false
                }
                disabled={!(this.getCompletedStages() >= 1)}
                onClick={() => {
                  if (this.getCompletedStages() >= 1) {
                    this.setState({ duration: dur, customDuration: false });
                  }
                }}
              >
                {dur}
              </Button>
            ))}
            <Input
              placeholder="Custom Time"
              className={!this.state.customDuration && styles.dimtext}
              value={this.props.duration}
              onChange={event => {
                this.setState({
                  duration: event.target.value,
                  customDuration: true
                });
              }}
            />
          </Row>
          <Row className={!(this.getCompletedStages() >= 2) && styles.dim}>
            <Input
              placeholder="Name"
              value={this.props.name}
              disabled={!(this.getCompletedStages() >= 2)}
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </Row>
          <Row className={!(this.getCompletedStages() >= 3) && styles.dim}>
            <Button
              orange
              disabled={!(this.getCompletedStages() >= 3)}
              onClick={this.submit}
            >
              Start
            </Button>
          </Row>
          <Row>
            <SettingsButton
              blue
              onClick={() => console.log('Settings')}
            />
          </Row>
        </Col>
        <Col />
      </div>
    );
  }
}
