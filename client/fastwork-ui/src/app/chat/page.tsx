'use client'
import ChatConversation from "@/components/chat/ChatConversation";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/chat/ChatList";
import { people } from "@/components/chat/data/people";
import { People } from "@/components/chat/interfaces";
import { RootState } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import httpClient from "@/client/httpClient";
import { SERVER_AUTH } from "@/baseURL";
import ProgressList from "@/components/chat/ProgressList";
import ProgressSidebar from "@/components/ProgressSidebar";

const ChatPage = () => {
    const { isMobile } = useSelector((state: RootState) => state.ui);
    const { 
        currentUser,
        setCurrentUser,
        showChatList, 
        setShowChatList,
        showProgressList,
        setShowProgressList
    } = useChat();

    //fetch authenticated user on mounted
    useEffect( () => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                const res = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`, { signal });
                setCurrentUser(res.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();

        return () => controller.abort();
    }, []);

    //chatlist section handler
        const maxChatListWidth = 500;
        const minChatListWidth = 1;

        const [chatListWidth, setChatListWidth] = useState<number>(300);
        const [isResizable, setIsResizable] = useState<boolean>(false);

        const resize = useCallback((event: MouseEvent) => {
            event.preventDefault();
            const newWidth = event.clientX;
            if (newWidth < maxChatListWidth && newWidth >= minChatListWidth) {
                setChatListWidth(newWidth);
            }
            if (newWidth >= maxChatListWidth || newWidth < minChatListWidth) {
                setIsResizable(false);
            }
        }, []);

        useEffect( () => {
            if(isResizable){
                window.addEventListener('mousemove', resize);
            } else {
                window.removeEventListener('mousemove', resize);
            }
            return () => window.removeEventListener('mousemove', resize);
        }, [isResizable]);

        useEffect( () => {
            setShowChatList(!isMobile);
            setShowProgressList(!isMobile);
        }, [isMobile]);

    const [activeChat, setActiveChat] = useState<People>(people[0]);

    return (
        <div
            className="select-none flex flex-row relative overflow-hidden"
            style={{
                height: "91vh",
            }}
        >
            { !currentUser ? (
                <div className="flex-1 flex items-center justify-center">
                    <span>Please Login first</span>
                </div>
            ) : (
                <>
                    <SideDrawer
                        show={showChatList} 
                        onClose={() => setShowChatList(false)}
                        width={chatListWidth}
                        animate={isMobile}
                    >
                        <ChatList 
                            onActiveChatChange={setActiveChat}
                        />
                    </SideDrawer>

                    {/* resizer */}
                    <div
                        className="cursor-col-resize bg-gray-500 hidden sm:flex hover:bg-gray-400"
                        style={{
                            width: '4px'
                        }}
                        onMouseDown={ () => setIsResizable(true) }
                        onMouseUp={ () => setIsResizable(false) }
                    />

                    <ChatConversation
                        activeChat={activeChat}
                    />

                    <SideDrawer
                        show={showProgressList} 
                        onClose={() => setShowProgressList(false)}
                        animate
                        position="right"
                    >
                        <ProgressSidebar/>
                    </SideDrawer>
                </>  
            )}
        </div>
    );
};

export default () => (
    <ChatProvider>
        <ChatPage/>
    </ChatProvider>
);
