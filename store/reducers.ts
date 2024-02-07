import { OPEN_MODAL, CLOSE_MODAL } from './actionTypes';
import { Action } from 'redux';

interface ModalAction extends Action {
  type: string;
}

export type ModalState = {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default modalReducer;