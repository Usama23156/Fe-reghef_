import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
  email?: string;
  name?: string;
  phone?: string;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout ,setLoading } = authSlice.actions;
export default authSlice.reducer;