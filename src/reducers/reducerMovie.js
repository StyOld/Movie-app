import * as constants from "../constants/contsants";

const initialState = {
    moviesDetails: {},
    movieCredits: {},
    movieVideos: []
};

const reducerMovie = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_MOVIE_DETAILS:
            return {
                ...state,
                moviesDetails: action.payload.data
            };

        case constants.UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                moviesDetails: {}
            };

        case constants.GET_MOVIE_CREDITS:
            return {
                ...state,
                movieCredits: action.payload.data
            };

        case constants.GET_MOVIE_VIDEOS:
            return {
                ...state,
                movieVideos: action.payload.data
            };

        default:
            return state;
    }
};

export default reducerMovie;