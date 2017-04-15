import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'
import NavBar from './components/NavBar.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      subreddits: {}
    }
  }

  componentWillMount(){
    fetch('http://localhost:3001').then((res) => {     //gets list of top subs
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then((data) => {
      this.setState({ subreddits: data.data.children });
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.state.subreddits.length > 0 &&
          <SearchBox subreddits={this.state.subreddits} />  
        }                
      </div>
    );
  }
}

export default App;

