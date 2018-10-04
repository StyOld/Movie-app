import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../HOC/AppConsumerHOC";

export default class MovieItem extends React.Component {
    constructor() {
        super();

        this.state = {
            favorite_list: false,
            watch_list: false
        };
    }

    onChangeFavouriteList = () => {
        fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    media_type: 'movie',
                    media_id: 369972,
                    favorite: true
                })
            })
            .then(() => {
                this.setState(prevState => ({
                    favorite_list: !prevState.favorite_list
                }));
            })
    };

    onChangeWatchList = () => {
        this.setState(prevState => ({
            watch_list: !prevState.watch_list
        }));
    };

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
                <FontAwesomeIcon
                    icon="heart"
                    color={this.state.favorite_list ? 'red' : 'grey'}
                    onClick={this.onChangeFavouriteList}
                />
                <FontAwesomeIcon
                    icon="bookmark"
                    color={this.state.watch_list ? 'red' : 'grey'}
                    onClick={this.onChangeWatchList}
                />
            </div>
        </div>
      </div>
    );
  }
}
