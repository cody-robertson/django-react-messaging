import React, { useState } from 'react';

import ConversationContainer from '../ConversationsContainer';
import MessagesContainer from '../MessagesContainer';

const MessagingRoot = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  if (selectedConversation !== null) {
    return (
      <div>
        <MessagesContainer conversation={selectedConversation} />
        <button type="submit" onClick={() => setSelectedConversation(null)}>
          Back
        </button>
      </div>
    );
  }
  return <ConversationContainer selectConversation={setSelectedConversation} />;
};

export default MessagingRoot;
