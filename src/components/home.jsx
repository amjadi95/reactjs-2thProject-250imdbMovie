import React, { Component } from "react";
import MoviesList from "./moviesList";
import { spawn } from "child_process";
import PageContoller from "./pageController";
import NavBar from "./navBar";
import Post from "./post";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [],
      metaData: { current_page: 0, per_page: 0, page_count: 0, total_count: 0 },
      searchString: "",
      movieFullInfo: null,
      showFullPage: false,
      loading: false
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
    this.setState({ listOfGenres: genresList, loading: true });
    fetch("http://moviesapi.ir/api/v1/movies?page=1")
      .then(result => {
        if (result.status >= 200 && result.status <= 299) {
          return result.json();
        }
      })
      .then(data => {
        var movies = data.data;
        var meta = this.convertMetaToInt(data.metadata);

        this.setState({
          pageList: movies,
          metaData: meta,
          loading: false
        });
      })
      .catch(function(error) {
        alert("request failed");
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
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
    if (page != meta.current_page)
      if (page <= meta.page_count && page >= 1) {
        this.setState({ loading: true });
        fetch("http://moviesapi.ir/api/v1/movies?page=" + page)
          .then(result => {
            if (result.status >= 200 && result.status <= 299) {
              return result.json();
            }
          })
          .then(data => {
            var meta = this.convertMetaToInt(data.metadata);
            this.setState({
              pageList: data.data,
              metaData: meta,
              searchString: "",
              showFullPage: false,
              loading: false
            });
          })
          .catch(function(error) {
            alert("request failed");
            console.log(
              "There has been a problem with your fetch operation: ",
              error.message
            );
          });
      }
  };
  onNextPage = next => {
    var meta = this.state.metaData;

    if (
      meta.current_page + next <= meta.page_count ||
      meta.current_page + next >= 1
    ) {
      this.setState({ loading: true });
      fetch(
        "http://moviesapi.ir/api/v1/movies?page=" + (meta.current_page + next)
      )
        .then(result => {
          if (result.status >= 200 && result.status <= 299) {
            return result.json();
          }
        })
        .then(data => {
          var meta = this.convertMetaToInt(data.metadata);
          this.setState(
            {
              pageList: data.data,
              metaData: meta,
              searchString: ""
            },
            () => {
              this.setState({ loading: false });
            }
          );
        })
        .catch(function(error) {
          alert("request failed");
          console.log(
            "There has been a problem with your fetch operation: ",
            error.message
          );
        });
    }
  };
  onSearch = str => {
    if (this.state.searchString != str)
      if (str != "") {
        this.setState({ loading: true });
        fetch("http://moviesapi.ir/api/v1/movies?q=" + str)
          .then(result => {
            if (result.status >= 200 && result.status <= 299) {
              return result.json();
            }
          })
          .then(data => {
            var meta = this.convertMetaToInt(data.metadata);
            if (meta.total_count > 0) {
              this.setState(
                {
                  pageList: data.data,
                  metaData: meta,
                  searchString: str,
                  showFullPage: false
                },
                () => {
                  this.setState({ loading: false });
                }
              );
            } else {
              alert("search: no movie");
            }
          })
          .catch(function(error) {
            alert("request failed");
            console.log(
              "There has been a problem with your fetch operation: ",
              error.message
            );
          });
      }
  };
  homePage = () => {
    if (this.state.metaData.total_count != 250)
      this.setState({ loading: true });
    fetch("http://moviesapi.ir/api/v1/movies?page=1")
      .then(result => {
        if (result.status >= 200 && result.status <= 299) {
          return result.json();
        }
      })
      .then(data => {
        var movies = data.data;
        var meta = this.convertMetaToInt(data.metadata);

        this.setState(
          {
            pageList: movies,
            metaData: meta,
            searchString: "",
            showFullPage: false
          },
          () => {
            this.setState({ loading: false });
          }
        );
      })
      .catch(function(error) {
        alert("request failed");
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      });
  };
  onSelectPost = id => {
    this.setState({ loading: true });
    fetch("http://moviesapi.ir/api/v1/movies/" + id)
      .then(result => {
        if (result.status >= 200 && result.status <= 299) {
          return result.json();
        }
      })
      .then(data => {
        this.setState(
          {
            movieFullInfo: data,
            showFullPage: true,
            searchString: ""
          },
          () => {
            this.setState({ loading: false });
          }
        );
      })
      .catch(function(error) {
        alert("request failed");
        console.log(
          "There has been a problem with your fetch operation: ",
          error.message
        );
      });
  };
  render() {
    let movies = this.state.pageList;
    let meta = this.state.metaData;

    return (
      <React.Fragment>
        <NavBar
          genresList={this.state.listOfGenres}
          onSelectGenre={this.onSelectGenre}
          onClickHomePage={this.homePage}
          onSearch={this.onSearch}
        ></NavBar>

        <div className="main">
          {this.state.loading && (
            <div className="loading fx fx fxdc faic">
              <span>Loading</span>
              <div className="loader"></div>
            </div>
          )}
          {this.state.searchString != "" && (
            <div className="result-message">
              <h5>
                search result for "{this.state.searchString}" :
                <span>{meta.total_count} movies</span>
                <span>,{meta.page_count} pages</span>
              </h5>
            </div>
          )}
          {this.state.showFullPage ? (
            <Post data={this.state.movieFullInfo}></Post>
          ) : (
            <React.Fragment>
              <MoviesList
                data={movies}
                onSelectPost={this.onSelectPost}
              ></MoviesList>
              <PageContoller
                onSelectPage={this.onSelectPage}
                onNextPage={this.onNextPage}
                metaData={this.state.metaData}
              ></PageContoller>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
