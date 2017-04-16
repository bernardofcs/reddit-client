import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'
import NavBar from './components/NavBar.jsx'
import SubReddit from './components/SubReddit.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentWindow: 'index',
      subreddits: {},
      currentSubreddit: {
        name: '',
        posts: []
      }
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
    e.preventDefault();
    if(e.type !== 'click'){
      const subreddit = e.target.value || document.getElementById("subreddit").value;
      fetch(`http://localhost:3001/r/${subreddit}`).then((res) => {
        if(res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ currentSubreddit:{name: subreddit, posts: data.data.children}})
      })
    }
  }

  handlePageChange = (e) => {
    
  }

  render() {
    return (
      <div className="App">
        <NavBar handlePageChange={this.handlePageChange} subredditName={this.state.currentSubreddit.name || null}/>                  {/* navbar */}
        {this.state.currentWindow === 'index' && this.state.subreddits.length > 0 ? (              //index page
          <SearchBox handleSearchEnter={this.handleSearchEnter} subreddits={this.state.subreddits} />  //search box
          ) : (!this.state.subreddits.length && <h1> Loading Search </h1>) //before api loads
        }
        {this.state.currentWindow === 'subreddit' && this.state.currentSubreddit.posts.length > 0 &&
          <SubReddit currentSubreddit={this.state.currentSubreddit} />
        }                
      </div>
    );
  }
}

export default App;

