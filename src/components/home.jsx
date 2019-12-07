import React, { Component } from "react";
import MoviesList from "./moviesList";
import { spawn } from "child_process";
import PageContoller from "./pageController";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      metaData: { current_page: 0, per_page: 0, page_count: 0, total_count: 0 },
      searchString: "",
      listOfGenres: [],
      movieFullInfo: null
    };
  }
  componentDidMount() {
    var movies = fetch("http://moviesapi.ir/api/v1/movies?page=1")
      .then(result => {
        return result.json();
      })
      .then(data => {
        var meta = this.convertMetaToInt(data.metadata);
        this.setState({
          pageList: data.data,
          metaData: meta
        });
      });
  }
  convertMetaToInt = meta => {
    var newMeta = this.state.metaData;
    newMeta.current_page = parseInt(meta.current_page);
    newMeta.total_count = parseInt(meta.total_count);
    newMeta.page_count = parseInt(meta.page_count);
    newMeta.per_page = parseInt(meta.per_page);
    return newMeta;
  };

  onSelectPage = event => {
    var page = event.target.value;
    var meta = this.state.metaData;
    if (page <= meta.page_count && page >= 1) {
      fetch("http://moviesapi.ir/api/v1/movies?page=" + page)
        .then(result => {
          return result.json();
        })
        .then(data => {
          var meta = this.convertMetaToInt(data.metadata);
          this.setState({
            pageList: data.data,
            metaData: meta
          });
        });
    }
  };
  onNextPage = next => {
    var meta = this.state.metaData;

    if (
      meta.current_page + next <= meta.page_count ||
      meta.current_page + next >= 1
    ) {
      fetch(
        "http://moviesapi.ir/api/v1/movies?page=" + (meta.current_page + next)
      )
        .then(result => {
          return result.json();
        })
        .then(data => {
          var meta = this.convertMetaToInt(data.metadata);
          this.setState({
            pageList: data.data,
            metaData: meta
          });
        });
    }
  };

  render() {
    let movies = this.state.pageList;

    return (
      <div className="container ">
        <div className="nav-bar fx-cc w-100">
          <div className="search-box">
            <input className="search-input" type="text" />
            <button className="search-button bg-info tex">Search</button>
          </div>
        </div>
        <div>
          <MoviesList data={movies}></MoviesList>
          <PageContoller
            onSelectPage={this.onSelectPage}
            onNextPage={this.onNextPage}
            metaData={this.state.metaData}
          ></PageContoller>
        </div>
      </div>
    );
  }
}

export default Home;
