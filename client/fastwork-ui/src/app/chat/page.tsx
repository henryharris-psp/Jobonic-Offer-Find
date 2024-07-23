'use client';
import { useState, useEffect } from 'react';
import ChatConversation from '../../components/ChatConversation'; // Import the new ChatConversation component
import { supabase } from '../config/supabaseClient';

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

export interface ActiveChat {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

export interface People {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
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

export interface CurrentUser {
  id: number;
  email: string;
  username: string;
  avatar: string;
  userid: number
}

const allPeoples: ActiveChat[] = 
[
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
      { id: 2, sender: 'You', type: 'message', avatar: '/avatar.svg', text: 'Hi! Which deliverable are you look for?', sentByCurrentUser: true }
    ],
    type: 'client',
    status: 'Enquiring',
  }
];

const ChatPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<ActiveChat>(allPeoples[0]);
  const [peoples, setPeoples] = useState<People[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>()
  const [recipient, setRecipient] = useState<any>(null);
  const [messages, setMessages] = useState([]);

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
    const userData = localStorage.getItem('userInfo')
    if(userData){
      const parsed = JSON.parse(userData)
      setCurrentUser(parsed)
    }
  }, [])

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
                      style={{ marginRight: '-1px' }}
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
              </div>
            </form>
            {peoples.filter(people => people.id !== currentUser?.id)
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

        <div
            className="resizer bg-gray-500"
            style={{ width: '5px', cursor: 'col-resize' }}
            onMouseDown={handleMouseDown}
        ></div>
        <ChatConversation activeChat={activeChat} recipientUser={activeChat} />
    </div>
  );
};

export default ChatPage;













