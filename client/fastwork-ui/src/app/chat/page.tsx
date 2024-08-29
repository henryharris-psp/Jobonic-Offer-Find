'use client'
import React, { useCallback, useEffect, useState } from "react";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/chat/ChatList";
import ProgressList from "@/components/chat/ProgressList";
import { ChatRoom, Message } from "@/types/chat";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import { supabase } from "@/config/supabaseClient";
import { useSearchParams } from "next/navigation";
import ChatRoomComponent from "@/components/chat/ChatRoom";

const ChatPage = () => {
    //catch url params
    const params = useSearchParams();
    const serviceParam = params.get('service');
    
    const { 
        chatRooms, 
        setChatRooms, 
        addMessage, 
        createNewChatRoom, 
        changeChatRoom, 
        loadChatRoomData,
        updateLocalChatRoom
    } = useChat();
    const { isMobile, screenSize } = useSelector((state: RootState) => state.ui);
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { 
        showChatList, 
        showProgressList,
        setShowChatList,
        setShowProgressList
    } = useChat();

    //methods
        //fetch chatrooms from server and create new room if requested chat room is not existed
        const fetchChatRooms = async () => {
            if(authUser){
                const { data: chatRooms, error } = await supabase
                    .from('chat_rooms')
                    .select(`*, messages (*)`)
                    .or(`freelancer_id.eq.${authUser?.profile.id},employer_id.eq.${authUser?.profile.id}`) // get all chatroom for auth user
                    .order('id', { ascending: false });
            
                if (error) {
                    console.log('Supabase fetching error', error);
                    return;
                }

                const chatRoomsWithUserData = await loadChatRoomData(chatRooms);
                setChatRooms(chatRoomsWithUserData);

                //new chatroom creation 
                if(serviceParam){
                    const service = JSON.parse(serviceParam);
                    const existedChatRoom = chatRoomsWithUserData.find( e => e.service_id === service.id );

                    if(existedChatRoom){
                        changeChatRoom(existedChatRoom);
                    } else {
                        //if authUser click on service request, authUser will become freelancer.
                        const freelancerId = service.type === 'request' ? authUser?.profile.id : service.profileDTO.id;
                        const employerId = service.type === 'request' ? service.profileDTO.id : authUser.profile.id;
                        const serviceId = service.id;

                        const newChatRoom = await createNewChatRoom(serviceId, freelancerId, employerId);
                        changeChatRoom(newChatRoom);       
                    }
                }
            }
        };

        const handleOnGetNewMessage = (roomId: number, newMessage: Message) => {
            addMessage(roomId, newMessage);
        }

        const handleOnChatRoomChange = async (chatRoom: ChatRoom) => {
            try{
                const chatRoomsWithUserData = await loadChatRoomData([chatRoom]);
                updateLocalChatRoom(chatRoomsWithUserData[0]);
            } catch {
                console.log('error')
            }
        }

    //onMounted
        useEffect( () => {
            if(authUser){
                //get all chat room on initial fetch
                fetchChatRooms();
            }
        }, [authUser]);

    //listen to new message
    useEffect(() => {
        if (authUser && chatRooms.length !== 0) {
            const roomIds = chatRooms.map(e => e.id);
    
            // Subscription for messages
            const messageSubscription = supabase
                .channel("public:messages")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "messages",
                        filter: `room_id=in.(${roomIds.join(',')})`, // Listen to only related chat rooms
                    },
                    (payload: { new: Message }) => {
                        handleOnGetNewMessage(payload.new.room_id, payload.new);
                    }
                )
                .subscribe();
    
            // Subscription for chat_rooms
            const chatRoomSubscription = supabase
                .channel("public:chat_rooms")
                .on(
                    "postgres_changes",
                    {
                        event: "UPDATE",
                        schema: "public",
                        table: "chat_rooms",
                    },
                    async (payload: { new: ChatRoom }) => {
                        const updatedChatRoom = payload.new;
                        
                        // Fetch related messages
                        const { data: messages, error } = await supabase
                            .from("messages")
                            .select("*")
                            .eq("room_id", updatedChatRoom.id);
                        
                        if (error) {
                            console.error("Error fetching related messages:", error);
                        } else {
                            updatedChatRoom.messages = messages;
                            handleOnChatRoomChange(updatedChatRoom);
                        }
                    }
                )
                .subscribe();
    
            return () => {
                supabase.removeChannel(messageSubscription);
                supabase.removeChannel(chatRoomSubscription);
            };
        }
    }, [authUser, chatRooms]);
    

    //chatlist section width resize handler
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
            setShowChatList(!['sm', 'md'].includes(screenSize));
            setShowProgressList(!['sm', 'md', 'lg'].includes(screenSize));
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
                        type={isMobile ? 'front' : 'slide'}
                    >
                        <ChatList />
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

                    <ChatRoomComponent />

                    <SideDrawer
                        show={showProgressList} 
                        onClose={() => setShowProgressList(false)}
                        animate
                        position="right"
                        zStack={9}
                        type={ isMobile || screenSize === 'lg' ? 'front' : 'slide'}
                    >
                        <ProgressList />
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
