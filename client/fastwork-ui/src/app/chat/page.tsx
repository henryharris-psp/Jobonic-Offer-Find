'use client'
import ChatConversation from "@/components/chat/ChatConversation";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/chat/ChatList";
import { people } from "@/data/chat";
import { People } from "@/types/chat";
import { RootState } from "@/store";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import ProgressList from "@/components/chat/ProgressList";

const ChatPage = () => {
    const { isMobile, screenSize } = useSelector((state: RootState) => state.ui);
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { 
        showChatList, 
        setShowChatList,
        showProgressList,
        setShowProgressList
    } = useChat();

    const [activeChat, setActiveChat] = useState<People>(people[0]);

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

    //drawers watcher
    useEffect( () => {
        setShowChatList(!isMobile);
        setShowProgressList(!isMobile && screenSize !== 'lg');
    }, [screenSize, isMobile]);

    return (
        <div
            className="select-none flex flex-row relative overflow-hidden"
            style={{
                height: "91vh",
            }}
        >
            { !authUser ? (
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
                        zStack={9}
                        type={ isMobile ? 'front' : 'slide'}
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
                        zStack={9}
                        type={ isMobile || screenSize === 'lg' ? 'front' : 'slide'}
                    >
                        <ProgressList/>
                    </SideDrawer>
                </>  
            )}
        </div>
    );
};

const ChatPageWithProvider = () => (
    <ChatProvider>
        <ChatPage/>
    </ChatProvider>
);

export default ChatPageWithProvider;
