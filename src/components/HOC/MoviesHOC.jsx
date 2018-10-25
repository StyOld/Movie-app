import React from "react";
import _ from 'lodash';
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

    componentDidUpdate(prevProps) {
        // if (!_.isEqual(this.props.filters, prevProps.filters)) {
        //     this.props.onChangePage(1);
        //     this.props.getMovies({filters: this.props.filters, page: 1});
        // }
        if (this.props.page !== prevProps.page) {
            this.props.getMovies({filters: this.props.filters, page: this.props.page})
        }
    }

    render() {
        const { movies } = this.props;
        return <Component movies = {movies.results}/>;
    }
}
)

// constructor() {
//     super();
//     this.state = {
//         movies: []
//     };
// }

// CallApi.get('/discover/movie', {
//     params: queryStringParams
// })
//     .then(data => {
//      this.setState({
//          movies: data.results
//      });
//     this.props.getTotalPages(data.total_pages);

// getMovies = (filters, page) => {
//     const {sort_by, primary_release_year, genres} = filters;
//
//     const queryStringParams = {
//         sort_by: sort_by,
//         page: page,
//         primary_release_year: primary_release_year
//         // with_genres: genres.join(',') словил баг на стороне сервака
//     };
//
//     if (genres.length>0) queryStringParams.with_genres = genres.join(',');
//     this.props.getMovies(queryStringParams);
// };

// this.getMovies(this.props.filters, this.props.page)

// this.getMovies(this.props.filters, 1);

// this.getMovies(this.props.filters, this.props.page)
