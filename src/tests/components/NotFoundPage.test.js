import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

test('Should display NotFoundPage', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
});