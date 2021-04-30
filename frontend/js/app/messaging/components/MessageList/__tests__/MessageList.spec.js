import { shallow } from 'enzyme';
import React from 'react';

import MessageList from '../MessageList';

describe('Messaging', () => {
  const messages = [
    { text: 'Message Text', timeSent: '', id: 1 },
    { text: 'Message Text', timeSent: '', id: 2 },
    { text: 'Message Text', timeSent: '', id: 3 },
  ];

  test('renders list item for each message', () => {
    const wrapper = shallow(<MessageList messages={messages} />);
    expect(wrapper.find('li')).toHaveLength(messages.length);
  });
});
