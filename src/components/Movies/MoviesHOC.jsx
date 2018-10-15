import React from "react";
// import CallApi from "../../api/api";
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreatorGetMovies} from '../../actions/actions'

const mapStateToProps = (state) => {
    return {
        movies: state.movies.data
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
            this.props.getMovies(queryStringParams)

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
            return <Component movies = {movies} />;
        }
    }    
) 