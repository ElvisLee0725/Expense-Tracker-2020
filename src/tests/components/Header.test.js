import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

// Install react-test-renderer to test React components
// When it runs for the 1st time it will make a snapshot, and if we do some modification and run test, it will show error.
// Then we decide if we need to keep this change or not. Press u to keep the update and the snapshot will also be updated.
test('Should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});