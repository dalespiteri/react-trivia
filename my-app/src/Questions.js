import React, { Component } from 'react';
import './style/Questions.css';

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {question: 0};
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState({question: (this.state.question + 1)});
  }

  render() {

    const answers = this.props.answers.map(answer => {
      if (answer.correct === true) {
        return (
          <li onClick={this.props.onClickCorrect}>{answer.answer}</li>
        )
      } else {
        return (
          <li onClick={this.props.onClickIncorrect}>{answer.answer}</li>
        )
      }
    });

    return(
      <div id="questionsContainer">
      <div className="questionAndAnswer">
          <div className="question">
            <h2>{this.props.question}</h2>
          </div>
          <div className="answer">
            <ul>{answers}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
