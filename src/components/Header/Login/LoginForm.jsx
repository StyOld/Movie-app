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
        const name = event.target.name
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
                        // username: this.state.username,
                        // password: this.state.password,
                        username: 'StyOld',
                        password: 'Agressor2805!',
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
                // this.props.updateSessionId(data.session_id);
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
                            placeholder="Пользователь"
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
                            placeholder="Пароль"
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
                            placeholder="Повторите Пароль"
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

// import AppConsumerHOC from "../../HOC/AppConsumerHOC";

// export default AppConsumerHOC(LoginForm);

// import {AppContext} from "../../App";

// export default props => {
//     // console.log(props);
//     return (
//         <AppContext.Consumer>
//             {context =>
//                 <LoginForm
//                     updateUser={context.updateUser}
//                     updateSessionId={context.updateSessionId}
//                     {...props}
//                 />
//             }
//         </AppContext.Consumer>
//     );
// };

// onSubmit = () => {
//     this.setState({
//         submitting: true
//     });
//
//     let session_id = null;
//
//     fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
//         .then(data => {
//             fetchApi(
//                 `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
//                 {
//                     method: "POST",
//                     mode: "cors",
//                     headers: {
//                         "Content-type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         username: this.state.username,
//                         password: this.state.password,
//                         // username: 'StyOld',
//                         // password: 'Agressor2805!',
//                         request_token: data.request_token
//                     })
//                 }
//             );
//         })
//         .then(data => {
//             fetchApi(
//                 `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
//                 {
//                     method: "POST",
//                     mode: "cors",
//                     headers: {
//                         "Content-type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         request_token: data.request_token
//                     })
//                 }
//             );
//         })
//         .then(data => {
//             session_id = data.session_id;
//                 fetchApi(
//                     `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
//                         data.session_id
//                     }`)
//         })
//         .then(user => {
//             this.setState({
//                 submitting: false
//             }, () => {
//                 this.props.updateAuth({user, session_id});
//             });
//         })
//         .catch(error => {
//             console.log("error", error);
//             this.setState({
//                 submitting: false,
//                 errors: {
//                     base: error.status_message
//                 }
//             });
//         });
// };

// 1
// const getRequestToken = () => {
//     return new Promise((resolve, reject) => {
//         fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
//             .then(response => {
//                 if (response.status < 400) {
//                     return response.json()
//                 } else {
//                     throw response;
//                 }
//             }).then(data => {
//                 resolve(data);
//         }).catch(response => {
//             response.json().then(error => {
//                 reject(error);
//             })
//         })
//     });
// };
// const validateWithLogin = (body) => {
//     return new Promise((resolve, reject) => {
//         fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
//             method: 'POST',
//             mode: 'cors',
//             "headers": {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify(body)
//         })
//             .then(response => {
//                 if (response.status < 400) {
//                     return response.json()
//                 } else {
//                     throw response;
//                 }
//             }).then(data => {
//             resolve(data);
//         }).catch(response => {
//             response.json().then(error => {
//                 reject(error);
//             })
//         })
//     });
// };

// fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
//     .then(data => {
//     return fetchApi(
//         `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
//         {
//         method: 'POST',
//         mode: 'cors',
//         "headers": {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//             username: 'StyOld',
//             password: 'Agressor2805',
//             request_token: data.request_token
//         })
//         },
//         );
// })
//         .then(data => {
//             return fetchApi(
//                 `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
//             {
//                 method: 'POST',
//                 mode: 'cors',
//                 "headers": {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     request_token: data.request_token
//                 })
//             })
//         })
//         .then(data => {
//             console.log('session', data)
//         })
//         .catch(error => {
//         console.log('error', error);
//     })
// };

// 2
//  fetch(
//      `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
//      {
//          method: 'POST',
//          mode: 'cors',
//          "headers": {
//              "Content-type": "application/json"
//          },
//          body: JSON.stringify({
//              username: 'StyOld',
//              password: 'Agressor2805',
//              request_token: data.request_token
//          })
//      }
// ).then(response => response.json()).then(data => {
//         // 3
//         fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
//             method: 'POST',
//             mode: 'cors',
//             "headers": {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 request_token: data.request_token
//             })
//          }).then(response => response.json()).then(data => {
//             console.log('session', data)
//         })
//     })
// });

// sendPromises = async () => {
//     const fetchApi = (url, options = {}) => {
//         return new Promise((resolve, reject) => {
//             fetch(url, options)
//                 .then(response => {
//                     if (response.status < 400) {
//                         return response.json()
//                     } else {
//                         throw response;
//                     }
//                 }).then(data => {
//                 resolve(data);
//             }).catch(response => {
//                 response.json().then(error => {
//                     reject(error);
//                 })
//             })
//         });
//     };
//
//     try {
//         const data = await fetchApi(
//             `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
//         );
//
//         const result = await fetchApi(
//             `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
//             {
//                 method: 'POST',
//                 mode: 'cors',
//                 "headers": {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     username: 'StyOld',
//                     password: 'Agressor280',
//                     request_token: data.request_token
//                 })
//             }
//         );
//
//         const {session_id} = await fetchApi(
//             `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
//             {
//                 method: 'POST',
//                 mode: 'cors',
//                 "headers": {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     request_token: result.request_token
//                 })
//             });
//         console.log(session_id)
//     } catch (error) {
//         console.log('error', error)
//     }
//     };
