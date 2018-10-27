import * as constants from "../constants/contsants";

const initialState = {
    detailsOfMovie: {},
    creditsOfMovie: {},
    videosOfMovie: {}
};

const reducerMovie = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_MOVIE_DETAILS:
            return {
                ...state,
                detailsOfMovie: action.payload.data
            };

        case constants.UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                detailsOfMovie: {},
                creditsOfMovie: {},
                videosOfMovie: {}
            };

        case constants.GET_BY_TYPE_MOVIE_DETAILS:
            return {
                ...state,
                [`${action.payload.type}OfMovie`]: action.payload.data
            };

        default:
            return state;
    }
};

export default reducerMovie;