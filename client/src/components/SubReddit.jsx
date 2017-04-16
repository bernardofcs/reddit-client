import React, { Component } from 'react';

class SubReddit extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <h1>{this.props.currentSubreddit.name}</h1>
            {this.props.currentSubreddit.about && <div></div>}
          </div>
        </div>
      </div>
    );
  }
}

export default SubReddit;