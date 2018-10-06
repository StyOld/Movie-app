import React from 'react';
import CallApi from "../../../api/api";
import FavoriteList from '../../Movies/Icons/FavoriteList';
import WatchList from '../../Movies/Icons/WatchList';

export default class MoviePage extends React.Component {
    constructor() {
        super()
        this.state = {
            movie_info: {}
        };
};
    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}`, {
            params: {language: 'ru-RU'}
        })
            .then(data => {
                this.setState({
                    movie_info: data
                });
            })
    }

    render() {
        // console.log(this.state.movie_info);
        const {movie_info} = this.state;
        return (
            <div className='card'>
                <div className='row'>
                    <div className='col-4'>
                        <img
                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie_info.backdrop_path || movie_info.poster_path}`}
                            alt=""
                        />
                    </div>
                    <div className='col-8'>
                            <div className="card-body">
                                <h5 className="card-title"><strong>Oписание фильма</strong></h5>
                                <p className="card-text">{movie_info.overview}</p>
                                <div className='d-flex align-items-center'>
                                    <FavoriteList item_id={movie_info.id}/>
                                    <WatchList item_id={movie_info.id}/>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

