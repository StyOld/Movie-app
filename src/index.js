import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import {createStore} from 'redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const actionCreactorUpdateAuth = (payload) => {
    return {
        type: 'UPDATE_AUTH',
        payload
    }
};

export const actionCreactorRemoveSessionId = () => {
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

const initialState = {
    user: null,
    session_id: cookies.get('session_id'),
    toggleModal: false,
    isAuth: false,
    favoriteMovies: [],
    watchlistMovies: []
};

const reducerApp = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_AUTH':
            cookies.set('session_id', action.payload.session_id, {
                path: '/',
                maxAge: 2592000
            });
            return {
                ...state,
                user: action.payload.user,
                session_id: action.payload.session_id,
                isAuth: true
            };

        case 'LOGOUT':
            cookies.remove('session_id');
            return {
                ...state,
                session_id: null,
                user: null,
                isAuth: false
            };

        case 'SHOW_LOGINFORM':
            return {
                ...state,
                toggleModal: !state.toggleModal
            };

        case 'HIDE_LOGINFORM':
            return {
                ...state,
                toggleModal: false
            };

        default:
            return state;
    }
};

const store = createStore(reducerApp);

// store.subscribe(() => {
//     console.log('change', store.getState())
// });

// store.dispatch(
//     actionCreactorUpdateAuth({
//         user: {
//             name: 'Sty'
//         },
//         session_id: 'text'
// }));
//
// store.dispatch(
//     actionCreactorUpdateAuth({
//         user: {
//             name: 'Sty1'
//         },
//         session_id: 'text1'
//     }));

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
