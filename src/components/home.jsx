import React, { Component } from "react";
import MoviesList from "./moviesList";
import { spawn } from "child_process";
import PageContoller from "./pageController";
import NavBar from "./navBar";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      metaData: { current_page: 0, per_page: 0, page_count: 0, total_count: 0 },
      searchString: "",
      genreSelected: "",
      listOfGenres: [],
      movieFullInfo: null
    };
  }

  componentDidMount() {
    var genresList = [
      { id: 1, name: "Crime" },
      { id: 2, name: "Drama" },
      { id: 3, name: "Action" },
      { id: 4, name: "Biography" },
      { id: 5, name: "History" },
      { id: 6, name: "Adventure" },
      { id: 7, name: "Fantasy" },
      { id: 8, name: "Western" },
      { id: 9, name: "Comedy" },
      { id: 10, name: "Sci-Fi" },
      { id: 11, name: "Mystery" },
      { id: 12, name: "Thriller" },
      { id: 13, name: "Family" },
      { id: 14, name: "War" },
      { id: 15, name: "Animation" },
      { id: 16, name: "Romance" },
      { id: 17, name: "Horror" },
      { id: 18, name: "Music" },
      { id: 19, name: "Film-Noir" },
      { id: 20, name: "Musical" },
      { id: 21, name: "Sport" }
    ];
    this.setState({ listOfGenres: genresList });
    fetch("http://moviesapi.ir/api/v1/movies?page=1")
      .then(result => {
        return result.json();
      })
      .then(data => {
        var movies = data.data;
        var meta = this.convertMetaToInt(data.metadata);

        this.setState({
          pageList: movies,
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
  onSearch = str => {
    if (str != "") {
      fetch("http://moviesapi.ir/api/v1/movies?q=" + str)
        .then(result => {
          return result.json();
        })
        .then(data => {
          var meta = this.convertMetaToInt(data.metadata);
          if (meta.total_count > 0) {
            this.setState({
              pageList: data.data,
              metaData: meta,
              searchString: str
            });
          } else {
            alert("search: no movie");
          }
        });
    }
  };
  onSelectGenre = genreID => {
    var listOfMoviesofGenre = [];
    for (var index = 1; index <= 25; index++) {
      let list = fetch(
        "http://moviesapi.ir/api/v1/genres/" + genreID + "/movies?page=" + index
      )
        .then(result => {
          return result.json();
        })
        .then(data => {
          return data.data;
        });
      listOfMoviesofGenre.push(list);
    }
    var newPageList = [];
    for (var i = 0; i < listOfMoviesofGenre.length; i++) {
      for (var j = 0; j < listOfMoviesofGenre[i].length; j++) {
        newPageList.push(listOfMoviesofGenre[i][j]);
      }
    }
    var newMeta = {
      current_page: 1,
      per_page: 10,
      page_count: newPageList / 10,
      total_count: newPageList
    };
    this.setState({ pageList: newPageList, metaData: newMeta });
  };
  render() {
    let movies = this.state.pageList;
    let meta = this.state.metaData;

    return (
      <React.Fragment>
        <NavBar
          genresList={this.state.listOfGenres}
          onSelectGenre={this.onSelectGenre}
          onSearch={this.onSearch}
        ></NavBar>

        <div>
          {this.state.searchString != "" && (
            <div className="result-message">
              <h5>
                search result for "{this.state.searchString}" :
                <span>{meta.total_count} movies</span>
                <span>,{meta.page_count} pages</span>
              </h5>
            </div>
          )}

          <MoviesList data={movies}></MoviesList>
          <PageContoller
            onSelectPage={this.onSelectPage}
            onNextPage={this.onNextPage}
            metaData={this.state.metaData}
          ></PageContoller>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
