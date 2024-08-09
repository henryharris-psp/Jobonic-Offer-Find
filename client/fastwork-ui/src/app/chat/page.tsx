'use client';
import { useState, useEffect } from 'react';
import ChatConversation from '../../components/ChatConversation';
import { supabase } from '../config/supabaseClient';
import ProgressSidebar from '../../components/ProgressSidebar';

// Message interface definition
export interface Message {
  id: number | string;
  sender?: string;
  avatar?: string;
  text?: string;
  type?: 'deal' | 'message' | 'apply' | 'service offer';
  image?: string;
  title?: string;
  rating?: number;
  description?: string[];
  price?: string;
  sentByCurrentUser?: boolean;
}

// ActiveChat interface definition
export interface ActiveChat {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

// People interface definition
export interface People {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

// Service interface definition
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

// CurrentUser interface definition
export interface CurrentUser {
  id: number;
  email: string;
  username: string;
  avatar: string;
  userid: number;
}

// Sample data for allPeoples
const allPeoples: ActiveChat[] = [
  {
    id: 1,
    fullName: 'John Chamlington',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'You', type: 'message', avatar: '/avatar.svg', text: 'Hello Google, I would like to apply for your service request below!', sentByCurrentUser: true },
      { id: 2, sender: 'You', type: 'apply', avatar: '/avatar.svg', sentByCurrentUser: true },
    ],
    type: 'client',
    status: 'Applied',
  },
  {
    id: 2,
    fullName: 'Alice Brown',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'Alice', type: 'message', avatar: '/avatar.svg', text: 'Hi, how are you?', sentByCurrentUser: false },
      { id: 2, sender: 'You', type: 'message', avatar: '/avatar.svg', text: "I'm good, thanks!", sentByCurrentUser: true }
    ],
    type: 'service_provider',
    status: 'Applicant',
  },
  {
    id: 3,
    fullName: 'Bob Smith',
    avatar: '/avatar.svg',
    messages: [
      { id: 1, sender: 'Bob', type: 'message', avatar: '/avatar.svg', text: 'Hello Ella, I am interested in your Middle School Math tutor service.', sentByCurrentUser: false },
      { id: 2, sender: 'Bob', type: 'service offer', avatar: '/avatar.svg', sentByCurrentUser: false },
      { id: 2, sender: 'You', type: 'message', avatar: '/avatar.svg', text: 'Hi! Which deliverable are you looking for?', sentByCurrentUser: true }
    ],
    type: 'client',
    status: 'Enquiring',
  }
];

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ActiveChat>(allPeoples[0]); // State for active chat
  const [peoples, setPeoples] = useState<People[]>([]); // State for peoples list
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility
  const [sidebarWidth, setSidebarWidth] = useState(300); // State for sidebar width
  const [isResizing, setIsResizing] = useState(false); // State to control resizing
  const [currentUser, setCurrentUser] = useState<CurrentUser>(); // State for current user
  const [recipient, setRecipient] = useState<any>(null); // State for recipient
  const [messages, setMessages] = useState([]); // State for messages
  const [roleFilter, setRoleFilter] = useState('All'); // State for role filter
  const [fromClientStatusFilter, setFromClientStatusFilter] = useState('All'); // State for client status filter
  const [fromServiceProviderStatusFilter, setFromServiceProviderStatusFilter] = useState('All'); // State for service provider status filter
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

  // Filtered peoples list based on role filter
  const filteredPeoples =
      roleFilter === 'All'
          ? allPeoples
          : allPeoples.filter(people =>
              roleFilter === 'From clients'
                  ? people.type === 'client'
                  : people.type === 'service_provider'
          );

  // Status options for clients
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

  // Status options for service providers
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

  // Chat filters
  const chatFilters = ['All', 'From clients', 'From service providers'];

  // Handle mouse down event for resizing
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
  };

  // Handle mouse move event for resizing
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      setSidebarWidth(e.clientX);
    }
  };

  // Handle mouse up event for resizing
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const parsed = JSON.parse(userData);
      setCurrentUser(parsed);
    }
  }, []);

  // Fetch peoples data from Supabase on component mount
  useEffect(() => {
    const getPeoples = async () => {
      const { data, error } = await supabase
          .from('user')
          .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setPeoples(data);
      }
    };
    getPeoples();
  }, []);

  // Add event listeners for mouse move and mouse up events
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
        {/* Sidebar for chat list */}
        <div className="bg-[#CFEDF4]" style={{ width: sidebarWidth }}>
          <div className="px-4 pt-2">
            <div className="text-lg font-semibold mb-4 text-center overflow-hidden">
              Chats
              <div className="w-full h-0.5 mt-3 bg-gray-300"></div>
            </div>

            {/* Chat filters */}
            <div className="flex justify-center mb-4">
              {chatFilters.map(filter => (
                  <button
                      key={filter}
                      onClick={() => setRoleFilter(filter)}
                      className={`px-4 py-2 text-xs font-medium ${
                          roleFilter === filter ? 'bg-[#0B2147] text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                      style={{ marginRight: '-1px' }}
                  >
                    {filter}
                  </button>
              ))}
            </div>

            <form className="max-w-lg mx-auto">
              <div className="flex flex-col pb-4 space-y-0">
                {/* Search input for "All" filter */}
                {roleFilter === 'All' && (
                    <div className="flex flex-row relative">
                      <input
                          type="search"
                          id="search-dropdown"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Search for Orders"
                          style={{ paddingRight: '2.5rem' }}
                      />
                      <button
                          type="submit"
                          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-1/2 bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
                          style={{ borderLeft: 'none' }}
                      >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
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
                {/* Search input and status filter for "From clients" */}
                {roleFilter === 'From clients' && (
                    <div className="flex flex-col">
                      <select
                          id="type"
                          className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                          required
                          value={fromClientStatusFilter}
                          onChange={e => setFromClientStatusFilter(e.target.value)}
                      >
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
                            style={{ paddingRight: '2.5rem' }}
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-br-lg"
                            style={{ borderLeft: 'none' }}
                        >
                          <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                          >
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
                {/* Search input and status filter for "From service providers" */}
                {roleFilter === 'From service providers' && (
                    <div className="flex flex-col relative">
                      <select
                          id="type"
                          className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                          required
                          value={fromServiceProviderStatusFilter}
                          onChange={e => setFromServiceProviderStatusFilter(e.target.value)}
                      >
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
                            style={{ paddingRight: '2.5rem' }}
                        />
                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-br-lg"
                            style={{ borderLeft: 'none' }}
                        >
                          <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                          >
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
              </div>
            </form>
            {/* Render filtered peoples */}
            {peoples
                .filter(people => people.id !== currentUser?.id)
                .map((people) => (
                    <div
                        className="flex p-2 hover:bg-blue-300 rounded-md justify-between cursor-pointer"
                        key={people.id}
                        onClick={() => setActiveChat(people)}
                    >
                      <div className="flex">
                        <img className="w-10 h-10 rounded-full mr-4" src={people.avatar || '/avatar.svg'} alt={people.fullName} />
                        <div className="text-black mt-2 flex items-center text-sm">{people.fullName}</div>
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

        {/* Resizer for sidebar */}
        <div
            className="resizer bg-gray-500"
            style={{ width: '5px', cursor: 'col-resize' }}
            onMouseDown={handleMouseDown}
        ></div>

        {/* Main Chat Area */}
        <div className="flex flex-grow">
          <ChatConversation activeChat={activeChat} recipientUser={activeChat} />
        </div>

        {/* Progress Sidebar */}
        {isSidebarVisible && (
            <div className="flex-none">
              <ProgressSidebar milestones={allPeoples} />
            </div>
        )}

        {/* Toggle Button */}
        <button
            className="fixed top-20 right-4 bg-[#0B2147] text-white p-2 rounded-full shadow-lg z-50"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          {isSidebarVisible ? (
              <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
          ) : (
              <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l-7 7 7 7" />
              </svg>
          )}
        </button>
      </div>
  );
};

export default ChatPage;
