import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import Pagination from "../../Filters/Pagination";
import * as actionsMovies from "../../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MoviesPage extends React.Component {
    render() {
        const {clearFilters} = this.props;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{ width: "100%" }}>
                            <div className="card-body">
                                <h4><strong>Фильтры:</strong></h4>
                                <Filters/>
                                <button
                                    // type='button'
                                    className='btn mt-2'
                                    onClick={clearFilters}
                                    // onClick={() => clearFilters()}
                                >
                                    Очистить фильтры
                                </button>
                                <Pagination/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clearFilters : actionsMovies.actionCreatorClearFilters
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);

// import _ from "lodash";

// constructor() {
//     super()
//     this.state = {
//         filters: {
//             sort_by: 'vote_average.asc',
//             primary_release_year: '2018',
//             genres: []
//         },
//         // page: 1,
//         // total_pages: ''
//     };
//
//     this.initialState = _.cloneDeep(this.state)
// };

// onChangeFilters = (event) => {
//     const newFilters = {
//         ...this.state.filters,
//         [event.target.name]: event.target.value
//     };
//     this.setState({
//         filters: newFilters
//     });
// };

// clearFilters = () => {
//     this.setState(this.initialState);
// };

// onChangePage = page => {
//     this.setState({
//         page
//     });
// };

// getTotalPages = total_pages => {
//     this.setState({
//         total_pages
//     });
// };

// onChangeGenres = (event) => {
//     const id = event.target.value;
//
//     (event.target.checked) ? (
//             this.setState((prevState) =>({
//                 filters: {
//                     ...prevState.filters,
//                     genres: [...prevState.filters.genres, id]
//                 }
//             }))
//         ) :
//         this.setState(prevState => ({
//             filters: {
//                 ...prevState.filters,
//                 genres: prevState.filters.genres.filter(genreId => {
//                     return genreId !== id
//                 })
//             }
//         }))
// };

// const {filters, page, total_pages} = this.state;

// const {page, total_pages, filters, onChangePage, getTotalPages, clearFilters, onChangeFilters, onChangeGenres} = this.props;

//<Filters
//    filters={filters}
//    page={page}
//    total_pages={total_pages}
//    onChangeFilters={onChangeFilters}
//    onChangePage={onChangePage}
//    onChangeGenres={onChangeGenres}
///>

//<Pagination
//    page={page}
//    total_pages={total_pages}
//    onChangePage={onChangePage}
///>

//<MoviesList
//    page={page}
//    filters={filters}
//    onChangePage={onChangePage}
//    getTotalPages={getTotalPages}
///>

// const mapStateToProps = (state) => {
//     return {
//         page: state.movies.page,
//         total_pages: state.movies.total_pages,
//         filters: state.movies.filters
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         onChangePage: actions.actionCreatorChangePage,
//         getTotalPages: actions.actionCreatorGetTotalPage,
//         clearFilters : actions.actionCreatorClearFilters,
//         onChangeFilters: actions.actionCreatorChangeFilters,
//         onChangeGenres: actions.actionCreatorChangeGenres
//     },dispatch)
// };