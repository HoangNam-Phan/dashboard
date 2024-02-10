'use client';

import Link from 'next/link';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import {
  HomeIcon,
  UserIcon,
  UserPlusIcon,
  TableCellsIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  const lang = useSelector((state: RootState) => state.language.lang);

  return (
    <footer className="fixed bottom-0 pb-3 w-full">
      <nav>
        <div className="flex justify-center divide-x-2">
          <Link
            href={`/${lang}/login`}
            className="bg-white py-1 lg:py-2 px-3 rounded-l-full"
          >
            <UserIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/signup`}
            className="bg-white py-1 lg:py-2 px-3 "
          >
            <UserPlusIcon className="size-6" />
          </Link>
          <Link href={`/${lang}`} className="bg-white py-1 lg:py-2 px-3">
            <HomeIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang}/dashboard`}
            className="bg-white py-1 lg:py-2 px-3"
          >
            <TableCellsIcon className="size-6" />
          </Link>
          <Link href="#" className="bg-white py-1 lg:py-2 px-3 rounded-r-full">
            <Cog6ToothIcon className="size-6" />
          </Link>
        </div>
      </nav>
    </footer>
  );
}
