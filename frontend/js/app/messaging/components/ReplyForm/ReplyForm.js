import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ReplyForm = ({ submit }) => {
  const [title, setTitle] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    submit(title, sendTime).catch((err) => {
      setError(err);
    });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit}>
        <input content={title} name="title" required onChange={(e) => setTitle(e.target.value)} />
        <input
          content={sendTime}
          name="startDate"
          required
          type="datetime-local"
          onChange={(e) => setSendTime(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

ReplyForm.propTypes = {
  submit: PropTypes.func,
};

export default ReplyForm;
