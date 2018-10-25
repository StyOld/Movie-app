import * as constants from '../constants/contsants'
import CallApi from '../api/api';

export const actionCreatorGetMovies = ({filters, page}) => {
    const {sort_by, primary_release_year, genres} = filters;

    const queryStringParams = {
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
        // with_genres: genres.join(',') словил баг на стороне сервака
    };
    console.log("genres", genres)
    if (genres.length>0) queryStringParams.with_genres = genres.join(',');

    return dispatch => {
        dispatch({
            type: constants.FETCHING_MOVIES
        });

        CallApi.get('/discover/movie', {
            params: queryStringParams
        })
            .then(data => {
                dispatch({
                    type: constants.UPDATE_MOVIES,
                    payload: data
                    // payload: data.results
                });
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_MOVIES,
                    payload: error
                });
            });
    }
};

export const actionCreatorGetGenresList = () => {
    return dispatch => {
        CallApi.get('/genre/movie/list')
            .then(data => {
                dispatch({
                    type: constants.GET_GENRES_LIST,
                    payload: {
                        data: data.genres
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_GENRES,
                    payload: error
                })
            })
    }
};

export const actionCreatorChangePage = (payload) => {
    return {
        type: constants.CHANGE_PAGE,
        payload
    }
};

export const actionCreatorClearFilters = () => {
    return {
        type: constants.CLEAR_FILTERS
    }
};

export const actionCreatorChangeFilters = (event) => {
    return {
        type: constants.CHANGE_FILTERS,
        payload: {
            name: event.target.name,
            value: event.target.value
            // payload
        }
    }
};

export const actionCreatorChangeGenres = payload => {
    return dispatch => {
        dispatch({
            type: payload.target.checked ? constants.CHECKED_GENRE : constants.UNCHECKED_GENRE,
            payload: payload.target.value
        });
    };
// (payload.target.checked) ? (
//     dispatch({
//         type: 'CHECKED_GENRE',
//         payload
//     })
//     ) : (
//     dispatch({
//         type: 'UNCHECKED_GENRE',
//         payload
//     })
//     )
};
