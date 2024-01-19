import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PayloadType {
    token: string;
    email: string;
}

export interface AuthState {
    auth: null | PayloadType;
}

const initialState: AuthState = {
    auth: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<PayloadType>) => {
            state.auth = action.payload;
        },
        unsetAuth: (state) => {
            state.auth = null;
        },
    },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;
