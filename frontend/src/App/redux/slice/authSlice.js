import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    }
  }
});

export const { setAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;

