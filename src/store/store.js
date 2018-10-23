import {createStore, applyMiddleware} from 'redux';
import reducers from "../reducers/reducers";
import * as actions from '../actions/actions'
import { composeWithDevTools } from 'redux-devtools-extension';
import * as constants from "../constants/contsants";

// const logger = ({getState, dispatch}) => next => action => {
//     // console.log('dispatch', dispatch);
//     // console.log(action.type,action)
//     return next(action);
// }

const async = ({getState, dispatch}) => next => action => {
    if (typeof action === 'function') {
        action(dispatch);
    } else {
        return next(action);
    }
};

const getAccountList = ({ getState, dispatch }) => next => action => {
    if (action.type === constants.UPDATE_AUTH) {
        const {user, session_id} = action.payload;
        dispatch(actions.actionCreatorGetByTypeMovies({
            userId: user.id,
            params: {
                session_id
            },
            type: 'favorite'
        }));
        dispatch(actions.actionCreatorGetByTypeMovies({
            userId: user.id,
            params: {
                session_id
            },
            type: 'watchlist'
        }));
    }
        return next(action);
};

const getMoviesOnChangeFilters = ({ getState, dispatch }) => next => action => {
    if (action.type === constants.CHANGE_FILTERS) {
        dispatch(actions.actionCreatorChangePage(1));
        dispatch(actions.actionCreatorGetMovies({
            filters: action.payload.filters,
            page: 1
        }));
    }
    return next(action);
};

const getMoviesOnChangePage = ({ getState, dispatch }) => next => action => {
    if (action.type === constants.CHANGE_PAGE) {
        // const {filters: {sort_by, primary_release_year, genres}, page} = action.payload;
        dispatch(actions.actionCreatorGetMovies({
            filters: action.payload.filters,
            page: action.payload.page
        }));
    }
    return next(action);
};

// componentDidUpdate(prevProps) {
//     if (!_.isEqual(this.props.filters, prevProps.filters)) {
//         this.props.onChangePage(1);
//         this.props.getMovies({filters: this.props.filters, page: 1});
//     }
//     if (this.props.page !== prevProps.page) {
//         this.props.getMovies({filters: this.props.filters, page: this.props.page})
//     }
// }

// const store = createStore(reducers, compose(applyMiddleware(async),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));

const store = createStore(reducers, composeWithDevTools(applyMiddleware(async, getAccountList, getMoviesOnChangeFilters, getMoviesOnChangePage)));

export default store;