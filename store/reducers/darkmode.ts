import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export type DarkmodeState = {
  darkmode: boolean;
};

const isDarkmode = !!Cookies.get('darkmode');

const initialState: DarkmodeState = {
  darkmode: isDarkmode,
};

export const darkmodeSlice = createSlice({
  name: 'darkmode',
  initialState,
  reducers: {
    setDarkmode: (state, action: PayloadAction<boolean>) => {
      state.darkmode = action.payload;
    },
  },
});

export const { setDarkmode } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;
