'use client';

import Link from 'next/link';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
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
  const router = useRouter();

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

  function handleLinkClick(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    path: string,
    enabledWhenLoggedIn: boolean
  ) {
    if (loggedIn && enabledWhenLoggedIn) {
      return router.push(path);
    } else if (!loggedIn && !enabledWhenLoggedIn) {
      return router.push(path);
    }

    return e.preventDefault();
  }

  return (
    <footer className="fixed bottom-0 pb-3 w-full">
      <nav>
        <div className="flex justify-center divide-x-2">
          <Link
            href={`/${lang}/login`}
            className={`${conditionalNavClasses} rounded-l-full`}
            onClick={(e) => handleLinkClick(e, `/${lang}/login`, false)}
          >
            <ArrowRightEndOnRectangleIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/signup`}
            className={conditionalNavClasses}
            onClick={(e) => handleLinkClick(e, `/${lang}/signup`, false)}
          >
            <UserPlusIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/dashboard`}
            className={loggedIn ? navLinkStyles : disabledNavLinkStyles}
            onClick={(e) => handleLinkClick(e, `/${lang}/dashboard`, true)}
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
