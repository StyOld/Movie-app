import * as constants from "../constants/contsants";

const initialState = {
    details: {},
    credits: {},
    videos: {}
};

const reducerMovie = (state = initialState, action) => {
    switch(action.type) {
        case constants.GET_MOVIE_DETAILS:
            return {
                ...state,
                details: action.payload.data
            };

        case constants.UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                details: {},
                credits: {},
                videos: {}
            };

        case constants.GET_BY_TYPE_MOVIE_DETAILS:
            return {
                ...state,
                [`${action.payload.type}`]: action.payload.data
            };

        default:
            return state;
    }
};

export default reducerMovie;