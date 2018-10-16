import CallApi from '../api/api';

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
    return {
        type: 'UPDATE_AUTH',
        payload
    }
};

export const actionCreatorOnLogOut = () => {
    return {
        type: 'LOGOUT'
    }
};

export const actionCreatorShowLoginForm = () => {
    return {
        type: 'SHOW_LOGINFORM'
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
                    // payload: data.results
                    payload: data
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

export const actionCreatorGetByTypeMovies = (params, type) => {
    return dispatch => {
        dispatch({
            type: 'FETCHING_MOVIES_BY_TYPE'
        });

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
        dispatch({
            type: 'FETCHING_MOVIES_BY_TYPE'
        });

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

export const actionCreatorDropDownToggle = () => {
    return {
        type: 'DROP_DOWN_TOGGLE'
    }
};

export const actionCreatorDeleteSession = (params) => {
    return dispatch => {
        dispatch({
            type: 'FETCHING_DELETE_SESSION'
        });

        CallApi.get('/authentication/session', {
            params: params
        })
            .then(data => {
                dispatch({
                    type: 'LOGOUT'
                    // ,payload: data
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