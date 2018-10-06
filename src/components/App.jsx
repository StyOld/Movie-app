import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
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
          session_id: null,
          showModal: false,
      };
  };

  updateUser = user => {
      this.setState({
          user
      })
  };

  updateSessionId = session_id => {
      cookies.set('session_id', session_id, {
          path: '/',
          maxAge: 2592000
      });
      this.setState({
          session_id
      })
  };

  removeSessionId = () => {
      cookies.remove('session_id');
      this.setState({
          session_id: null,
          user: null
      })
  };

  showLoginForm = () => {
      this.setState(prevState => ({
          showModal: !prevState.showModal
      }))
  };

  componentDidMount() {
      const session_id = cookies.get('session_id');

      if (session_id) {
          CallApi.get('/account', {
              params: {
                  session_id: session_id
              }
          }).then(user => {
              this.updateUser(user);
              this.updateSessionId(session_id);
          })
      }
  }

  render() {
      const {user, session_id, showModal} = this.state;

  return (
      <BrowserRouter>
          <AppContext.Provider
              value={{
                  user: user,
                  session_id: session_id,
                  showModal: showModal,
                  updateUser: this.updateUser,
                  updateSessionId: this.updateSessionId,
                  removeSessionId: this.removeSessionId,
                  showLoginForm: this.showLoginForm
              }}
          >
              <div>
                  <Header user={user}/>
                  {/*<Link to='/movie/1'>go to movie</Link>*/}
                  <Route exact path='/' component={MoviesPage} />
                  <Route path='/movie/:id' component={MoviePage} />
                  {/*
                  <MoviesPage/>
                  <MoviePage/>
                  '/' - MoviesPage
                  '/movie/1' - Movie with id = 1
                  */}
              </div>
          </AppContext.Provider>
      </BrowserRouter>
    );
  }
}