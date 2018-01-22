import React, { Component } from 'react';
import './style/Final.css';

class Final extends Component {
  render() {
    return(
      <div className="gameEnd">
        <p>Your score was</p>
        <p>{this.props.score} / {this.props.total}</p>
        <p>great job!</p>
        <a href="#questionsContainer">
          <button onClick={this.props.onClickReplay}>replay</button>
        </a>
        <button onClick={this.props.onClickNew}>new category</button>
      </div>
    );
  }
}

export default Final;
