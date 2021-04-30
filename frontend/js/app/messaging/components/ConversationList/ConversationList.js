import axios from 'axios';
import React, { useEffect, useState } from 'react';

import api from '../../../../store/api';
import Conversation from '../Conversation';
import ConversationForm from '../ConversationForm';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchConversations = async (cancelToken) => {
    try {
      const response = await api.get('/api/conversations/', {
        params: { q: searchQuery },
        cancelToken,
      });
      setConversations(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    fetchConversations(source.token);

    return () => source.cancel();
  }, [searchQuery]);

  return (
    <div>
      <ConversationForm onSubmit={() => fetchConversations()} />
      <form>
        <label htmlFor="search">Search for a conversation</label>
        <input
          content={searchQuery}
          name="search"
          type="text"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </form>
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation) => {
          return (
            <li key={conversation.id}>
              <Conversation conversation={conversation} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ConversationList;
