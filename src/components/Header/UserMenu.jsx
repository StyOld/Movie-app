import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppConsumerHOC from "../HOC/AppConsumerHOC";
import {Link} from  'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreatorToggleDropDown, actionCreatorDeleteSession} from '../../actions/actions'

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
                <DropdownToggle nav caret>
                    <div>
                        <img
                            width='60'
                            className='rounded-circle'
                            src={`https://gravatar.com/avatar/${
                                user.avatar.gravatar.hash
                                }.jpg?s=64"`}
                            alt=''
                        />
                    </div>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link to='/account/favorites'>
                            Избранное
                        </Link>
                    </DropdownItem>
                    <DropdownItem>
                        <Link to='/account/watchlist'>
                            Список просмотра
                        </Link>
                    </DropdownItem>
                    <DropdownItem
                        className='font-weight-bold'
                        onClick={() => deleteSession({session_id: this.props.session_id})}
                    >
                        Выход
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        showDropDown: state.authentication.showDropDown
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleDropDown: actionCreatorToggleDropDown,
        deleteSession: actionCreatorDeleteSession
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AppConsumerHOC(UserMenu));

// export default props => {
//     return (
//         <AppContext.Consumer>
//             {context =>
//                 <UserMenu
//                     session_id={context.session_id}
//                     removeSessionId={context.removeSessionId}
//                     {...props}
//                 />
//             }
//         </AppContext.Consumer>
//     );
// };

// constructor(props) {
//     super(props);
//
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//         dropdownOpen: false
//     };
// }

// toggle() {
// this.setState(prevState => ({
//     dropdownOpen: !prevState.dropdownOpen
// }));
// }

// deleteSessionId = () => {
//     CallApi.delete('/authentication/session', {
//         body: {session_id: this.props.session_id}
//     }).then(() => {
//         this.props.onLogOut();
//     })
// };