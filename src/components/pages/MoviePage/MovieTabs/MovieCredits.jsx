import React from 'react';
import CallApi from "../../../../api/api";
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MovieCredits extends React.Component {
    componentDidMount () {
        // CallApi.get(`/movie/${this.props.moviesDetails.id}/credits`)
        //     .then(data => {
        //         this.props.getMovieCredits({
        //             data
        //         })
        //     })
    }

    render() {
        // console.log(this.props.moviesDetails);
        return (
            <div>MovieCredits</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieCredits: state.movie.movieCredits,
        moviesDetails: state.movie.moviesDetails
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieCredits: actionsMovie.actionCreatorGetMovieCredits
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCredits);