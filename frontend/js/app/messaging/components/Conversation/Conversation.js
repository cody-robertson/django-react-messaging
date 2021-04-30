import PropTypes from 'prop-types';
import React from 'react';

const Conversation = ({ conversation }) => {
  return (
    <div>
      <h2>{conversation.title}</h2>
      <p>{conversation.startDate}</p>
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

export default Conversation;
