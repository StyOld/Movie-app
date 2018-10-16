const initialState = {
    genreList: []
};

const reducerFilters = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_GENRES_LIST':
            return {
                ...state,
                genreList: action.payload.data
            };

        default:
            return state;
    }
};

export default reducerFilters;
