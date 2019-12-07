import React, { Component } from "react";
import { throwStatement, directive } from "@babel/types";
import Post from "./post";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    var movies = this.props.data;
    if (this.props) {
      movies = this.props.data;
    } else {
      return <div></div>;
    }
    return (
      <div className="movies-list fx fjcc fxww fww fxdr w-100">
        {movies.map(obj => (
          <Post data={obj} />
        ))}
      </div>
    );
  }
}
export default MoviesList;
