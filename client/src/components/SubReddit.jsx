import React, { Component } from 'react';
import Post from './Post.jsx'

class SubReddit extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1>{this.props.currentSubreddit.name}</h1>
            {this.props.currentSubreddit.about.banner_img && 
              <img alt='banner' width='600px' height='150px' src={this.props.currentSubreddit.about.banner_img}></img>
            }
          </div>
          <div className="postCollection">
            {this.props.currentSubreddit.posts.map((p, i) => {
              return(
                <Post 
                  key={i}
                  post={p}
                  handlePickPost={this.props.handlePickPost} 
                />
              );
            })}    
          </div><br />
          <button>Load More</button>
        </div>
      </div>
    );
  }
}

export default SubReddit;