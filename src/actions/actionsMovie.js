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

export const actionCreatorGetMovieCredits = (payload) => {
    return {
        type: constants.GET_MOVIE_CREDITS,
        payload
    }
};

export const actionCreatorGetMovieVideos = (payload) => {
    return {
        type: constants.GET_MOVIE_VIDEOS,
        payload
    }
};