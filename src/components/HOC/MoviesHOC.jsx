import React from "react";
import * as actionsMovies from "../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state) => {
    return {
        movies: state.movies.moviesData,
        page: state.movies.page,
        filters: state.movies.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovies: actionsMovies.actionCreatorGetMovies,
        onChangePage: actionsMovies.actionCreatorChangePage,
    }, dispatch)
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class MoviesHOC extends React.Component {
    componentDidMount() {
        this.props.getMovies({filters: this.props.filters, page: this.props.page})
    }

    render() {
        const { movies } = this.props;
        return <Component movies = {movies.results}/>;
    }
}
)