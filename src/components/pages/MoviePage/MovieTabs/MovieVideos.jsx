import React from 'react';
import CallApi from "../../../../api/api";
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import YouTube from 'react-youtube';
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
        return (
            <div className="row mt-4">
                {this.props.movieVideos.map(videoItem => (
                    <div className="col-6 mb-2">
                        <YouTube
                            className="container"
                            videoId={videoItem.key}
                        />
                    </div>
                ))}
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