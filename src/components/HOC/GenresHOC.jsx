import React from "react";
import * as actionsMovies from "../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        genreList: state.movies.genreList,
        genres: state.movies.filters.genres
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGenresList: actionsMovies.actionCreatorGetGenresList,
        onChangeFilters: actionsMovies.actionCreatorChangeFilters
    }, dispatch)
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class GenresHOC extends React.Component {
    componentDidMount() {
        this.props.getGenresList()
    }

   onChangeGenres = event => {
        this.props.onChangeFilters({
            target: {
                name: 'genres',
                value: event.target.checked ?
                    [...this.props.genres, event.target.value]:
                    this.props.genres.filter(genreId => {
                        return String(genreId) !== String(event.target.value);
                    })
            }
        })
   };

    render() {
        const {genres, genreList} = this.props;
        return <Component genreList={genreList} genres={genres} onChangeGenres={this.onChangeGenres}/>;
    }
})