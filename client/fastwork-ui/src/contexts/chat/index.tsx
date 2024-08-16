import React, { ReactNode, createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

export interface ChatState {
    showChatList: boolean;
    showProgressList: boolean;
}

const initialState: ChatState = {
    showChatList: false,
    showProgressList: false
};

interface ChatContextProps extends ChatState {
    setShowChatList: (show: boolean) => void;
    setShowProgressList: (show: boolean) => void
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

    return (
        <ChatContext.Provider
            value={{
                ...state,
                setShowChatList,
                setShowProgressList
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