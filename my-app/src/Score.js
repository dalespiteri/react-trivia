import React, { Component } from 'react';
import './style/score.css';
import ScoreTracker from './ScoreTracker';

class Score extends Component {
  render() {

    let scoreTrackerRepeat = [];
    for (let i = 0; i < this.props.total; i++) {
      scoreTrackerRepeat.push(<ScoreTracker correct={this.props.correct[i]} key={"ScoreTrackerSection" + i} />)
    }

    return (
      <div className="scoreContainer">
        <div className="correctTracker">
          {scoreTrackerRepeat}
        </div>
        <div className="scoreTracker">
        <p>{this.props.score}/{this.props.total}</p>
        <p>answered correctly</p>
        </div>
      </div>
    )
  }
}

export default Score;
