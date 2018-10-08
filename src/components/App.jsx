import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import CallApi from "../api/api";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faBookmark);

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super()
      this.state = {
          user: null,
          // session_id: null,
          session_id: cookies.get('session_id'),
          toggleModal: false,
          isAuth: false
      };
  };

  updateAuth = (user, session_id) => {
      cookies.set('session_id', session_id, {
          path: '/',
          maxAge: 2592000
      });
      this.setState({
          session_id,
          user,
          isAuth: true
      })
  };

  removeSessionId = () => {
      cookies.remove('session_id');
      this.setState({
          session_id: null,
          user: null,
          isAuth: false
      })
  };

  showLoginForm = () => {
      this.setState(prevState => ({
          toggleModal: !prevState.toggleModal
      }))
  };

  hideLoginForm = () => {
      this.setState({
          toggleModal: false
      })
  };

  componentDidMount() {
      const {session_id} = this.state;

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

  render() {
      const {user, session_id, toggleModal, isAuth} = this.state;

      return isAuth || !session_id ? (
          <BrowserRouter>
              <AppContext.Provider
                  value={{
                      user: user,
                      session_id,
                      toggleModal,
                      isAuth,
                      removeSessionId: this.removeSessionId,
                      showLoginForm: this.showLoginForm,
                      hideLoginForm: this.hideLoginForm,
                      updateAuth: this.updateAuth
                  }}
              >
                  <div>
                      <Header user={user}/>
                      <Route exact path='/' component={MoviesPage} />
                      <Route path='/movie/:id' component={MoviePage} />
                      <Route path='/account/favorites' component={AccountFavorites}/>
                      {/*
                  <MoviesPage/>
                  <MoviePage/>
                  '/' - MoviesPage
                  '/movie/1' - Movie with id = 1
                  */}
                  </div>
              </AppContext.Provider>
          </BrowserRouter>
          ) : (<p>...Loading</p>)
  }
}