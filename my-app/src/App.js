import React, { Component } from 'react';
import './index.css';
import './style.css';
import Title from './Title';
import Categories from './Categories';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {showCategories: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({showCategories: true})
  }

  render() {
    return (
      <div className="container">
        <Title title="trivia" onClick={this.handleClick} />
        { this.state.showCategories? <Categories /> : <div></div> }
      </div>
    );
  }
}

export default App;
