'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13 and later
import ChatMessageBig from '@/components/ChatMessageBig';
import { CurrentUser } from '@/app/chat/page';
import ContractCard from './ContractCard';
import { supabase } from '@/app/config/supabaseClient';

// Message interface definition
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

// ActiveChat interface definition
interface ActiveChat {
  id: number;
  fullName: string;
  avatar: string;
  messages: Message[];
  type: 'client' | 'service_provider';
  status: string;
}

// RecipientUser interface definition
interface RecipientUser {
  id: number;
  fullName: string;
  avatar: string;
}

// ChatConversationProps interface definition
interface ChatConversationProps {
  activeChat: ActiveChat;
  recipientUser?: RecipientUser;
}

const ChatConversation: React.FC<ChatConversationProps> = ({ activeChat, recipientUser }) => {
  const [newMessage, setNewMessage] = useState(''); // State for new message input
  const [messages, setMessages] = useState<Message[]>(activeChat.messages); // State for chat messages
  const [currentUser, setCurrentUser] = useState<CurrentUser>(); // State for current user
  const [isContractVisible, setIsContractVisible] = useState(false); // State to control contract visibility
  const [isEditContractVisible, setIsEditContractVisible] = useState(false); // State to control edit contract visibility
  const [showAcceptModal, setShowAcceptModal] = useState(false); // State to control accept modal visibility
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State to control payment modal visibility
  const [newPrice, setNewPrice] = useState(''); // State for new price input
  const [deliverable, setDeliverable] = useState(''); // State for deliverable input
  const [checkpoints, setCheckpoints] = useState([
    { id: 1, deliverable: 'Initial logo concepts', payment: '$100' },
    { id: 2, deliverable: 'First draft of logo', payment: '$150' },
    { id: 3, deliverable: 'Final logo delivery', payment: '$200' }
  ]); // State for checkpoints
  const [focusStates, setFocusStates] = useState<{ [key: number]: boolean }>({}); // State for focus states
  const [file, setFile] = useState<File | null>(null); // State for file input
  const [isAccepted, setIsAccepted] = useState(false); // State to control if contract is accepted

  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const router = useRouter(); // Router instance for navigation

  // Fetch current user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const parsed = JSON.parse(userData);
      setCurrentUser(parsed);
    }
  }, []);

  // Fetch messages from Supabase on recipientUser or currentUser change
  useEffect(() => {
    const fetchMessages = async () => {
      if (recipientUser && currentUser) {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`sender_id.eq.${currentUser.userid},recipient_id.eq.${currentUser.userid}`)
            .or(`sender_id.eq.${recipientUser.id},recipient_id.eq.${recipientUser.id}`)
            .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
        } else {
          setMessages(data);
        }
      }
    };

    fetchMessages();
  }, [recipientUser, newMessage, currentUser]);

  // Subscribe to new messages from Supabase
  useEffect(() => {
    if (currentUser && recipientUser) {
      const messageSubscription = supabase
          .channel('public:messages')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
            const newMessage = payload.new;
            if ((newMessage.sender_id === currentUser.userid && newMessage.recipient_id === recipientUser.id) ||
                (newMessage.sender_id === recipientUser.id && newMessage.recipient_id === currentUser.userid)) {
              setMessages(prevMessages => [...prevMessages, newMessage]);
            }
          })
          .subscribe();
      return () => {
        supabase.removeChannel(messageSubscription);
      };
    }
  }, [newMessage, messages, currentUser, recipientUser]);

  // Scroll to bottom of chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle message submit
  const handleMessageSubmit = async () => {
    if (newMessage.trim() !== '' && recipientUser && currentUser) {
      const { error } = await supabase
          .from('messages')
          .insert([
            {
              sender_id: currentUser.userid,
              recipient_id: recipientUser.id,
              sender: currentUser.username,
              recipient: recipientUser.fullName,
              text: newMessage,
              avatar: currentUser.avatar || '/avatar.svg',
              sentByCurrentUser: currentUser.userid === 1,
            }
          ]);
      if (error) {
        console.error('Error inserting message:', error);
      } else {
        setNewMessage('');
      }
    }
  };

  // Handle decline and send message
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

  // Handle view contract details
  const handleViewContractDetails = () => {
    if (isAccepted) {
      setIsContractVisible(true);
    } else {
      setIsEditContractVisible(true);
    }
  };

  // Handle close contract
  const handleCloseContract = () => {
    setIsContractVisible(false);
  };

  // Handle close edit contract
  const handleCloseEditContract = () => {
    setIsEditContractVisible(false);
  };

  // Handle accept contract
  const handleAccept = () => {
    setIsAccepted(true);
    setShowAcceptModal(true);
  };

  // Handle close accept modal
  const handleCloseAcceptModal = () => {
    setShowAcceptModal(false);
  };

  // Handle confirm accept contract
  const handleConfirmAccept = () => {
    console.log(`Price: ${newPrice}, Deliverable: ${deliverable}`);
    console.log('Checkpoints:', checkpoints);
    setShowAcceptModal(false);
  };

  // Handle add checkpoint
  const handleAddCheckpoint = () => {
    const newId = checkpoints.length + 1;
    setCheckpoints([...checkpoints, { id: newId, deliverable: '', payment: '' }]);
    setFocusStates({ ...focusStates, [newId]: true });
  };

  // Handle delete checkpoint
  const handleDeleteCheckpoint = (index: number) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints.splice(index, 1);
    setCheckpoints(newCheckpoints);
  };

  // Handle checkpoint change
  const handleCheckpointChange = (index: number, field: string, value: string) => {
    const newCheckpoints = [...checkpoints];
    newCheckpoints[index] = { ...newCheckpoints[index], [field]: value };
    setCheckpoints(newCheckpoints);
  };

  // Handle focus state
  const handleFocus = (id: number) => {
    setFocusStates({ ...focusStates, [id]: false });
  };

  // Handle blur state
  const handleBlur = (id: number) => {
    setFocusStates({ ...focusStates, [id]: false });
  };

  // Handle pay all milestones
  const handlePayAll = () => {
    router.push('/payment');
  };

  // Handle pay selected milestones
  const handlePaySelected = () => {
    router.push('/payment');
  };

  // Handle close payment modal
  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle submit work
  const handleSubmitWork = () => {
    // Trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
      <div className="flex flex-col w-full h-full bg-white">
        <div className="my-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-4" src={recipientUser?.avatar || '/avatar.svg'} alt={recipientUser?.fullName} />
              <div>
                <div className="text-lg font-bold">{recipientUser?.fullName}</div>
                <div className="text-xs text-gray-500">Last seen yesterday, 23:88</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              is offering <span className="font-bold text-black">Plumbing</span>
            </div>
            <div className="flex items-center space-x-1">
              {!isAccepted ? (
                  <>
                    <button className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1" onClick={handleAccept}>✔️</button>
                    <button className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1" onClick={handleDeclineAndSendMessage}>❌</button>
                  </>
              ) : (
                  <>
                    <button className="flex-grow bg-[#71BAC7] text-white rounded-lg text-xs p-1">
                      Current Milestone: 1
                    </button>
                    <button className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1" onClick={handleSubmitWork}>
                      Submit Work
                    </button>
                    <button className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1" onClick={() => setShowPaymentModal(true)}>Pay</button>
                  </>
              )}
              <button className="flex-grow bg-[#E1824F] text-white rounded-lg text-xs p-1" onClick={handleViewContractDetails}>View Contract</button>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500">
            {recipientUser?.fullName} has applied for your service request: Plumbing service. Accept, reject or edit contract offer.
          </div>
          <div className="h-0.5 mt-1 bg-gray-300"></div>
        </div>
        <div ref={chatContainerRef} className="overflow-y-auto p-4 bg-white">
          {messages.map((message) => (
              <ChatMessageBig key={message.id} message={message} currentUserId={currentUser?.id} />
          ))}
        </div>

        <div className="w-full bg-white">
          <div className="flex flex-col lg:flex-row">
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            <label htmlFor="file-input" className="file-input-label">
              <svg
                  className="cursor-pointer w-6 h-8 text-gray-800 dark:text-white"
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
            <button className="lg:w-auto px-4 py-1 bg-[#0C2348] text-white rounded-lg text-xs font-semibold hover:bg-[#D0693B] focus:outline-none" onClick={handleMessageSubmit}>
              Send
            </button>
          </div>
        </div>

        {/* Edit Contract Modal */}
        {isEditContractVisible && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg w-[50rem] relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={handleCloseEditContract}
                >
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex items-center mb-4">
                  <img src={recipientUser?.avatar || '/avatar.svg'} alt="Profile Pic" className="h-12 w-12 rounded-full mr-4" />
                  <h3 className="text-lg font-semibold">{recipientUser?.fullName}</h3>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                          type="text"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          placeholder="$200"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Deliverable</label>
                      <textarea
                          value={deliverable}
                          onChange={(e) => setDeliverable(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg mt-1"
                          placeholder="3 sets of logo design"
                          rows={2}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button className="flex items-center bg-[#E1824F] text-white rounded-lg p-2 mb-2" onClick={handleAddCheckpoint}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <p className="text-sm text-gray-700">Add checkpoints</p>
                  </div>
                </div>

                {/* Checkpoints */}
                <div className="overflow-y-auto max-h-60 mb-4">
                  {checkpoints.map((checkpoint, index) => (
                      <div key={checkpoint.id} className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Checkpoint {checkpoint.id}</label>
                        </div>
                        <div className="col-span-2 flex gap-2">
                          <input
                              type="text"
                              value={checkpoint.deliverable}
                              onFocus={() => handleFocus(checkpoint.id)}
                              onBlur={() => handleBlur(checkpoint.id)}
                              onChange={(e) => handleCheckpointChange(index, 'deliverable', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg mt-1 ${focusStates[checkpoint.id] ? '' : 'border-none'}`}
                              placeholder="deliverable"
                          />
                          <input
                              type="text"
                              value={checkpoint.payment}
                              onFocus={() => handleFocus(checkpoint.id)}
                              onBlur={() => handleBlur(checkpoint.id)}
                              onChange={(e) => handleCheckpointChange(index, 'payment', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg mt-1 ${focusStates[checkpoint.id] ? '' : 'border-none'}`}
                              placeholder="Payment"
                          />
                        </div>
                        {index === checkpoints.length - 1 && (
                            <div className="flex items-end justify-center">
                              <button className="flex items-center bg-[#E1824F] text-white rounded-lg p-2 mb-2" onClick={() => handleDeleteCheckpoint(index)}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                            </div>
                        )}
                      </div>
                  ))}
                </div>

                <div className="flex justify-center mt-4">
                  <button
                      className="bg-[#E1824F] text-white rounded-lg px-4 py-2"
                      onClick={handleConfirmAccept}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Contract Modal */}
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

        {/* Payment Modal */}
        {showPaymentModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg w-[450px] relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={handleClosePaymentModal}
                >
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold mb-4">Which milestones do you want to pay first?</h2>
                  <div className="mb-4 max-h-60 overflow-y-auto">
                    {checkpoints.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="font-semibold mr-4">{`Milestone ${milestone.id}`}</span>
                            <span className="text-sm text-gray-600">{`Payment: $${milestone.payment}`}</span>
                          </div>
                          <input
                              type="checkbox"
                              id={`milestone${milestone.id}`}
                              name={`milestone${milestone.id}`}
                              className="form-checkbox h-5 w-5 text-[#E1824F]"
                          />
                        </div>
                    ))}
                  </div>
                  <div className="flex justify-around">
                    <button
                        className="px-4 py-1 bg-[#E1824F] text-white rounded-lg font-semibold hover:bg-[#D0693B]"
                        onClick={handlePayAll}
                    >
                      Pay all at once
                    </button>
                    <button
                        className="px-4 py-1 bg-[#FBE8E3] text-[#E1824F] rounded-lg font-semibold hover:bg-[#D0693B] hover:text-white"
                        onClick={handlePaySelected}
                    >
                      Pay for selected milestones
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}


      </div>
  );
};

export default ChatConversation;
