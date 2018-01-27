import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Score from './Score';
import Final from './Final';
import './style/questions.css';

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isQuestionLoaded: false,
      questions: [],
    };
  }

  componentWillMount() {

    var he = require('he');

    fetch(this.props.category)
    .then(results => {
      return results.json();
      }).then(data => {
        let questions = data.results.map((question) => {
            return question;
        })

        const shuffle = function(arr) {
          let temp = null;
          let l = arr.length;
          arr.forEach(function(element, index) {
            let randomPick = Math.floor(Math.random() * l);
            temp = arr[randomPick];
            arr[randomPick] = arr[index];
            arr[index] = temp;
          });
          return arr;
        };

        const processQuestions = function(questionArray) {
          return questionArray.map(function(question) {
            let answers = question.incorrect_answers.map(function(incor) {
              return {
              answer: he.decode(incor),
              correct: false
              };
            });
            answers = answers.concat({
              answer: he.decode(question.correct_answer),
              correct: true
            });
            answers = answers.length > 2 ?
              shuffle(answers)
              : answers[0].answer === "True" ?
                answers
                : [{answer: "True", correct: true}, {answer: "False", correct: false}]
            return {
              question: he.decode(question.question),
              answers: answers
            };
          });
        };

        questions = processQuestions(questions);
        this.setState({questions: questions, isQuestionLoaded: true});
        console.log(this.state);
      })
  }

  render() {

    let l = this.state.questions.length;
    let isLastQuestion = this.props.questionNumber === (l - 1);

    return(
      <div>

      {this.props.showFinal ?
        <Final
        score={this.props.score}
        total={l}
        onClickReplay={this.props.onClickReplay}
        onClickNew={this.props.onClickNew} />

      : <div id="questionsContainer">
      { this.state.isQuestionLoaded ?
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={750}
          transitionLeave={false}>
        <div className="questionAndAnswer" key={"QandA" + this.props.questionNumber}>
          <div className="questionDiv">
            <h2>{ this.state.questions[this.props.questionNumber].question }</h2>
          </div>
          <div className="answerDiv">
            <ul>
            { this.state.questions[this.props.questionNumber].answers.map(answer =>
                <li
                key={answer.answer}
                className={
                  answer.correct ?
                  this.props.answerCorrect ? "answer answerCorrect noClickEvent" : "answer"
                  : this.props.answerCorrect ? "answer noClickEvent" : "answer"
                }
                onClick={
                  answer.correct ?
                    isLastQuestion ?
                    this.props.onClickCorrectLast
                    : this.props.onClickCorrect
                  : isLastQuestion ?
                    this.props.onClickIncorrectLast
                    : this.props.onClickIncorrect
                }>
                  {answer.answer}
                </li>
              )
            }
            </ul>
          </div>
        </div>
        </CSSTransitionGroup>
        : null }
        <Score score={this.props.score} total={l} correct={this.props.correct} />
      </div>}

      </div>

    );
  }
}

export default Questions;
