import PropTypes from 'prop-types';
import React, { useState } from 'react';

import api from '../../../../store/api';

const ConversationForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/conversations/', {
        title,
        startDate,
      });
    } catch (err) {
      setError(err.message);
    }
    onSubmit();
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={submit}>
        <h3>Create a new conversation</h3>
        <input content={title} name="title" required onChange={(e) => setTitle(e.target.value)} />
        <input
          content={startDate}
          name="startDate"
          required
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button type="submit">Create Conversation</button>
      </form>
    </div>
  );
};

ConversationForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ConversationForm;
