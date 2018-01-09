import React, { Component } from 'react';
import './style/Final.css';

class Final extends Component {
  render() {
    return(
      <div className="gameEnd">
        <p>Your score was</p>
        <p>{this.props.score} / {this.props.total}</p>
        <p>great job!</p>
      </div>
    );
  }
}

export default Final;
