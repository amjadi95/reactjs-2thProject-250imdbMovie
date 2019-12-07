import React, { Component } from "react";
import SearchBox from "./searchBox";
class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav-bar fx-cc w-100">
        <nav class="  navbar-light w-100 bg-light fx-cc">
          <div className="container">
            <div
              className="navbar-items-container fx 
             faic fjcsb"
            >
              <div
                className="navbar-logo fx-cc"
                onClick={this.props.onClickHomePage}
              >
                <span>IMDb Top 250</span>
              </div>
              <SearchBox onSearch={this.props.onSearch}></SearchBox>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
