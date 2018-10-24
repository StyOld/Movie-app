import * as constants from '../constants/contsants'
import CallApi from '../api/api';

export const actionCreatorGetByTypeMovies = ({userId, params, type}) => {
    return dispatch => {
        CallApi.get(`/account/${userId}/${type}/movies`, {
            params: params
        })
            .then(data => {
                dispatch({
                    type: constants.GET_BY_TYPE_MOVIES,
                    payload: {
                        type,
                        data: data.results
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: constants.ERROR_GET_MOVIES,
                    payload: error
                })
            })
    }
    // CallApi.get(`/account/{account_id}/${type}/movies`,
};