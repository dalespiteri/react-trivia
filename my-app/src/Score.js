import React, { Component } from 'react';
import './style/Score.css';
import ScoreTracker from './ScoreTracker';

class Score extends Component {
  render() {
    return (
      <div className="scoreContainer">
        <div className="correctTracker">
          <ScoreTracker correct={this.props.correct[0]} />
          <ScoreTracker correct={this.props.correct[1]} />
          <ScoreTracker correct={this.props.correct[2]} />
          <ScoreTracker correct={this.props.correct[3]} />
          <ScoreTracker correct={this.props.correct[4]} />
          <ScoreTracker correct={this.props.correct[5]} />
          <ScoreTracker correct={this.props.correct[6]} />
          <ScoreTracker correct={this.props.correct[7]} />
          <ScoreTracker correct={this.props.correct[8]} />
          <ScoreTracker correct={this.props.correct[9]} />
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
