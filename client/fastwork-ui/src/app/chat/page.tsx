'use client'
import React, { Suspense, useCallback, useEffect, useState } from "react";
import SideDrawer from "@/components/SideDrawer";
import ChatList from "@/components/chat/ChatList";
import { ChatRoom, Message } from "@/types/chat";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { ChatProvider, useChat } from "@/contexts/chat";
import { supabase } from "@/config/supabaseClient";
import { useSearchParams } from "next/navigation";
import ChatRoomComponent from "@/components/chat/ChatRoom";
import httpClient from "@/client/httpClient";
import NewProgressList from "@/components/chat/NewProgressList";
import { notify } from "@/store/reducers/uiReducer";

const ChatPage = () => {
    //catch url params
    const params = useSearchParams();
    const serviceParam = params.get('service');
    
    const { 
        activeChatRoom,
        chatRooms,
        showChatList, 
        showProgressList, 
        setShowChatList,
        setShowProgressList,
        setChatRooms,
        addMessage, 
        createNewChatRoom, 
        changeChatRoom, 
        loadChatRoomData,
        insertOrUpdateLocalChatRoom,
    } = useChat();
    const dispatch: AppDispatch = useDispatch();
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
                    .or(`freelancer_id.eq.${authUser?.profile.id},employer_id.eq.${authUser?.profile.id}`) // get all chatroom for auth user
                    .order('id', { ascending: false });
            
                if (error) {
                    console.log('Supabase fetching error', error);
                    return;
                }

                const chatRoomsWithData = await loadChatRoomData(chatRooms);
                setChatRooms(chatRoomsWithData);
                
                //new chatroom creation
                if(serviceParam){
                    const service = JSON.parse(serviceParam);
                    const existedChatRoom = chatRoomsWithData.find( e => e.service_id === service.id );

                    if(existedChatRoom){
                        changeChatRoom(existedChatRoom);
                    } else {
                        //if authUser click on service request, authUser will become freelancer.
                        const freelancerId = service.type === 'request' ? authUser?.profile.id : service.profileDTO.id;
                        const employerId = service.type === 'request' ? service.profileDTO.id : authUser?.profile.id;

                        const serviceId = service.id;

                        //create match on main db
                        const matchRes = await httpClient.post('matches', {
                            serviceId: serviceId,
                            profileId: freelancerId,
                            employeeId: employerId,
                            status: "ENQUIRING",

                            //not_required
                            deliverable: "not_required",
                            paymentTotal: 0,
                            paymentMode: "MILESTONE",
                            numberOfCheckPoint: 0
                        });
                        const { id: matchId } = matchRes.data;

                        const newChatRoom = await createNewChatRoom(serviceId, matchId, freelancerId, employerId);
                        changeChatRoom(newChatRoom);
                    }
                }

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
                    timeout: 4000
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
                        <ChatList isLoading={isLoadingChatRooms}/>
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
                        width={320}
                        show={showProgressList} 
                        onClose={() => setShowProgressList(false)}
                        animate
                        position="right"
                        zStack={9}
                        type={ isMobile || screenSize === 'lg' ? 'front' : 'slide'}
                    >
                        {/* <ProgressList/> */}
                        <NewProgressList/>
                    </SideDrawer>
                </>  
            )}
        </div>
    );
};

const ChatPageWithProvider = () => (
    <Suspense>
        <ChatProvider>
            <ChatPage/>
        </ChatProvider>
    </Suspense>
);

export default ChatPageWithProvider;
