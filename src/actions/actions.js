import * as constants from '../constants/contsants'
import CallApi from '../api/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// export const actionCreatorUpdateAuth = dispatch(payload => {
//     return {
//         type: 'UPDATE_AUTH',
//         payload
//     }
// });

// export const actionCreatorUpdateAuth = payload => dispatch => {
//         return dispatch({
//         type: 'UPDATE_AUTH',
//         payload
//     })
// };

export const actionCreatorUpdateAuth = (payload) => {
    cookies.set('session_id', payload.session_id, {
        path: '/',
        maxAge: 2592000
    });
    return {
        type: constants.UPDATE_AUTH,
        payload
    }
};

export const actionCreatorOnLogOut = () => {
    return {
        type: constants.LOGOUT
    }
};

export const actionCreatorToggleLoginForm = () => {
    return {
        type: constants.TOGGLE_LOGINFORM
    }
};

export const actionCreatorHideLoginForm = () => {
    return {
        type: constants.HIDE_LOGINFORM
    }
};

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
      type: constants.UPDATE_MOVIE
  }
};

export const actionCreatorGetMovies = ({filters, page}) => {
    const {sort_by, primary_release_year, genres} = filters;

    const queryStringParams = {
        sort_by: sort_by,
        page: page,
        primary_release_year: primary_release_year
        // with_genres: genres.join(',') словил баг на стороне сервака
    };

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
                dispatch({
                    type: constants.GET_TOTAL_PAGE,
                    payload: data.total_pages
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_MOVIES,
                    payload: error
                });
            });
    }
};

export const actionCreatorGetByTypeMovies = ({userId, params, type}) => {
    return dispatch => {
        CallApi.get(`/account/${userId}/${type}/movies`, {
            params: params
        })
            .then(data => {
                dispatch({
                    type: constants.GET_BY_TYPE_MOVIES,
                    payload: {
                        type,
                        data: data.results
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_MOVIES,
                    payload: error
                })
            })
    }
    // CallApi.get(`/account/{account_id}/${type}/movies`,
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

export const actionCreatorToggleDropDown = () => {
    return {
        type: constants.TOGGLE_DROP_DOWN
    }
};

export const actionCreatorDeleteSession = (params) => {
    return dispatch => {
        CallApi.delete('/authentication/session', {
            params: params
        })
            .then(() => {
                dispatch({
                    type: constants.LOGOUT
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_DELETE_SESSION,
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

export const actionCreatorGetTotalPage = (payload) => {
    return {
        type: constants.GET_TOTAL_PAGE,
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

export const actionCreatorGetAccount = (params) => {
    return dispatch => {
        if (params.session_id) {
            CallApi.get('/account', {
                params: params
            })
                .then((user) => {
                    cookies.set('session_id', params.session_id, {
                        path: '/',
                        maxAge: 2592000
                    });
                    dispatch({
                        type: constants.UPDATE_AUTH,
                        payload: {
                            user,
                            session_id: params.session_id
                        }
                    })
                })
        }
    }
};