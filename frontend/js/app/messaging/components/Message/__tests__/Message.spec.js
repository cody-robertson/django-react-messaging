import { shallow } from 'enzyme';
import React from 'react';

import Message from '../Message';

describe('Message', () => {
  const messageProp = {
    text: 'Test Message',
    timeSent: '2021-04-29T12:00:00',
  };

  test('renders message text', () => {
    const wrapper = shallow(<Message message={messageProp} />);
    expect(wrapper.contains(messageProp.text)).toBe(true);
  });

  test('renders thought timeSent', () => {
    const wrapper = shallow(<Message message={messageProp} />);
    expect(wrapper.contains(messageProp.timeSent)).toBe(true);
  });
});
