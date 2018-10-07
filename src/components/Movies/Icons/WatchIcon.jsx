import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import AddToListByTypeHOC from "./AddToListByTypeHOC";

class WatchIcon extends React.Component {

    render () {
        return (
            <div
                className='circle'
                onClick={this.props.onChangeAdded}
            >
                <FontAwesomeIcon
                    icon="bookmark"
                    color={this.props.added ? 'red' : 'white'}
                    className={this.props.disabled ? 'icon-disabled' : ''}
                />
            </div>
        )
    }
}

export default AppConsumerHOC(AddToListByTypeHOC(WatchIcon, "watchlist"))