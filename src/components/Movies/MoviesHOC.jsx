import React from "react";
import _ from 'lodash';
// import CallApi from "../../api/api";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreatorGetMovies} from '../../actions/actions'

const mapStateToProps = (state) => {
    return {
        movies: state.movies.moviesData
        // movies: state.movies.moviesData.results
        // total_pag: state.movies.moviesData.total_pages
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMovies: actionCreatorGetMovies
    }, dispatch)
};

export default (Component) => connect(mapStateToProps, mapDispatchToProps)(class MoviesHOC extends React.Component {
        // constructor() {
        //     super();

        //     this.state = {
        //         movies: []
        //     };
        // }
    
            getMovies = (filters, page) => {
            const {sort_by, primary_release_year, genres} = filters;
    
            const queryStringParams = {
                sort_by: sort_by,
                page: page,
                primary_release_year: primary_release_year
                // with_genres: genres.join(',') словил баг на стороне сервака
            };
    
            if (genres.length>0) queryStringParams.with_genres = genres.join(',');
            this.props.getMovies(queryStringParams);

            // Дочинить баг
            // this.props.getTotalPages(this.props.total_pag);

            // CallApi.get('/discover/movie', {
            //     params: queryStringParams
            // })
            //     .then(data => {
            //         this.props.updateMovies(data.results)
            //     // this.setState({
            //     //     movies: data.results
            //     // });
            //     this.props.getTotalPages(data.total_pages);

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
            const { movies } = this.props;
            return <Component movies = {movies.results}/>;
        }
    }    
) 