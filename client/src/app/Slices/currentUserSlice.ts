import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PayloadType {
    _id: string;
    email: string;
    admin: boolean;
    id?: string;
    password: string;
    premium: boolean;
    __v: number;
}

export interface UserState {
    email: null | string;
    _id: null | string;
    admin: null | boolean;
    premium: null | boolean;
}

const initialState: UserState = {
    _id: null,
    email: null,
    admin: null,
    premium: null,
};

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PayloadType>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.admin = action.payload.admin;
            state.premium = action.payload.premium;
        },
        unsetUser: (state) => {
            state._id = null;
            state.email = null;
            state.admin = null;
            state.premium = null;
        },
    },
});

export const { setUser, unsetUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
