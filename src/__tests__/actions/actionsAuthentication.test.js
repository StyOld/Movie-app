import {actionCreatorUpdateAuth, actionCreatorOnLogOut} from '../../actions/actionsAuthentication';
import * as constants from '../../constants/contsants';

describe(`actionsAuthentication`, () => {
    test(`actionCreatorUpdateAuth`, () => {
        const payload = {
            user: '1',
            session_id: '1',
            isAuth: true
        };

        const result = actionCreatorUpdateAuth(payload);
        console.log(result);

        // expect(result.type).toBe(constants.UPDATE_AUTH);
        // expect(result.payload.user).toBe(payload.user);
        // expect(result.payload.session_id).toBe(payload.session_id);
        // expect(result.payload.isAuth).toBe(payload.isAuth);

        expect(result).toMatchSnapshot();

        // ({
        //     type: constants.UPDATE_AUTH,
        //     payload: payload
        // });
    })
})