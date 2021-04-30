import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import api from '../../../../store/api';
import ConversationForm from '../ConversationForm';
import ConversationList from '../ConversationList';
import SearchForm from '../SearchForm';

const ConversationsContainer = ({ selectConversation }) => {
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
      <ConversationList conversations={conversations} selectConversation={selectConversation} />
    </div>
  );
};

ConversationsContainer.propTypes = {
  selectConversation: PropTypes.func,
};

export default ConversationsContainer;
