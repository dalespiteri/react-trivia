import React, { Component } from 'react';

class API extends Component {

  constructor() {
    super();
    this.state = {
      questions: []
    };
  }

  componentWillMount() {

    fetch('https://opentdb.com/api.php?amount=10')
    .then(results => {
      return results.json();
      }).then(data => {
        let questions = data.results.map((question) => {
          return(
              question
            )
        })
        this.setState({questions: questions});
        console.log(this.state.questions);
      })
  }

  render() {
    return (<div></div>)
  }
}

export default API;
