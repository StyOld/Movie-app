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
                    <div className="col-12 col-lg-4">
                        <div className="card" style={{ width: "100%" }}>
                            <div className="card-body">
                                <h4><strong>Фильтры:</strong></h4>
                                <Filters/>
                                <button
                                    className='btn mt-2'
                                    onClick={clearFilters}
                                >
                                    Очистить фильтры
                                </button>
                                <Pagination/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8">
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