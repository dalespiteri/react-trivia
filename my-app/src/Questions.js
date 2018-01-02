import React, { Component } from 'react';
import './style/Questions.css';
import $ from 'jquery';

class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {questions: []};
  }

  componentDidMount() {
    this.questionList();
  }

  questionList() {
    $.getJSON('https://opentdb.com/api.php?amount=10')
      .then((fullResponse) => {
        console.log("fullResponse", fullResponse);
        this.setState({ questions: fullResponse.results });
      });
  }

  render() {
    return(
      <div id="questionsContainer">
        <div className="question">
          <h2></h2>
        </div>
        <div className="answers">
          <ul></ul>
        </div>
      </div>
    );
  }
}

export default Questions;
