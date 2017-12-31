import React, { Component } from 'react';

class Categories extends Component {
  render() {
    return(
      <div className="categories">
       <ul>
         <li>
           sports
         </li>
         <li>
           books
         </li>
         <li>
           movies
         </li>
         <li>
           general
         </li>
         <li>
           everything
         </li>
       </ul>
      </div>
    );
  }
}

export default Categories;
