import React, { Component } from 'react';
import Right from './images/right.svg';
import Wrong from './images/wrong.svg';

class ScoreTracker extends Component {
  render() {
    return (
      <div className="correctTrackerSection">
        {this.props.correct ?
        <img src={Right} alt="correct answer" />
        : null }
        {this.props.correct === false ?
        <img src={Wrong} alt="incorrect answer" />
        : null }
      </div>
    )
  }
}

export default ScoreTracker;
