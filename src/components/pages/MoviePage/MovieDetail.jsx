import React from 'react';
import * as actionsMovies from "../../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MovieDetail extends React.Component {
    render() {
        console.log(this.props.moviesDetails.genres)
        return (
            <div>
                <div className='card'>
                    <div className='container'>
                        <div className='col'>
                            <div className='col-8'>
                                <h4><strong>Факты</strong></h4>
                                <h6><strong>Статус</strong></h6>
                                <p>{this.props.moviesDetails.status}</p>
                                <h6><strong>Информация о релизе</strong></h6>
                                <p>{this.props.moviesDetails.release_date}</p>
                                <h6><strong>Оригинальный</strong></h6>
                                {/*<p>{this.props.moviesDetails.spoken_languages}</p>*/}
                                <h6><strong>Продолжительность</strong></h6>
                                <p>{this.props.moviesDetails.runtime} m</p>
                                <h6><strong>Бюджет</strong></h6>
                                <p>${this.props.moviesDetails.budget}</p>
                                <h6><strong>Сборы</strong></h6>
                                <p>${this.props.moviesDetails.revenue}</p>
                                <h6><strong>Жанры</strong></h6>
                                <ul className="container">
                                    {this.props.moviesDetails.genres.map(item => (
                                        <li key={item.id}>
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        moviesDetails: state.movies.moviesDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieDetails: actionsMovies.actionCreatorGetMovieDetails,
        updateMovie: actionsMovies.actionCreatorUpdateMovie
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
