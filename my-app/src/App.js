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
      isQuestionLoaded: false,
      questions: [],
      questionNumber: 0,
      questionTotal: null,
      correct: [],
      score: 0,
      showFinal: false,
    };
    this.showCategories = this.showCategories.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
    this.nextQuestionCorrect = this.nextQuestionCorrect.bind(this);
    this.nextQuestionIncorrect = this.nextQuestionIncorrect.bind(this);
    this.lastQuestionCorrect = this.lastQuestionCorrect.bind(this);
    this.lastQuestionIncorrect = this.lastQuestionIncorrect.bind(this);
  }

  componentWillMount() {

    fetch('https://opentdb.com/api.php?amount=8')
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
        answers = shuffle(answers);
        return {
        question: question.question,
        answers: answers
        };
        });
        };

        questions = shuffle(questions);
        questions = processQuestions(questions);

        this.setState({questions: questions});
        console.log(this.state.questions);
        this.setState({isQuestionLoaded: true});
      })
  }

  showCategories() {
    this.setState({showCategories: true})
  }

  showQuestions() {
    this.setState({showQuestions: true});
  }

  nextQuestionCorrect() {
    this.setState({questionNumber: (this.state.questionNumber + 1)});
    this.setState({score: (this.state.score + 1)});
    let correctArray = this.state.correct;
    correctArray.push(Right);
    this.setState({correct: correctArray});
  }

  nextQuestionIncorrect() {
    this.setState({questionNumber: (this.state.questionNumber + 1)});
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

    let l = this.state.questions.length;
    let isLastQuestion = this.state.questionNumber === (l - 1);

    let questionRender = this.state.showQuestions ?
      <Questions
        question={this.state.questions[this.state.questionNumber].question}
        answers={this.state.questions[this.state.questionNumber].answers}
        questionNumber={this.state.questionNumber}
        onClickCorrect={ isLastQuestion ? this.lastQuestionCorrect : this.nextQuestionCorrect }
        onClickIncorrect={ isLastQuestion ? this.lastQuestionIncorrect : this.nextQuestionIncorrect } />
        : null;

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
