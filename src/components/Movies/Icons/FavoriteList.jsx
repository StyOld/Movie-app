import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import CallApi from "../../../api/api";

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

        CallApi.post('/account/{account_id}/favorite', {
            params: {
                session_id: this.props.session_id
            },
            body: {
                media_type: 'movie',
                media_id: this.props.item_id,
                favorite: !this.state.favorite_list
            }
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
            <div className='circle'>
             <FontAwesomeIcon
                icon="heart"
                color={this.state.favorite_list ? 'red' : 'white'}
                onClick={this.onChangeFavouriteList}
                className={this.state.favorite_disabled ? 'icon-disabled' : ''}
             />
            </div>
        )
    }
}

export default AppConsumerHOC(FavoriteList);