import React, { Component } from 'react';

class Categories extends Component {
  render() {

    const categoryList = ["movies", "sports", "books", "general", "everything"];
    const categoryListItems = categoryList.map(cat => {
      return (
        <a href="#questionsContainer">
          <li onClick={this.props.onClick}>
            {cat}
          </li>
        </a>
      )
    });

    return(
      <div id="categories">
        <ul id="categoryList">{categoryListItems}</ul>
      </div>
    );
  }
}

export default Categories;
