import React from "react";
import SortBy from './SortBy';
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    const {
      filters: {sort_by, primary_release_year, genres},
        page,
        total_pages,
        onChangeFilters,
        onChangePage
    } = this.props;

    return (
      <form className="mb-3">
          <SortBy
              sort_by={sort_by}
              primary_release_year={primary_release_year}
              total_pages={total_pages}
              onChangeFilters={onChangeFilters}
          />

          <Genres
              genres={genres}
              onChangeGenres={this.props.onChangeGenres}
          />

          <div className="d-flex justify-content-center">
              <button
                  type="button"
                  className="btn btn-light mr-2"
                  disabled={page === 1}
                  // onClick={() => onChangePage(page - 1)}
                  onClick={onChangePage.bind(null, page - 1)}
              >
                  Назад
              </button>
              <button
                  type="button"
                  className="btn btn-light mr-2"
                  onClick={onChangePage.bind(null, page + 1)}
              >
                  Вперёд
              </button>
              <div className='mr-2'>
                  <strong>{this.props.page}</strong> из <strong>{this.props.total_pages}</strong>
              </div>
          </div>
      </form>
    );
  }
}
