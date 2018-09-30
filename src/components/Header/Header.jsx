import React from 'react';
import Login from './Login/Login';
import User from './User'
import DropdownForm from "./DropdownForm";

class Header extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <nav className='navbar navbar-dark bg-primary'>
                <div className='container'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <a className='nav-link'>Home</a>
                        </li>
                    </ul>
                    {user ?
                        <DropdownForm /> : <Login />
                    }
                </div>
            </nav>
        );
    }
}

export default Header;