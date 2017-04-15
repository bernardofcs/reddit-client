import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'
import NavBar from './components/NavBar.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <SearchBox />                  
      </div>
    );
  }
}

export default App;
