import React from 'react';
import CallApi from "../../../../api/api";
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MovieVideos extends React.Component {
    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}/videos`)
            .then(data => {
                this.props.getMovieVideos({
                    data: data.results
                })
            })
    }

    render() {
        console.log(this.props.movieVideos)
        return (
            <div>
                VIDEOS
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieVideos: state.movie.movieVideos
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieVideos: actionsMovie.actionCreatorGetMovieVideos
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieVideos);