import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import CallApi from "../../../api/api";

class WatchList extends React.Component {
    constructor() {
        super();

        this.state = {
            watch_list: false,
            watch_disabled: false
        };
    }

    onChangeWatchList = () => {
        if (this.props.session_id===null) {
            this.props.showLoginForm()
        } else

        {this.setState({
            watch_disabled: true
        });

        CallApi.post('/account/{account_id}/watchlist', {
            params: {
                session_id: this.props.session_id
            },
            body: {
                media_type: 'movie',
                media_id: this.props.item_id,
                watchlist: !this.state.watch_list
            }
        })
            .then(() => {
                this.setState(prevState => ({
                    watch_disabled: false,
                    watch_list: !prevState.watch_list
                }));
            })
        }};

    render () {
        return (
            <FontAwesomeIcon
                icon="bookmark"
                color={this.state.watch_list ? 'red' : 'grey'}
                onClick={this.onChangeWatchList}
                className={this.state.watch_disabled ? 'icon-disabled' : ''}
            />
        )
    }
}

export default AppConsumerHOC(WatchList);