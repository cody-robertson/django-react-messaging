import { shallow } from 'enzyme';
import React from 'react';

import ConversationList from '../ConversationList';

describe('Messaging', () => {
  const conversations = [
    { title: 'Conversation Title', startDate: '', id: 1 },
    { title: 'Conversation Title', startDate: '', id: 2 },
    { title: 'Conversation Title', startDate: '', id: 3 },
  ];

  test('renders button for each message', () => {
    const wrapper = shallow(<ConversationList conversations={conversations} />);
    expect(wrapper.find('button')).toHaveLength(conversations.length);
  });
});
