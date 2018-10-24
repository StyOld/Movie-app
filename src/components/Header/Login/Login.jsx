import React from 'react';
import {Modal, ModalBody} from 'reactstrap';
import LoginForm from './LoginForm';
import * as actionsAuthentication from "../../../actions/actionsAuthentication";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

const mapStateToProps = (state) => {
    return {
        showModal: state.authentication.showModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            toggleLoginForm: actionsAuthentication.actionCreatorToggleLoginForm,
        }
        ,dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// import AppConsumerHOC from "../../HOC/AppConsumerHOC";

// export default AppConsumerHOC(Login);