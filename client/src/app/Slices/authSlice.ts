import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PayloadType {
    token: string;
    email: string;
}

export interface AuthState {
    email: null | string;
    token: null | string;
}

const initialState: AuthState = {
    token: null,
    email: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<PayloadType>) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        unsetAuth: (state) => {
            state.token = null;
            state.email = null;
        },
    },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;
