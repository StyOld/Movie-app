import * as constants from '../constants/contsants'
import CallApi from '../api/api';
import Cookies from 'universal-cookie';

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

export const actionCreatorUpdateAuth = payload => {
    // cookies.set('session_id', session_id, {
    //     path: '/',
    //     maxAge: 2592000
    // });
    return {
        type: constants.UPDATE_AUTH,
        payload
    }
};

export const actionCreatorOnLogOut = () => {
    return {
        type: 'LOGOUT'
    }
};

export const actionCreatorToggleLoginForm = () => {
    return {
        type: 'TOGGLE_LOGINFORM'
    }
};

export const actionCreatorHideLoginForm = () => {
    return {
        type: 'HIDE_LOGINFORM'
    }
};

export const actionCreatorGetMovieDetails = (payload) => {
    return {
        type: 'GET_MOVIE_DETAILS',
        payload
        // payload: {
        //     data: payload.data
        // }
    }
};

export const actionCreatorUpdateMovie = () => {
  return {
      type: 'UPDATE_MOVIE'
  }
};

export const actionCreatorGetMovies = (params) => {
    return dispatch => {
        dispatch({
            type: 'FETCHING_MOVIES'
        });

        CallApi.get('/discover/movie', {
            params: params
        })
            .then(data => {
                dispatch({
                    type: 'UPDATE_MOVIES',
                    payload: data
                    // payload: data.results
                });
                dispatch({
                    type: 'GET_TOTAL_PAGE',
                    payload: data.total_pages
                })
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_GET_MOVIES',
                    payload: error
                });
            });
    }
};

export const actionCreatorGetByTypeMovies = (params, type) => {
    return dispatch => {
        CallApi.get(`/account/{account_id}/${type}/movies`, {
            params: params
        })
            .then(data => {
                dispatch({
                    type: 'GET_BY_TYPE_MOVIES',
                    payload: {
                        type,
                        data: data.results
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_GET_MOVIES',
                    payload: error
                })
            })
    }
};

export const actionCreatorGetGenresList = () => {
    return dispatch => {
        CallApi.get('/genre/movie/list')
            .then(data => {
                dispatch({
                    type: 'GET_GENRES_LIST',
                    payload: {
                        data: data.genres
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_GET_GENRES',
                    payload: error
                })
            })
    }
};

export const actionCreatorToggleDropDown = () => {
    return {
        type: 'TOGGLE_DROP_DOWN'
    }
};

export const actionCreatorDeleteSession = (params) => {
    return dispatch => {
        CallApi.delete('/authentication/session', {
            params: params
        })
            .then(() => {
                dispatch({
                    type: 'LOGOUT'
                })
            })
            .catch(error => {
                dispatch({
                    type: 'ERROR_DELETE_SESSION',
                    payload: error
                })
            })
    }
};

export const actionCreatorChangePage = (payload) => {
    return {
        type: 'CHANGE_PAGE',
        payload
    }
};

export const actionCreatorGetTotalPage = (payload) => {
    return {
        type: 'GET_TOTAL_PAGE',
        payload
    }
};

export const actionCreatorClearFilters = () => {
    return {
        type: 'CLEAR_FILTERS'
    }
};

export const actionCreatorChangeFilters = (event) => {
    return {
        type: 'CHANGE_FILTERS',
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
            type: payload.target.checked ? "CHECKED_GENRE" : "UNCHECKED_GENRE",
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

// export const acitionCreatorGetA
// CallApi.get('/account', {
//     params: {
//         session_id
//     }
// }).then(user => {
//     this.props.updateAuth({user,session_id});
// })