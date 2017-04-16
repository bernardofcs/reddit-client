import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'
import NavBar from './components/NavBar.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentWindow: 'index',
      subreddits: {},
      currentSubreddit: ''
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

  handleSearchEnter = (e) => {
    console.log('sijfasidj')
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        {this.state.currentWindow === 'index' && this.state.subreddits.length > 0 ? (              //index page
          <SearchBox handleSearchEnter={this.handleSearchEnter} subreddits={this.state.subreddits} />  //search box
          ) : (!this.state.subreddits.length && <h1> Loading Search </h1>) //before api loads
        }
        {this.state.currentWindow === 'subreddit' &&
          <div>hello</div>
        }                
      </div>
    );
  }
}

export default App;

