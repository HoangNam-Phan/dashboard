'use client';

import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '@/store/actions';
import type { RootState } from '@/store/store';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: any;
  isOpen: boolean;
  closeModal: () => void;
};

const ModalComponent: React.FC<ModalProps> = ({
  children,
  isOpen,
  closeModal,
}) => {
  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 relative">
            <span
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <div>{children}</div>
          </div>
        </div>,
        document.getElementById('modal-wrapper')!
      )
    : null;
};

const mapStateToProps = (state: RootState) => ({
  isOpen: state.modal.isOpen,
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
