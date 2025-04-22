import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { SLICES } from 'src/constants/redux';

type AuthState = {
  isLogged: boolean;
  expiresAccessToken?: number | null;
  expiresRefreshToken?: number | null;
};

const initialState: AuthState = {
  isLogged: false,
  expiresAccessToken: null,
  expiresRefreshToken: null,
};

const authSlice = createSlice({
  name: SLICES.AUTH,
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        expiresAccessToken: number;
        expiresRefreshToken: number;
      }>
    ) => {
      state.isLogged = true;
      state.expiresAccessToken = action.payload.expiresAccessToken;
      state.expiresRefreshToken = action.payload.expiresRefreshToken;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
