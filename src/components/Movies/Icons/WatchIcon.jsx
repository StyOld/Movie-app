import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default AddToListByTypeHOC(WatchIcon, "watchlist")