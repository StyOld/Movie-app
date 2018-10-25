import reducerAuthentication from './reducerAuthentication';
import reducerMovies from './reducerMovies';
import reducerMovie from './reducerMovie';
import {combineReducers} from 'redux';
import reducerAccount from "./reducerAccount";

const reducers = combineReducers({
    authentication: reducerAuthentication,
    account: reducerAccount,
    movies: reducerMovies,
    movie: reducerMovie
});

export default reducers;