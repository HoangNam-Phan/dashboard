'use client';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function Main({ children }: any) {
  const darkmode = useSelector((state: RootState) => state.darkmode.darkmode);

  return (
    <main className={`h-full ${darkmode ? 'dark' : ''}`}>
      <div id="modal-wrapper"></div>
      <div className="size-full transition-colors duration-300 bg-gray-200 dark:bg-gray-800 dark:text-gray-300">
        {children}
      </div>
    </main>
  );
}
