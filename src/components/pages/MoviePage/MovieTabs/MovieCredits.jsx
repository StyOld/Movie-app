import React from 'react';
import CallApi from "../../../../api/api";
import * as actionsMovie from "../../../../actions/actionsMovie";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CreditItem from "./CreditItem";

class MovieCredits extends React.Component {
    componentDidMount () {
        CallApi.get(`/movie/${this.props.match.params.id}}/credits`)
            .then(data => {
                this.props.getMovieCredits({
                    data
                })
            })
    }

    render() {
        return (
            <div className='container'>
                <div className="row mt-4">
                    {this.props.movieCreditsCast.map(creditItem => (
                        <div className="col-3 mb-2" key={creditItem.id}>
                            <CreditItem
                                item={creditItem}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        movieCreditsCast: state.movie.movieCredits.cast || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovieCredits: actionsMovie.actionCreatorGetMovieCredits
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCredits);