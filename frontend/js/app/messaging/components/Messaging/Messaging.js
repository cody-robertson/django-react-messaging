import React, { useState } from 'react';

import ConversationList from '../ConversationList';
import MessageList from '../MessageList';

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  if (selectedConversation !== null) {
    return (
      <div>
        <MessageList conversation={selectedConversation} />
        <button type="submit" onClick={() => setSelectedConversation(null)}>
          Back
        </button>
      </div>
    );
  }
  return (
    <div>
      <ConversationList selectConversation={setSelectedConversation} />
    </div>
  );
};

export default Messaging;
