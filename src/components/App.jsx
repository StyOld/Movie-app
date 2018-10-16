import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByTypePage from "./pages/AccountPage/AccountListByTypePage";
import Header from "./Header/Header";
import CallApi from "../api/api";
import { actionCreatorUpdateAuth, actionCreatorOnLogOut,
    actionCreatorShowLoginForm, actionCreatorHideLoginForm,
    actionCreatorGetByTypeMovies } from '../actions/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faBookmark);

export const AppContext = React.createContext();

class App extends React.Component {
  componentDidMount() {
      const {session_id} = this.props;

      if (session_id) {
          CallApi.get('/account', {
              params: {
                  session_id
              }
          }).then(user => {
              this.props.updateAuth({user,session_id});
          })
      }
  };

  componentDidUpdate(prevProps) {
      if ((this.props.isAuth !== prevProps.isAuth) && (this.props.isAuth)) {
          this.props.getByTypeMovies({session_id: this.props.session_id},'favorite');
          this.props.getByTypeMovies({session_id: this.props.session_id},'watchlist')
      }
  }

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
                      // getByTypeMovies: this.getByTypeMovies
                  }}
              >
                  <div>
                      <Header user={user}/>
                      <Route exact path='/' component={MoviesPage} />
                      <Route path='/movie/:id' component={MoviePage} />
                      <Route path='/account/favorites' component={AccountListByTypePage('favorite')}/>
                      <Route path='/account/watchlist' component={AccountListByTypePage('watchlist')}/>
                  </div>
              </AppContext.Provider>
          </BrowserRouter>
          ) : (<p>...Loading</p>)
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        session_id: state.authentication.session_id,
        toggleModal: state.authentication.toggleModal,
        isAuth: state.authentication.isAuth,
        favoriteMovies: state.account.favoriteMovies,
        watchlistMovies: state.account.watchlistMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        updateAuth: actionCreatorUpdateAuth,
        onLogOut: actionCreatorOnLogOut,
        showLoginForm: actionCreatorShowLoginForm,
        hideLoginForm: actionCreatorHideLoginForm,
        getByTypeMovies: actionCreatorGetByTypeMovies
        }
        ,dispatch)
};
    // return {
    //     updateAuth: bindActionCreators(actionCreactorUpdateAuth, dispatch),
    // ...
    // }

    // return {
    //     onLogOut: () => dispatch(actionCreactorOnLogOut()),
    // ...
    // }

export default connect(mapStateToProps, mapDispatchToProps)(App);