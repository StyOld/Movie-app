import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByType from "./pages/AccountPage/AccountListByType";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import CallApi from "../api/api";
import { actionCreactorUpdateAuth, actionCreactorOnLogOut,
    actionCreactorShowLoginForm, actionCreactorHideLoginForm,
    actionCreactorGetByTypeMovies } from '../actions/actions';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faBookmark);

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
    // constructor() {
    //   super()
    //     this.state = {
    //         // session_id: null,
    //         session_id: cookies.get('session_id'),
    //         user: null,
    //         isAuth: false,
    //         toggleModal: false,
    //         favoriteMovies: [],
    //         watchlistMovies: []
    //     };
    // };

    updateAuth = (user, session_id) => {
        this.props.store.dispatch(actionCreactorUpdateAuth({
            user,
            session_id
        }))

        // cookies.set('session_id', session_id, {
        //     path: '/',
        //     maxAge: 2592000
        // });
        // this.setState({
        //     session_id,
        //     user,
        //     isAuth: true
        // })
    };

    onLogOut = () => {
        this.props.store.dispatch(actionCreactorOnLogOut())

        // cookies.remove('session_id');
        // this.setState({
        //     session_id: null,
        //     user: null,
        //     isAuth: false
        // })
    };

    showLoginForm = () => {
        this.props.store.dispatch(actionCreactorShowLoginForm())

        // this.setState(prevState => ({
        //     toggleModal: !prevState.toggleModal
        // }))
    };

    hideLoginForm = () => {
        this.props.store.dispatch(actionCreactorHideLoginForm())

        // this.setState({
        //     toggleModal: false
        // })
    };

    getByTypeMovies = (type) => {
        CallApi.get(`/account/{account_id}/${type}/movies`, {
            params: {
                language: 'ru-RU',
                session_id: this.props.store.getState().session_id
            }
        })
            .then(data => {
                // this.props.store.dispatch(actionCreactorGetByTypeMovies())
                this.setState({
                    [`${type}Movies`]: data.results
                });
            })
    };

    componentDidMount() {
        const {session_id} = this.props.store.getState();

        this.props.store.subscribe(() => {
            console.log('change', session_id);
            this.forceUpdate();
        });

        if (session_id) {
            CallApi.get('/account', {
                params: {
                    session_id: session_id
                }
            }).then(user => {
                this.updateAuth(user,session_id);
            })
        }
    }

    // componentDidUpdate(prevProps, prevStates) {
    //     if ((this.state.isAuth !== prevStates.isAuth) && (this.state.isAuth)) {
    //         this.getByTypeMovies('favorite');
    //         this.getByTypeMovies('watchlist')
    //     }
    // }

    render() {
        const {user, session_id, toggleModal, isAuth, favoriteMovies, watchlistMovies} = this.props.store.getState();
        // const {user, session_id, toggleModal, isAuth, favoriteMovies, watchlistMovies} = this.state;

        return isAuth || !session_id ? (
            <BrowserRouter>
                <AppContext.Provider
                    value={{
                        // user: user,
                        user,
                        session_id,
                        toggleModal,
                        isAuth,
                        favoriteMovies,
                        watchlistMovies,
                        onLogOut: this.onLogOut,
                        showLoginForm: this.showLoginForm,
                        hideLoginForm: this.hideLoginForm,
                        updateAuth: this.updateAuth,
                        getByTypeMovies: this.getByTypeMovies
                    }}
                >
                    <div>
                        <Header user={user}/>
                        <Route exact path='/' component={MoviesPage} />
                        <Route path='/movie/:id' component={MoviePage} />
                        <Route path='/account/favorites' component={AccountListByType('favorite')}/>
                        <Route path='/account/watchlist' component={AccountListByType('watchlist')}/>
                    </div>
                </AppContext.Provider>
            </BrowserRouter>
        ) : (<p>...Loading</p>)
    }
}