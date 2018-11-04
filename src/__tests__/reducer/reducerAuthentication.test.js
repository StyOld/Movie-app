import reducerAuthentication, {initialState} from '../../reducers/reducerAuthentication';
import * as constants from '../../constants/contsants';

describe('reducerAuthentication', () => {
    test('default', () => {
        expect(reducerAuthentication(undefined, {
            type: 'INIT'
        })
        ).toEqual(initialState)
    });

    test(`${constants.UPDATE_AUTH}`, () => {
        const action = {
            type: constants.UPDATE_AUTH,
            payload: {
                user: 'name',
                session_id: 1
            }
        };

        expect(reducerAuthentication(undefined, action)).toMatchSnapshot();
    });

    test(`${constants.LOGOUT}`, () => {
        const action = {
            type: constants.LOGOUT
            };

        const newState = reducerAuthentication(undefined, action);
        expect(newState.session_id).toBeNull();
        expect(newState.user).toBeNull();
        expect(newState.isAuth).toBeFalsy();
    });
});
