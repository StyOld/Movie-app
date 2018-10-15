import CallApi from '../api/api';

// export const actionCreactorUpdateAuth = dispatch(payload => {
//     return {
//         type: 'UPDATE_AUTH',
//         payload
//     }
// });

export const actionCreactorUpdateAuth = payload => dispatch => {
        return dispatch({
        type: 'UPDATE_AUTH',
        payload
    })
};

export const actionCreactorOnLogOut = () => {
    return {
        type: 'LOGOUT'
    }
};

export const actionCreactorShowLoginForm = () => {
    return {
        type: 'SHOW_LOGINFORM'
    }
};

export const actionCreactorHideLoginForm = () => {
    return {
        type: 'HIDE_LOGINFORM'
    }
};

export const actionCreactorGetByTypeMovies = (payload) => {
    return {
        type: 'GET_BY_TYPE_MOVIES',
        payload: {
            type: payload.type,
            data: payload.data
        }
    }
};

export const actionCreactorGetMovieDetails = (payload) => {
    return {
        type: 'GET_MOVIE_DETAILS',
        payload: {
            data: payload.data
        }
    }
};

export const actionCreactorGetGenresList = (payload) => {
    return {
        type: 'GET_GENRES_LIST',
        payload: {
            data: payload.data
        }
    }
};

export const actionCreactorUpdateMovies = (movies) => {
    return {
        type: 'UPDATE_MOVIES',
        payload: movies
    }
};

export const actionCreactorGetMovies = (params) => {
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
}

