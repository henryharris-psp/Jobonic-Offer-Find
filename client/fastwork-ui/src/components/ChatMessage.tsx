import React from 'react';

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex items-start ${message.sentByCurrentUser ? 'justify-end' : ''}`}>
      {!message.sentByCurrentUser && (
        <img
          className="w-10 h-10 rounded-full mt-2 mr-2"
          src={message.avatar}
          alt={message.sender}
        />
      )}
      <div className={`flex flex-col gap-1 ${message.sentByCurrentUser ? 'items-end' : 'items-start'}`}>
        <p className={`font-bold ${message.sentByCurrentUser ? 'text-end' : ''}`}>{message.sender}</p>
        <p className={`rounded-lg p-2 ${message.sentByCurrentUser ? 'bg-blue-200' : 'bg-blue-300'}`}>{message.text}</p>
      </div>
      {message.sentByCurrentUser && (
        <img
          className="w-10 h-10 rounded-full mt-2 ml-2"
          src={message.avatar}
          alt={message.sender}
        />
      )}
    </div>
  );
};

export default ChatMessage;
