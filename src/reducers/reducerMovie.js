import * as constants from "../constants/contsants";

const initialState = {
    moviesDetails: {},
    movieGenres: []
};

const reducerMovie = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_MOVIE_DETAILS:
            return {
                ...state,
                moviesDetails: action.payload.data,
                movieGenres: action.payload.data.genres,
                movieLanguages: action.payload.data.spoken_languages
            };

        case constants.UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                moviesDetails: {}
            };

        default:
            return state;
    }
};

export default reducerMovie;