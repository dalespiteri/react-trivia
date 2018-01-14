import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './style/Questions.css';

class Questions extends Component {

  render() {

    return(

      <div id="questionsContainer">
        <div className="questionAndAnswer">
          <div className="question">
            <h2>{this.props.question}</h2>
          </div>
          <div className="answer">
            <ul>
            { this.props.answers.map(answer =>
                <li key={answer.answer} onClick={
                  answer.correct ? this.props.onClickCorrect
                  : this.props.onClickIncorrect
                }>
                  {answer.answer}
                </li>
              )
            }
            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default Questions;
