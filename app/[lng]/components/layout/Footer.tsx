'use client';

import Link from 'next/link';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  TableCellsIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { setDarkmode } from '@/store/reducers/darkmode';

export default function Footer() {
  const lang = useSelector((state: RootState) => state.language.lang);
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const darkmode = useSelector((state: RootState) => state.darkmode.darkmode);
  const dispatch = useDispatch();

  const navLinkStyles =
    'py-1 lg:py-2 px-3 transition bg-white hover:bg-blue-500 hover:text-white duration-300';
  const disabledNavLinkStyles = 'py-1 lg:py-2 px-3 text-gray-300 bg-white';
  const conditionalNavClasses = loggedIn
    ? disabledNavLinkStyles
    : navLinkStyles;

  function toggleDarkmode() {
    if (darkmode) {
      Cookies.remove('darkmode');
      return dispatch(setDarkmode(false));
    }

    Cookies.set('darkmode', 'true');
    return dispatch(setDarkmode(true));
  }

  return (
    <footer className="fixed bottom-0 pb-3 w-full">
      <nav>
        <div className="flex justify-center divide-x-2">
          <Link
            href={`/${lang}/login`}
            className={`${conditionalNavClasses} rounded-l-full`}
          >
            <ArrowRightEndOnRectangleIcon className="size-6" />
          </Link>
          <Link href={`/${lang}/signup`} className={conditionalNavClasses}>
            <UserPlusIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/dashboard`}
            className={loggedIn ? navLinkStyles : disabledNavLinkStyles}
          >
            <TableCellsIcon className="size-6" />
          </Link>
          <Link href={`/${lang}`} className={navLinkStyles}>
            <HomeIcon className="size-6" />
          </Link>
          <motion.button
            type="button"
            className={`${navLinkStyles} rounded-r-full`}
            onClick={toggleDarkmode}
          >
            {darkmode ? (
              <SunIcon className="size-6" />
            ) : (
              <MoonIcon className="size-6" />
            )}
          </motion.button>
        </div>
      </nav>
    </footer>
  );
}
