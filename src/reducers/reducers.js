import reducerAuthentication from './reducerAuthentication';
import reducerMovies from './reducerMovies';
import {combineReducers} from 'redux';
import reducerAccount from "./reducerAccount";

const reducers = combineReducers({
    authentication: reducerAuthentication,
    account: reducerAccount,
    movies: reducerMovies
});

export default reducers;