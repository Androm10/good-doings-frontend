import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { themeReducer } from "./slices/theme.slice";
import { userReducer } from "./slices/user.slice";

export const store = configureStore({
  reducer: combineReducers({
    themeReducer,
    userReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
