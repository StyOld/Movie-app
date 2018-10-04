import React from 'react';
import {API_KEY_3, API_URL, fetchApi} from "../../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

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
            alert('!');
        } else

        {this.setState({
            watch_disabled: true
        });

            fetchApi(`${API_URL}/account/{account_id}/watchlist?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        media_type: 'movie',
                        media_id: this.props.item_id,
                        watchlist: !this.state.watch_list
                    })
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