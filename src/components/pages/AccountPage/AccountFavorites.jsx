import React from 'react';
import AppConsumerHOC from '../../HOC/AppConsumerHOC';
import {Redirect} from 'react-router-dom';
import CallApi from "../../../api/api";
import MovieItem from '../../Movies/MovieItem';

// Можно ли сделать переиспользованным? Что бы не создавать AccountWatchlist?
class AccountFavorites extends React.Component {
    constructor() {
        super()
        this.state = {
            favoriteList: []
        };
    };

    // Можно зарефакторить и использовать функуцию getByTypeMovies из App
    componentDidMount () {
        CallApi.get(`/account/{account_id}/favorite/movies`, {
            params: {
                language: 'ru-RU',
                session_id: this.props.session_id
            }
        })
            .then(data => {
                this.setState({
                    favoriteList: data.results
                });
            })
    }

    render() {
        return this.props.isAuth ? (
            <div className='container'>
                <div className="row mt-2">
                   {this.state.favoriteList.map(movieItem => (
                        <div className="col-12 mb-2" key={movieItem.id}>
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
}

export default AppConsumerHOC(AccountFavorites);