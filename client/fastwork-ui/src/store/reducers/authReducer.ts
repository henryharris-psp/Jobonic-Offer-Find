import { createSlice } from "@reduxjs/toolkit"

export type User = {
    id: number,
    name: string
};

export interface AuthState {
    authUser: User | null;
    token: number | null;
}

const initialState : AuthState = {
    authUser: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            const { user, token } = action.payload;
            state.authUser = user;
            state.token = token;
        },
        unauthenticate: (state, action) => {
            state.authUser = null;
            state.token = null;
        },
    }
});

export const {
    authenticate,
    unauthenticate
} =  authSlice.actions;

export default authSlice.reducer;