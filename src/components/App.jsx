import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByType from "./pages/AccountPage/AccountListByType";
import Header from "./Header/Header";
import CallApi from "../api/api";
import { actionCreactorUpdateAuth, actionCreactorOnLogOut,
    actionCreactorShowLoginForm, actionCreactorHideLoginForm,
    actionCreactorGetByTypeMovies } from '../actions/actions';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faBookmark);

export const AppContext = React.createContext();

class App extends React.Component {
  // updateAuth = (user, session_id) => {
  //     this.props.store.dispatch(actionCreactorUpdateAuth({
  //         user,
  //         session_id
  //     }))
  // };
  //
  // onLogOut = () => {
  //     this.props.store.dispatch(actionCreactorOnLogOut())
  // };
  //
  // showLoginForm = () => {
  //     this.props.store.dispatch(actionCreactorShowLoginForm())
  // };
  //
  // hideLoginForm = () => {
  //     this.props.store.dispatch(actionCreactorHideLoginForm())
  // };

  getByTypeMovies = (type) => {
      CallApi.get(`/account/{account_id}/${type}/movies`, {
          params: {
              language: 'ru-RU',
              session_id: this.props.session_id
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
      const {session_id} = this.props;

      if (session_id) {
          CallApi.get('/account', {
              params: {
                  session_id
              }
          }).then(user => {
              this.props.updateAuth(user,session_id);
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
      const {user, session_id, toggleModal, isAuth, favoriteMovies, watchlistMovies,
          updateAuth, onLogOut, showLoginForm, hideLoginForm, getByTypeMovies} = this.props;

      return isAuth || !session_id ? (
          <BrowserRouter>
              <AppContext.Provider
                  value={{
                      user,
                      session_id,
                      toggleModal,
                      isAuth,
                      favoriteMovies,
                      watchlistMovies,
                      onLogOut,
                      showLoginForm,
                      hideLoginForm,
                      updateAuth,
                      getByTypeMovies
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
        session_id: state.session_id,
        toggleModal: state.toggleModal,
        isAuth: state.isAuth,
        favoriteMovies: state.favoriteMovies,
        watchlistMovies: state.watchlistMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuth: (user, session_id) => dispatch(actionCreactorUpdateAuth({
            user,
            session_id
        })),
        onLogOut: () => dispatch(actionCreactorOnLogOut()),
        showLoginForm: () => dispatch(actionCreactorShowLoginForm()),
        hideLoginForm: () => dispatch(actionCreactorHideLoginForm()),
        getByTypeMovies: () => dispatch(actionCreactorGetByTypeMovies())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);