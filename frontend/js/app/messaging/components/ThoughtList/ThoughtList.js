import PropTypes from 'prop-types';
import React from 'react';

import ReplyForm from '../ReplyForm';
import Thought from '../Thought';

const ThoughtList = ({ thoughts, addThought }) => {
  return (
    <div>
      <ul>
        {thoughts.map((thought) => {
          return (
            <li key={thought.id}>
              <Thought thought={thought} />
            </li>
          );
        })}
      </ul>
      <h3>Add a thought</h3>
      <ReplyForm
        submit={(text, timeSent) => {
          return addThought(text, timeSent);
        }}
      />
    </div>
  );
};

ThoughtList.propTypes = {
  thoughts: PropTypes.array,
  addThought: PropTypes.func,
};

export default ThoughtList;
