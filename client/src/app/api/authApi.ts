import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Credentials {
    email: string;
    password: string;
    username: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_AUTH as string, // Assuming VITE_BASE_AUTH is a string
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials: Credentials) => ({
                url: "signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials: Credentials) => ({
                url: "login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
