import React from 'react';
import {API_KEY_3, API_URL, fetchApi} from "../../../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";

class FavoriteList extends React.Component {
    constructor() {
        super();

        this.state = {
            favorite_list: false,
            favorite_disabled: false
        };
    }

    onChangeFavouriteList = () => {
        if (this.props.session_id===null) {
            this.props.showLoginForm()
        } else

        {this.setState({
            favorite_disabled: true
        });

            fetchApi(`${API_URL}/account/{account_id}/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        media_type: 'movie',
                        // media_id: this.props.item.id,
                        media_id: this.props.item_id,
                        favorite: !this.state.favorite_list
                    })
                })
                .then(() => {
                    this.setState(prevState => ({
                        favorite_disabled: false,
                        favorite_list: !prevState.favorite_list
                    }));
                })
        }};

    render () {
        return (
            <FontAwesomeIcon
                icon="heart"
                color={this.state.favorite_list ? 'red' : 'grey'}
                onClick={this.onChangeFavouriteList}
                className={this.state.favorite_disabled ? 'icon-disabled' : ''}
            />
        )
    }
}

export default AppConsumerHOC(FavoriteList);