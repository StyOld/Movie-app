import React from "react";
import * as actions from "../../actions/actions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        genreList: state.movies.genreList
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGenresList: actions.actionCreatorGetGenresList
    }, dispatch)
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class GenresHOC extends React.PureComponent {
    componentDidMount() {
        this.props.getGenresList()
    }

    render() {
        const {genres, genreList, onChangeGenres} = this.props;
        return <Component genreList={genreList} genres={genres} onChangeGenres={onChangeGenres}/>;
    }
})

// import CallApi from "../../api/api";

// getGenres = () => {
//     CallApi.get('/genre/movie/list')
//         .then(data => {
//             this.props.getGenresList({
//                 data: data.genres
//             })
//         })
// };

// componentDidMount() {
//     this.getGenres()
// }