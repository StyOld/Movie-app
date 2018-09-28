import React from "react";
import PropTypes from 'prop-types';
import GenresHOC from './GenresHOC';

const Genres = ({genreList, genres, onChangeGenres}) => (
    <div className="container">
        {genreList.map(item => {
            return (
                <div className='form-check' key={item.id}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={item.id}
                        checked={genres.includes(String(item.id))}
                        onChange={onChangeGenres}
                    />
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        {item.name}
                    </label>
                </div>
            );
        })}
    </div>
);

Genres.defaultProps = {
    genreList: [],
    genres: []
};

Genres.propTypes = {
    genreList: PropTypes.array.isRequired,
    genres: PropTypes.array.isRequired
};

export default GenresHOC(Genres);


