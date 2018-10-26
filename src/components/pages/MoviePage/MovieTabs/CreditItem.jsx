import React from 'react';

export default class CreditItem extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <div className="card" style={{ width: "100%" }}>
                <img
                    className="card-img-top card-img--height"
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
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