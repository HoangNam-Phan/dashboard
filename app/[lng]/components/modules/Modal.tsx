'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/reducers/modal';
import { RootState } from '@/store/store';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

type ModalProps = {
  id: string;
  children: any;
};

export default function ModalComponent({ id, children }: ModalProps) {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.modals[id] ?? false
  );

  const handleCloseModal = () => dispatch(closeModal(id));

  return isOpen
    ? createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <motion.div
            className="bg-white rounded-lg p-6 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <button
              type="button"
              className="absolute top-0 right-0 size-8 pt-3 cursor-pointer"
              onClick={handleCloseModal}
            >
              <XMarkIcon className="size-5" />
            </button>
            <div>{children}</div>
          </motion.div>
        </div>,
        document.getElementById('modal-wrapper')!
      )
    : null;
}
