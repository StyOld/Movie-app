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
            Object.keys(this.props.credits).length !==0  ? (
                this.props.creditList.length !==0 ? (
                    <div className="row mt-4">
                        {this.props.creditList.map(creditItem => (
                            <div className="col-3 mb-2" key={creditItem.id}>
                                <CreditItem
                                    item={creditItem}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="row mt-4"><h4><strong>Нет актёров</strong></h4></div>
                )) : (
                <div className="row mt-4"><h5><strong>...Загрузка</strong></h5></div>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credits: state.movie.credits,
        creditList: state.movie.credits.cast || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getByTypeMovieDetails: actionsMovie.actionCreatorGetByTypeMovieDetails
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCredits);