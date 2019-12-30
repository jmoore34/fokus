import React, { Component } from 'react';
import { IoMdSettings } from 'react-icons/io';
import styles from './SettingsButton.css';

export default class SettingsButton extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.onClick();
        }}
      >
        <IoMdSettings />
      </div>
    );
  }
}
