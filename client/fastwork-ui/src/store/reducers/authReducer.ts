import { User } from "@/types/users";
import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
    isAuthenticated: boolean;
    authUser: User | null;
    token: string | null;
}

const initialState : AuthState = {
    isAuthenticated: false,
    authUser: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            const { user, token } = action.payload;
            state.isAuthenticated = true;
            state.authUser = user;
            state.token = token;
        },
        unauthenticate: (state, action) => {
            state.isAuthenticated = false;
            state.authUser = null;
            state.token = null;
        },
        updateAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
    }
});

export const {
    updateAuthUser,
    authenticate,
    unauthenticate
} =  authSlice.actions;

export default authSlice.reducer;