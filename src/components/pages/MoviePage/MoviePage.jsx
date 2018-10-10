import React from 'react';
import CallApi from "../../../api/api";
import FavoriteIcon from '../../Movies/Icons/FavoriteIcon';
import WatchIcon from '../../Movies/Icons/WatchIcon';


export default class MoviePage extends React.Component {
    constructor() {
        super()
        this.state = {
            moviesDetails: {}
        };
    };

    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}`, {
            params: {
                language: 'ru-RU'
            }
        })
            .then(data => {
                this.setState({
                    moviesDetails: data
                });
            })
    }

    render() {
        const {moviesDetails} = this.state;
        return (
            <div className='card'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            <img
                                className="card-img-top"
                                src={`https://image.tmdb.org/t/p/w500${moviesDetails.backdrop_path || moviesDetails.poster_path}`}
                                alt=""
                            />
                        </div>
                        <div className='col-8'>
                            <h5 className="card-title"><strong>Oписание фильма</strong></h5>
                            <p className="card-text">{moviesDetails.overview}</p>
                        <div className='d-flex align-items-center'>
                            {/*Почему тут не работают иконки? А срабатывает только при перезагрузке страницы?*/}
                            <FavoriteIcon movieId={moviesDetails.id}/>
                            <WatchIcon movieId={moviesDetails.id}/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}