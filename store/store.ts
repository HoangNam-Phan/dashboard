import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './reducers';
import type { ModalState } from './reducers';

export type RootState = {
  modal: ModalState;
};

const rootReducer = {
  modal: modalReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
