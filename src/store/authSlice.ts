// store/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  college_id: string;
  college_email: string;
  roles: string[];
}

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  user: (() => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  })(),
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        user: User;
      }>
    ) => {
      const { access_token, refresh_token, user } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.user = user;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
