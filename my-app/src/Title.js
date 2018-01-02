import React, { Component } from 'react';
import './style/index.css';
import './style/style.css';

class Title extends Component {

  render() {

    return (
      <div>
        <div className="title">
          <h1>{this.props.title}</h1>
        </div>
        <a href="#categories"><div className="chooseCat" onClick={this.props.onClick}>select your category</div></a>
      </div>
    );
  }
}

export default Title;
