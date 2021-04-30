import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import api from '../../../../store/api';
import Message from '../Message';
import ReplyForm from '../ReplyForm';
import SearchForm from '../SearchForm';

const MessageList = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMessages = async (cancelToken) => {
    try {
      const response = await api.get(`/api/conversations/${conversation.id}/messages/`, {
        params: { q: searchQuery },
        cancelToken,
      });
      setMessages(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const addMessage = async (text, timeSent) => {
    await api.post(`/api/conversations/${conversation.id}/messages/`, {
      text,
      timeSent,
    });
    await fetchMessages();
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    fetchMessages(source.token);
    return () => source.cancel();
  }, [conversation.id, searchQuery]);

  return (
    <div>
      <h2>{conversation.title}</h2>
      <SearchForm query={searchQuery} setQuery={setSearchQuery} />
      <ul>
        {messages.map((message) => {
          return (
            <li key={message.id}>
              <Message message={message} onUpdate={fetchMessages} />
            </li>
          );
        })}
      </ul>
      <h3>Reply to Conversation</h3>
      <ReplyForm submit={addMessage} />
    </div>
  );
};

MessageList.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default MessageList;
