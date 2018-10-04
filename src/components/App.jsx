import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Pagination from "./Filters/Pagination";
import _ from "lodash";
import Header from "./Header/Header";
import {API_KEY_3, API_URL, fetchApi} from '../api/api';
import Cookies from 'universal-cookie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faBookmark);

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor() {
    super()
      this.initialFilter = {
          filters: {
              sort_by: 'vote_average.asc',
              primary_release_year: '2018',
              genres: []
          },
          page: 1,
          total_pages: ''
      };

      this.state = {
          user: null,
          session_id: null,
          showModal: false,
          ...this.initialFilter
      };

      // this.initalState = {
      //   ...this.state,
      //     // filters: {
      //     //     ...this.state.filters,
      //     //     genres: []
      //     // }genres
      //
      //    };
      //
      this.initialState = _.cloneDeep(this.state)
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

  onChangeFilters = (event) => {
      const newFilters = {
          ...this.state.filters,
          [event.target.name]: event.target.value
      };
      this.setState(prevState => ({
          filters: newFilters
      }));
  };

  clearFilters = (event) => {
      this.setState(_.cloneDeep(this.initialFilter));
  };

    // onClick={() => {
    //     window.location.reload(); плохая идея перезагружать страницу, будет всё заново рендериться.

  onChangePage = page => {
      this.setState({
        // page: page
          // page
      })
  };

  getTotalPages = total_pages => {
      this.setState({
          total_pages
      });
  };

  onChangeGenres = (event) => {
      const id = event.target.value;

      (event.target.checked) ? (
          this.setState((prevState) =>({
              filters: {
                  ...prevState.filters,
                  genres: [...prevState.filters.genres, id]
              }
          }))
      ) :
          this.setState(prevState => ({
              filters: {
                  ...prevState.filters,
                  genres: prevState.filters.genres.filter(genreId => {
                      return genreId !== id
                  })
              }
          }))
  };

  componentDidMount() {
      const session_id = cookies.get('session_id');

      if (session_id) {
          fetchApi(
              `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
                  session_id
                  }`
          ).then(user => {
              this.updateUser(user);
              this.updateSessionId(session_id);
          })
      }
  }

  render() {
      const {filters, page, total_pages, user, session_id, showModal} = this.state;

  return (
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
              <Header
                  user={user}
                  // session_id={session_id}
                  // updateUser={this.updateUser}
                  //... и т.д.
              />
              <div className="container">
                  <div className="row mt-4">
                      <div className="col-4">
                          <div className="card" style={{ width: "100%" }}>
                              <div className="card-body">
                                  <div className="d-flex justify-content-center">
                                      <h3 className='mr-2'>Фильтры:</h3>
                                      <button
                                          type='button'
                                          className='btn'
                                          onClick={this.clearFilters}
                                      >
                                          Очистить фильтры
                                      </button>
                                  </div>
                                  <Filters
                                      filters={filters}
                                      page={page}
                                      total_pages={total_pages}
                                      onChangeFilters={this.onChangeFilters}
                                      onChangePage={this.onChangePage}
                                      onChangeGenres={this.onChangeGenres}
                                  />
                                  <Pagination
                                      page={page}
                                      total_pages={total_pages}
                                      onChangePage={this.onChangePage}
                                  />
                              </div>
                          </div>
                      </div>
                              <div className="col-8">
                                  <MoviesList
                                      page={page}
                                      filters={filters}
                                      onChangePage={this.onChangePage}
                                      getTotalPages={this.getTotalPages}
                                  />
                              </div>
                  </div>
              </div>
          </div>
      </AppContext.Provider>
    );
  }
}
