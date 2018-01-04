import React, { Component } from 'react';
import './style/Score.css';

class Score extends Component {
  render() {
    return (
      <div className="scoreContainer">
        <div className="correctTracker">
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
          <div className="correctTrackerSection"></div>
        </div>
        <div className="scoreTracker">
        <p>{this.props.score}/10</p>
        <p>answered correctly</p>
        </div>
      </div>
    )
  }
}

export default Score;
