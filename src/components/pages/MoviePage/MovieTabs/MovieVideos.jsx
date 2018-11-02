import React from 'react';
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import YouTube from 'react-youtube';

class MovieVideos extends React.Component {
    componentDidMount () {
        this.props.getByTypeMovieDetails({
            movieId: this.props.match.params.id,
            type: 'videos'
        })
    }

    render() {
        return (
            Object.keys(this.props.videos).length !==0  ? (
                this.props.videoList.length !==0 ? (
                    <div className="row mt-4">
                        {this.props.videoList.map(videoItem => (
                            <div className="col-6" key={videoItem.id}>
                                <YouTube
                                    className="container"
                                    videoId={videoItem.key}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row mt-4"><h4><strong>Нет видео</strong></h4></div>
                )) : (
                <div className="row mt-4"><h4><strong>...Загрузка</strong></h4></div>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.movie.videos,
        videoList: state.movie.videos.results || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getByTypeMovieDetails: actionsMovie.actionCreatorGetByTypeMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieVideos);