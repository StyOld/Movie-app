import React from "react";
import CallApi from "../../api/api";
import _ from 'lodash';

export default (Component) => class MoviesHOC extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: []
        };
    }

    getMovies = (filters, page) => {
        const {sort_by, primary_release_year, genres} = filters;

        const queryStringParams = {
            // api_key: API_KEY_3,
            language: 'ru-RU',
            sort_by: sort_by,
            page: page,
            primary_release_year: primary_release_year,
            with_genres: genres.join(',')
        };

        CallApi.get('/discover/movie', {
            params: queryStringParams
        })
            .then(data => {
            this.setState({
                movies: data.results
            });
            this.props.getTotalPages(data.total_pages);
        })
    };

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page)
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.filters, prevProps.filters)) {
            this.props.onChangePage(1);
            this.getMovies(this.props.filters, 1);
        }
        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page)
        }
    }

    render() {
        // console.log(this.state.movies);
        const { movies } = this.state;
        return <Component movies = {movies} />;
    }
}
