'use client';

import Link from 'next/link';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  TableCellsIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  const lang = useSelector((state: RootState) => state.language.lang);
  const loggedIn = useSelector((state: RootState) => state.login.loggedIn);
  const navLinkStyles =
    'py-1 lg:py-2 px-3 bg-white hover:bg-blue-500 hover:text-white';
  const disabledNavLinkStyles = 'py-1 lg:py-2 px-3 text-gray-300 bg-white';
  const conditionalNavClasses = loggedIn
    ? disabledNavLinkStyles
    : navLinkStyles;

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
          <Link href={`/${lang}`} className={navLinkStyles}>
            <HomeIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/dashboard`}
            className={loggedIn ? navLinkStyles : disabledNavLinkStyles}
          >
            <TableCellsIcon className="size-6" />
          </Link>
          <Link href="#" className={`${navLinkStyles} rounded-r-full`}>
            <Cog6ToothIcon className="size-6" />
          </Link>
        </div>
      </nav>
    </footer>
  );
}
