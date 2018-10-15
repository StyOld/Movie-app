import React from "react";
import CallApi from "../../api/api";
import {actionCreactorGetGenresList} from "../../actions/actions";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        genreList: state.authentication.genreList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenresList: (payload) => dispatch(actionCreactorGetGenresList(payload))
    }
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class GenresHOC extends React.PureComponent {
    getGenres = () => {
        CallApi.get('/genre/movie/list')
            .then(data => {
                this.props.getGenresList({
                    data: data.genres
                })
            })
    };

    componentDidMount() {
        this.getGenres()
    }

    render() {
        const {genres, genreList, onChangeGenres} = this.props;
        return <Component genreList={genreList} genres={genres} onChangeGenres={onChangeGenres}/>;
    }
})
