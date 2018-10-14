import React from 'react';
import AppConsumerHOC from '../../HOC/AppConsumerHOC';
import {Redirect} from 'react-router-dom';
import MovieItem from '../../Movies/MovieItem';

export default (type) => AppConsumerHOC(class AccountListByTypePage extends React.Component {
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
