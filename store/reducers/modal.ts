import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  modals: { [id: string]: boolean };
};

const initialState: ModalState = {
  modals: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;