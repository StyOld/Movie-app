import React from 'react';

export default class Pagination extends React.PureComponent {
    render() {
        console.log('paggination');
        const {page, total_pages, onChangePage}=this.props;

        return(
            <div className="d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-light mr-2"
                    disabled={page === 1}
                    // onClick={() => onChangePage(page - 1)}
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