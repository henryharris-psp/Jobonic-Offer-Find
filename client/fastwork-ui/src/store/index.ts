import { combineReducers, configureStore } from "@reduxjs/toolkit";
import uiReducer from "./reducers/uiReducer";

const combinedReduers = combineReducers({
    ui: uiReducer
})

export const store = configureStore({
    reducer: combinedReduers,
});