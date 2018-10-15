import CallApi from '../api/api';

// export const actionCreactorUpdateAuth = dispatch(payload => {
//     return {
//         type: 'UPDATE_AUTH',
//         payload
//     }
// });

// export const actionCreactorUpdateAuth = payload => dispatch => {
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
        payload: {
            data: payload.data
        }
    }
};

export const actionCreatorGetGenresList = (payload) => {
    return {
        type: 'GET_GENRES_LIST',
        payload: {
            data: payload.data
        }
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
                    payload: data.results
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


