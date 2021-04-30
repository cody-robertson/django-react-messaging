import { shallow } from 'enzyme';
import React from 'react';

import MessagingRoot from '../MessagingRoot';

describe('MessagingRoot', () => {
  test('does not render back button when no conversation selected', () => {
    const wrapper = shallow(<MessagingRoot />);
    expect(wrapper.find('button')).toHaveLength(0);
  });
});
