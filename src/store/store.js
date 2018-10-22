import {createStore, applyMiddleware, compose} from 'redux';
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

const getMoviesList = ({ getState, dispatch }) => next => action => {
    if (action.type === constants.CHANGE_FILTERS) {
        const {filters} = action.payload;
        dispatch(actions.actionCreatorChangePage(1));
        dispatch(actions.actionCreatorGetMovies(filters));
    }
    return next(action);
};

// componentDidUpdate(prevProps) {
//     if (!_.isEqual(this.props.filters, prevProps.filters)) {
//         this.props.onChangePage(1);
//         this.getMovies(this.props.filters, 1);
//     }
//     if (this.props.page !== prevProps.page) {
//         this.getMovies(this.props.filters, this.props.page)
//     }
// }

// const store = createStore(reducers, compose(applyMiddleware(async),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));

const store = createStore(reducers, composeWithDevTools(applyMiddleware(async, getAccountList, getMoviesList)));

export default store;