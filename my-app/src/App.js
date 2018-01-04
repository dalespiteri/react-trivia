import React, { Component } from 'react';
import './style/index.css';
import './style/style.css';
import Title from './Title';
import Categories from './Categories';
import Questions from './Questions';
import Score from './Score';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCategories: false,
      showQuestions: false,
      question: 0,
      score: 0
    };
    this.showCategories = this.showCategories.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  showCategories() {
    this.setState({showCategories: true})
  }

  showQuestions() {
    this.setState({showQuestions: true})
  }

  nextQuestion() {
    this.setState({question: (this.state.question + 1)})
  }

  render() {

    let questionArray = [{question: "why", answer: ["because", "because maybe"]}, {question: "when", answer: ["now", "now maybe"]}, {question: "what", answer: ["this", "this maybe"]}];
    let q = this.state.question;
    let l = questionArray.length;
    if (q >= l) {
      q = (l - 1);
    }

    return (
      <div className="container">
        <Title title="trivia" onClick={this.showCategories} />
        { this.state.showCategories? <Categories onClick={this.showQuestions} /> : <div></div> }
        { this.state.showQuestions? <Questions question={questionArray[q].question} answers={questionArray[q].answer} onClick={this.nextQuestion} /> : <div></div> }
        { this.state.showQuestions? <Score score={this.state.score} /> : <div></div> }
      </div>
    );
  }
}

export default App;
