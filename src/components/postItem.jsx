import React, { Component } from "react";

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    var movie = null;
    if (this.props) {
      movie = this.props.data;
    } else {
      return;
    }
    return (
      <div className="post fx fxdr ">
        <span className="badge badge-secondary post-id">{movie.id}</span>
        <div className="movie-summary-image fx-cc">
          <img src={movie.poster} alt="" width="100%" height="100%" />
          <div className="movie-summary-title   w-100 ">
            <div className="w-100 h-100 fx fxdr fx-cc">
              {/* <div className="movie-summary-id">{movie.id + "."}</div> */}
              <div className="movie-summary-name">{movie.title}</div>
            </div>
          </div>
        </div>

        <div className=" fx fxdr ss">
          <div className="movie-summary-info fx fxdc w-100">
            <div className="movie-summary-details fx faic fxdc">
              <div className="movie-summary-score fx fxdc">
                <span className="badge badge-light">rate</span>
                <span>{movie.imdb_rating}</span>
              </div>

              <div className="movie-summary-country fx fxdc">
                <span className="badge badge-light">country</span>
                <span>{movie.country}</span>
              </div>
              <div className="movie-summary-year fx fxdc">
                <span className="badge badge-light">year</span>
                <span>{movie.year}</span>
              </div>

              <div className="movie-summary-genres fx fxdc">
                <span className="badge badge-light">genres</span>
                <span className="fx fxdc">
                  {movie.genres.map(obj => (
                    <span key={obj}>{obj}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PostItem;
