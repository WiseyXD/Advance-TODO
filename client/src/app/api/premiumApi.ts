import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const premiumApi = createApi({
    reducerPath: "premiumApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_PREMIUM,
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
        buyPremium: builder.mutation({
            query: () => ({
                url: ``,
                method: "PUT",
            }),
        }),
    }),
});

export const { useBuyPremiumMutation } = premiumApi;
