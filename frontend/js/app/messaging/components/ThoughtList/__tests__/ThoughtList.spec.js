import { shallow } from 'enzyme';
import React from 'react';

import ThoughtList from '../ThoughtList';

describe('Messaging', () => {
  const thoughts = [
    { text: 'Thought Text', timeSent: '', id: 1 },
    { text: 'Thought Text', timeSent: '', id: 2 },
    { text: 'Thought Text', timeSent: '', id: 3 },
  ];

  test('renders list item for each message', () => {
    const wrapper = shallow(<ThoughtList thoughts={thoughts} />);
    expect(wrapper.find('li')).toHaveLength(thoughts.length);
  });
});
