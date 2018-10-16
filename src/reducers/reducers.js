import reducerAuthentication from './reducerAuthentication';
import reducerMovies from './reducerMovies';
import {combineReducers} from 'redux';
import reducerAccount from "./reducerAccount";
import reducerFilters from "./reducerFilters";

const reducers = combineReducers({
    authentication: reducerAuthentication,
    account: reducerAccount,
    movies: reducerMovies,
    filters: reducerFilters
});

export default reducers;