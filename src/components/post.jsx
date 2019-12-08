import React, { Component } from "react";
class Post extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var movie = this.props.data;
    return (
      <div className="movie-page">
        <div className="container">
          <div>
            <div className=" page-head fx faic fjcsb">
              <div className="page-main-info fx fxdc fjcfs">
                <div>{movie.id + ". " + movie.title}</div>
                <div className="fx fxdc">
                  <span className="badge badge-warning">rate:</span>
                  <span>{movie.imdb_rating}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-warning">director:</span>
                  <span>{movie.director}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-warning">writer:</span>
                  <span>{movie.writer}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-warning">actors:</span>
                  <span>{movie.actors}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-warning">rate:</span>
                  <span>{movie.imdb_rating}</span>
                </div>
              </div>
              <div className="img-container fx-cc">
                <img src={movie.poster} alt="" width="100%\" />
              </div>
            </div>
            <div className=" page-other-info fx faifs">
              <div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    plot:
                  </span>
                  <span className="bg-light">{movie.plot}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    country:
                  </span>
                  <span className="bg-light">{movie.country}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    award:
                  </span>
                  <span className="bg-light">{movie.awards}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    type:
                  </span>
                  <span className="bg-light">{movie.type}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    genres:
                  </span>
                  <span className="bg-light">{movie.genres}</span>
                </div>
              </div>
              <div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    year:
                  </span>
                  <span className="bg-light">{movie.year}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    rated:
                  </span>
                  <span className="bg-light">{movie.rated}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    released:
                  </span>
                  <span className="bg-light">{movie.released}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    runtime:
                  </span>
                  <span className="bg-light">{movie.runtime}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    imdb_votes:
                  </span>
                  <span className="bg-light">{movie.imdb_votes}</span>
                </div>
                <div className="fx fxdc">
                  <span className="badge badge-light border border-warning">
                    imdb_id:
                  </span>
                  <span className="bg-light">{movie.imdb_id}</span>
                </div>
              </div>
            </div>
            <div className=" movie-images fx fxdc faic">
              {movie.images.map(obj => (
                <div>
                  <span className="badge badge-light border border-warning">
                    screenShots:
                  </span>
                  <img src={obj} alt="" width="100%" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
