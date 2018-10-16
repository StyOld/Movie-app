import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByTypePage from "./pages/AccountPage/AccountListByTypePage";
import Header from "./Header/Header";
import CallApi from "../api/api";
import {
    actionCreatorUpdateAuth,
    actionCreatorOnLogOut,
    actionCreatorToggleLoginForm,
    actionCreatorHideLoginForm,
    actionCreatorGetByTypeMovies
} from '../actions/actions';
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
      const {user, session_id, showModal, isAuth, favoriteMovies, watchlistMovies,
          updateAuth, onLogOut, toggleLoginForm, hideLoginForm, getByTypeMovies} = this.props;

      return isAuth || !session_id ? (
          <BrowserRouter>
              <AppContext.Provider
                  value={{
                      user,
                      session_id,
                      showModal,
                      isAuth,
                      favoriteMovies,
                      watchlistMovies,
                      onLogOut,
                      toggleLoginForm,
                      hideLoginForm,
                      updateAuth,
                      getByTypeMovies
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
        showModal: state.authentication.showModal,
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
        toggleLoginForm: actionCreatorToggleLoginForm,
        hideLoginForm: actionCreatorHideLoginForm,
        getByTypeMovies: actionCreatorGetByTypeMovies
        }
        ,dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// return {
//     updateAuth: bindActionCreators(actionCreactorUpdateAuth, dispatch),
// ...
// }

// return {
//     onLogOut: () => dispatch(actionCreactorOnLogOut()),
// ...
// }

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

// updateAuth = (user, session_id) => {
// cookies.set('session_id', session_id, {
//     path: '/',
//     maxAge: 2592000
// });
// this.setState({
//     session_id,
//     user,
//     isAuth: true
// })
// };

// onLogOut = () => {
// cookies.remove('session_id');
// this.setState({
//     session_id: null,
//     user: null,
//     isAuth: false
// })
// };

// showLoginForm = () => {
// this.setState(prevState => ({
//     toggleModal: !prevState.toggleModal
// }))
// };

// hideLoginForm = () => {
// this.setState({
//     toggleModal: false
// })
// };

// getByTypeMovies = (type) => {
//     CallApi.get(`/account/{account_id}/${type}/movies`, {
//         params: {
//             language: 'ru-RU',
//             session_id: this.props.store.getState().session_id
//         }
//     })
//         .then(data => {
//             this.setState({
//                 [`${type}Movies`]: data.results
//             });
//         })
// };

// const {user, session_id, toggleModal, isAuth, favoriteMovies, watchlistMovies} = this.state;

// value={{
//     // user: user,
//     user,
//         session_id,
//         toggleModal,
//         isAuth,
//         favoriteMovies,
//         watchlistMovies,
//         onLogOut: this.onLogOut,
//         showLoginForm: this.showLoginForm,
//         hideLoginForm: this.hideLoginForm,
//         updateAuth: this.updateAuth,
//         getByTypeMovies: this.getByTypeMovies
// }}
// >