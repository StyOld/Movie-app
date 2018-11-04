import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddToListByTypeHOC from "../../HOC/AddToListByTypeHOC";

class FavoriteIcon extends React.Component {

    render () {
        return (
            <div
                className={`circle ${this.props.disabled ? 'is-disabled' : ''}`}
                onClick={this.props.onChangeAdded}
            >
                <FontAwesomeIcon
                    icon="heart"
                    color={this.props.added ? 'red' : 'white'}
                />
            </div>
        )
    }
}

export default AddToListByTypeHOC(FavoriteIcon, "favorite")