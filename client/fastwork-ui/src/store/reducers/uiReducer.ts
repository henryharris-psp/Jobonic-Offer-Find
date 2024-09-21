import { BreakPoint, Language, Notification } from "@/types/ui";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        }
    }
});

export const {
    setScreenSize,
    setSelectedLanguage
} = uiSlice.actions;

export default uiSlice.reducer;
