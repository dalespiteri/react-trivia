import React, { Component } from 'react';

class Categories extends Component {
  render() {
    return(
      <div id="categories">
        <ul id="categoryList">
          <a href="#questionsContainer"><li onClick={this.props.onClick}>
           sports
          </li></a>
          <a href="#questionsContainer"><li onClick={this.props.onClick}>
           books
          </li></a>
          <a href="#questionsContainer"><li onClick={this.props.onClick}>
           movies
          </li></a>
          <a href="#questionsContainer"><li onClick={this.props.onClick}>
           general
          </li></a>
          <a href="#questionsContainer"><li onClick={this.props.onClick}>
           everything
          </li></a>
        </ul>
      </div>
    );
  }
}

export default Categories;
