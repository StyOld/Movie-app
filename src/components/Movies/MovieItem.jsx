import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class MovieItem extends Component {
    constructor() {
        super();

        this.state = {
            favourite: false,
            watchlist: false
        };
    }

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
            <div className='d-flex justify-content-between align-items-center'>
                <div className="card-text">Рейтинг: {item.vote_average}</div>
                <FontAwesomeIcon icon="heart" />
                <FontAwesomeIcon icon="bookmark" />
            </div>
        </div>
      </div>
    );
  }
}
