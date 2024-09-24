import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { BreakPoint, Language, Notification } from "@/types/ui";
import { AppThunk } from "..";

export interface UIState {
    isMobile: boolean;
    screenSize: BreakPoint;
    selectedLanguage: Language;
    notifications: Notification[];
}

const initialState: UIState = {
    isMobile: false,
    screenSize: 'lg',
    selectedLanguage: 'English',
    notifications: []
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScreenSize: (state, action: PayloadAction<BreakPoint>) => {
            state.screenSize = action.payload;
            state.isMobile = action.payload === 'sm';
        },
        setSelectedLanguage: (state, action: PayloadAction<Language>) => {
            state.selectedLanguage = action.payload;
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            const newNotification = {
                id: uuid(),
                ...action.payload
            };
            state.notifications.push(newNotification);
        },
        closeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter( e => e.id !== action.payload );
        },
        clearNotifications: (state) => {
            state.notifications = [];
        }
    }
});

export const notify = (notification: Notification): AppThunk => (dispatch) => {
    const notificationId = uuid();
    const newNotification = { ...notification, id: notificationId };

    dispatch(uiSlice.actions.addNotification(newNotification));

    if (newNotification.timeout !== null) {
        setTimeout(() => {
            dispatch(uiSlice.actions.closeNotification(notificationId));
        }, newNotification.timeout);
    }
};

export const {
    setScreenSize,
    setSelectedLanguage,
    clearNotifications,
    closeNotification
} = uiSlice.actions;

export default uiSlice.reducer;
