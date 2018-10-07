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
          showModal: false,
          isAuth: false
      };
  };

  // updateUser = user => {
  //     this.setState({
  //         user,
  //         isAuth: true
  //     })
  // };

  // updateSessionId = session_id => {
  //     cookies.set('session_id', session_id, {
  //         path: '/',
  //         maxAge: 2592000
  //     });
  //     this.setState({
  //         session_id
  //     })
  // };

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
          showModal: !prevState.showModal
      }))
  };

  hideLoginForm = () => {
      this.setState({
          showModal: false
      })
  };

  componentDidMount() {
      // const session_id = cookies.get('session_id');
      const {session_id} = this.state;

      if (session_id) {
          CallApi.get('/account', {
              params: {
                  session_id: session_id
              }
          }).then(user => {
              this.updateAuth(user,session_id);
              // this.updateUser(user);
              // this.updateSessionId(session_id);
          })
      }
  }

  render() {
      const {user, session_id, showModal, isAuth} = this.state;

      return (session_id && isAuth) || !session_id ? (
          <BrowserRouter>
              <AppContext.Provider
                  value={{
                      user: user,
                      session_id,
                      showModal,
                      isAuth,
                      // updateUser: this.updateUser,
                      // updateSessionId: this.updateSessionId,
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