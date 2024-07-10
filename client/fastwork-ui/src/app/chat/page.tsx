// ChatPage component

'use client';
import { useState, useEffect } from 'react';
import ChatConversation from '../../components/ChatConversation'; // Import the new ChatConversation component

export interface Message {
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

export interface ActiveChat {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
}

export interface Service {
  name: string;
  image: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  reviewsDetail: { reviewer: string; comment: string; rating: number }[];
  numSold: number;
}

const allPeoples: ActiveChat[] = [
  {
    id: 1,
    name: 'John Chamlington',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'John', avatar: '/avatar.svg', text: 'Hey there!', sentByCurrentUser: false },
      { id: 2, sender: 'You', avatar: '/avatar.svg', text: 'Hello!', sentByCurrentUser: true }
    ],
    type: 'client'
  },
  {
    id: 2,
    name: 'Alice Brown',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'Alice', avatar: '/avatar.svg', text: 'Hi, how are you?', sentByCurrentUser: false },
      { id: 2, sender: 'You', avatar: '/avatar.svg', text: "I'm good, thanks!", sentByCurrentUser: true }
    ],
    type: 'service_provider'
  },
  {
    id: 3,
    name: 'Bob Smith',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'Bob', avatar: '/avatar.svg', text: 'Hello!', sentByCurrentUser: false },
      { id: 2, sender: 'You', avatar: '/avatar.svg', text: 'Hi Bob!', sentByCurrentUser: true }
    ],
    type: 'client'
  }
];

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ActiveChat>(allPeoples[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);

  const [roleFilter, setRoleFilter] = useState('All');
  const [fromClientStatusFilter, setFromClientStatusFilter] = useState('All');
  const [fromServiceProviderStatusFilter, setFromServiceProviderStatusFilter] = useState('All');

  const filteredPeoples =
    roleFilter === 'All'
      ? allPeoples
      : allPeoples.filter(people =>
          roleFilter === 'From clients'
            ? people.type === 'client'
            : people.type === 'service_provider'
        );

  const messagetypes = [
    'All',
    'Waiting for payment',
    'Waiting for inspection',
    'Waiting for confirmation',
    'Waiting for review',
    'I want to cancel.',
    'Cancelled',
    'Old order',
    'Suspended',
    'Completed'
  ];

  const fromClientStatus = [
    'All',
    'Enquiring',
    'Applied',
    'To submit',
    'Waiting for review',
    'Waiting for final review',
    'Cancelled',
    'Completed'
  ];

  const fromServiceProviderStatus = [
    'All',
    'Enquiring',
    'Applicant',
    'Waiting for submission',
    'To review',
    'Waiting for final submission',
    'Rejected',
    'Completed'
  ];

  const chatFilters = ['All', 'From clients', 'From service providers'];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      setSidebarWidth(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen w-screen">
      {/* Navbar should show only logo. */}
        <div className="bg-[#CFEDF4]">
          <div className="px-4 pt-2">
            <div className="text-lg font-semibold mb-4 text-center overflow-hidden">
              Chats
              <div className="w-full h-0.5 mt-3 bg-gray-300"></div>
            </div>

            {/* New Toggle */}
            <div className="flex justify-center mb-4">
              {chatFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setRoleFilter(filter)}
                  className={`px-4 py-2 text-xs font-medium ${
                    roleFilter === filter ? 'bg-[#0B2147] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  style={{ borderRadius: '4px 4px 0 0', marginRight: '-1px' }}
                >
                  {filter}
                </button>
              ))}
            </div>

            <form className="max-w-lg mx-auto">
              <div className="flex flex-col pb-4 space-y-0">
                {roleFilter === 'All' && (
                  <div className="flex flex-row relative">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search for Orders"
                      style={{ paddingRight: '2.5rem' }}/>
                    <button
                      type="submit"
                      className="absolute top-0 right-0 p-2.5 text-sm font-medium h-1/2 bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                      style={{ borderLeft: 'none' }}>
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                {roleFilter === 'From clients' && (
                  <div className="flex flex-col ">
                    <select
                    id="type"
                    className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    required
                    value={fromClientStatusFilter}
                    onChange={e => setFromClientStatusFilter(e.target.value)}>
                      {fromClientStatus.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-row relative">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-t-0 border-gray-300 rounded-b-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for Orders"
                        style={{ paddingRight: '2.5rem' }}/>
                      <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-br-lg"
                        style={{ borderLeft: 'none' }}>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                {roleFilter === 'From service providers' && (
                  <div className="flex flex-col relative">
                    <select
                    id="type"
                    className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                    required
                    value={fromServiceProviderStatusFilter}
                    onChange={e => setFromServiceProviderStatusFilter(e.target.value)}>
                      {fromServiceProviderStatus.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-row relative">
                      <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-t-0 border-gray-300 rounded-b-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for Orders"
                        style={{ paddingRight: '2.5rem' }}/>
                      <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-br-lg"
                        style={{ borderLeft: 'none' }}>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                {/* <select
                  id="type"
                  className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                  required
                  value={selectedFilter}
                  onChange={e => setSelectedFilter(e.target.value)}
                >
                  {messagetypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select> */}

              </div>
            </form>
            {filteredPeoples.map(people => (
              <div
                className="flex p-2 hover:bg-blue-300 rounded-md justify-between"
                key={people.id}
                onClick={() => setActiveChat(people)}
              >
                <div className="flex">
                  <img className="w-10 h-10 rounded-full mr-4" src={people.avatar} alt={people.name} />
                  <div className="text-black mt-2 flex items-center text-sm">{people.name}</div>
                </div>
                <div className="flex items-center">
                  {sidebarWidth > 200 && (
                    <div className="bg-[#0B2147] text-center text-white px-2 py-1 text-xs rounded-md">Completed</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="resizer bg-gray-500"
          style={{ width: '5px', cursor: 'col-resize' }}
          onMouseDown={handleMouseDown}
        ></div>
        <ChatConversation activeChat={activeChat} />
    </div>
  );
};

export default ChatPage;














