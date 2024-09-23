import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import uiReducer from "./reducers/uiReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;


