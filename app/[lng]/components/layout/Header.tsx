import React from 'react';
import { openModal, closeModal } from '@/store/reducers/modal';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '@/store/reducers/login';
import { setLanguage } from '@/store/reducers/language';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Modal from '../modules/Modal';
import Cookies from 'js-cookie';

const LanguageToggler = () => {
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const dispatch = useDispatch();

  function toggleLanguage(lang: string) {
    dispatch(setLanguage(lang));
  }

  function signOut() {
    Cookies.remove('token');
    dispatch(setIsLoggedIn(false));
    dispatch(closeModal('signOut'));
  }

  return (
    <header className="absolute top-0 right-0 p-3 w-full flex justify-between pos-abs">
      <h1>DASHHBOARD</h1>
      <nav className="flex space-x-5">
        {loggedIn ? (
          <button
            type="button"
            disabled={!loggedIn}
            onClick={() => dispatch(openModal('signOut'))}
          >
            <ArrowLeftStartOnRectangleIcon className="size-6" />
          </button>
        ) : null}
        <Modal id="signOut">
          <div className="flex flex-col relative m-5 space-y-2">
            <p className="text-lg mb-3">Are you sure you want to sign out?</p>
            <button
              type="button"
              className="w-24 self-end px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </Modal>
        <Link onClick={() => toggleLanguage('en')} href={`/en`}>
          EN
        </Link>
        <Link onClick={() => toggleLanguage('de')} href={`/de`}>
          DE
        </Link>
      </nav>
    </header>
  );
};

export default LanguageToggler;
