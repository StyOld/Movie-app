import React from 'react';
import Login from './Login/Login';
import UserMenu from "./UserMenu";
import {Link} from  'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Header extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            {/*<a className='nav-link'>Home</a>*/}
                            <Link className='nav-link' to='/'>
                                <h5 className='font-weight-bold'>Home</h5>
                            </Link>
                        </li>
                    </ul>
                    {user ?
                        <UserMenu /> : <Login />
                    }
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
        }
        ,dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);