import React from 'react';
import * as actionsMovies from "../../actions/actionsMovies";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Pagination extends React.Component {
    render() {
        const {page, total_pages, onChangePage}=this.props;

        return(
            <div className="d-flex align-items-center mt-2">
                <button
                    type="button"
                    className="btn btn-light mr-2"
                    disabled={page === 1}
                    onClick={onChangePage.bind(null, page - 1)}
                >
                    Назад
                </button>
                <button
                    type="button"
                    className="btn btn-light mr-2"
                    disabled={page >= total_pages}
                    onClick={onChangePage.bind(null, page + 1)}
                >
                    Вперёд
                </button>
                <div className='mr-2'>
                    <strong>{page}</strong> из <strong>{total_pages}</strong>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.movies.page,
        total_pages: state.movies.total_pages
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onChangePage: actionsMovies.actionCreatorChangePage
    },dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);