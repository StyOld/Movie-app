import {actionCreatorUpdateAuth} from '../../actions/actionsAuthentication';

describe(`actionsAuthentication`, () => {
    test(`actionCreatorUpdateAuth`, () => {
        const payload = {
            user: '1',
            session_id: '1',
            isAuth: true
        };

        const result = actionCreatorUpdateAuth(payload);
        console.log(result);
        expect(result).toMatchSnapshot();
    })
})