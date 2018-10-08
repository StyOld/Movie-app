import React from 'react';
import CallApi from "../../../api/api";

export default (Component, type) => class AddToListByTypeHOC extends React.Component {
    constructor() {
        super();

        this.state = {
            // added: () => (this.props.movieId !== '351064') ? false : true,
            added: false,
            disabled: false
        };
    }

    onChangeAdded = () => {
        if (!this.props.isAuth) {
            this.props.showLoginForm()
        } else

        this.setState(prevState => ({
            added: !prevState.added,
            disabled: true
        }), () => {
            CallApi.post(`/account/{account_id}/${type}`, {
                params: {
                    session_id: this.props.session_id
                },
                body: {
                    media_type: 'movie',
                    media_id: this.props.movieId,
                    [type]: this.state.added
                }
            })
                .then(() => {
                    this.setState({
                        disabled: false
                    })
                })
        })

    };

    render () {
        const {added, disabled} = this.state;
        return (
            <Component added={added} disabled={disabled} onChangeAdded={this.onChangeAdded} />
        )
    }
}