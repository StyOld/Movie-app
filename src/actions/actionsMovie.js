import * as constants from '../constants/contsants'

export const actionCreatorGetMovieDetails = (payload) => {
    return {
        type: constants.GET_MOVIE_DETAILS,
        payload
        // payload: {
        //     data: payload.data
        // }
    }
};

export const actionCreatorUpdateMovie = () => {
    return {
        type: constants.UPDATE_MOVIE_DETAILS
    }
};