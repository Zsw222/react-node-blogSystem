import React, { Component } from 'react';
// import logo from './logo.svg';
import RouterWrap from './router';
import './App.css';
import './reset.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterWrap />
      </div>
    );
  }
}

export default App;
