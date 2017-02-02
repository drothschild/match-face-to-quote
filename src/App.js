import React, { Component } from 'react';
import GameBoard from './GameBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard />
      </div>
    );
  }
}

export default App;
