import React, { Component } from 'react';
import './index.css';
import './style.css';

class Title extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <h1>Trivia</h1>
        </div>
        <div className="chooseCat">select your category</div>
      </div>
    );
  }
}

export default Title;
