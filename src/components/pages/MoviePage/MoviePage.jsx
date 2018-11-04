import React from 'react';
import CallApi from "../../../api/api";
import FavoriteIcon from '../../Movies/Icons/FavoriteIcon';
import WatchIcon from '../../Movies/Icons/WatchIcon';
import * as actionsMovie from "../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MovieTabs from "./MovieTabs/MovieTabs";

class MoviePage extends React.Component {
    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}`)
            .then(data => {
                this.props.getMovieDetails({
                    data
                })
            })
    }

    componentWillUnmount() {
        this.props.updateMovieDetails()
    }

    render() {
        const {details} = this.props;
        return (
            <div>
                {Object.keys(details).length !==0 ? (
                <div className='container'>
                    <div className='row mt-4'>
                        <div className='col-12 col-lg-4'>
                            <img
                                className="card-img-top"
                                src={`https://image.tmdb.org/t/p/w500${details.backdrop_path || details.poster_path}`}
                                alt=""
                            />
                        </div>
                        <div className='col-12 col-lg-8'>
                            <h4><strong>{details.title}</strong></h4>
                            <p>{details.overview}</p>
                        <div className='d-flex align-items-center'>
                            <FavoriteIcon movieId={details.id}/>
                            <WatchIcon movieId={details.id}/>
                        </div>
                        </div>
                    </div>
                </div>) : (
                <div className="mt-4"><h5><strong>...Загрузка</strong></h5></div>
                )}
                <MovieTabs/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        details: state.movie.details
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieDetails: actionsMovie.actionCreatorGetMovieDetails,
        updateMovieDetails: actionsMovie.actionCreatorUpdateMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);