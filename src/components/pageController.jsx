import React, { Component } from "react";
class PageConroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
      pageCount: 0
    };
  }
  componentDidMount() {}

  render() {
    var meta = this.props.metaData;
    var pagesNumber = [];
    if (meta.page_count) {
      if (meta.page_count > 1)
        for (let index = 0; index < meta.page_count; index++) {
          pagesNumber.push(<option>{index + 1}</option>);
        }
    }

    return (
      <div className="page-control fx fxdr fjcc w-100">
        <button
          className={meta.current_page != 1 && "badge badge-info fx-cc"}
          disabled={meta.current_page == 1 && true}
          onClick={() => this.props.onNextPage(-1)}
        >
          {" "}
          {"<"}{" "}
        </button>
        <select
          name=""
          id=""
          value={meta.current_page}
          onChange={this.props.onSelectPage}
        >
          {pagesNumber.map(obj => obj)}
        </select>
        <button
          className={
            meta.current_page != meta.page_count && "badge badge-info fx-cc"
          }
          disabled={meta.current_page == meta.page_count && true}
          onClick={() => this.props.onNextPage(1)}
        >
          {" "}
          {">"}{" "}
        </button>
      </div>
    );
  }
}

export default PageConroller;
