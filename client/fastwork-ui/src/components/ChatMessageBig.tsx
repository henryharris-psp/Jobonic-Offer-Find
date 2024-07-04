'use client';

import React from 'react';

interface MessageProps {
  message: {
    id: number | string;
    sender?: string;
    avatar?: string;
    text?: string;
    sentByCurrentUser?: boolean;
  };
}

const ChatMessageBig: React.FC<MessageProps> = ({ message }) => {
  const isCurrentUser = message.sentByCurrentUser;
  return (
    <div className={`flex items-start mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={message.avatar}
          alt={message.sender}
        />
      )}
      <div className={`max-w-xs ${isCurrentUser ? 'text-right' : 'text-left'}`}>
        <p
          className={`px-4 py-2 rounded-lg ${isCurrentUser ? 'bg-[#0C2348] text-white' : 'bg-[#E9E9EB] text-black'}`}
        >
          {message.text}
        </p>
      </div>
      {isCurrentUser && (
        <img
          className="w-10 h-10 rounded-full ml-4"
          src={message.avatar}
          alt={message.sender}
        />
      )}
    </div>
  );
};

export default ChatMessageBig;
