import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import '../styles/SearchBox.css'


class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount(){
    if(this.props.subreddits.length > 0){
      const suggestionFetch = []
      this.props.subreddits.forEach((sub) => {
        suggestionFetch.push({
          display_name: sub
        })
      })
      this.setState({suggestions: suggestionFetch});
    }
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = value => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    const filteredSubreddits = this.props.subreddits.filter(subreddit => regex.test(subreddit));
    return filteredSubreddits.map((sub) => {
      return {display_name: sub}
    })
  };

  getSuggestionValue = suggestion => suggestion.display_name;

  renderSuggestion = suggestion => (
    <span>
      {suggestion.display_name}
    </span>
  );

  renderSuggestionsContainer = ({ containerProps, children, query }) => (
    <div {...containerProps}>
      {children}
      {
        <div className="footer">
          Press Enter to search <strong>{query}</strong>
        </div>
      }
    </div>
  );

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      id: 'subreddit',
      placeholder: 'Look for a subreddit',
      value,
      onChange: this.onChange
    };

    return (
      <form onSubmit={this.props.handleSearchEnter}>
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        onSuggestionSelected={this.props.handleSearchEnter}
      />
      </form>
    );
  }
}

export default SearchBox;