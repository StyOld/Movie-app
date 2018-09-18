import React from "react";
import SortBy from './SortBy';
import Genres from "./Genres";
import Pagination from "./Pagination";
import PrimaryReleaseYear from "./PrimaryReleaseYear";

export default class Filters extends React.Component {
  render() {
    const {
        filters: {sort_by, primary_release_year, genres},
        page,
        total_pages,
        onChangeFilters,
        onChangeGenres,
        onChangePage
    } = this.props;

    return (
      <form>
          <SortBy
              sort_by={sort_by}
              onChangeFilters={onChangeFilters}
          />

          <PrimaryReleaseYear
              primary_release_year={primary_release_year}
              onChangeFilters={onChangeFilters}
          />

          <Genres
              genres={genres}
              onChangeGenres={onChangeGenres}
          />

          <Pagination
              page={page}
              total_pages={total_pages}
              onChangePage={onChangePage}
          />
      </form>
    );
  }
}
