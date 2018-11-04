import React from "react";
import SortBy from './SortBy';
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Genres from "./Genres";

export default class Filters extends React.PureComponent {
  render() {
    return (
      <form>
          <SortBy/>
          <PrimaryReleaseYear/>
          <Genres/>
      </form>
    );
  }
}