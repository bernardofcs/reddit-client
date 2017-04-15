import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Nothing</h2>
        </div><br />
        <SearchBox />
      </div>
    );
  }
}

export default App;
