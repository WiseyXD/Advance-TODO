import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const adminActionApi = createApi({
    reducerPath: "adminActionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_ADMIN,
        prepareHeaders: (headers, { getState }) => {
            const authState = (getState() as RootState).root.auth;
            const token = authState ? authState.token : null;
            if (token) {
                headers.set("authorization", token);
                headers.set("Content-Type", "application/json");
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `allUsers`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllUsersQuery } = adminActionApi;
