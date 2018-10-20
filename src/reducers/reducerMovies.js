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
                moviesDetails: action.payload.data
                // moviesDetails: action.payload
            };

        case 'UPDATE_MOVIE':
            return {
                ...state,
                moviesDetails: {}
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

        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: {
                sort_by: 'vote_average.asc',
                    primary_release_year: '2018',
                    genres: []},
                page: 1,
                total_pages: ''
            };

        case 'CHANGE_FILTERS':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value
                }
            // return {
            //     ...state,
            //     filters: {
            //         ...state.filters,
            //         [action.payload.target.name]: action.payload.target.value
            //     }
            };

        case 'CHECKED_GENRE':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    genres: [...state.filters.genres, action.payload]
                    // genres: [...state.filters.genres, action.payload.target.value]
                }
            };

        case 'UNCHECKED_GENRE':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    genres: state.filters.genres.filter(genreId => {
                        return genreId !== action.payload
                        // return genreId !== action.payload.target.value
                    })
                }
            };

        default:
            return state;
    }
};

export default reducerMovies;