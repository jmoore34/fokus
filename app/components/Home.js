// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
//import styles from './Home.css';
import styled from 'styled-components'
import Button from './Button'

type Props = {};
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  padding: ${props => props.padding};

  ::placeholder {
    color: blue;
  }
`


export default class Home extends Component<Props> {
  //<div className="centered">
  /*
  props: Props;

  constructor(props)
  {
    super(props);
    this.state = {working: ,duration: null, customDuration: false, name=""};
  }

  getCompletedStages()
  {
    if(working == null)
      return 0;
    else if(duration == null)
      return 1;
    else if(name == null)
      return 2;
    else 
      return 3;
  }
*/
   

  render() {
    return (
      <div>
        <Col>
          <Row>
            <Button orange>Work</Button>
            <Button blue>Play</Button>
          </Row>
          <Row>
            <Button orange>10</Button>
            <Button blue>15</Button>
            <Button orange>30</Button>
            <Input placeholder="Custom Time" />
          </Row>
          <Row>
            <Input placeholder="Name" />
          </Row>
        </Col>
      </div>
    );
  }
}
