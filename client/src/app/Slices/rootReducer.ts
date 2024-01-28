import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import currentUserReducer from "./currentUserSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "currentUser"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    currentUser: currentUserReducer,
});

export default persistReducer(persistConfig, rootReducer);
