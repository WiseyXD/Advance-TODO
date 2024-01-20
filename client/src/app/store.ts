import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./Slices/rootReducer";
import { authApi } from "./api/authApi";
import { todoApi } from "./api/todoApi";

const store = configureStore({
    reducer: {
        root: rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, todoApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
