import React, { Component } from 'react';
import './index.css';
import './style.css';
import Title from './Title';
import Categories from './Categories';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Title />
        <Categories />
      </div>
    );
  }
}

export default App;
