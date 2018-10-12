import React from 'react';
import AppConsumerHOC from '../../HOC/AppConsumerHOC';
import {Redirect} from 'react-router-dom';
import MovieItem from '../../Movies/MovieItem';

export default (type) => AppConsumerHOC(class AccountListByType extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         favoriteList: this.props.favoriteMovies
    //     };
    // };
    //
    // // Можно зарефакторить и использовать функуцию getByTypeMovies из App
    // componentDidMount () {
    //     CallApi.get(`/account/{account_id}/favorite/movies`, {
    //         params: {
    //             language: 'ru-RU',
    //             session_id: this.props.session_id
    //         }
    //     })
    //         .then(data => {
    //             this.setState({
    //                 favoriteList: data.results
    //             });
    //         })
    // }

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
