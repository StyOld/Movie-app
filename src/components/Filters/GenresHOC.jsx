import React from "react";
import CallApi from "../../api/api";
import {actionCreactorGetGenresList} from "../../actions/actions";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        genreList: state.genreList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actionCreactorGetGenresList: (payload) => dispatch(actionCreactorGetGenresList(payload))
    }
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class GenresHOC extends React.PureComponent {
    getGenres = () => {
        CallApi.get('/genre/movie/list', {
            params: {
                language: 'ru-RU'
            }
        })
            .then(data => {
                this.props.actionCreactorGetGenresList({
                    data: data.genres
                })
            })
    };

    componentDidMount() {
        this.getGenres()
    }

    render() {
        const { genreList } = this.props;
        const {genres, onChangeGenres} = this.props;
        return <Component genreList={genreList} genres={genres} onChangeGenres={onChangeGenres}/>;
    }
})
