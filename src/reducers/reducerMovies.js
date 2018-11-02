import * as constants from '../constants/contsants';

const initialState = {
    moviesData: {},
    genreList: [],
    filters: {
        sort_by: 'vote_average.desc',
        primary_release_year: '2017',
        genres: []
    },
    page: 1,
    total_pages: ''
};

const reducerMovies = (state = initialState, action) => {
    switch(action.type) {
        case constants.UPDATE_MOVIES:
            return {
                ...state,
                moviesData: action.payload,
                total_pages: action.payload.total_pages
        };

        case constants.GET_GENRES_LIST:
            return {
                ...state,
                genreList: action.payload.data
            };

        case constants.CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            };

        case constants.CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                sort_by: 'vote_average.asc',
                    primary_release_year: '2018',
                    genres: []},
                page: 1,
                total_pages: ''
            };

        case constants.CHANGE_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value
                    // [action.payload.target.name]: action.payload.target.value
                }
            };

        default:
            return state;
    }
};

export default reducerMovies;

// case constants.CHECKED_GENRE:
//     return {
//         ...state,
//         filters: {
//             ...state.filters,
//             genres: [...state.filters.genres, action.payload]
//             // genres: [...state.filters.genres, action.payload.target.value]
//         }
//     };
//
// case constants.UNCHECKED_GENRE:
//     return {
//         ...state,
//         filters: {
//             ...state.filters,
//             genres: state.filters.genres.filter(genreId => {
//                 return genreId !== action.payload
//                 // return genreId !== action.payload.target.value
//             })
//         }
//     };