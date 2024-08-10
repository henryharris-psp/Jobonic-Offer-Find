import { User } from "@/types/users";
import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
    authUser: User | null;
    token: string | null;
}

const initialState : AuthState = {
    authUser: null,
    token: null,
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