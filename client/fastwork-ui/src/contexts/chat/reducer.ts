import { ChatRoom } from "@/types/chat";
import { ChatState } from ".";

type ChatAction =
    | { type: 'TOGGLE_CHAT_LIST'; payload: boolean }
    | { type: 'TOGGLE_PROGRESS_LIST'; payload: boolean }
    | { type: 'REPLACE_ALL_CHAT_ROOMS'; payload: ChatRoom[] }
    | { type: 'REPLACE_SERVER_CHAT_ROOMS'; payload: ChatRoom[] }
    | { type: 'SET_ACTIVE_CHAT_ROOM'; payload: ChatRoom | null }
    | { type: 'ADD_NEW_CHAT_ROOM'; payload: ChatRoom }

const reducer = (state: ChatState, action: ChatAction): ChatState => {
    switch (action.type) {
        case 'TOGGLE_CHAT_LIST': {
            return { ...state, showChatList: action.payload };
        }
        case 'TOGGLE_PROGRESS_LIST': {
            return { ...state, showProgressList: action.payload };
        }
        case 'REPLACE_SERVER_CHAT_ROOMS': {
            //ignore newly created chat rooms
            const newChatRooms = state.chatRooms.filter( e => e.isNew );
            return { ...state, chatRooms: [...newChatRooms, ...action.payload ]};
        }
        case 'REPLACE_ALL_CHAT_ROOMS': {
            return { ...state, chatRooms: action.payload };
        }
        case 'SET_ACTIVE_CHAT_ROOM':{
            return { ...state, activeChatRoom: action.payload };
        }
        case 'ADD_NEW_CHAT_ROOM': {
            return { ...state, chatRooms: [action.payload, ...state.chatRooms] };
        }
        default:
            return state;
    }
};

export default reducer;
