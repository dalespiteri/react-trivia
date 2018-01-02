import React, { Component } from 'react';
import './index.css';
import './style.css';

class Title extends Component {

  render() {

    return (
      <div>
        <div className="title">
          <h1>{this.props.title}</h1>
        </div>
        <a href="#categoryList"><div className="chooseCat" onClick={this.props.onClick}>select your category</div></a>
      </div>
    );
  }
}

export default Title;
