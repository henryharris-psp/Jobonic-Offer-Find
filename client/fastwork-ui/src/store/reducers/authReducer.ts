import { User } from "@/types/users";
import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
    isAuthenticated: boolean;
    authUser: User | null;
}

const initialState : AuthState = {
    isAuthenticated: false,
    authUser: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state, action) => {
            const user = action.payload;
            state.isAuthenticated = true;
            state.authUser = user;
        },
        unAuthenticate: (state) => {
            state.isAuthenticated = false;
            state.authUser = null;
        },
        updateAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
    }
});

export const {
    updateAuthUser,
    authenticate,
    unAuthenticate
} =  authSlice.actions;

export default authSlice.reducer;