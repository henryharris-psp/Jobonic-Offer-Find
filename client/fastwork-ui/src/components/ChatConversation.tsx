'use client';

import React, { useState, useRef, useEffect } from 'react';
import ChatMessageBig from '@/components/ChatMessageBig';
import DealCard from '@/components/DealCard';
import ServiceRequestCard from './ServiceRequestCard';
import ServiceMatchCard from "@/components/ServiceMatchCard";

import { CurrentUser } from '@/app/chat/page';
import { supabase } from '@/app/config/supabaseClient';
import ContractCard from './ContractCard';

interface ServiceRequest {
  title: string;
  work_category: string;
  company: string;
  location: string;
  employment_type: string;
  description_1: string;
  description_2: string;
  description_3: string;
  examples_of_work: string;
  submission_deadline: string;
  budget: string;
  language: string;
  days_left: string;
}

interface Message {
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

interface ActiveChat {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

interface RecipientUser {
  id : number,
  fullName: string,
  avatar: string
}

interface ChatConversationProps {
  activeChat: ActiveChat;
  jobData?: ServiceRequest;
  recipientUser?: RecipientUser
}

const ChatConversation: React.FC<ChatConversationProps> = ({ activeChat, jobData, recipientUser }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(activeChat.messages);
  const [currentUser, setCurrentUser] = useState<CurrentUser>()

  // const [messages, setMessages] = useState<Message[]>([
  //   ...activeChat.messages,
  //   {
  //     id: 'deal',
  //     type: 'deal',
  //     image: '/group-image.jpg',
  //     title: 'Sample Deal',
  //     rating: 4.5,
  //     description: ['This is a great deal.', "Don't miss out!"],
  //     price: '$99.99',
  //   },
  // ]);

  const sampleService =
  {
    name: 'Ella, Middle School Math tutor',
      image: '/group-image.jpg', // Replace with actual image path
      rating: 4.5,
      reviews: 20,
      price: '$15/hr',
      description: 'Taught in mainstream school for 5 years. Specializes in boosting grades of failing math students through personalized home tutoring.',
      reviewsDetail: [
    {
      reviewer: 'John',
      comment: 'Oliver provided excellent tutoring for my son, and his grades improved significantly in just a month.',
      rating: 5,
    },
    {
      reviewer: 'Timmy',
      comment: 'Oliver provided excellent tutoring for my son, and his grades improved significantly in just a month.',
      rating: 4,
    },
    // Add more reviews as needed
  ],
      numSold: 10,
      bullet1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      bullet2: 'Minimum 3 years of experience in software development.',
      bullet3: 'Proficiency in Python, R, and machine learning algorithms.',
  };

  const sampleData = {
    title: "Marketing Specialist",
    work_category: "Analytics",
    company: "Google",
    location: "New York",
    employment_type: "Part-time",
    description_1: "Collect and analyze data",
    description_2: "Generate and present reports",
    description_3: "Use statistical tools for data interpretation",
    examples_of_work: "Portfolio",
    submission_deadline: "15/8/2024",
    budget: "45000",
    language: "English",
    days_left: "50",
  };

  const deal =
      {
        id: 'deal',
        type: 'deal',
        image: '/group-image.jpg',
        title: 'Sample Deal',
        rating: 4.5,
        description: ['This is a great deal.', "Don't miss out!"],
        price: '$99.99',
      };

  const [isContractVisible, setIsContractVisible] = useState(false); // New state for modal visibility
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userInfo')
    if(userData){
      const parsed = JSON.parse(userData)
      setCurrentUser(parsed)
    }
  }, [])

  useEffect(() => {
    const fetchMessages = async () => {
      if (recipientUser && currentUser) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${currentUser.id},recipient_id.eq.${currentUser.id}`)
          .or(`sender_id.eq.${recipientUser.id},recipient_id.eq.${recipientUser.id}`)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
        } else {
          console.log('Mess', data)
          setMessages(data);
        }
      }
    };

    fetchMessages();
  }, [recipientUser, newMessage]);

  useEffect(() => {
    if (currentUser && recipientUser) {
      const messageSubscription = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
          const newMessage = payload.new;
          if ((newMessage.sender_id == currentUser.id && newMessage.recipient_id == recipientUser.id) ||
            (newMessage.sender_id == recipientUser.id && newMessage.recipient_id == currentUser.id)) {
            // setMessages(prevMessages => [...prevMessages, newMessage]);
          }
        })
        .subscribe();
      return () => {
        supabase.removeChannel(messageSubscription);
      };
    }
  }, [newMessage, messages]);

  // useEffect(() => {
  //   setMessages([
  //     ...activeChat.messages,
  //   ]);
  // }, [activeChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit =async () => {
    if (newMessage.trim() !== '' && recipientUser && currentUser) {
      console.log('recipient', recipientUser, 'user', currentUser);
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: currentUser.id,
            recipient_id: recipientUser.id,
            sender: currentUser.username,
            recipient: recipientUser.fullName,
            text: newMessage,
            avatar: currentUser.avatar || '/avatar.svg',
            sentByCurrentUser: currentUser.id === 1,
          }
        ]);
      if (error) {
        console.error('Error inserting message:', error);
      } else {
        setNewMessage('');
      }
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

  const handleViewContractDetails = () => {
    setIsContractVisible(true); // Show the modal
  };

  const handleCloseContract = () => {
    setIsContractVisible(false); // Hide the modal
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="my-4 px-4">
        <div className="flex flex-row">
          <div className="text-xl font-bold justify-self-start mr-60">{recipientUser?.fullName}</div>
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
        {/* {messages.map((message) =>
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
          ) :
          message.type === 'message' ? ( */}
          {messages.map((message) =>
            <ChatMessageBig key={message.id} message={message} currentUserId={currentUser?.id}/>

//       <div className="flex flex-col w-full h-full bg-white">
//         <div className="my-4 px-4">
//           <div className="flex flex-row">
//             <div className="text-xl font-bold justify-self-start mr-60">{activeChat.name}</div>
//             <button
//                 className="bg-[#E1824F] text-white rounded-lg text-sm p-2 mr-4"
//                 onClick={handleViewContractDetails} // Add onClick handler
//             >
//               View Contract Details
//             </button>
//             <button className="bg-[#71BAC7] text-white rounded-lg text-sm p-2 mr-4" disabled>
//               { activeChat.type === 'client' ? 'Hiring' : 'Offering'}
//             </button>
//             <button className="bg-[#71BAC7] text-white rounded-lg text-sm p-2" disabled>
//               {activeChat.status}
//             </button>
//           </div>

//           <div className="h-0.5 mt-1 bg-gray-300"></div>
//         </div>
//         <div ref={chatContainerRef} className={`overflow-y-auto p-6 bg-white flex" ${activeChat.status === 'Applied' ? 'justify-end' : 'justify-start'}`}>
//           {messages.map((message) =>
//               message.type === 'deal' ? (
//                   <DealCard
//                       key={message.id}
//                       image={message.image!}
//                       title={message.title!}
//                       rating={message.rating!}
//                       description={message.description!}
//                       price={message.price!}
//                       onAccept={() => alert('Deal Accepted')}
//                       onEditOffer={(newPrice) => alert(`Edit Offer: ${newPrice}`)}
//                       onDeclineAndSendMessage={handleDeclineAndSendMessage}
//                   />
//               ) : message.type === 'message' ? (
//                   <ChatMessageBig key={message.id} message={message} />
//               ) : message.type === 'apply' ? (
//                   <ServiceRequestCard serviceRequest={sampleData} hasProfile={true} profilePic={'/jobonic.svg'} applyDisplay={false}/>
//               ) : (
//                   <ServiceMatchCard
//                       service={sampleService}
//                       onClick={() => console.log('clicked')}
//                       onChatClick={() => console.log('clicked')}
//                   />
//               )

          )}
          {/* ) :
          message.type === 'apply' ? (
            <ServiceRequestCard serviceRequest={sampleData} hasProfile={true} profilePic={'/jobonic.svg'} applyDisplay={false}/>
          ) : (
              <ServiceMatchCard
                  service={sampleService}
                  onClick={() => console.log('clicked')}
                  onChatClick={() => console.log('clicked')}
              />
          )
        )} */}
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
                  viewBox="0 0 24 24"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
                />
              </svg>
            </label>

            <input
                type="text"
                className="flex-grow rounded-lg border text-black border-gray-300 focus:outline-none focus:border-[#0C2348] mb-2 px-2 mr-2 lg:mb-0"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="lg:w-auto px-4 py-2 bg-[#0C2348] text-white rounded-lg font-semibold hover:bg-[#D0693B] focus:outline-none" onClick={handleMessageSubmit}>
              Send
            </button>
          </div>
        </div>

        {isContractVisible && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
              <div className="relative bg-white rounded-lg p-4 w-96">
                <ContractCard />
                <button
                    className="mt-4 bg-red-500 text-white p-2 rounded"
                    onClick={handleCloseContract}
                >
                  Close
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default ChatConversation;



