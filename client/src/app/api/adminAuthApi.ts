import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Credentials {
    email: string;
    password: string;
    username: string;
}

export const authAdminApi = createApi({
    reducerPath: "authAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_AUTH_ADMIN as string,
    }),
    endpoints: (builder) => ({
        adminSignup: builder.mutation({
            query: (credentials: Credentials) => ({
                url: "signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        adminLogin: builder.mutation({
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

export const { useAdminLoginMutation, useAdminSignupMutation } = authAdminApi;
