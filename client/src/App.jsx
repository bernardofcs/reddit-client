import React, { Component } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox.jsx'
import NavBar from './components/NavBar.jsx'
import SubReddit from './components/SubReddit.jsx'
import PostPage from './components/PostPage.jsx'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentWindow: 'index',
      subreddits: [],
      currentSubreddit: {},
      currentPost: {},
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
      this.setState({ subreddits: data });
    });
  }

  handleSearchEnter = (e) => {                                               //fetches subreddit posts and info
    e.preventDefault();
    if(e.type !== 'click'){     //makes sure no fetch is made on click
      let posts = [];
      const subreddit = e.target.value || document.getElementById("subreddit").value; //makes it work on either auto suggested or manual
      fetch(`http://localhost:3001/r/${subreddit}`).then((res) => {
        if(res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((data) => {
        if(data.error){
          return
        }
        posts = data.data.children
      }).then(() => {
        fetch(`http://localhost:3001/r/${subreddit}/about`).then((res) => {
          if(res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then((data) => {
          if(posts.length > 0){
            this.setState({ currentWindow: 'subreddit', currentSubreddit:{name: subreddit, posts: posts, about: data.data}})          
          }else{
            alert("Subreddit does not exist")            
          }
        })
      })
    }
  }

  handleFetchMorePosts = (e) => {
    e.preventDefault();
    const limit = this.state.currentSubreddit.posts.length + 25;
    console.log(limit)
    fetch(`http://localhost:3001/r/${this.state.currentSubreddit.name}/amount/${limit}`).then((res) => {
      if(res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then((data) => {
      if(data.length > 0){
        this.setState({ currentWindow: 'subreddit', currentSubreddit:{name: this.state.currentSubreddit.name, posts: data, 
          about: this.state.currentSubreddit.about}})          
      }else{
        alert("Subreddit does not exist")
      }  
    })
  }

  handlePickPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/r/${this.state.currentSubreddit.name}/comments/${e.target.getAttribute('data-id')}`).then((res) => {
      if(res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    }).then((data) => {
      this.setState({currentPost: data[0].data.children[0].data, currentPostComments: data[1].data.children, currentWindow:'post'})
      window.scrollTo(0,0)
    })
  }

  handleChangeToSearchPage = () => {this.setState({currentWindow: 'index'})}
  handleChangeToSubredditPage = () => {this.setState({currentWindow: 'subreddit'})}
  handleChangeToPostPage = () => {this.setState({currentWindow: 'post'})}

  render() {
    return (
      <div className="App">
        <NavBar                                                                                   //navbar
          handleChangeToSearchPage={this.handleChangeToSearchPage}
          handleChangeToSubredditPage={this.handleChangeToSubredditPage} 
          subredditName={this.state.currentSubreddit.name || null}/>                  
        {this.state.currentWindow === 'index' && this.state.subreddits.length > 0 ? (              //index page
          <SearchBox 
            handleSearchEnter={this.handleSearchEnter} 
            subreddits={this.state.subreddits} />  //search box
          ) : (!this.state.subreddits.length && <h1> Loading Search </h1>) //before api loads
        }
        {this.state.currentWindow === 'subreddit' && this.state.currentSubreddit.posts.length > 0 &&    //subreddit page
          <SubReddit 
            handlePickPost={this.handlePickPost}
            handleFetchMorePosts={this.handleFetchMorePosts} 
            currentSubreddit={this.state.currentSubreddit} />
        }
        {this.state.currentWindow === 'post' &&
          <PostPage currentPost={this.state.currentPost} comments={this.state.currentPostComments} />
        }                
      </div>
    );
  }
}

export default App;

