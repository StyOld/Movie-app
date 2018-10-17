const initialState = {
    moviesData: {},
    moviesDetails: {},
    genreList: [],
    filters: {
        sort_by: 'vote_average.asc',
        primary_release_year: '2018',
        genres: []
    },
    page: 1,
    total_pages: ''
};

const reducerMovies = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_MOVIES':
            return {
                ...state,
                moviesData: action.payload
        };

        case 'GET_MOVIE_DETAILS':
            return {
                ...state,
                // moviesDetails: action.payload
                moviesDetails: action.payload.data
            };

        case 'GET_GENRES_LIST':
            return {
                ...state,
                genreList: action.payload.data
            };

        case 'CHANGE_PAGE':
            return {
                ...state,
                page: action.payload
            };

        case 'GET_TOTAL_PAGE':
            return {
                ...state,
                total_pages: action.payload
            };

        default:
            return state;
    }
};

export default reducerMovies;