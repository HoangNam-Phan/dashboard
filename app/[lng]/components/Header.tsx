import Link from 'next/link';
import { languages } from '@/app/i18n/settings';

type HeaderProps = {
  lang: string;
};

export default async function Header({ lang }: HeaderProps) {
  return (
    <header className="absolute top-0 right-0 bg-white shadow-md p-3 w-full flex justify-between pos-abs">
      <Link href="/">- board</Link>
      <nav>
        {languages
          .filter((l) => lang !== l)
          .map((l, index) => {
            return (
              <span key={l}>
                {index > 0 && ' or '}
                <Link href={`/${l}`}>{l}</Link>
              </span>
            );
          })}
      </nav>
    </header>
  );
}
