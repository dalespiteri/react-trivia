import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Score from './Score';
import './style/Questions.css';

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isQuestionLoaded: false,
      questions: [],
    };
  }

  componentWillMount() {

    fetch(this.props.category)
    .then(results => {
      return results.json();
      }).then(data => {
        let questions = data.results;

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
              answer: incor,
              correct: false
              };
            });
            answers = answers.concat({
              answer: question.correct_answer,
              correct: true
            });
            answers = answers.length > 2 ?
              shuffle(answers)
              : answers[0].answer === "True" ?
                answers
                : [{answer: "True", correct: true}, {answer: "False", correct: false}]
            return {
              question: question.question,
              answers: answers
            };
          });
        };

        questions = processQuestions(questions);
        console.log(questions);
        this.setState({questions: questions});
        this.setState({isQuestionLoaded: true});
      })
  }

  render() {

    let l = this.state.questions.length;
    let isLastQuestion = this.props.questionNumber === (l - 1);

    return(

      <div id="questionsContainer">
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
                  this.props.answerCorrect ? "answerCorrect" : "answer"
                  : "answer"
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
      </div>

    );
  }
}

export default Questions;
