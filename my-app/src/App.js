import React, { Component } from 'react';
import './style/index.css';
import './style/style.css';
import Title from './Title';
import Categories from './Categories';
import Questions from './Questions';
import Final from './Final';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({showCategories: true})
  }

  catMovies(testURL) {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10&category=11"});
    this.setState({showQuestions: true});
  }

  catSports() {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10&category=21"});
    this.setState({showQuestions: true});
  }

  catBooks() {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10&category=10"});
    this.setState({showQuestions: true});
  }

  catVideogames() {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10&category=15"});
    this.setState({showQuestions: true});
  }

  catGeneral() {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10&category=9"});
    this.setState({showQuestions: true});
  }

  catEverything() {
    this.setState({categoryActive: "https://opentdb.com/api.php?amount=10"});
    this.setState({showQuestions: true});
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
        showQuestions: false,
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
        showQuestions: false,
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
        score={ this.state.score }
        correct={ this.state.correct }
        answerCorrect={ this.state.answerCorrect } />
        : null;

    return (
      <div className="container">
        <Title title="trivia" onClick={ this.showCategories } />
        { this.state.showCategories
          ? <Categories categoryList={ this.state.categories } onClick={ this.catMovies } />
          : null }

        { questionRender }

        { this.state.showFinal ?
          <Final
          score={this.state.score}
          total={10}
          onClickReplay={this.onClickReplay}
          onClickNew={this.onClickNew} />
          : null };

      </div>
    );
  }
}

export default App;
