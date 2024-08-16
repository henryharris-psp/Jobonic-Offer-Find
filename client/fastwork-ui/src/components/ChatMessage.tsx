import React from 'react';

interface MessageProps {
  message: {
    id: number | string;
    sender?: string;
    avatar?: string;
    text?: string;
    sentByAuthUser?: boolean;
  };
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`flex items-start ${message.sentByAuthUser ? 'justify-end' : ''}`}>
      {!message.sentByAuthUser && (
        <img
          className="w-10 h-10 rounded-full mt-2 mr-2"
          src={message.avatar}
          alt={message.sender}
        />
      )}
      <div className={`flex flex-col gap-1 ${message.sentByAuthUser ? 'items-end' : 'items-start'}`}>
        <p className={`font-bold ${message.sentByAuthUser ? 'text-end' : ''}`}>{message.sender}</p>
        <p className={`rounded-lg p-2 ${message.sentByAuthUser ? 'bg-blue-200' : 'bg-blue-300'}`}>{message.text}</p>
      </div>
      {message.sentByAuthUser && (
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

