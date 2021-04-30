import axios from 'axios';
import React, { useEffect, useState } from 'react';

import api from '../../../../store/api';
import Conversation from '../Conversation';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    (async () => {
      try {
        const response = await api.get('/api/conversations/', {
          params: { q: searchQuery },
          cancelToken: source.token,
        });
        setConversations(response.data.results);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => source.cancel();
  }, [searchQuery]);

  return (
    <div>
      <form>
        <label htmlFor="search">Search for a conversation</label>
        <input content={searchQuery} name="search" type="text" onChange={(e) => {setSearchQuery(e.target.value)}} />
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
