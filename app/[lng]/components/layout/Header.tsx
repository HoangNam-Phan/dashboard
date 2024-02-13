import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { openModal, closeModal } from '@/store/reducers/modal';
import { RootState } from '@/store/store';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '@/store/reducers/login';
import { setLanguage } from '@/store/reducers/language';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Modal from '../modules/Modal';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

export default function Header() {
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const lang = useSelector((state: RootState) => state.language.lang);
  const isOpen = useSelector(
    (state: RootState) => state.modal.modals['signOut']
  );
  const translationLang = Cookies.get('i18next');
  const { t } = useTranslation(translationLang);
  const dispatch = useDispatch();
  const router = useRouter();

  function toggleLanguage(lang: string) {
    dispatch(setLanguage(lang));
  }

  function signOut() {
    Cookies.remove('token');
    dispatch(setIsLoggedIn(false));
    dispatch(closeModal('signOut'));
    router.push(`/${lang}`);
  }

  return (
    <header className="absolute top-0 right-0 p-3 w-full flex justify-end">
      <nav className="flex space-x-5">
        {loggedIn ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.2 }}
            disabled={!loggedIn}
            onClick={() => dispatch(openModal('signOut'))}
          >
            <ArrowLeftStartOnRectangleIcon className="size-6" />
          </motion.button>
        ) : null}
        <AnimatePresence>
          {isOpen && (
            <Modal id="signOut">
              <div className="flex flex-col relative space-y-2">
                <p className="text-lg my-3">{t('signOut.text')}</p>
                <button
                  type="button"
                  className="w-24 self-end px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                  onClick={signOut}
                >
                  {t('signOut.cta')}
                </button>
              </div>
            </Modal>
          )}
        </AnimatePresence>
        <Link
          className={lang === 'en' ? 'font-bold' : ''}
          onClick={() => toggleLanguage('en')}
          href={`/en`}
        >
          EN
        </Link>
        <Link
          className={lang === 'de' ? 'font-bold' : ''}
          onClick={() => toggleLanguage('de')}
          href={`/de`}
        >
          DE
        </Link>
      </nav>
    </header>
  );
}
