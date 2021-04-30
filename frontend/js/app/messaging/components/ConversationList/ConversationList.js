import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import api from '../../../../store/api';
import Conversation from '../Conversation';
import ConversationForm from '../ConversationForm';
import SearchForm from '../SearchForm';

const ConversationList = ({ selectConversation }) => {
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
      <SearchForm query={searchQuery} setQuery={setSearchQuery} />
      <h2>Current Conversations</h2>
      {conversations.map((conversation) => {
        return (
          <div key={conversation.id}>
            <button type="submit" onClick={() => selectConversation(conversation)}>
              <Conversation conversation={conversation} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

ConversationList.propTypes = {
  selectConversation: PropTypes.func,
};

export default ConversationList;
