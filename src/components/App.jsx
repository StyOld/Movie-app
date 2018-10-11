import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByType from "./pages/AccountPage/AccountListByType";
import Header from "./Header/Header";
import Cookies from 'universal-cookie';
import CallApi from "../api/api";
import { BrowserRouter, Route } from 'react-router-dom';
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
          isAuth: false,
          favoriteMovies: [],
          watchlistMovies: []
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

  getByTypeMovies = (type) => {
      CallApi.get(`/account/{account_id}/${type}/movies`, {
          params: {
              language: 'ru-RU',
              session_id: this.state.session_id
          }
      })
          .then(data => {
              this.setState({
                  [`${type}Movies`]: data.results
              });
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

  componentDidUpdate(prevProps, prevStates) {
      if ((this.state.isAuth !== prevStates.isAuth) && (this.state.isAuth)) {
          this.getByTypeMovies('favorite');
          this.getByTypeMovies('watchlist')
      }
  }

  render() {
      const {user, session_id, toggleModal, isAuth, favoriteMovies, watchlistMovies} = this.state;

      return isAuth || !session_id ? (
          <BrowserRouter>
              <AppContext.Provider
                  value={{
                      user: user,
                      session_id,
                      toggleModal,
                      isAuth,
                      favoriteMovies,
                      watchlistMovies,
                      removeSessionId: this.removeSessionId,
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