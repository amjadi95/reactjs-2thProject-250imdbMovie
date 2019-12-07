import React, { Component } from "react";

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  onChange = event => {
    this.setState({ search: event.target.value });
  };
  onEnter = event => {
    if (event.key === "Enter") {
      this.props.onSearch(this.state.search);
    }
  };
  render() {
    return (
      <div className="search-box fx fxdr">
        <input
          className="search-input"
          placeholder="Search Title"
          type="text"
          onChange={this.onChange}
          onKeyDown={this.onEnter}
        />
        <button
          className="search-button bg-info text-light"
          onClick={() => this.props.onSearch(this.state.search)}
        >
          Search
        </button>
      </div>
    );
  }
}
export default SearchBox;
