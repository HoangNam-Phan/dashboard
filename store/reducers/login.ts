import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export type LoginState = {
  loggedIn: boolean;
};

const userHasToken = !!Cookies.get('token');

const initialState: LoginState = {
  loggedIn: userHasToken,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
