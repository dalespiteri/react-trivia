import React, { Component } from 'react';
import './style/Final.css';

class Final extends Component {
  render() {
    return(
      <div className="gameEnd">
        <p>

          {this.props.score / this.props.total > 0.5 ?
            this.props.score / this.props.total > 0.7 ? "Wow! Great job!" : "Good job."
            : "Hmmm... back to the books."}

        </p>
        <p>You answered</p>
        <p>{this.props.score} / {this.props.total}</p>
        <p>correctly</p>
        <div className="replayButtons">
          <a href="#questionsContainer">
            <button onClick={this.props.onClickReplay}>replay</button>
          </a>
          <a href="#categories">
            <button onClick={this.props.onClickNew}>new category</button>
          </a>
        </div>
      </div>
    );
  }
}

export default Final;
