import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers/modal';
import languageReducer from './reducers/language';
import type { ModalState } from './reducers/modal';
import type { LanguageState } from './reducers/language';

export type RootState = {
  modal: ModalState;
  language: LanguageState;
};

const rootReducer = {
  modal: modalReducer,
  language: languageReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
