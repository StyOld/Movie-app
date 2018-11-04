import React from "react";
import CallApi from "../../../api/api";
import classNames from 'classnames';
import * as actionsAuthentication from "../../../actions/actionsAuthentication";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export class LoginForm extends React.Component {
    state = {
        username: "",
        password: "",
        repeatPassword: '',
        errors: {
            username: false,
            password: false,
            repeatPassword: false
        },
        submitting: false
    };

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                base: null,
                [name]: null
            }
        }));
    };

    handleBlur = (event) => {
        const name = event.target.name;
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    [name]: errors[name]
                }
            }));
        }
    };

    validateFields = () => {
        const errors = {};

        if (this.state.username === "") {
            errors.username = "Not empty";
        }

        if (this.state.password === '') {
            errors.password = 'Not empty';
        }

        if (this.state.password !== this.state.repeatPassword) {
            errors.repeatPassword = 'Must be equal password';
        }

        return errors;
    };

    onSubmit = () => {
        this.setState({
            submitting: true
        });

        let session_id = null;

        CallApi.get('/authentication/token/new')
            .then(data => {
                return CallApi.post('/authentication/token/validate_with_login', {
                    body: {
                        username: this.state.username,
                        password: this.state.password,
                        // username: 'StyOld',
                        // password: '12345',
                        request_token: data.request_token
                    }
                })
            })
            .then(data => {
                return CallApi.post('/authentication/session/new', {
                    body: {
                        request_token: data.request_token
                    }
                })
            })
            .then(data => {
                session_id = data.session_id;
                return CallApi.get('/account', {
                    params: {
                        session_id: data.session_id
                    }
                })
            })
            .then(user => {
                this.setState({
                    submitting: false
                }, () => {
                    this.props.updateAuth({user, session_id});
                });
            })
            .catch(error => {
                console.log("error", error);
                this.setState({
                    submitting: false,
                    errors: {
                        base: error.status_message
                    }
                });
            });
    };

    componentWillUnmount() {
        this.props.hideLoginForm()
    }

    onLogin = e => {
        e.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }));
        } else {
            this.onSubmit();
        }
    };

    getClassForInput = key => (
        classNames('form-control', {'invalid': this.state.errors[key]})
    );

    render() {
        const { username, password, repeatPassword, errors, submitting } = this.state;
        return (
            <div className="form-login-container">
                <form className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input
                            type="text"
                            className={this.getClassForInput('username')}
                            id="username"
                            placeholder="Пользователь: StyOld"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            className={this.getClassForInput('password')}
                            id="password"
                            placeholder="Пароль: 12345"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Повторите Пароль</label>
                        <input
                            type="password"
                            className={this.getClassForInput('repeatPassword')}
                            id="repeatPassword"
                            placeholder="Повторите Пароль: 12345"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handleBlur}
                        />
                        {errors.repeatPassword && (
                            <div className="invalid-feedback">{errors.repeatPassword}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.onLogin}
                        disabled={submitting}
                    >
                        Вход
                    </button>
                    {errors.base && (
                        <div className="invalid-feedback text-center">{errors.base}</div>
                    )}
                </form>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            updateAuth: actionsAuthentication.actionCreatorUpdateAuth,
            hideLoginForm: actionsAuthentication.actionCreatorHideLoginForm
        }
        ,dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
