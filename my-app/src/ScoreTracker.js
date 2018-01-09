import React, { Component } from 'react';

class ScoreTracker extends Component {
  render() {
    return (
      <div className="correctTrackerSection">
        <img src={this.props.correct} />
      </div>
    )
  }
}

export default ScoreTracker;
