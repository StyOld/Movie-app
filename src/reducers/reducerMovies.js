const initialState = {
    moviesData: {},
    moviesDetails: {}
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

        default:
            return state;
    }
};

export default reducerMovies;