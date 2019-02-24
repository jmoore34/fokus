import React, { Component } from 'react';
import style from './Texbox.css';


export class Textbox extends Component {
  render() {
    return (
      <div class =`${this.props.large && styles.large} ${this.props.small && styles.small} ${styles.textboxs}`>
        
      </div>
    )
  }
}

export default Textbox
