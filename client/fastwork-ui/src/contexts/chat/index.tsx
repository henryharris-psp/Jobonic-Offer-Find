import React, { ReactNode, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { CurrentUser } from "@/components/chat/interfaces";

export interface ChatState {
    showChatList: boolean;
    showProgressList: boolean;
    
    //TODO: temporary
    currentUser: CurrentUser | null;
}

const initialState: ChatState = {
    showChatList: false,
    showProgressList: false,

    //TODO: temporary
    currentUser: null,
};

interface ChatContextProps extends ChatState {
    setShowChatList: (show: boolean) => void;
    setShowProgressList: (show: boolean) => void;
    setCurrentUser: (user: CurrentUser) => void;
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

        //TODO:temporary
        const setCurrentUser = (user: CurrentUser) => {
            dispatch({ type: 'AUTHENTICATE', payload: user });
        };

    return (
        <ChatContext.Provider
            value={{
                ...state,
                setShowChatList,
                setShowProgressList,
                setCurrentUser
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