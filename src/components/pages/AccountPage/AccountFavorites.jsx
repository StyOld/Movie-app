import React from 'react';
import AppConsumerHOC from '../../HOC/AppConsumerHOC';
import {Redirect} from 'react-router-dom';

class AccountFavorites extends React.Component {
    render() {
        return this.props.isAuth ? (
            <div className='container'>Account Favorites</div>
        ) : (
            <Redirect to='/'/>
        )
    }
}

export default AppConsumerHOC(AccountFavorites);