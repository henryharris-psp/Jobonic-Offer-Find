import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';

export interface UIState {
    isMobile: boolean;
    screenSize: BreakPoint;
}

const initialState: UIState = {
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
        }
    }
});

export const {
    setScreenSize
} = uiSlice.actions;

export default uiSlice.reducer;
