import React from 'react';
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreditItem from "./CreditItem";

class MovieCredits extends React.Component {
    componentDidMount () {
        this.props.getByTypeMovieDetails({
            movieId: this.props.match.params.id,
            type: 'credits'
        })
    }

    render() {
        return (
            <div className="row mt-4">
                {this.props.creditsOfMovie.map(creditItem => (
                    <div className="col-3 mb-2" key={creditItem.id}>
                        <CreditItem
                            item={creditItem}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        creditsOfMovie: state.movie.creditsOfMovie.cast || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getByTypeMovieDetails: actionsMovie.actionCreatorGetByTypeMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCredits);