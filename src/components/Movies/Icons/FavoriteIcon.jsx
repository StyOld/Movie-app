import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppConsumerHOC from "../../HOC/AppConsumerHOC";
import AddToListByTypeHOC from "./AddToListByTypeHOC";

class FavoriteIcon extends React.Component {

    render () {
        return (
            <div
                className='circle'
                onClick={this.props.onChangeAdded}
            >
                <FontAwesomeIcon
                    icon="heart"
                    // color={this.props.added ? 'red' : 'white'}
                    color={this.props.movieId === '351064' ? 'red' : 'white'}
                    className={this.props.disabled ? 'icon-disabled' : ''}
                />
            </div>
        )
    }
}

export default AppConsumerHOC(AddToListByTypeHOC(FavoriteIcon, "favorite"))