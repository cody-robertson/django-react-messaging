import PropTypes from 'prop-types';
import React from 'react';

import Message from '../Message';

const MessageList = ({ messages, onUpdate }) => {
  return (
    <ul>
      {messages.map((message) => {
        return (
          <li key={message.id}>
            <Message message={message} onUpdate={onUpdate} />
          </li>
        );
      })}
    </ul>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  onUpdate: PropTypes.func,
};

export default MessageList;
