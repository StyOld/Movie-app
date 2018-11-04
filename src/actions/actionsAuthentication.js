import * as constants from '../constants/contsants'
import CallApi from '../api/api';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const actionCreatorUpdateAuth = ({user, session_id, isAuth}) => {
    cookies.set('session_id', session_id, {
        path: '/',
        maxAge: 2592000
    });
    return {
        type: constants.UPDATE_AUTH,
        payload: {
            user,
            session_id,
            isAuth
        }
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