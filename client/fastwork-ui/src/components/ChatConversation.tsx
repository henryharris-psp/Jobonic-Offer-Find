'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatMessageBig from '@/components/ChatMessageBig';
import DealCard from './DealCard'; // Import the DealCard component

const ChatConversation = ({ activeChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    ...activeChat.messages,
    {
      id: 'deal',
      type: 'deal',
      image: '/group-image.jpg',
      title: 'Sample Deal',
      rating: 4.5,
      description: ['This is a great deal.', "Don't miss out!"],
      price: '$99.99',
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      ...activeChat.messages,
      {
        id: 'deal',
        type: 'deal',
        image: '/group-image.jpg',
        title: 'Sample Deal',
        rating: 4.5,
        description: ['This is a great deal.', "Don't miss out!"],
        price: '$99.99',
      },
    ]);
  }, [activeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: messages.length + 1,
        sender: 'You',
        avatar: '/avatar.svg',
        text: newMessage,
        sentByCurrentUser: true,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  const handleDeclineAndSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      sender: 'You',
      avatar: '/avatar.svg',
      text: 'Offer declined.',
      sentByCurrentUser: true,
    };
    setMessages([...messages, newMessageObj]);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="text-xl font-bold mb-4 text-center mt-4">
        Messages
        <div className="w-full h-0.5 mt-1 bg-gray-300 m-4"></div>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 bg-white">
        {messages.map((message) =>
          message.type === 'deal' ? (
            <DealCard
              key={message.id}
              image={message.image}
              title={message.title}
              rating={message.rating}
              description={message.description}
              price={message.price}
              onAccept={() => alert('Deal Accepted')}
              onEditOffer={() => alert('Edit Offer')}
              onDeclineAndSendMessage={handleDeclineAndSendMessage}
            />
          ) : (
            <ChatMessageBig key={message.id} message={message} />
          )
        )}
      </div>
      <div className="w-full p-4 bg-white">
        <div className="flex flex-col lg:flex-row mx-4 my-4">
          <input type="file" id="file-input" className="hidden" />
          <label htmlFor="file-input" className="file-input-label">
            <svg className="cursor-pointer w-8 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
            </svg>
          </label>

          <input
            type="text"
            className="flex-grow rounded-lg px-4 py-2 border text-black border-gray-100 focus:outline-none focus:border-[#0C2348] mb-2 lg:mb-0"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="w-full lg:w-auto px-4 py-2 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B] focus:outline-none"
            onClick={handleMessageSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;




