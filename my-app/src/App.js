import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>Trivia</h1>
        </div>
        <div className="chooseCat">select your category</div>
      </div>
    );
  }
}

export default App;
