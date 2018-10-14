export const actionCreactorUpdateAuth = (payload) => {
    return {
        type: 'UPDATE_AUTH',
        payload
    }
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