import React, { Component } from 'react';
import './style/style.css';
import Title from './Title';
import Categories from './Categories';
import Questions from './Questions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showTitle: true,
      showCategories: false,
      showQuestions: false,
      isQuestionLoaded: false,
      categories: [{
        category: "movies",
        active: this.catMovies.bind(this)
      }, {
        category: "sports",
        active: this.catSports.bind(this)
      }, {
        category: "books",
        active: this.catBooks.bind(this)
      }, {
        category: "videogames",
        active: this.catVideogames.bind(this)
      }, {
        category: "general",
        active: this.catGeneral.bind(this)
      }, {
        category: "everything",
        active: this.catEverything.bind(this)
      }],
      categoryActive: "",
      questionNumber: 0,
      questionTotal: null,
      correct: [],
      score: 0,
      showFinal: false,
      answerCorrect: false
    };
    this.showCategories = this.showCategories.bind(this);
    this.nextQuestionCorrect = this.nextQuestionCorrect.bind(this);
    this.nextQuestionIncorrect = this.nextQuestionIncorrect.bind(this);
    this.lastQuestionCorrect = this.lastQuestionCorrect.bind(this);
    this.lastQuestionIncorrect = this.lastQuestionIncorrect.bind(this);
    this.catMovies = this.catMovies.bind(this);
    this.onClickReplay = this.onClickReplay.bind(this);
    this.onClickNew = this.onClickNew.bind(this);
  }

  showCategories() {
    this.setState({
      showCategories: true,
      showTitle: false
    });
  }

  catMovies(testURL) {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10&category=11",
      showQuestions: true,
      showCategories: false
    });
  }

  catSports() {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10&category=21",
      showQuestions: true,
      showCategories: false
    });
  }

  catBooks() {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10&category=10",
      showQuestions: true,
      showCategories: false
    });
  }

  catVideogames() {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10&category=15",
      showQuestions: true,
      showCategories: false
    });
  }

  catGeneral() {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10&category=9",
      showQuestions: true,
      showCategories: false
    });
  }

  catEverything() {
    this.setState({
      categoryActive: "https://opentdb.com/api.php?amount=10",
      showQuestions: true,
      showCategories: false
    });
  }

  nextQuestionCorrect() {
    this.setState({answerCorrect: true});
    this.setState({score: (this.state.score + 1)});
    let correctArray = this.state.correct;
    correctArray.push(true);
    this.setState({correct: correctArray});
    setTimeout(() => {
      this.setState({questionNumber: (this.state.questionNumber + 1)});
      this.setState({answerCorrect: false});
    }, 1250);
  }

  nextQuestionIncorrect() {
    this.setState({answerCorrect: true});
    let correctArray = this.state.correct;
    correctArray.push(false);
    this.setState({correct: correctArray});
    setTimeout(() => {
      this.setState({questionNumber: (this.state.questionNumber + 1)});
      this.setState({answerCorrect: false});
    }, 1750);
  }

  lastQuestionCorrect() {
    this.setState({score: (this.state.score + 1)});
    let correctArray = this.state.correct;
    correctArray.push(true);
    this.setState({
      correct: correctArray,
      answerCorrect: true
    });
    setTimeout(() => {
      this.setState({
        showCategories: false,
        showFinal: true
      });
    }, 1250);
  }

  lastQuestionIncorrect() {
    let correctArray = this.state.correct;
    correctArray.push(false);
    this.setState({
      correct: correctArray,
      answerCorrect: true
    });
    setTimeout(() => {
      this.setState({
        showCategories: false,
        showFinal: true
      });
    },1750);
  }

  onClickReplay() {
    this.setState({
      showQuestions: true,
      showFinal: false,
      questionNumber: 0,
      questionTotal: null,
      correct: [],
      score: 0,
      answerCorrect: false
    });
  }

  onClickNew() {
    this.setState({
      showCategories: true,
      showFinal: false,
      showQuestions: false,
      questionNumber: 0,
      questionTotal: null,
      correct: [],
      score: 0,
      answerCorrect: false,
    })
  }

  render() {

    let questionRender = this.state.showQuestions ?
      <Questions
        category={ this.state.categoryActive }
        questionNumber={ this.state.questionNumber }
        onClickCorrect={ this.nextQuestionCorrect }
        onClickCorrectLast={ this.lastQuestionCorrect }
        onClickIncorrect={ this.nextQuestionIncorrect }
        onClickIncorrectLast={ this.lastQuestionIncorrect }
        onClickReplay={ this.onClickReplay }
        onClickNew={ this.onClickNew }
        score={ this.state.score }
        correct={ this.state.correct }
        answerCorrect={ this.state.answerCorrect }
        showFinal={ this.state.showFinal } />
        : null;

    return (
      <div className="container">

        { this.state.showTitle ?
          <Title title="trivia" onClick={ this.showCategories } />
          : null }

        { this.state.showCategories
          ? <Categories categoryList={ this.state.categories } onClick={ this.catMovies } />
          : null }

        { questionRender }

      </div>
    );
  }
}

export default App;
