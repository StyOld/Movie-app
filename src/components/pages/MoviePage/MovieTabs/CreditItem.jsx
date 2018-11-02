import React from 'react';
import avatarDefault from "../../../../images/default-avatar.png";

export default class CreditItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="card">
                <img
                    className="card-img-top img--height"
                    src={(item.profile_path===null) ? avatarDefault : `https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt=""
                />
                <div className="card-body">
                    <h5 className="card-title"><strong>{item.name}</strong></h5>
                    <h6 className="card-text">{item.character}</h6>
                </div>
            </div>
        );
    }
}