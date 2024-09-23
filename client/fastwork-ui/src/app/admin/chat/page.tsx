'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/admin/chat/AdminChatList";
import { ChatRoom, Message } from "@/types/chat";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import { supabase } from "@/config/supabaseClient";
import ChatRoomComponent from "@/components/admin/chat/AdminChatRoom";
import { notify } from "@/store/reducers/uiReducer";

const AdminChatPage = () => {
    const { 
        activeChatRoom,
        chatRooms,
        showChatList, 
        setShowChatList,
        setShowProgressList,
        setChatRooms,
        addMessage, 
        loadChatRoomData,
        insertOrUpdateLocalChatRoom,
    } = useChat();
    const dispatch = useDispatch();
    const { isMobile, screenSize } = useSelector((state: RootState) => state.ui);
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [isLoadingChatRooms, setIsLoadingChatRooms] = useState(false);

    //methods
        //fetch chatrooms from server and create new room if requested chat room is not existed
        const fetchChatRooms = async () => {
            setIsLoadingChatRooms(true);
            if(authUser){
                const { data: chatRooms, error } = await supabase
                    .from('chat_rooms')
                    .select(`*, messages (*)`)
                    .or(`freelancer_id.eq.${1},employer_id.eq.${1}`) // admin profile id is alwarys 1 
                    .order('id', { ascending: false });
            
                if (error) {
                    console.log('Supabase fetching error', error);
                    return;
                }

                const chatRoomsWithData = await loadChatRoomData(chatRooms);
                setChatRooms(chatRoomsWithData);

                setIsLoadingChatRooms(false);
            }
        };

        const handleOnGetNewMessage = async (roomId: number, newMessage: Message) => {
            addMessage(roomId, newMessage);

            //notify only incoming text messages
            if(newMessage.media_type === 'text' && newMessage.sender_id != authUser?.profile.id){
                dispatch(notify({
                    title: activeChatRoom?.sender.firstName ?? 'New Message', 
                    content: newMessage.content.toString(),
                    status: 'chat',
                    timeout: 3000
                }));
            }
        }

        const handleOnChatRoomChange = async (chatRoom: ChatRoom) => {
            try{
                const chatRoomsWithData = await loadChatRoomData([chatRoom]);
                insertOrUpdateLocalChatRoom(chatRoomsWithData[0]);
            } catch (error) {
                console.log('error', error);
            }
        }

    //onMounted
        useEffect( () => {
            if(authUser){
                //get all chat room on initial fetch
                fetchChatRooms();
            }
        }, [authUser]);

    //on receive new message
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
                        // filter: `room_id=in.(${roomIds.join(',')})`, //TODO: Listen messages from auth user related chatrooms only
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

    //drawers watcher
        useEffect( () => {
            setShowChatList(!['sm', 'md'].includes(screenSize));
            setShowProgressList(!['sm', 'md', 'lg'].includes(screenSize));
        }, [screenSize, isMobile]);

    return (
        <div
            className="flex-1 select-none flex flex-row relative overflow-hidden"
            style={{
                height: "91vh",
            }}
        >
            <SideDrawer
                show={showChatList} 
                onClose={() => setShowChatList(false)}
                width={300}
                animate={true}
                zStack={9}
                type={isMobile ? 'front' : 'slide'}
            >
                <ChatList isLoading={isLoadingChatRooms}/>
            </SideDrawer>
            <ChatRoomComponent />
        </div>
    );
};

const AdminChatPageWithProvider = () => (
    <Suspense>
        <ChatProvider>
            <AdminChatPage/>
        </ChatProvider>
    </Suspense>
);

export default AdminChatPageWithProvider;
