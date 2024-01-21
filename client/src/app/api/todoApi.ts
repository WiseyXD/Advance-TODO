import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type TUpdateTodoBody = {
    title?: string;
    description?: string;
};

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_TODO,
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
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getAllTodos: builder.query({
            query: () => "",
            providesTags: ["Todos"],
        }),
        createTodo: builder.mutation({
            query: (credentials) => ({
                url: "create",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: builder.mutation({
            query: ({ _id, updateData }) => {
                return {
                    url: `update/${_id}`,
                    method: "PUT",
                    body: updateData,
                };
            },
            invalidatesTags: ["Todos"],
        }),
        updateResourceTodo: builder.mutation({
            query: ({ _id, resource }) => {
                console.log(resource);
                return {
                    url: `resource/${_id}`,
                    method: "POST",
                    body: resource,
                };
            },
            invalidatesTags: ["Todos"],
        }),
        completedTodo: builder.mutation({
            query: (id) => ({
                url: `completed/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
});

export const {
    useGetAllTodosQuery,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useCompletedTodoMutation,
    useUpdateResourceTodoMutation,
    useLazyGetAllTodosQuery,
} = todoApi;
