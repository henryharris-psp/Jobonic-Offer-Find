import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { ChatRoom, MediaType, Message } from "@/types/chat";
import { supabase } from "@/config/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchContract, getProfileByProfileId } from "@/functions/helperFunctions";
import { Profile } from "@/types/users";
import httpClient from "@/client/httpClient";
import { Contract } from "@/types/general";
import reducer from "./reducer";

export interface ChatState {
    showChatList: boolean;
    showProgressList: boolean;
    chatRooms: ChatRoom[];
    activeChatRoom: ChatRoom | null,
    isSending: boolean
}

const initialState: ChatState = {
    showChatList: false,
    showProgressList: false,
    chatRooms: [],
    activeChatRoom: null,
    isSending: false
};

interface ChatContextProps extends ChatState {
    //local actions
    setShowChatList: (show: boolean) => void;
    setShowProgressList: (show: boolean) => void;
    setChatRooms: (chatRooms: ChatRoom[]) => void;
    changeChatRoom: (chatRoom: ChatRoom ) => void;
    addMessage: (chatRoomId: number, newMessage: Message) => void;
    insertOrUpdateLocalChatRoom: ( newChatRoom: ChatRoom ) => void; 

    //server actions
    loadChatRoomData: (chatRooms: ChatRoom[]) => Promise<ChatRoom[]>;
    createNewChatRoom: (serviceId: string | number, matchId: string | number, freelancerId: number, employerId: number) => Promise<ChatRoom>;
    updateChatRoom: (chatRoomId: string | number, newValues: object) => Promise<void>;
    deleteChatRoom: (chatRoomId: string | number) => Promise<void>;
    sendMessage: (mediaType: MediaType, newMessage: string | null | undefined, senderId?: string | number ) => Promise<Message | null>;
    sendSignal: () => void;

    latestContract: Contract | null;
    authUserType: 'freelancer' | 'employer';
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [latestContract, setLatestContract] = useState<Contract | null>(null);

    //methods
        //fetch from jobonic db
            const fetchLatestContract = useCallback( async (contractId: string | null, signal: AbortSignal) => {
                if (!contractId) {
                    setLatestContract(null);
                    return;
                }
            
                try {
                    const contract = await fetchContract(contractId, signal);   
                    if (contract) {
                        const latestPayoutNegotiation = contract.payoutNegotiations.length !== 0 ? contract.payoutNegotiations[0] : null;
                        setLatestContract({
                            ...contract,
                            latestPayoutNegotiation
                        });
                    }
                } catch (error) {
                    console.error('Error fetching latest contract:', error);
                }
            }, []);

            //TODO: add promise rejection handler
            const loadChatRoomData = async (chatRooms: ChatRoom[]) => {
                return Promise.all(chatRooms.map(async (chatRoom: ChatRoom) => { 
                    const receiverId = chatRoom.freelancer_id === authUser?.profile.id ? chatRoom.employer_id : chatRoom.freelancer_id;
                    const receiver: Profile = await getProfileByProfileId(receiverId);
                    
                    //fetching service
                    let service = null;
                    let serviceRes = null;
                    if(chatRoom.service_id){
                        try {
                            serviceRes = await httpClient.get('/service/get', {
                                params: {
                                    serviceId: chatRoom.service_id
                                }
                            });
                        } catch (error) {
                            serviceRes = await httpClient.get('/service/request/get', {
                                params: {
                                    serviceRequestId: chatRoom.service_id
                                }
                            })
                        }
                        
                        service = serviceRes.data;
                    }

                    //fetching match
                    let match = null;
                    if(chatRoom.match_id){
                        const matchRes = await httpClient.get('matches', {
                            params: {
                                id: chatRoom.match_id
                            }
                        });

                        match = matchRes.data;
                    }
                    
                    return {
                        ...chatRoom,
                        sender: authUser?.profile!,
                        receiver: receiver,
                        service: service,
                        match: match
                    };
                }));       
            }

        //local actions
            //to toggle side drawers
            const setShowChatList = (show: boolean) => {
                dispatch({ type: 'TOGGLE_CHAT_LIST', payload: show });
            };

            const setShowProgressList = (show: boolean) => {
                dispatch({ type: 'TOGGLE_PROGRESS_LIST', payload: show });
            };

            //to replace all local chatrooms and also update activeChatroom
            const setChatRooms = (chatRooms: ChatRoom[]) => {
                dispatch({ type: 'SET_CHAT_ROOMS', payload: chatRooms });
                const newActiveChatRoom = chatRooms.find( e => e.id === state.activeChatRoom?.id );
                if(newActiveChatRoom){
                    dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: newActiveChatRoom });
                }
            }
            
            //to switch active chat room
            const changeChatRoom = async (chatRoom: ChatRoom) => {                
                dispatch({
                    type: 'SET_ACTIVE_CHAT_ROOM',
                    payload: chatRoom
                });
            };            
            
            //to append new message in local chatroom
            const addMessage = async (chatRoomId: number, newMessage: Message) => {            
                const targetChatRoom = state.chatRooms.find(chatRoom => chatRoom.id === chatRoomId);
            
                if (targetChatRoom) {
                    const updatedChatRoom = {
                        ...targetChatRoom,
                        messages: [...targetChatRoom.messages, newMessage],
                    };
            
                    const newChatRooms = state.chatRooms.map(chatRoom =>
                        chatRoom.id === chatRoomId ? updatedChatRoom : chatRoom
                    );
2            
                    // Update local state with newly new messsage
                    dispatch({ type: 'SET_CHAT_ROOMS', payload: newChatRooms });
                    dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: updatedChatRoom });
                }
                return Promise.resolve();
            };

            const insertOrUpdateLocalChatRoom = async (newChatRoom: ChatRoom) => {
                const updatedChatRoomsWithData = await loadChatRoomData([newChatRoom]);
                const updatedChatRoomWithData = updatedChatRoomsWithData[0];
                const chatRoomExists = state.chatRooms.some(oldChatRoom => oldChatRoom.id === updatedChatRoomWithData.id);

                const newChatRooms = chatRoomExists
                    ? state.chatRooms.map(oldChatRoom =>
                        oldChatRoom.id === updatedChatRoomWithData.id ? updatedChatRoomWithData : oldChatRoom
                        )
                    : [...state.chatRooms, updatedChatRoomWithData];
        
                // Update local state with newly new messsage
                dispatch({ type: 'SET_CHAT_ROOMS', payload: newChatRooms });
                dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: updatedChatRoomWithData });
            }

        //supabase db actions
            const createNewChatRoom = async (
                serviceId: string | number, 
                matchId: string | number, 
                freelancerId: number, 
                employerId: number
            ) => {
                const { data, error } = await supabase
                    .from("chat_rooms")
                    .insert([{
                        service_id: serviceId,
                        match_id: matchId,
                        employer_id: employerId,
                        freelancer_id: freelancerId,
                        status: "enquiring"
                    }])
                    .select(`*, messages (*)`)
            
                if (error) {
                    throw new Error('Error creating new chat room');
                }

                const newChatRoom = data[0];
                const newChatRoomsWithData = await loadChatRoomData([newChatRoom]);
                const newChatRoomWithData = newChatRoomsWithData[0];

                //also add in local state
                dispatch({ type: 'ADD_NEW_CHAT_ROOM', payload: newChatRoomWithData });
                return Promise.resolve(newChatRoomWithData);
            }

            const updateChatRoom = async (chatRoomId: string | number, newValues: object) => {
                const { data, error } = await supabase
                    .from("chat_rooms")
                    .update(newValues)
                    .eq("id", chatRoomId)
                    .select(`*, messages (*)`)

                if (error) {
                    console.error('Error updating chatroom', error);
                    throw error;
                }

                const updatedChatRoom = data[0];
                const updatedChatRoomsWithData = await loadChatRoomData([updatedChatRoom]);
                const updatedChatRoomWithData = updatedChatRoomsWithData[0];
                
                const newChatRooms = state.chatRooms.map(chatRoom => 
                    chatRoomId === chatRoom.id ? updatedChatRoomWithData : chatRoom
                );
        
                // Update local state with newly updated chatroom
                dispatch({ type: 'SET_CHAT_ROOMS', payload: newChatRooms });
                dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: updatedChatRoomWithData });
                return Promise.resolve();
            }

            const deleteChatRoom = async (chatRoomId: string | number) => {
                const { error } = await supabase
                    .from('chat_rooms')
                    .delete()
                    .eq('id', chatRoomId);

                if (error) {
                    console.error('Error updating chatroom', error);
                    throw error;
                } else {
                    const newChatRooms = state.chatRooms.filter( e => e.id !== chatRoomId );
                    dispatch({ type: 'SET_CHAT_ROOMS', payload: newChatRooms });
                    dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: null });
                    return Promise.resolve();
                }
            }
        
            const sendMessage = async (
                mediaType: MediaType, 
                content: string | null | undefined, 
                senderId?: string | number 
            ): Promise<Message | null> => {
                const { activeChatRoom } = state;
            
                if (!authUser?.profile?.id || !activeChatRoom?.id || !content) return null;
            
                dispatch({ type: 'SET_IS_SENDING', payload: true });
            
                try {
                    const { data, error } = await supabase
                        .from("messages")
                        .insert({
                            room_id: activeChatRoom.id,
                            media_type: mediaType,
                            content,
                            sender_id: senderId ?? authUser.profile.id,
                        })
                        .select();
            
                    if (error) {
                        console.error('Error sending new message:', error);
                        throw new Error(`Error inserting message: ${error.message}`);
                    }
            
                    return data ? data[0] : null;
                } catch (error) {
                    console.error('Error sending new message:', error);
                    throw error;
                } finally {
                    dispatch({ type: 'SET_IS_SENDING', payload: false });
                }
            };

            const sendSignal = async () => {
                const { activeChatRoom } = state;
            
                if (!authUser?.profile?.id || !activeChatRoom?.id) return null;
                        
                try {
                    const { error } = await supabase
                        .from("messages")
                        .insert({
                            room_id: activeChatRoom.id,
                            media_type: 'signal',
                            content: '',
                            sender_id: authUser.profile.id,
                        });

                    if (error) {
                        console.error('Error sending signal:', error);
                        throw new Error(`Error sending signal: ${error.message}`);
                    }
                } catch (error) {
                    console.error('Error sending signal:', error);
                }
            };

    //watcher and computed
        //this effect runs on every new message
        useEffect(() => {
            const controller = new AbortController();
            const { signal } = controller;
        
            const { activeChatRoom } = state;
            const messages = activeChatRoom?.messages || [];
        
            if (!activeChatRoom || messages.length === 0) {
                setLatestContract(null);
                return;
            }
        
            const sortedMessages = [...messages].sort((a, b) => b.id - a.id);// [...messages] used with spread params not to effect messages directly
            const latestContractMessage = sortedMessages.find((message) => message.media_type === 'contract');
            const latestContractId = latestContractMessage?.content || null;
        
            if (latestContractId) {
                fetchLatestContract(latestContractId, signal);
            } else {
                setLatestContract(null);
            }
        
            return () => controller.abort();
        }, [state.activeChatRoom?.messages, fetchLatestContract]);
    
        const authUserType = useMemo( () => {
            return state.activeChatRoom?.freelancer_id === authUser?.profile.id ? 'freelancer' : 'employer';
        }, [state.activeChatRoom]);
        
    return (
        <ChatContext.Provider
            value={{
                ...state,
                setShowChatList,
                setShowProgressList,
                setChatRooms,
                changeChatRoom,
                addMessage,
                insertOrUpdateLocalChatRoom,

                //server actions
                loadChatRoomData,
                createNewChatRoom,
                updateChatRoom,
                deleteChatRoom,
                sendMessage,
                sendSignal,

                //extended or calculated props
                latestContract,
                authUserType
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChat = (): ChatContextProps => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};

export {
    ChatProvider,
    useChat
};