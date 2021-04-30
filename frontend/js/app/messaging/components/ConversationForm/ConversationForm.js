import React, { useState } from 'react';
import api from '../../../../store/api';

const ConversationForm = () => {
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
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={submit}>
        <input content={title} name="title" onChange={(e) => setTitle(e.target.value)} />
        <input
          content={startDate}
          name="startDate"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button type="submit">Create Conversation</button>
      </form>
    </div>
  );
};

export default ConversationForm;
