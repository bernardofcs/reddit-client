import React, { Component } from 'react';
import moment from 'moment'

class Post extends Component {
  render(){
    const post = this.props.post.data
    const date = new Date(post.created_utc * 1000);
    return (
      <div className="row">
        <div className="col-sm-1">
          <span>Upvotes: {post.score}</span>
        </div>
        <div className="col-sm-1">
          {post.preview ? 
            <img alt="postImage" height="50px" width="50px" src={post.preview.images[0].source.url} /> 
            : <img alt="postImage" height="50px" width="50px" src="http://camaleon.tuzitio.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png" /> 
          }
        </div>
        <div className="col-sm-10">
          <a onClick={this.props.handlePickPost} data-id={post.id} >{post.title}</a>
          <p>posted  {moment(date).fromNow()} by {post.author}</p>
          <br />
        </div>
      </div>
    );
  }
}

export default Post;