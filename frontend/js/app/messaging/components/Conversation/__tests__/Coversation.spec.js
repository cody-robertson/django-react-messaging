import { shallow } from 'enzyme';
import React from 'react';

import Conversation from '../Conversation';

describe('Conversation', () => {
  test('renders title', () => {
    const conversationProp = {
      title: 'Test Conversation',
      startDate: '2021-04-30',
    };
    const wrapper = shallow(<Conversation conversation={conversationProp} />);

    expect(wrapper.contains(conversationProp.title)).toBe(true);
  });

  test('renders startDate', () => {
    const conversationProp = {
      title: 'Test Conversation',
      startDate: '2021-04-30',
    };
    const wrapper = shallow(<Conversation conversation={conversationProp} />);

    expect(wrapper.contains(conversationProp.startDate)).toBe(true);
  });
});
