// src/store/slices/screenSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ScreenState {
  width: number;
}

const initialState: ScreenState = {
  width: typeof window !== "undefined" ? window.innerWidth : 0
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    }
  }
});

export const { setScreenWidth } = screenSlice.actions;
export default screenSlice.reducer;
