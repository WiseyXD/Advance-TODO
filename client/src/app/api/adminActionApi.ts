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
    tagTypes: ["AdminTodos"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: `allUsers`,
                method: "GET",
            }),
        }),
        getCurrentUserTodos: builder.query({
            query: (id) => ({
                url: `todos/${id}`,
                method: "GET",
            }),
            providesTags: ["AdminTodos"],
        }),
        createAdminTodo: builder.mutation({
            query: ({ id, credentials }) => ({
                url: `/todos/create/${id}`,
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["AdminTodos"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetCurrentUserTodosQuery,
    useCreateAdminTodoMutation,
} = adminActionApi;
