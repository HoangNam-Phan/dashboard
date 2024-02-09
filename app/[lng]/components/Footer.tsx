import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  HomeIcon,
  UserIcon,
  UserPlusIcon,
  TableCellsIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default async function Footer() {
  const cookieStore = cookies();
  const lang = cookieStore.get('i18next');

  return (
    <footer className="fixed bottom-0 pb-3 w-full">
      <nav>
        <div className="flex justify-center divide-x-2">
          <Link
            href={`/${lang?.value}/login`}
            className="bg-white py-1 lg:py-2 px-3 rounded-l-full"
          >
            <UserIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang?.value}/signup`}
            className="bg-white py-1 lg:py-2 px-3 "
          >
            <UserPlusIcon className="size-6" />
          </Link>
          <Link href={`/${lang?.value}`} className="bg-white py-1 lg:py-2 px-3">
            <HomeIcon className="size-6" />
          </Link>
          <Link
            href={`/${lang?.value}/dashboard`}
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
