import React, { Component } from 'react';
import './style/index.css';
import './style/style.css';
import Title from './Title';
import Categories from './Categories';
import Questions from './Questions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCategories: false,
      showQuestions: false
    };
    this.showCategories = this.showCategories.bind(this);
    this.showQuestions = this.showQuestions.bind(this);
  }

  showCategories() {
    this.setState({showCategories: true})
  }

  showQuestions() {
    this.setState({showQuestions: true})
  }

  render() {
    return (
      <div className="container">
        <Title title="trivia" onClick={this.showCategories} />
        { this.state.showCategories? <Categories onClick={this.showQuestions} /> : <div></div> }
        { this.state.showQuestions? <Questions /> : <div></div> }
      </div>
    );
  }
}

export default App;
