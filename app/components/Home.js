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
  justify-content: space-around;
  align-items: center;
  padding: 30px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export default class Home extends Component<Props> {
  //<div className="centered">
  props: Props;

  render() {
    return (
      <div>

        <Col>
          <Row>
            <Button orange>Work</Button>
            <Button>Play</Button>
          </Row>
          <Row>
            <Button orange>Work</Button>
            <Button>Play</Button>
          </Row>
        </Col>
      </div>
    );
  }
}
