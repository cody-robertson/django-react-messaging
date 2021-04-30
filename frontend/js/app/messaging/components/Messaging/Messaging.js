import React, { useState } from 'react';

import ConversationList from '../ConversationList';
import MessageList from '../MessageList';

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  if (selectedConversation !== null) {
    return (
      <div>
        <MessageList conversation={selectedConversation} />
        <button content="Back" type="submit" onClick={() => setSelectedConversation(null)} />
      </div>
    );
  }
  return (
    <div>
      <ConversationList />
    </div>
  );
};

export default Messaging;
