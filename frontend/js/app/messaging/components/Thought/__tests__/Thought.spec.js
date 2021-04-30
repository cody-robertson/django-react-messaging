import { shallow } from 'enzyme';
import React from 'react';

import Thought from '../Thought';

describe('Thought', () => {
  test('renders thought text', () => {
    const thoughtProp = {
      text: 'Test Thought',
      timeSent: '2021-04-29T12:00:00',
    };
    const wrapper = shallow(<Thought thought={thoughtProp} />);

    expect(wrapper.contains(thoughtProp.text)).toBe(true);
  });

  test('renders thought timeSent', () => {
    const thoughtProp = {
      text: 'Test Thought',
      timeSent: '2021-04-29T12:00:00',
    };
    const wrapper = shallow(<Thought thought={thoughtProp} />);

    expect(wrapper.contains(thoughtProp.timeSent)).toBe(true);
  });
});
