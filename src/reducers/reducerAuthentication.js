import * as constants from '../constants/contsants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const initialState = {
    user: null,
    session_id: cookies.get('session_id'),
    isAuth: false,
    showModal: false,
    showDropDown: false
};

const reducerAuthentication = (state = initialState, action) => {
    switch(action.type) {
        case constants.UPDATE_AUTH:
            return {
                ...state,
                user: action.payload.user,
                session_id: action.payload.session_id,
                isAuth: true
            };

        case constants.LOGOUT:
            cookies.remove('session_id');
            return {
                ...state,
                session_id: null,
                user: null,
                isAuth: false
            };

        case constants.TOGGLE_LOGINFORM:
            return {
                ...state,
                showModal: !state.showModal
            };

        case constants.HIDE_LOGINFORM:
            return {
                ...state,
                showModal: false
            };

        case constants.TOGGLE_DROP_DOWN:
            return {
                ...state,
                showDropDown: !state.showDropDown
            };

        default:
            return state;
    }
};

export default reducerAuthentication;