import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import LoginForm from './LoginForm';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

class Login extends React.Component {
    render() {
        return (
            <div>
                <button
                    className='btn btn-success'
                    type='button'
                    onClick={this.props.toggleLoginForm}
                >
                    Войти
                </button>
                <Modal isOpen={this.props.showModal} toggle={this.props.toggleLoginForm}>
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default AppConsumerHOC(Login);