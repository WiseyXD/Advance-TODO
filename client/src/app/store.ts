import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./Slices/rootReducer";
import { authApi } from "./api/authApi";
import { authAdminApi } from "./api/adminAuthApi";
import { todoApi } from "./api/todoApi";
import { premiumApi } from "./api/premiumApi";

const store = configureStore({
    reducer: {
        root: rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [authAdminApi.reducerPath]: authAdminApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [premiumApi.reducerPath]: premiumApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            authAdminApi.middleware,
            todoApi.middleware,
            premiumApi.middleware
        ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
