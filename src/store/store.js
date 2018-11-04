import {createStore, applyMiddleware} from 'redux';
import reducers from "../reducers/reducers";
import * as actionsAccount from '../actions/actionsAccount';
import * as actionsMovies from '../actions/actionsMovies'
import { composeWithDevTools } from 'redux-devtools-extension';
import * as constants from "../constants/contsants";

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
        dispatch(actionsAccount.actionCreatorGetByTypeMovies({
            userId: user.id,
            params: {
                session_id
            },
            type: 'favorite'
        }));
        dispatch(actionsAccount.actionCreatorGetByTypeMovies({
            userId: user.id,
            params: {
                session_id
            },
            type: 'watchlist'
        }));
    }
        return next(action);
};

const changingFiltersGetMovies = ({ getState, dispatch }) => next => action => {
    if (action.type === constants.CHANGE_FILTERS) {
        dispatch(actionsMovies.actionCreatorChangePage(1));
        dispatch(actionsMovies.actionCreatorGetMovies({
            filters: {
                ...getState().movies.filters,
                [action.payload.name]: action.payload.value
            },
            page: 1
        }));
    }

    if (action.type === constants.CHANGE_PAGE) {
        dispatch(actionsMovies.actionCreatorGetMovies({
            filters: {
                ...getState().movies.filters,
                [action.payload.name]: action.payload.value
            },
            page: action.payload
        }));
    }

    return next(action);
};

const сlearFilters = ({getState, dispatch}) => next => action => {
    if (action.type === constants.CLEAR_FILTERS) {
        dispatch(actionsMovies.actionCreatorGetMovies({
            filters: {
                sort_by: 'vote_average.asc',
                primary_release_year: '2018',
                genres: []},
            page: 1
        }));
    }
        return next(action);
};

const store = createStore(reducers, composeWithDevTools(applyMiddleware(async, getAccountList, changingFiltersGetMovies, сlearFilters)));

export default store;