import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import User from './User';
import {AppContext} from "../App";

class DropdownForm extends React.Component {
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
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret className='bg-primary'>
                    <User />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                    onClick={this.deleteSessionId}
                    >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        );
    }
}

export default props => {
    return (
        <AppContext.Consumer>
            {context =>
                <DropdownForm
                    session_id={context.session_id}
                    removeSessionId={context.removeSessionId}
                    {...props}
                />
            }
        </AppContext.Consumer>
    );
};