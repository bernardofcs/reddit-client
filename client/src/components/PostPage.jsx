import React, { Component } from 'react';
import moment from 'moment'
import Comment from './Comment.jsx'

class PostPage extends Component {
  render() {
    const post = this.props.currentPost
    const date = new Date(post.created_utc * 1000);
    return (
      <div>
        <div className="jumbotron">
          <h1>{post.subreddit}</h1>
          <p>{post.title}</p>
          <span>submitted {moment(date).fromNow()} by {post.author}</span>
          <br/><p>{post.selftext}</p>
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