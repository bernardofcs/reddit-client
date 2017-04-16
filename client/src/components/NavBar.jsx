import React, { Component } from 'react';
import '../styles/NavBar.css'

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Reddit Client</a>
          </div>
          <ul className="nav navbar-nav">
            <li onClick={this.props.handleChangeToSearchPage} className="active"><a href="#">Search Page</a></li>
            <li onClick={this.props.handleChangeToSubredditPage}><a href="#">{this.props.subredditName}</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;