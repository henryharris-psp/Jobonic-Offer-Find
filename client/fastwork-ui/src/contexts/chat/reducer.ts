import { ChatState } from ".";

type ChatAction =
    | { type: 'TOGGLE_CHAT_LIST'; payload: boolean }
    | { type: 'TOGGLE_PROGRESS_LIST'; payload: boolean };

const reducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'TOGGLE_CHAT_LIST':
            return { ...state, showChatList: action.payload };
        case 'TOGGLE_PROGRESS_LIST':
            return { ...state, showProgressList: action.payload };
        default:
            return state;
    }
};

export default reducer;
