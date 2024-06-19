// ChatPage component

"use client";
import { useState, useEffect } from "react";
import ChatConversation from "../../components/ChatConversation"; // Import the new ChatConversation component

const ChatPage = () => {
  const allPeoples = [
    {
      id: 1,
      name: "John Chamlington",
      avatar: "/avatar.svg",
      messages: [
        { id: 1, sender: "John", avatar: "/avatar.svg", text: "Hey there!", sentByCurrentUser: false },
        { id: 2, sender: "You", avatar: "/avatar.svg", text: "Hello!", sentByCurrentUser: true }
      ],
      type: "client"
    },
    {
      id: 2,
      name: "Alice Brown",
      avatar: "/avatar.svg",
      messages: [
        { id: 1, sender: "Alice", avatar: "/avatar.svg", text: "Hi, how are you?", sentByCurrentUser: false },
        { id: 2, sender: "You", avatar: "/avatar.svg", text: "I'm good, thanks!", sentByCurrentUser: true }
      ],
      type: "service_provider"
    },
    {
      id: 3,
      name: "Bob Smith",
      avatar: "/avatar.svg",
      messages: [
        { id: 1, sender: "Bob", avatar: "/avatar.svg", text: "Hello!", sentByCurrentUser: false },
        { id: 2, sender: "You", avatar: "/avatar.svg", text: "Hi Bob!", sentByCurrentUser: true }
      ],
      type: "client"
    },
  ];

  const [activeChat, setActiveChat] = useState(allPeoples[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredPeoples = selectedFilter === "All" 
    ? allPeoples 
    : allPeoples.filter(people => 
        selectedFilter === "From clients" 
        ? people.type === "client"
        : people.type === "service_provider"
    );

  const messagetypes = [
    "All",
    "Waiting for payment",
    "Waiting for inspection",
    "Waiting for confirmation",
    "Waiting for review",
    "I want to cancel.",
    "Cancelled",
    "Old order",
    "Suspended",
    "Completed"
  ];

  const chatFilters = [
    "All",
    "From clients",
    "From service providers"
  ];

  const handleMouseDown = (e) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      setSidebarWidth(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      {/*Navbar should show only logo.*/}
      <div
        className="flex flex-grow"
        style={{
          background:
            "linear-gradient( 89.5deg, rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )",
        }}
      >
        <div
          className="bg-[#CFEDF4]"
          style={{ width: sidebarWidth, minWidth: "150px" }}
        >
          <div className="px-4 pt-2">
            <div className="text-lg font-semibold mb-4 text-center">
              Chats
              <div className="w-full h-0.5 mt-3 bg-gray-300"></div>
            </div>
            
            {/* New Toggle */}
            <div className="flex justify-center mb-4">
              {chatFilters.map(filter => (
                <button 
                  key={filter} 
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 text-xs font-medium ${selectedFilter === filter ? 'bg-[#0B2147] text-white' : 'bg-gray-200 text-gray-600'}`}
                  style={{ borderRadius: '4px 4px 0 0', marginRight: '-1px' }}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <form className="max-w-lg mx-auto">
              <div className="flex flex-col pb-4 space-y-0">
                <select
                  id="type"
                  className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-t-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                  required
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {messagetypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-t-0 border-gray-300 rounded-b-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for Orders."
                    style={{ paddingRight: "2.5rem" }} // Ensure space for the button
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full bg-gray-50 text-[#828282] border-l border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-br-lg"
                    style={{ borderLeft: 'none' }} // Match the border styles
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
            {filteredPeoples.map((people) => (
              <div
                className="flex p-2 hover:bg-blue-300 rounded-md justify-between"
                key={people.id}
                onClick={() => setActiveChat(people)}
              >
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={people.avatar}
                    alt={people.name}
                  />
                  <div className="text-black mt-2 flex items-center">
                    {people.name}
                  </div>
                </div>
                <div className="flex items-center">
                  {sidebarWidth > 200 && (
                    <div className="bg-[#0B2147] text-center text-white px-2 py-1 text-xs rounded-md">
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="resizer bg-gray-500"
          style={{ width: "5px", cursor: "col-resize" }}
          onMouseDown={handleMouseDown}
        ></div>

        <ChatConversation activeChat={activeChat} />
      </div>
    </div>
  );
};

export default ChatPage;













