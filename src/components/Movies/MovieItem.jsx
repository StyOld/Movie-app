import React from 'react';
import FavoriteList from './Icons/FavoriteList';
import WatchList from './Icons/WatchList';
import {Link} from 'react-router-dom';

export default class MovieItem extends React.Component {
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
          {/*<h6 className="card-title">{item.title}</h6>*/}
          <Link className="card-title" to={`/movie/${item.id}`}>
              {item.title}
              </Link>
            <div className='d-flex justify-content-between align-items-center'>
                <div className="card-text">Рейтинг: {item.vote_average}</div>
                <FavoriteList item_id={item.id}/>
                <WatchList item_id={item.id}/>
            </div>
        </div>
      </div>
    );
  }
}