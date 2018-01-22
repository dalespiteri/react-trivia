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

  // const decodeHTML = (str) => {
  //   const map = {
  //     "&gt;": ">",
  //     "&quot;":"\"",
  //     /* etc */
  //   };
  //   return str.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
  //     if ($1[0] === "#") {
  //       return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
  //     } else {
  //       return map.hasOwnProperty($1) ? map[$1] : $0;
  //     }
  //   });
  // }

  componentWillMount() {

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
        this.setState({questions: questions, isQuestionLoaded: true});
        console.log(this.state);
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
                  this.props.answerCorrect ? "answerCorrect noClickEvent" : "answer"
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
      </div>

    );
  }
}

export default Questions;
