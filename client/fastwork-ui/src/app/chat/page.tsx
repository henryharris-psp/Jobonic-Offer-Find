'use client';
import { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import NavBar from '../section/navBar/NavBar';

const Home = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John',
      avatar: '/avatar.svg',
      text: 'Hey there!',
      sentByCurrentUser: false,
    },
    {
      id: 2,
      sender: 'You',
      avatar: '/avatar.svg',
      text: 'Hello!',
      sentByCurrentUser: true,
    }
  ]);

  const peoples = [
    {
      id: 1,
      name: 'John Chamlington',
      avatar: '/avatar.svg',
    },
    {
      id: 2,
      name: 'Alice Brown',
      avatar: '/avatar.svg',
    },
    {
      id: 3,
      name: 'Bob Smith',
      avatar: '/avatar.svg',
    }
  ]

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to bottom of chat container when new message is added
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
        sentByCurrentUser: true
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      <NavBar showOnlyLogo />
      <div className="flex flex-grow" style={{ background: 'linear-gradient( 89.5deg, rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )' }}>
        <div className="flex w-full lg:w-1/4">
          <div className="w-full pl-4 pt-2">
            <div className="text-lg font-semibold mb-4 text-center">
              Peoples
              <div className="w-full h-0.5 mt-3 bg-gray-300"></div>
            </div>
            {peoples.map((people) => (
              <div className="overflow-y-auto flex p-2 hover:bg-blue-400 rounded-md" key={people.id}>
                <img className="w-10 h-10 rounded-full mr-4" src={people.avatar} alt={people.name} />
                <div className="text-black mt-2">{people.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full lg:w-3/4">
          <div className="w-full mx-auto bg-blue-50">
            <div className="text-xl font-bold mb-4 text-center mt-4">
              Messages
              <div className="w-full h-0.5 mt-1 bg-gray-300 m-2"></div>
            </div>
            <div ref={chatContainerRef} className="h-[81%] mb-4 m-6 overflow-y-auto">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            <div className="flex flex-col lg:flex-row m-4">
              <input
                type="text"
                className="flex-grow rounded-lg px-4 py-2 border text-black border-gray-100 focus:outline-none focus:border-blue-500 mb-2 lg:mb-0"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="w-full lg:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
                onClick={handleMessageSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
