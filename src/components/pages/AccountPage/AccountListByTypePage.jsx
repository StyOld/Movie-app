import React from 'react';
import {Redirect} from 'react-router-dom';
import MovieItem from '../../Movies/MovieItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.authentication.isAuth,
        favoriteMovies: state.account.favoriteMovies,
        watchlistMovies: state.account.watchlistMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        }
        ,dispatch)
};

export default (type) => connect(mapStateToProps, mapDispatchToProps)(class AccountListByTypePage extends React.Component {
    render() {
        return this.props.isAuth ? (
            <div className='container'>
                <div className="row mt-2">
                    {this.props[`${type}Movies`].map(movieItem => (
                        <div className="col-12 col-md-6 col-xl-4 mb-2" key={movieItem.id}>
                            <MovieItem
                                item={movieItem}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <Redirect to='/'/>
        )
    }
})
