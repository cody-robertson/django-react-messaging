import PropTypes from 'prop-types';
import React from 'react';

const Thought = ({ thought }) => {
  return (
    <div>
      <p>{thought.text}</p>
      <p>{thought.timeSent}</p>
    </div>
  );
};

Thought.propTypes = {
  thought: PropTypes.shape({
    text: PropTypes.string,
    timeSent: PropTypes.string,
  }),
};

export default Thought;
