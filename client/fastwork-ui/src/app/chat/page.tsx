"use client";
import { useState, useEffect } from "react";
import ChatConversation from "../../components/ChatConversation";
import { supabase } from "../config/supabaseClient";
import ProgressSidebar from "../../components/ProgressSidebar";
import ChatList from "@/components/chat/ChatList";
import {
    Bars2Icon,
    Bars3Icon,
    ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { People, ActiveChat, Message, CurrentUser } from "@/components/chat/interfaces";
import { people as allPeoples } from "@/components/chat/data/people";
import MobileSideDrawer from "@/components/MobileSideDrawer";

const ChatPage: React.FC = () => {
    const [activeChat, setActiveChat] = useState<ActiveChat>(allPeoples[0]);
    const [peoples, setPeoples] = useState<People[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(500);
    const [isResizing, setIsResizing] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const [recipient, setRecipient] = useState<any>(null);
    const [messages, setMessages] = useState([]);
    const [roleFilter, setRoleFilter] = useState("All");
    const [fromClientStatusFilter, setFromClientStatusFilter] = useState("All");
    const [fromServiceProviderStatusFilter, setFromServiceProviderStatusFilter,] = useState("All");
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State to control sidebar visibility

    const [showMobileChatList, setShowMobileChatList] = useState(false);
    const [showMobileProgressList, setShowMobileProgressList] = useState(false);

    const filteredPeoples =
        roleFilter === "All"
            ? allPeoples
            : allPeoples.filter((people) =>
                  roleFilter === "From clients"
                      ? people.type === "client"
                      : people.type === "service_provider"
              );

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
        const userData = localStorage.getItem("userInfo");
        if (userData) {
            const parsed = JSON.parse(userData);
            setCurrentUser(parsed);
        }
    }, []);

    useEffect(() => {
        const getPeoples = async () => {
            const { data, error } = await supabase.from("user").select("*");

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setPeoples(data);
            }
        };
        getPeoples();
    }, []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div className="flex h-screen w-screen relative">
            <div
                className="hidden sm:flex"
                style={{
                    width: sidebarWidth,
                }}
            >
                <ChatList 
                    onActiveChatChange={setActiveChat}
                />
            </div>
            
            <MobileSideDrawer
                show={showMobileChatList}
                onClose={() => setShowMobileChatList(false)}
            >
                <ChatList 
                    onActiveChatChange={setActiveChat}
                />
            </MobileSideDrawer>
            

            <div
                className="resizer bg-gray-500 hidden sm:flex"
                style={{ width: "5px", cursor: "col-resize" }}
                onMouseDown={handleMouseDown}
            />

            {/* Main Chat Area */}
            <div className="flex flex-col bg-red-500">
                {/* mobile toggle header */}
                <div className="flex sm:hidden justify-between items-center px-3 bg-white border-b border-b-gray-200 h-16">
                    <button
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300"
                        onClick={() => setShowMobileChatList( prev => !prev )}
                    >
                        <ChatBubbleBottomCenterTextIcon className="size-6 font-bold text-[#0B2147]" />
                    </button>
                    <button 
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300"
                        onClick={() => setShowMobileProgressList( prev => !prev )}
                    >
                        <Bars3Icon className="size-6 font-bold text-[#0B2147]" />
                    </button>
                </div>
                <ChatConversation
                    activeChat={activeChat}
                    recipientUser={activeChat}
                />
            </div>

            {/* Progress Sidebar */}
            {isSidebarVisible && (
                <div className="hidden sm:flex">
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
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 5l-7 7 7 7"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ChatPage;
