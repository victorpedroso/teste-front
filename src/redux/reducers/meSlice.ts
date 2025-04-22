import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { SLICES } from 'src/constants/redux';

export type MeState = {
  fullName?: string | undefined;
  email?: string | undefined;
  avatar?: string | undefined;
  oauth?: boolean;
};

const initialState: MeState = {};

const meSlice = createSlice({
  name: SLICES.ME,
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<MeState>>) => {
      Object.assign(state, action.payload);
    },

    clear: (state) => {
      state.fullName = undefined;
      state.email = undefined;
      state.avatar = undefined;
    },
  },
});

export const { set, clear } = meSlice.actions;
export default meSlice.reducer;
