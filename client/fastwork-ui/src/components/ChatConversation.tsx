// ChatConversation.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatMessageBig from '@/components/ChatMessageBig';
import DealCard from '@/components/DealCard';

interface Message {
  id: number | string;
  sender?: string;
  avatar?: string;
  text?: string;
  type?: 'deal' | 'message';
  image?: string;
  title?: string;
  rating?: number;
  description?: string[];
  price?: string;
  sentByCurrentUser?: boolean;
}

interface ActiveChat {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

interface ChatConversationProps {
  activeChat: ActiveChat;
}

const ChatConversation: React.FC<ChatConversationProps> = ({ activeChat }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
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
      const newMessageObj: Message = {
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
    const newMessageObj: Message = {
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
      <div className="my-4 px-4">
        <div className="flex flex-row">
          <div className="text-xl font-bold justify-self-start mr-60">{activeChat.name}</div>
          <button className="bg-[#E1824F] text-white rounded-lg text-sm p-2 mr-4">
            View Contract Details
          </button>
          <button className="bg-[#71BAC7] text-white rounded-lg text-sm p-2 mr-4" disabled>
            { activeChat.type === 'client' ? 'Hiring' : 'Offering'}
          </button>
          <button className="bg-[#71BAC7] text-white rounded-lg text-sm p-2"  disabled>
            {activeChat.status}
          </button>
        </div>

        <div className="h-0.5 mt-1 bg-gray-300"></div>
      </div>
      <div ref={chatContainerRef} className={`overflow-y-auto p-6 bg-white flex" ${activeChat.status === 'Applied' ? 'justify-end' : 'justify-start'}`}>
        {messages.map((message) =>
          message.type === 'deal' ? (
            <DealCard
              key={message.id}
              image={message.image!}
              title={message.title!}
              rating={message.rating!}
              description={message.description!}
              price={message.price!}
              onAccept={() => alert('Deal Accepted')}
              onEditOffer={(newPrice) => alert(`Edit Offer: ${newPrice}`)}
              onDeclineAndSendMessage={handleDeclineAndSendMessage}/>
          ) : (
            <ChatMessageBig key={message.id} message={message} />
          )
        )}
      </div>

      <div className="w-full bg-white">
        <div className="flex flex-col lg:flex-row">
          <input type="file" id="file-input" className="hidden" />
          <label htmlFor="file-input" className="file-input-label">
            <svg
              className="cursor-pointer w-8 h-10 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"/>
            </svg>
          </label>

          <input
            type="text"
            className="flex-grow rounded-lg border text-black border-gray-300 focus:outline-none focus:border-[#0C2348] mb-2 px-2 mr-2 lg:mb-0"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="lg:w-auto px-4 py-2 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B] focus:outline-none"
            onClick={handleMessageSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;



