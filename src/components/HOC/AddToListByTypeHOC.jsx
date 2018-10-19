import React from 'react';
import CallApi from "../../api/api";
import _ from 'lodash';
import * as actions from "../../actions/actions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.authentication.isAuth,
        session_id: state.authentication.session_id,
        favoriteMovies: state.account.favoriteMovies,
        watchlistMovies: state.account.watchlistMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            toggleLoginForm: actions.actionCreatorToggleLoginForm,
            getByTypeMovies: actions.actionCreatorGetByTypeMovies
        }
        ,dispatch)
};

export default (Component, type) => connect(mapStateToProps, mapDispatchToProps)(class AddToListByTypeHOC extends React.Component {
    constructor() {
        super();

        this.state = {
            added: false,
            disabled: false
        };
    };

    onChangeAdded = () => {
        if (!this.props.isAuth) {
            this.props.toggleLoginForm()
        } else

            this.setState(prevState => ({
            added: !prevState.added,
            disabled: true
        }), () => {
            CallApi.post(`/account/{account_id}/${type}`, {
                params: {
                    session_id: this.props.session_id
                },
                body: {
                    media_type: 'movie',
                    media_id: this.props.movieId,
                    [type]: this.state.added
                }
            })
                .then(() => {
                    this.setState({
                        disabled: false
                    });
                    this.props.getByTypeMovies({session_id: this.props.session_id}, type)
                })
        })
    };

    componentDidMount() {
        if (this.props[`${type}Movies`].findIndex(item => {
            return item.id === this.props.movieId
        }) !== -1) {
            this.setState({
                added: true
            })}
    };

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props[`${type}Movies`], prevProps[`${type}Movies`]) || this.props.movieId !== prevProps.movieId) {
            if (this.props[`${type}Movies`].findIndex(item => {
               return item.id === this.props.movieId
            }) !== -1) {
                this.setState({
                    added: true
                })}
        }
    };

    // static getDerivedStateFromProps(props) {
    //     return {
    //         added: props[`${type}Movies`].findIndex(item => {
    //                        return item.id === props.movieId
    //                     }) !== -1
    //     }
    // }

    render () {
        const {added, disabled} = this.state;
        return (
            <Component added={added} disabled={disabled} onChangeAdded={this.onChangeAdded} />
        )
    }
})

// import AppConsumerHOC from "./AppConsumerHOC";

// export default (Component, type) => AppConsumerHOC(class AddToListByTypeHOC extends React.Component {