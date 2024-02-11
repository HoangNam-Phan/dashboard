'use client';

import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/reducers/modal';
import { RootState } from '@/store/store';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
  id: string;
  children: any;
};

const ModalComponent: React.FC<ModalProps> = ({ id, children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modals[id] ?? false
  );

  const handleCloseModal = () => dispatch(closeModal(id));

  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 relative">
            <span
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={handleCloseModal}
            >
              <XMarkIcon className="size-5 m-2" />
            </span>
            <div>{children}</div>
          </div>
        </div>,
        document.getElementById('modal-wrapper')!
      )
    : null;
};

const mapStateToProps = (state: RootState, ownProps: { id: string }) => ({
  isOpen: state.modal.modals[ownProps.id],
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
