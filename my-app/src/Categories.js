import React, { Component } from 'react';

class Categories extends Component {

  render() {

    const categoryListItems = this.props.categoryList.map(cat =>
        <a href="#questionsContainer" key={cat.category + "link"}>
          <li onClick={cat.active} key={cat.category}>
            {cat.category}
          </li>
        </a>
    );

    return(
      <div id="categories">
        <ul id="categoryList">{categoryListItems}</ul>
      </div>
    );
  }
}

export default Categories;
