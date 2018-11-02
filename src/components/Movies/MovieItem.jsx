import React from 'react';
import FavoriteIcon from './Icons/FavoriteIcon';
import WatchIcon from './Icons/WatchIcon';
import {Link} from 'react-router-dom';

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
          <div className="card-body">
              <h5>
                  <Link className="card-title" to={`/movie/${item.id}`} id='text-decor'>
                      {item.title}
                  </Link>
              </h5>
              <div className='d-flex justify-content-between align-items-center'>
                  <div className="card-text">Рейтинг: {item.vote_average}</div>
                  <FavoriteIcon movieId={item.id}/>
                  <WatchIcon movieId={item.id}/>
              </div>
          </div>
      </div>
    );
  }
}