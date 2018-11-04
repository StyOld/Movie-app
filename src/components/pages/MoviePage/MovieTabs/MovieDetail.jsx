import React from 'react';
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MovieDetail extends React.Component {
    render() {
        const {MovieDetails, movieGenres} = this.props;
        return (
            <div className='mt-4'>
                <h4><strong>Факты:</strong></h4>
                <div className='container mt-4'>
                    <div className='row'>
                        <div className='col-md-4 col-12'>
                            <h6><strong>Статус</strong></h6>
                            <p>{MovieDetails.status}</p>
                            <h6><strong>Информация о релизе</strong></h6>
                            <p>{MovieDetails.release_date}</p>
                            <h6><strong>Оригинальный язык</strong></h6>
                            <p>{MovieDetails.original_language}</p>
                            <h6><strong>Продолжительность</strong></h6>
                            <p>{MovieDetails.runtime} m</p>
                        </div>
                        <div className='col-md-8 col-12'>
                            <h6><strong>Бюджет</strong></h6>
                            <p>${MovieDetails.budget}</p>
                            <h6><strong>Сборы</strong></h6>
                            <p>${MovieDetails.revenue}</p>
                            <h6><strong>Жанры</strong></h6>
                            <ul className="container">
                                {movieGenres.map(item => (
                                    <li key={item.id}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        MovieDetails: state.movie.details,
        movieGenres: state.movie.details.genres || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieDetails: actionsMovie.actionCreatorGetMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
