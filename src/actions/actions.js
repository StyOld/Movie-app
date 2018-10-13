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

export const actionCreactorGetByTypeMovies = () => {
    return {
        type: 'GET_BY_TYPE_MOVIES'
    }
};