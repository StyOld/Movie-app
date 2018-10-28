import {LoginForm} from '../../components/Header/Login/LoginForm';
import React from 'react';
import {shallow} from 'enzyme';

describe(`LoginForm`, () => {
    test('should change input', () => {
        const name = 'username';
        const value = 'test';
        const wrapper = shallow(<LoginForm />);

        wrapper.find("input[name='username']").simulate("change",{
            target: {
                name,
                value: value
            }
        });
        expect(wrapper.find("input[name='username']").props().value).toBe(value);

        wrapper.find("input[name='username']").simulate("blur" , {
            target: {
                name
            }
        });
        expect(wrapper.find(".invalid-feedback")).toHaveLength(0);

        wrapper.find("input[name='username']").simulate("change",{
            target: {
                name,
                value: ''
            }
        });
        wrapper.find("input[name='username']").simulate("blur" , {
            target: {
                name
            }
        });
        expect(wrapper.find(".invalid-feedback")).toHaveLength(1);

        // console.log(wrapper.find(".invalid-feedback").html());
    });

    // test('initial render', () => {
    //     const wrapper = shallow(<LoginForm />);
    //     expect(wrapper.html()).toMatchSnapshot();
    // });
});