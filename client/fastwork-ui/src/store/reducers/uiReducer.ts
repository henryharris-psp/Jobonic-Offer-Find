import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';
export type Theme = 'light' | 'dark';

export interface UIState {
    theme: 'light' | 'dark';
    isMobile: boolean;
    screenSize: BreakPoint;
}

const initialState: UIState = {
    theme: 'light',
    isMobile: false,
    screenSize: 'lg',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScreenSize: (state, action: PayloadAction<BreakPoint>) => {
            state.screenSize = action.payload;
            state.isMobile = action.payload === 'sm';
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        }
    }
});

export const {
    setScreenSize,
    setTheme
} = uiSlice.actions;

export default uiSlice.reducer;
