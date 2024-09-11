import React, { ReactNode, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { ChatRoom, MediaType, Message } from "@/types/chat";
import { supabase } from "@/config/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchContract, getProfileByProfileId } from "@/functions/helperFunctions";
import { Profile } from "@/types/users";
import httpClient from "@/client/httpClient";

export interface ChatState {
    showChatList: boolean;
    showProgressList: boolean;
    chatRooms: ChatRoom[];
    activeChatRoom: ChatRoom | null,
    isSending: MediaType | null
}

const initialState: ChatState = {
    showChatList: false,
    showProgressList: false,
    chatRooms: [],
    activeChatRoom: null,
    isSending: null
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
    loadChatRoomData: (chatRoom: ChatRoom[]) => Promise<ChatRoom[]>;
    createNewChatRoom: (serviceId: string, matchId: string, freelancerId: number, employerId: number) => Promise<ChatRoom>;
    updateChatRoom: (chatRoomId: string | number, newValues: object) => Promise<void>;
    deleteChatRoom: (chatRoomId: string | number) => Promise<void>;
    sendMessage: (mediaType: MediaType, newMessage: string) => Promise<Message | null>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { authUser } = useSelector((state: RootState) => state.auth ); 

    //methods
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
                const authUserType: 'freelancer' | 'employer' = chatRoom?.freelancer_id === authUser?.profile.id ? 'freelancer' : 'employer';
                const newChatRoom = {
                    ...chatRoom,
                    authUserType
                }

                const contractMessages = chatRoom.messages.filter(message => message.media_type === 'contract');
                
                if (contractMessages.length) {
                    const latestContractMessage = contractMessages.reduce((max, message) => message.id > max.id ? message : max, contractMessages[0]);
                    const latestContract = await fetchContract(latestContractMessage.content);
            
                    dispatch({
                        type: 'SET_ACTIVE_CHAT_ROOM',
                        payload: latestContract ? { ...newChatRoom, latestContract } : newChatRoom
                    });
                } else {
                    dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: chatRoom });
                }
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

        //fetch from jobonic db
        //TODO: add promise rejection handler
        const loadChatRoomData = async (chatRooms: ChatRoom[]) => {
            return Promise.all(chatRooms.map(async (chatRoom: ChatRoom) => { 
                const receiverId = chatRoom.freelancer_id === authUser?.profile.id ? chatRoom.employer_id : chatRoom.freelancer_id;
                const receiver: Profile = await getProfileByProfileId(receiverId);
                
                //fetching service
                const serviceRes = await httpClient.get('/service/get', {
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

        const createNewChatRoom = async (serviceId: string, matchId: string, freelancerId: number, employerId: number) => {
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
    
        const sendMessage = async (mediaType: MediaType, content: string): Promise<Message | null> => {
            const { activeChatRoom } = state;
        
            if (!authUser?.profile?.id || !activeChatRoom?.id || !content.trim()) {
                return null;
            }
        
            dispatch({ type: 'SET_SENDING_MEDIA', payload: mediaType });
        
            try {
                const { data, error } = await supabase
                    .from("messages")
                    .insert({
                        room_id: activeChatRoom.id,
                        media_type: mediaType,
                        content,
                        sender_id: authUser.profile.id,
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
                dispatch({ type: 'SET_SENDING_MEDIA', payload: null });
            }
        };             
        
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
                sendMessage
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