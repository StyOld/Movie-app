import React from "react";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import AccountListByTypePage from "./pages/AccountPage/AccountListByTypePage";
import Header from "./Header/Header";
import * as actionsAccount from '../actions/actionsAccount';
import * as actionsAuthentication from '../actions/actionsAuthentication';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import './fortawesome';

class App extends React.Component {
  componentDidMount() {
          this.props.getAccount({
              session_id: this.props.session_id
          })
      }

  render() {
      const {session_id, isAuth} = this.props;

      return isAuth || !session_id ? (
          <BrowserRouter>
                  <div>
                      <Header />
                      <Route exact path='/' component={MoviesPage} />
                      <Route path='/movie/:id' component={MoviePage}/>
                      <Route path='/account/favorites' component={AccountListByTypePage('favorite')}/>
                      <Route path='/account/watchlist' component={AccountListByTypePage('watchlist')}/>
                  </div>
          </BrowserRouter>
          ) : (<h5><strong>...Загрузка</strong></h5>)
  }
}

const mapStateToProps = (state) => {
    return {
        session_id: state.authentication.session_id,
        isAuth: state.authentication.isAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        updateAuth: actionsAuthentication.actionCreatorUpdateAuth,
        getByTypeMovies: actionsAccount.actionCreatorGetByTypeMovies,
        getAccount: actionsAuthentication.actionCreatorGetAccount
        }
        ,dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);