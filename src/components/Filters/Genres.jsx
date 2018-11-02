import React from "react";
import PropTypes from 'prop-types';
import GenresHOC from '../HOC/GenresHOC';

const Genres = ({genreList, genres, onChangeGenres}) => (
    <div>
        <div>Жанры:</div>
        <div className="container mt-2">
            {genreList.map(item => {
                return (
                    <div className='form-check' key={item.id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={item.id}
                            value={item.id}
                            checked={genres.includes(String(item.id))}
                            onChange={onChangeGenres}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                            {item.name}
                        </label>
                    </div>
                );
            })}
        </div>
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


