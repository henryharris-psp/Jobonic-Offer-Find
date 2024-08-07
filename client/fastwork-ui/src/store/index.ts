import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./reducers/uiReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
