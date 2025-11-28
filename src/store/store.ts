import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import screenReducer from "./screenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    screen: screenReducer
  }
});

// For TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
