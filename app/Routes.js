import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { remote } from 'electron';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default class extends Component<Props> {

  render() {
    const timerMode = remote.getGlobal("getCurrentStatus")().timerMode;
    return (
      <App>
          { timerMode ? <CounterPage/> :
            <Switch>
                <Route path={routes.HOME} component={HomePage}/>
            </Switch>
          }
      </App>
    );
  }
}




