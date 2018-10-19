import React from 'react';
import {Redirect} from 'react-router-dom';
import MovieItem from '../../Movies/MovieItem';
import {connect} from 'react-redux';
// import * as actions from "../../../actions/actions";
// import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        isAuth: state.authentication.isAuth,
        favoriteMovies: state.account.favoriteMovies,
        watchlistMovies: state.account.watchlistMovies
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(
//         {
//         }
//         ,dispatch)
// };

export default (type) => connect(mapStateToProps)(class AccountListByTypePage extends React.Component {
    render() {
        return this.props.isAuth ? (
            <div className='container'>
                <div className="row mt-2">
                    {this.props[`${type}Movies`].map(movieItem => (
                        <div className="col-6 mb-2" key={movieItem.id}>
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

// import AppConsumerHOC from '../../HOC/AppConsumerHOC';

// export default (type) => AppConsumerHOC(class AccountListByTypePage extends React.Component {
