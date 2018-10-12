import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import {createStore} from 'redux';
import Cookies from 'universal-cookie';
import CallApi from "./api/api";

const cookies = new Cookies();

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

// export const actionCreactorGetByTypeMovies = () => {
//     return {
//         type: 'GET_BY_TYPE_MOVIES'
//     }
// };

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

        // case 'GET_BY_TYPE_MOVIES':
        //     CallApi.get(`/account/{account_id}/${type}/movies`, {
        //         params: {
        //             language: 'ru-RU',
        //             session_id: this.state.session_id
        //         }
        //     })
        //         .then(data => {
        //             this.setState({
        //                 [`${type}Movies`]: data.results
        //             });
        //         })
            //
            // return {
            //     ...state,
            //     toggleModal: false
            // };

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
