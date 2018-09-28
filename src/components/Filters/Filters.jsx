import React from "react";
import SortBy from './SortBy';
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";

export default class Filters extends React.PureComponent {
  render() {
    const {
        filters: {sort_by, primary_release_year, genres},
        onChangeFilters,
        onChangeGenres
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
      </form>
    );
  }
}
