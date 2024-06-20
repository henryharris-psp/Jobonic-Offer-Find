'use client';
import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatPopup = () => {
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
    },
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

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
        sentByCurrentUser: true,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-[#0C2348] text-white p-4 rounded-full shadow-lg"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chat</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsChatOpen(false)}
            >
              ×
            </button>
          </div>
          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
          <div className="p-4 border-t border-gray-300 flex items-center space-x-2">
            <input
              type="text"
              className="flex-grow rounded-lg px-4 py-2 border text-black border-gray-100 focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleMessageSubmit();
                }
              }}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
              onClick={handleMessageSubmit}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;

