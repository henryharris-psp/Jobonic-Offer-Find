import React, { ReactNode, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { ChatRoom, Message } from "@/types/chat";

export interface ChatState {
    showChatList: boolean;
    showProgressList: boolean;
    chatRooms: ChatRoom[];
    activeChatRoom: ChatRoom | null
}

const initialState: ChatState = {
    showChatList: false,
    showProgressList: false,
    chatRooms: [],
    activeChatRoom: null
};

interface ChatContextProps extends ChatState {
    setShowChatList: (show: boolean) => void;
    setShowProgressList: (show: boolean) => void;
    setChatRooms: (chatRooms: ChatRoom[]) => void,
    addMessage: (roomId: number, newMessage: Message) => void
    changeChatRoom: (chatRoom: ChatRoom ) => void,
    addNewChatRoomInLocal: (newChatRoom: ChatRoom) => void,
    updateChatRoom: (roomId: string | number, newValues: object) => void
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // methods
        const setShowChatList = (show: boolean) => {
            dispatch({ type: 'TOGGLE_CHAT_LIST', payload: show });
        };

        const setShowProgressList = (show: boolean) => {
            dispatch({ type: 'TOGGLE_PROGRESS_LIST', payload: show });
        };

        const setChatRooms = (chatRooms: ChatRoom[]) => {
            dispatch({ type: 'REPLACE_SERVER_CHAT_ROOMS', payload: chatRooms });
            const newActiveChatRoom = chatRooms.find( e => e.id === state.activeChatRoom?.id );
            if(newActiveChatRoom){
                dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: newActiveChatRoom });
            }
        }
        
        const addMessage = (roomId: number, newMessage: Message) => {
            const targetChatRoom = state.chatRooms.find( chatRoom => chatRoom.id === roomId );

            if(targetChatRoom){
                const updatedChatRoom = {
                    ...targetChatRoom,
                    messages: [...targetChatRoom.messages, newMessage]
                }
                
                const newChatRooms = state.chatRooms.map( chatRoom => {
                    return chatRoom.id === roomId 
                    ? updatedChatRoom
                    : chatRoom
                });

                //update new messages in all chat rooms and active chat room too
                dispatch({ type: 'REPLACE_ALL_CHAT_ROOMS', payload: newChatRooms });
                dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: updatedChatRoom });   
            }
        }

        const changeChatRoom = (chatRoom: ChatRoom ) => {
            dispatch({ type: 'SET_ACTIVE_CHAT_ROOM', payload: chatRoom });
        };

        const addNewChatRoomInLocal = (chatRoom: ChatRoom) => {
            dispatch({ type: 'ADD_NEW_CHAT_ROOM', payload: chatRoom });
        }

        const updateChatRoom = (roomId: string | number, newValues: object) => {
            const targetChatRoom = state.chatRooms.find( e => e.id === roomId );

            if(targetChatRoom){
                const updatedChatRoom = {
                    ...targetChatRoom,
                    ...newValues
                }
                const updatedChatRooms = state.chatRooms.map( e => e.id === roomId ? updatedChatRoom : e );
                dispatch({ type: 'REPLACE_ALL_CHAT_ROOMS', payload: updatedChatRooms });
            }
        }

    return (
        <ChatContext.Provider
            value={{
                ...state,
                setShowChatList,
                setShowProgressList,
                setChatRooms,
                addMessage,
                changeChatRoom,
                addNewChatRoomInLocal,
                updateChatRoom
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