import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AppConsumerHOC from "../HOC/AppConsumerHOC";
// import {AppContext} from "../App";


class UserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    deleteSessionId = () => {
        fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    session_id: this.props.session_id
                })
            })
            .then(() => {
                this.props.removeSessionId();
            })
    };

    render() {
        const {user} = this.props;
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                    <div>
                        <img
                            width='40'
                            className='rounded-circle'
                            src={`https://gravatar.com/avatar/${
                                user.avatar.gravatar.hash
                                }.jpg?s=64"`}
                            alt=''
                        />
                    </div>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem
                    onClick={this.deleteSessionId}
                    >
                        Выход
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

export default AppConsumerHOC(UserMenu);

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
