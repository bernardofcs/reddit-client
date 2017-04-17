import React, { Component } from 'react';
import moment from 'moment'

class Comment extends Component {
  render() {
    const comment = this.props.comment.data;
    const date = new Date(comment.created_utc * 1000);
    return (    
      <div>
        <span>{comment.author}</span> - <span>{moment(date).fromNow()}</span> - Score:<span>{comment.score}</span>
        <p>{comment.body}</p>
      </div>
    );
  }
}

export default Comment;