import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from  'react-router-dom';
import * as actionsAuthentication from "../../actions/actionsAuthentication";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggleDropDown()
    }

    render() {
        const {user, showDropDown, deleteSession} = this.props;
        return (
            <Dropdown isOpen={showDropDown} toggle={this.toggle}>
                <DropdownToggle
                    tag="div"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={showDropDown}
                >
                    <img
                        width="60"
                        className="rounded-circle"
                        src={`https://gravatar.com/avatar/${
                            user.avatar.gravatar.hash
                            }.jpg?s=64"`}
                        alt=""
                        onClick={this.toggle}
                    />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link to="/account/favorites" id='text-decor'>Избранные</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link to="/account/watchlist" id='text-decor'>Список просмотра</Link>
                    </DropdownItem>
                    <DropdownItem onClick={(session_id) => deleteSession({session_id})}>Выйти</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
        showDropDown: state.authentication.showDropDown
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleDropDown: actionsAuthentication.actionCreatorToggleDropDown,
        deleteSession: actionsAuthentication.actionCreatorDeleteSession
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);