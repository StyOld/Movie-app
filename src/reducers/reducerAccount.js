const initialState = {
    favoriteMovies: [],
    watchlistMovies: []
};

const reducerAccount = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_BY_TYPE_MOVIES':
            return {
                ...state,
                [`${action.payload.type}Movies`]: action.payload.data
            };

        default:
            return state;
    }
};

export default reducerAccount;
