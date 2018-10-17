import {createStore, applyMiddleware, compose} from 'redux';
import reducers from "../reducers/reducers";

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
}

const store = createStore(reducers, compose(applyMiddleware(async),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ));

export default store;