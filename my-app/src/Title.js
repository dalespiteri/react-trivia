import React, { Component } from 'react';
import './style/title.css';
import './style/style.css';

class Title extends Component {

  render() {

    return (
      <div className="titleContainer">
        <div className="title">
          <h1>
          <span className="titleCursive">t</span>
          <span className="titleCursive">R</span>
          <span className="titleSans">i</span>
          <span className="titleSans">V</span>
          <span className="titleCursive">i</span>
          <span className="titleSans">a</span>
          </h1>
        </div>
        <a href="#categories"><div className="chooseCat" onClick={this.props.onClick}>select your category</div></a>
      </div>
    );
  }
}

export default Title;
