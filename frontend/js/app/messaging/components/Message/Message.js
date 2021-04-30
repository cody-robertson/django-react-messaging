import PropTypes from 'prop-types';
import React from 'react';

import api from '../../../../store/api';
import ThoughtList from '../ThoughtList';

const Message = ({ message, onUpdate }) => {
  const addThought = async (text, timeSent) => {
    await api.post(
      `/api/conversations/${message.conversation_id}/messages/${message.id}/thoughts/`,
      {
        text,
        timeSent,
      }
    );
    onUpdate();
  };

  return (
    <div>
      <p>{message.text}</p>
      <p>{message.timeSent}</p>
      <ThoughtList addThought={addThought} thoughts={message.thought_set} />
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    timeSent: PropTypes.string,
    // eslint-disable-next-line babel/camelcase
    conversation_id: PropTypes.number,
    id: PropTypes.number,
    // eslint-disable-next-line babel/camelcase
    thought_set: PropTypes.array,
  }),
  onUpdate: PropTypes.func,
};

export default Message;
