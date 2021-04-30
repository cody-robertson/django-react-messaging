import PropTypes from 'prop-types';
import React from 'react';

import Conversation from '../Conversation';

const ConversationList = ({ selectConversation, conversations }) => {
  return (
    <div>
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
  conversations: PropTypes.array,
};

export default ConversationList;
