import React, { Component } from 'react';
import moment from 'moment'
import Comment from './Comment.jsx'

class PostPage extends Component {
  render() {
    const post = this.props.currentPost
    const date = new Date(post.created_utc * 1000);
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="page-header">{post.subreddit}</h1>
          <p>{post.title}</p>
          <span>submitted {moment(date).fromNow()} by {post.author}</span>
          <br/><span>{post.selftext}</span>
        </div>
        <div className="commentCollection">
          {this.props.comments.map((c, i) => {
            return(
              <Comment 
                key={i}
                comment={c}
              />
            );
          })} 
        </div>
      </div>
    );
  }
}

export default PostPage;