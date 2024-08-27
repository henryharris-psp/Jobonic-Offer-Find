'use client'
import React, { useCallback, useEffect, useState } from "react";
import ChatConversation from "@/components/chat/ChatConversation";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/chat/ChatList";
import ProgressList from "@/components/chat/ProgressList";
import { ChatRoom, Message } from "@/types/chat";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import { supabase } from "@/config/supabaseClient";
import { useSearchParams } from "next/navigation";
import { getProfileByProfileId } from "@/functions/helperFunctions";
import { Profile } from "@/types/users";
import httpClient from "@/client/httpClient";
import { v4 as uuid } from "uuid";

const ChatPage = () => {
    //catch url params
    const params = useSearchParams();
    const serviceParam = params.get('service');
    
    const { chatRooms, setChatRooms, addMessage, addNewChatRoomInLocal, changeChatRoom } = useChat();
    const { isMobile, screenSize } = useSelector((state: RootState) => state.ui);
    const { authUser } = useSelector((state: RootState) => state.auth );
    const { 
        showChatList, 
        showProgressList,
        setShowChatList,
        setShowProgressList
    } = useChat();

    //methods
        const loadChatRoomData = async (chatRooms: ChatRoom[]) => {
            return Promise.all(chatRooms.map(async (chatRoom: ChatRoom) => { 
                const receiverId = chatRoom.freelancer_id === authUser?.profile.id ? chatRoom.employer_id : chatRoom.freelancer_id;
                const receiver: Profile = await getProfileByProfileId(receiverId);
                const serviceRes = await httpClient.get('service/get', {
                    params: {
                        serviceId: chatRoom.service_id
                    }
                });
                const service = serviceRes.data;
                return {
                    ...chatRoom,
                    sender: authUser?.profile!,
                    receiver: receiver,
                    service: service
                };
            }));       
        }
    
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

                if(serviceParam){
                    const service = JSON.parse(serviceParam);
                    const existedChatRoom = chatRoomsWithUserData.find( e => e.service_id === service.id );

                    if(existedChatRoom){
                        changeChatRoom(existedChatRoom);
                    } else {
                        const newChatRoom: ChatRoom = {
                            id: uuid(),
                            freelancer_id: service.type === 'request' ? service.profileDTO.id : authUser.profile.id,
                            employer_id: service.type === 'request' ? authUser?.profile.id : service.profileDTO.id,
                            service_id: service.id,
                            sender: authUser.profile,
                            receiver: service.profileDTO,
                            service: service,
                            status: 'enquiring' as 'enquiring', 
                            messages: [],
                            created_at: 'fdf',
                            isNew: true
                        }
                        
                        addNewChatRoomInLocal(newChatRoom);
                        changeChatRoom(newChatRoom);       
                    }
                }
            }
        };

        const handleOnGetNewMessage = (roomId: number, newMessage: Message) => {
            addMessage(roomId, newMessage);
        }

    //onMounted
        useEffect( () => {
            if(authUser){
                fetchChatRooms();
            }
        }, [authUser]);

    //listen to new message
        useEffect(() => {
            if(authUser && chatRooms.length !== 0){
                const roomIds = chatRooms.map( e => e.id );
                const subscription = supabase
                    .channel("public:chat_rooms")
                    .on(
                        "postgres_changes",
                        {
                            event: "INSERT",
                            schema: "public",
                            table: "messages",
                            // filter: `room_id=in.(${roomIds.join(',')})`
                        },
                        (payload: { new: Message }) => {
                            handleOnGetNewMessage(payload.new.room_id, payload.new);
                        }
                    )
                    .subscribe();

                return () => {
                    supabase.removeChannel(subscription);
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

                    <ChatConversation />

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
