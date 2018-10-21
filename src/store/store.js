import {createStore, applyMiddleware, compose} from 'redux';
import reducers from "../reducers/reducers";
import * as actions from '../actions/actions'
import { composeWithDevTools } from 'redux-devtools-extension';

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
    if (action.type === "UPDATE_AUTH") {
        const {user, session_id} = action.payload;
        // console.log(action);
        dispatch(actions.actionCreatorGetByTypeMovies(user.id,{session_id},'favorite'));
        dispatch(actions.actionCreatorGetByTypeMovies(user.id,{session_id},'watchlist'));
    }
        return next(action);
};

// const store = createStore(reducers, compose(applyMiddleware(async),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));

const store = createStore(reducers, composeWithDevTools(applyMiddleware(async, getAccountList)));

export default store;