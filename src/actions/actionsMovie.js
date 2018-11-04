import * as constants from '../constants/contsants'
import CallApi from "../api/api";

export const actionCreatorGetMovieDetails = (payload) => {
    return {
        type: constants.GET_MOVIE_DETAILS,
        payload
    }
};

export const actionCreatorUpdateMovieDetails = () => {
    return {
        type: constants.UPDATE_MOVIE_DETAILS
    }
};

export const actionCreatorGetByTypeMovieDetails = ({movieId, type}) => {
    return dispatch => {
        CallApi.get(`/movie/${movieId}/${type}`)
            .then(data => {
                dispatch({
                    type: constants.GET_BY_TYPE_MOVIE_DETAILS,
                    payload: {
                        type,
                        data
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_BY_TYPE_MOVIE_DETAILS,
                    payload: error
                })
            })
    }
};