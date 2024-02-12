import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/modal';
import languageReducer from './reducers/language';
import loginReducer from './reducers/login';
import type { ModalState } from './reducers/modal';
import type { LanguageState } from './reducers/language';
import type { LoginState } from './reducers/login';

export type RootState = {
  modal: ModalState;
  language: LanguageState;
  login: LoginState;
};

const rootReducer = {
  modal: modalReducer,
  language: languageReducer,
  login: loginReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
