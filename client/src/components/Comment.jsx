import React, { Component } from 'react';
import moment from 'moment'
import '../styles/Comment.css'

class Comment extends Component {
  render() {
    const comment = this.props.comment.data;
    const date = new Date(comment.created_utc * 1000);
    return (    
      <div className="panel panel-default">
        <div className="panel-header">
          <span> {comment.author}</span> - <span>{comment.score} points</span> - <span>{moment(date).fromNow()}</span> 
        </div>
        <div className="panel-body">
          <p>{comment.body}</p>
        </div>
      </div>
    );
  }
}

export default Comment;