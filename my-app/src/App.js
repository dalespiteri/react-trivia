import React, { Component } from 'react';
import './style/index.css';
import './style/style.css';
import Title from './Title';
import Categories from './Categories';
import Questions from './Questions';
import Score from './Score';
import Final from './Final';
import Right from './images/right.svg';
import Wrong from './images/wrong.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCategories: false,
      showQuestions: false,
      question: 0,
      questionTotal: null,
      correct: [],
      score: 0,
      showFinal: false
    };
    this.showCategories = this.showCategories.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
    this.nextQuestionCorrect = this.nextQuestionCorrect.bind(this);
    this.nextQuestionIncorrect = this.nextQuestionIncorrect.bind(this);
    this.lastQuestionCorrect = this.lastQuestionCorrect.bind(this);
    this.lastQuestionIncorrect = this.lastQuestionIncorrect.bind(this);
  }

  showCategories() {
    this.setState({showCategories: true})
  }

  showQuestions() {
    this.setState({showQuestions: true});
  }

  nextQuestionCorrect() {
    this.setState({question: (this.state.question + 1)});
    this.setState({score: (this.state.score + 1)});
    let correctArray = this.state.correct;
    correctArray.push(Right);
    this.setState({correct: correctArray});
  }

  nextQuestionIncorrect() {
    this.setState({question: (this.state.question + 1)});
    let correctArray = this.state.correct;
    correctArray.push(Wrong);
    this.setState({correct: correctArray});
  }

  lastQuestionCorrect() {
    this.setState({score: (this.state.score + 1)});
    this.setState({showQuestions: false});
    this.setState({showCategories: false});
    this.setState({showFinal: true});
  }

  lastQuestionIncorrect() {
    this.setState({showQuestions: false});
    this.setState({showCategories: false});
    this.setState({showFinal: true});
  }

  render() {

    let questionArray = [
      {
        question: "why?",
        answers:[
          {
            answer: "because",
            correct: true
          }, {
            answer: "because maybe",
            correct: false
          }, {
            answer: "random third answer",
            correct: false
          }
        ]
      }, {
        question: "when?",
        answers:[
          {
            answer: "now",
            correct: true
          }, {
            answer: "now maybe",
            correct: false
          }
        ]
      }, {
        question: "who?",
        answers: [
          {
            answer: "me",
            correct: true
          }, {
            answer: "you",
            correct: false
          }
        ]
      }
    ];

    let q = this.state.question;
    let l = questionArray.length;
    let questionRender = "";

    if (q >= l) {
      q = (l - 1);
    }

    if (q === (l - 1)) {
      questionRender = this.state.showQuestions?
        <Questions
         question={questionArray[q].question}
         answers={questionArray[q].answers}
         onClickCorrect={this.lastQuestionCorrect}
         onClickIncorrect={this.lastQuestionIncorrect} />
         : null;
    } else {
      questionRender = this.state.showQuestions?
        <Questions
         question={questionArray[q].question}
         answers={questionArray[q].answers}
         onClickCorrect={this.nextQuestionCorrect}
         onClickIncorrect={this.nextQuestionIncorrect} />
         : null;
    }

    return (
      <div className="container">
        <Title title="trivia" onClick={this.showCategories} />
        { this.state.showCategories
          ? <Categories onClick={this.showQuestions} />
          : null }

        { this.state.showQuestions?
          questionRender
          : null};

        { this.state.showQuestions?
          <Score score={this.state.score} total={l} correct={this.state.correct} />
          : null }

        { this.state.showFinal?
          <Final score={this.state.score} total={l} />
          : null };

      </div>
    );
  }
}

export default App;
